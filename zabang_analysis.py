import asyncio
from playwright.async_api import async_playwright
import re
import json
from urllib.parse import urljoin, urlparse
from collections import defaultdict

async def analyze_zabang_resources():
    """Comprehensive resource discovery for zabang.co.kr"""
    
    resources = {
        'images': [],
        'css_backgrounds': [],
        'logos_icons': [],
        'videos_audio': [],
        'fonts': [],
        'other_media': []
    }
    
    network_requests = []
    
    async with async_playwright() as p:
        # Launch browser with network monitoring
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        
        page = await context.new_page()
        
        # Monitor network requests
        def handle_request(request):
            network_requests.append({
                'url': request.url,
                'resource_type': request.resource_type,
                'method': request.method
            })
        
        def handle_response(response):
            # Add response info to matching requests
            for req in network_requests:
                if req['url'] == response.url:
                    req.update({
                        'status': response.status,
                        'content_type': response.headers.get('content-type', ''),
                        'content_length': response.headers.get('content-length', '')
                    })
                    break
        
        page.on('request', handle_request)
        page.on('response', handle_response)
        
        try:
            print("Navigating to zabang.co.kr...")
            
            # Navigate to the main page
            await page.goto('https://zabang.co.kr', 
                          wait_until='networkidle', 
                          timeout=30000)
            
            print("Waiting for all resources to load...")
            
            # Wait for additional resources to load
            await page.wait_for_timeout(3000)
            
            # Scroll to trigger lazy loading
            await page.evaluate("""
                window.scrollTo(0, document.body.scrollHeight);
            """)
            await page.wait_for_timeout(2000)
            
            print("Analyzing DOM elements...")
            
            # Extract all image elements
            images = await page.evaluate("""
                () => {
                    const imgs = Array.from(document.querySelectorAll('img'));
                    return imgs.map(img => ({
                        src: img.src,
                        alt: img.alt || '',
                        width: img.width,
                        height: img.height,
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                        className: img.className,
                        id: img.id,
                        title: img.title || '',
                        loading: img.loading || 'eager',
                        srcset: img.srcset || ''
                    }));
                }
            """)
            
            # Extract CSS background images
            bg_images = await page.evaluate("""
                () => {
                    const elements = Array.from(document.querySelectorAll('*'));
                    const backgrounds = [];
                    
                    elements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        const bgImage = style.backgroundImage;
                        
                        if (bgImage && bgImage !== 'none') {
                            const urls = bgImage.match(/url\\(["']?([^"')]+)["']?\\)/g);
                            if (urls) {
                                urls.forEach(urlMatch => {
                                    const url = urlMatch.match(/url\\(["']?([^"')]+)["']?\\)/)[1];
                                    backgrounds.push({
                                        url: url,
                                        element: el.tagName.toLowerCase(),
                                        className: el.className,
                                        id: el.id,
                                        size: style.backgroundSize,
                                        position: style.backgroundPosition,
                                        repeat: style.backgroundRepeat
                                    });
                                });
                            }
                        }
                    });
                    
                    return backgrounds;
                }
            """)
            
            # Extract link elements (for icons, fonts, etc.)
            links = await page.evaluate("""
                () => {
                    const links = Array.from(document.querySelectorAll('link[href]'));
                    return links.map(link => ({
                        href: link.href,
                        rel: link.rel,
                        type: link.type || '',
                        sizes: link.sizes || '',
                        media: link.media || ''
                    }));
                }
            """)
            
            # Extract video and audio elements
            media = await page.evaluate("""
                () => {
                    const videos = Array.from(document.querySelectorAll('video, audio'));
                    return videos.map(media => ({
                        src: media.src || media.currentSrc,
                        type: media.tagName.toLowerCase(),
                        poster: media.poster || '',
                        controls: media.controls,
                        autoplay: media.autoplay,
                        loop: media.loop,
                        muted: media.muted,
                        sources: Array.from(media.querySelectorAll('source')).map(s => ({
                            src: s.src,
                            type: s.type || ''
                        }))
                    }));
                }
            """)
            
            print("Processing network requests...")
            
            # Process network requests
            image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp', '.tiff']
            video_extensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv']
            audio_extensions = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.wma']
            font_extensions = ['.woff', '.woff2', '.ttf', '.otf', '.eot']
            
            base_url = 'https://zabang.co.kr'
            
            # Process images from DOM
            for img in images:
                if img['src']:
                    url = urljoin(base_url, img['src']) if not img['src'].startswith('http') else img['src']
                    
                    # Determine purpose based on attributes
                    purpose = determine_image_purpose(img)
                    
                    # Get file info from network requests
                    network_info = next((req for req in network_requests if req['url'] == url), {})
                    
                    resource = {
                        'url': url,
                        'size': format_file_size(network_info.get('content_length', 'Unknown')),
                        'type': get_file_extension(url),
                        'purpose': purpose,
                        'location': f"img element (class: {img['className']}, id: {img['id']})",
                        'dimensions': f"{img['naturalWidth']}x{img['naturalHeight']}" if img['naturalWidth'] else 'Unknown',
                        'alt_text': img['alt'],
                        'loading': img['loading']
                    }
                    
                    if 'logo' in purpose.lower() or 'icon' in purpose.lower():
                        resources['logos_icons'].append(resource)
                    else:
                        resources['images'].append(resource)
            
            # Process CSS background images
            for bg in bg_images:
                if bg['url'] and not bg['url'].startswith('data:'):
                    url = urljoin(base_url, bg['url']) if not bg['url'].startswith('http') else bg['url']
                    network_info = next((req for req in network_requests if req['url'] == url), {})
                    
                    resources['css_backgrounds'].append({
                        'url': url,
                        'size': format_file_size(network_info.get('content_length', 'Unknown')),
                        'type': get_file_extension(url),
                        'purpose': 'CSS background image',
                        'location': f"{bg['element']} element (class: {bg['className']}, id: {bg['id']})",
                        'css_properties': {
                            'size': bg['size'],
                            'position': bg['position'],
                            'repeat': bg['repeat']
                        }
                    })
            
            # Process links (icons, fonts, etc.)
            for link in links:
                if link['href']:
                    url = urljoin(base_url, link['href']) if not link['href'].startswith('http') else link['href']
                    network_info = next((req for req in network_requests if req['url'] == url), {})
                    
                    resource = {
                        'url': url,
                        'size': format_file_size(network_info.get('content_length', 'Unknown')),
                        'type': get_file_extension(url),
                        'rel': link['rel'],
                        'media': link['media'],
                        'sizes': link['sizes']
                    }
                    
                    if 'icon' in link['rel']:
                        resource.update({
                            'purpose': f"Page icon ({link['rel']})",
                            'location': 'HTML head section'
                        })
                        resources['logos_icons'].append(resource)
                    elif any(ext in url.lower() for ext in font_extensions):
                        resource.update({
                            'purpose': 'Web font',
                            'location': 'CSS @font-face or link element'
                        })
                        resources['fonts'].append(resource)
                    else:
                        resource.update({
                            'purpose': f"Linked resource ({link['rel']})",
                            'location': 'HTML head section'
                        })
                        resources['other_media'].append(resource)
            
            # Process video/audio elements
            for media_item in media:
                if media_item['src']:
                    url = urljoin(base_url, media_item['src']) if not media_item['src'].startswith('http') else media_item['src']
                    network_info = next((req for req in network_requests if req['url'] == url), {})
                    
                    resources['videos_audio'].append({
                        'url': url,
                        'size': format_file_size(network_info.get('content_length', 'Unknown')),
                        'type': get_file_extension(url),
                        'purpose': f"{media_item['type'].capitalize()} content",
                        'location': f"{media_item['type']} element",
                        'poster': media_item.get('poster', ''),
                        'controls': media_item.get('controls', False),
                        'autoplay': media_item.get('autoplay', False)
                    })
                
                # Process sources
                for source in media_item.get('sources', []):
                    if source['src']:
                        url = urljoin(base_url, source['src']) if not source['src'].startswith('http') else source['src']
                        network_info = next((req for req in network_requests if req['url'] == url), {})
                        
                        resources['videos_audio'].append({
                            'url': url,
                            'size': format_file_size(network_info.get('content_length', 'Unknown')),
                            'type': source.get('type', get_file_extension(url)),
                            'purpose': f"{media_item['type'].capitalize()} source",
                            'location': f"source element within {media_item['type']}"
                        })
            
            # Process additional resources from network requests
            for req in network_requests:
                url = req['url']
                
                # Skip data URLs, blob URLs, and base URL
                if url.startswith('data:') or url.startswith('blob:') or url == base_url + '/':
                    continue
                
                # Skip non-media resources
                if req['resource_type'] not in ['image', 'media', 'font', 'other']:
                    continue
                
                # Check if already processed
                already_processed = any(
                    any(url == item.get('url') for item in category)
                    for category in resources.values()
                )
                
                if not already_processed:
                    file_ext = get_file_extension(url).lower()
                    
                    if any(ext in file_ext for ext in image_extensions):
                        resources['images'].append({
                            'url': url,
                            'size': format_file_size(req.get('content_length', 'Unknown')),
                            'type': file_ext,
                            'purpose': 'Network-loaded image',
                            'location': 'Detected from network requests'
                        })
                    elif any(ext in file_ext for ext in font_extensions):
                        resources['fonts'].append({
                            'url': url,
                            'size': format_file_size(req.get('content_length', 'Unknown')),
                            'type': file_ext,
                            'purpose': 'Web font',
                            'location': 'Detected from network requests'
                        })
                    elif any(ext in file_ext for ext in video_extensions + audio_extensions):
                        resources['videos_audio'].append({
                            'url': url,
                            'size': format_file_size(req.get('content_length', 'Unknown')),
                            'type': file_ext,
                            'purpose': 'Media file',
                            'location': 'Detected from network requests'
                        })
            
            print("Resource discovery completed!")
            
        except Exception as e:
            print(f"Error during analysis: {str(e)}")
            
        finally:
            await browser.close()
    
    return resources, network_requests

def determine_image_purpose(img_data):
    """Determine the purpose of an image based on its attributes"""
    alt = img_data.get('alt', '').lower()
    src = img_data.get('src', '').lower()
    class_name = img_data.get('className', '').lower()
    id_attr = img_data.get('id', '').lower()
    
    # Check for logo indicators
    if any(keyword in f"{alt} {src} {class_name} {id_attr}" for keyword in ['logo', 'brand', 'header']):
        return 'Logo/Brand image'
    
    # Check for icon indicators
    if any(keyword in f"{alt} {src} {class_name} {id_attr}" for keyword in ['icon', 'ico', 'symbol']):
        return 'Icon'
    
    # Check for banner/hero indicators
    if any(keyword in f"{alt} {src} {class_name} {id_attr}" for keyword in ['banner', 'hero', 'main']):
        return 'Banner/Hero image'
    
    # Check for thumbnail indicators
    if any(keyword in f"{alt} {src} {class_name} {id_attr}" for keyword in ['thumb', 'preview']):
        return 'Thumbnail'
    
    # Check for avatar/profile indicators
    if any(keyword in f"{alt} {src} {class_name} {id_attr}" for keyword in ['avatar', 'profile', 'user']):
        return 'Avatar/Profile image'
    
    # Default
    return 'Content image'

def get_file_extension(url):
    """Extract file extension from URL"""
    parsed = urlparse(url)
    path = parsed.path
    if '.' in path:
        return path.split('.')[-1].split('?')[0]  # Remove query parameters
    return 'unknown'

def format_file_size(size_str):
    """Format file size for better readability"""
    if size_str == 'Unknown' or not size_str:
        return 'Unknown'
    
    try:
        size_bytes = int(size_str)
        if size_bytes < 1024:
            return f"{size_bytes} B"
        elif size_bytes < 1024 * 1024:
            return f"{size_bytes / 1024:.1f} KB"
        else:
            return f"{size_bytes / (1024 * 1024):.1f} MB"
    except:
        return size_str

def print_detailed_report(resources):
    """Print a detailed resource report"""
    print("\n" + "="*80)
    print("COMPREHENSIVE RESOURCE DISCOVERY REPORT - ZABANG.CO.KR")
    print("="*80)
    
    total_resources = sum(len(category) for category in resources.values())
    print(f"\nSUMMARY: Found {total_resources} total downloadable resources\n")
    
    # Print category summaries
    for category, items in resources.items():
        if items:
            print(f"{category.replace('_', ' ').title()}: {len(items)} items")
    print()
    
    # Detailed breakdown
    for category_name, items in resources.items():
        if not items:
            continue
            
        print(f"\n{'='*60}")
        print(f"## {category_name.replace('_', ' ').title().upper()} ({len(items)} items)")
        print('='*60)
        
        for i, item in enumerate(items, 1):
            print(f"\n{i}. URL: {item['url']}")
            print(f"   Size: {item.get('size', 'Unknown')}")
            print(f"   Type: {item.get('type', 'Unknown')}")
            print(f"   Purpose: {item.get('purpose', 'Unknown')}")
            print(f"   Location: {item.get('location', 'Unknown')}")
            
            # Add specific details based on category
            if 'alt_text' in item and item['alt_text']:
                print(f"   Alt Text: {item['alt_text']}")
            if 'dimensions' in item and item['dimensions'] != 'Unknown':
                print(f"   Dimensions: {item['dimensions']}")
            if 'css_properties' in item:
                css = item['css_properties']
                print(f"   CSS Properties: size={css['size']}, position={css['position']}, repeat={css['repeat']}")

# Main execution
async def main():
    print("Starting comprehensive resource discovery for zabang.co.kr...")
    resources, network_data = await analyze_zabang_resources()
    
    # Print detailed report
    print_detailed_report(resources)
    
    # Save to file
    with open('zabang_resources.json', 'w', encoding='utf-8') as f:
        json.dump({
            'resources': resources,
            'network_summary': {
                'total_requests': len(network_data),
                'unique_urls': len(set(req['url'] for req in network_data))
            }
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\nFull results saved to zabang_resources.json")
    print(f"Total network requests monitored: {len(network_data)}")

if __name__ == "__main__":
    asyncio.run(main())