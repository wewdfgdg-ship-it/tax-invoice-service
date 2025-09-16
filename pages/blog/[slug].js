import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from '../../src/components/ui/Link';
import Card from '../../src/components/ui/Card';
import Typography from '../../src/components/ui/Typography';
import Container from '../../src/components/ui/Container';
import { Grid, GridItem } from '../../src/components/ui/Grid';
import Badge from '../../src/components/ui/Badge';
import Loader from '../../src/components/ui/Loader';
import Button from '../../src/components/ui/Button';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    // 스크롤 이벤트로 현재 섹션 하이라이트
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
      const scrollPosition = window.scrollY + 100;
      
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        
        if (top <= scrollPosition) {
          setActiveHeading(heading.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      
      // 포스트 가져오기
      const postResponse = await fetch(`/api/blog/post/${slug}`);
      if (!postResponse.ok) throw new Error('Failed to fetch post');
      const postData = await postResponse.json();
      setPost(postData);
      
      // 관련 포스트 가져오기
      const relatedResponse = await fetch(`/api/blog/related/${slug}`);
      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        setRelatedPosts(relatedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // 네비게이션 바 높이
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader variant="spinner" size="lg" color="primary" text="포스트를 불러오는 중..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth="lg" padding="responsive" className="py-20">
        <Card variant="bordered" padding="xl">
          <Typography variant="body" color="dark" align="center">
            {error || '포스트를 찾을 수 없습니다.'}
          </Typography>
          <div className="mt-6 text-center">
            <Button variant="primary" size="md" onClick={() => router.push('/blog')}>
              블로그 목록으로
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <>
      {/* Apple Style Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[44px] bg-[rgba(22,22,23,0.8)] backdrop-blur-xl z-50">
        <Container maxWidth="lg" padding="responsive">
          <div className="flex items-center justify-between h-[44px]">
            <Link href="/blog" variant="nav" color="whiteAlpha">
              ← 블로그
            </Link>
            <Typography variant="bodySmall" color="whiteAlpha">
              {post.title}
            </Typography>
          </div>
        </Container>
      </nav>

      {/* Main Content Area */}
      <main className="pt-[44px]">
        <Container maxWidth="lg" padding="responsive">
          <Grid cols={12} gap="lg">
            {/* TOC Sidebar - 왼쪽 고정 */}
            <GridItem span={12} spanLg={3}>
              <aside className="sticky top-[88px]">
                <Card variant="flat" padding="lg">
                  <Typography variant="h6" color="dark" className="mb-4">
                    목차
                  </Typography>
                  <nav className="space-y-2">
                    {post.headings && post.headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => scrollToHeading(heading.id)}
                        className={`
                          block w-full text-left transition-all duration-240
                          ${heading.level === 1 ? 'pl-0' : ''}
                          ${heading.level === 2 ? 'pl-4' : ''}
                          ${heading.level === 3 ? 'pl-8' : ''}
                          ${activeHeading === heading.id 
                            ? 'text-[rgb(0,113,227)] font-semibold' 
                            : 'text-[rgb(134,134,139)] hover:text-[rgb(29,29,31)]'}
                        `}
                      >
                        <Typography 
                          variant={heading.level === 1 ? 'bodySmall' : 'caption'}
                          as="span"
                        >
                          {heading.text}
                        </Typography>
                      </button>
                    ))}
                  </nav>
                </Card>
              </aside>
            </GridItem>

            {/* Main Article Content */}
            <GridItem span={12} spanLg={9}>
              <article className="py-[44px]">
                {/* Article Header */}
                <header className="mb-12">
                  <Typography variant="display" color="dark" className="mb-6">
                    {post.title}
                  </Typography>
                  
                  <div className="flex items-center gap-4 text-[rgb(134,134,139)]">
                    <Typography variant="body" color="gray">
                      {new Date(post.createdTime).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    {post.lastEditedTime !== post.createdTime && (
                      <Typography variant="caption" color="lightGray">
                        (수정됨: {new Date(post.lastEditedTime).toLocaleDateString('ko-KR')})
                      </Typography>
                    )}
                  </div>
                </header>

                {/* Article Content - 노션에서 가져온 HTML */}
                <div 
                  className="notion-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Related Posts Section */}
              {relatedPosts && relatedPosts.length > 0 && (
                <section className="py-12 border-t border-[rgb(232,232,237)]">
                  <Typography variant="h2" color="dark" className="mb-8">
                    관련 글
                  </Typography>
                  
                  <Grid cols={12} gap="default">
                    {relatedPosts.map((related) => (
                      <GridItem key={related.id} span={12} spanMd={6}>
                        <Link href={`/blog/${related.slug}`} variant="default">
                          <Card variant="hover" padding="none" className="overflow-hidden">
                            <div className="flex">
                              {related.thumbnail && (
                                <div className="w-32 h-32 flex-shrink-0">
                                  <img 
                                    src={related.thumbnail} 
                                    alt={related.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-4 flex-1">
                                <Typography variant="h4" color="dark" className="mb-2 line-clamp-2">
                                  {related.title}
                                </Typography>
                                <Typography variant="bodySmall" color="gray" className="line-clamp-2">
                                  {related.excerpt}
                                </Typography>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </GridItem>
                    ))}
                  </Grid>
                </section>
              )}
            </GridItem>
          </Grid>
        </Container>
      </main>

      <style jsx global>{`
        /* 노션 콘텐츠 스타일링 */
        .notion-content {
          color: rgb(29, 29, 31);
          line-height: 1.8;
        }
        
        .notion-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 3rem 0 1.5rem;
          color: rgb(29, 29, 31);
        }
        
        .notion-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 2.5rem 0 1.25rem;
          color: rgb(29, 29, 31);
        }
        
        .notion-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          color: rgb(29, 29, 31);
        }
        
        .notion-content p {
          margin: 1.25rem 0;
          font-size: 1.0625rem;
          color: rgb(29, 29, 31);
        }
        
        .notion-content ul,
        .notion-content ol {
          margin: 1.25rem 0;
          padding-left: 1.5rem;
        }
        
        .notion-content li {
          margin: 0.5rem 0;
          font-size: 1.0625rem;
        }
        
        .notion-content blockquote {
          margin: 2rem 0;
          padding-left: 1.5rem;
          border-left: 3px solid rgb(0, 113, 227);
          color: rgb(134, 134, 139);
          font-style: italic;
        }
        
        .notion-content pre {
          margin: 2rem 0;
          padding: 1.5rem;
          background: rgb(245, 245, 247);
          border-radius: 12px;
          overflow-x: auto;
        }
        
        .notion-content code {
          font-family: 'SF Mono', Monaco, 'Courier New', monospace;
          font-size: 0.875rem;
          padding: 0.125rem 0.375rem;
          background: rgb(245, 245, 247);
          border-radius: 4px;
        }
        
        .notion-content pre code {
          padding: 0;
          background: transparent;
        }
        
        .notion-content img,
        .notion-content video {
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
          border-radius: 12px;
        }
        
        .notion-content figure {
          margin: 2rem 0;
        }
        
        .notion-content figcaption {
          margin-top: 0.5rem;
          text-align: center;
          color: rgb(134, 134, 139);
          font-size: 0.875rem;
        }
        
        .notion-content hr {
          margin: 3rem 0;
          border: none;
          border-top: 1px solid rgb(232, 232, 237);
        }
        
        .notion-content a {
          color: rgb(0, 113, 227);
          text-decoration: none;
          transition: all 240ms cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        .notion-content a:hover {
          color: rgb(0, 102, 204);
          text-decoration: underline;
        }
        
        .notion-content .callout {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          margin: 2rem 0;
          background: rgb(245, 245, 247);
          border-radius: 12px;
        }
        
        .notion-content .callout-emoji {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .notion-content .callout-text {
          flex: 1;
        }
        
        .notion-content details {
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgb(245, 245, 247);
          border-radius: 12px;
        }
        
        .notion-content summary {
          cursor: pointer;
          font-weight: 600;
          color: rgb(29, 29, 31);
        }
        
        .notion-content .toggle-content {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgb(232, 232, 237);
        }
        
        .notion-content .bookmark {
          display: block;
          padding: 1rem;
          margin: 2rem 0;
          border: 1px solid rgb(232, 232, 237);
          border-radius: 12px;
          text-decoration: none;
          transition: all 240ms cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        .notion-content .bookmark:hover {
          background: rgb(245, 245, 247);
          border-color: rgb(0, 113, 227);
        }
        
        .notion-content .bookmark-title {
          font-weight: 600;
          color: rgb(29, 29, 31);
          margin-bottom: 0.25rem;
        }
        
        .notion-content .bookmark-url {
          font-size: 0.875rem;
          color: rgb(134, 134, 139);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .transition-all {
          transition: all 240ms cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
    </>
  );
}