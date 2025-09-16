import { forwardRef } from '../hooks/useComponentDefaults.js';

/**
 * Header Component
 * 다양한 헤더 타입을 지원하는 컴포넌트
 */
class Header {
    create(options = {}) {
        const {
            variant = 'simple',
            logo = '롤링핀',
            logoSize = 'medium',
            navigation = [],
            title = '',
            subtitle = '',
            backgroundImage = '',
            cta = null,
            sticky = true,
            className = '',
            ...otherProps
        } = options;

        const header = document.createElement('header');
        header.className = this.getHeaderClasses(variant, sticky, className);
        
        // 배경 이미지 설정
        if (backgroundImage && (variant === 'hero2' || variant === 'hero4')) {
            header.style.backgroundImage = `url(${backgroundImage})`;
        }

        // 헤더 내용 생성
        if (variant.startsWith('hero')) {
            header.innerHTML = this.createHeroHeader({
                variant,
                logo,
                logoSize,
                navigation,
                title,
                subtitle,
                cta,
                backgroundImage
            });
        } else {
            header.innerHTML = this.createSimpleHeader({
                variant,
                logo,
                logoSize,
                navigation
            });
        }

        // 다른 props 적용
        Object.keys(otherProps).forEach(key => {
            header.setAttribute(key, otherProps[key]);
        });

        return header;
    }

    getHeaderClasses(variant, sticky, className) {
        const baseClasses = ['header'];
        
        // Variant 클래스
        baseClasses.push(`header--${variant}`);
        
        // Sticky 클래스
        if (sticky) {
            baseClasses.push('header--sticky');
        }
        
        // 추가 클래스
        if (className) {
            baseClasses.push(className);
        }

        return baseClasses.join(' ');
    }

    createSimpleHeader({ variant, logo, logoSize, navigation }) {
        return `
            <div class="header__container">
                <div class="header__logo header__logo--${logoSize}">
                    <a href="#" class="header__logo-link">${logo}</a>
                </div>
                
                ${navigation.length > 0 ? `
                    <nav class="header__nav">
                        <ul class="header__nav-list">
                            ${navigation.map(item => `
                                <li class="header__nav-item">
                                    <a href="${item.href || '#'}" 
                                       class="header__nav-link"
                                       ${item.onClick ? `onclick="(${item.onClick.toString()})()"` : ''}>
                                        ${item.text}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </nav>
                ` : ''}
                
                <div class="header__mobile-toggle">
                    <button class="header__mobile-btn" aria-label="메뉴 열기">
                        <span class="header__mobile-icon"></span>
                    </button>
                </div>
            </div>
        `;
    }

    createHeroHeader({ variant, logo, logoSize, navigation, title, subtitle, cta, backgroundImage }) {
        return `
            <div class="header__container">
                <div class="header__top">
                    <div class="header__logo header__logo--${logoSize}">
                        <a href="#" class="header__logo-link">${logo}</a>
                    </div>
                    
                    ${navigation.length > 0 ? `
                        <nav class="header__nav">
                            <ul class="header__nav-list">
                                ${navigation.map(item => `
                                    <li class="header__nav-item">
                                        <a href="${item.href || '#'}" 
                                           class="header__nav-link"
                                           ${item.onClick ? `onclick="(${item.onClick.toString()})()"` : ''}>
                                            ${item.text}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </nav>
                    ` : ''}
                    
                    <div class="header__mobile-toggle">
                        <button class="header__mobile-btn" aria-label="메뉴 열기">
                            <span class="header__mobile-icon"></span>
                        </button>
                    </div>
                </div>
                
                ${title || subtitle ? `
                    <div class="header__hero">
                        <div class="header__hero-content">
                            ${title ? `<h1 class="header__hero-title">${title}</h1>` : ''}
                            ${subtitle ? `<p class="header__hero-subtitle">${subtitle}</p>` : ''}
                            
                            ${cta ? `
                                <div class="header__hero-cta">
                                    <button class="header__cta-button" 
                                            ${cta.onClick ? `onclick="(${cta.onClick.toString()})()"` : ''}>
                                        ${cta.text}
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <style>
                .header {
                    position: relative;
                    width: 100%;
                    z-index: 10;
                }
                
                .header--sticky {
                    position: sticky;
                    top: 0;
                }
                
                .header--simple {
                    background: var(--bg-white);
                    border-bottom: 1px solid var(--border-light);
                    box-shadow: var(--shadow-small);
                }
                
                .header--business {
                    background: var(--bg-white);
                    border-bottom: 1px solid var(--border-light);
                    box-shadow: var(--shadow-medium);
                }
                
                .header--hero1 {
                    background: linear-gradient(135deg, var(--primary-main), var(--secondary-main));
                    color: white;
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                }
                
                .header--hero2 {
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: relative;
                    color: white;
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                }
                
                .header--hero2::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1;
                }
                
                .header--hero2 .header__container {
                    position: relative;
                    z-index: 2;
                }
                
                .header--hero3 {
                    background: linear-gradient(135deg, rgba(22, 22, 23, 0.95), rgba(44, 44, 46, 0.9));
                    color: white;
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                }
                
                .header--hero4 {
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: relative;
                    color: var(--text-primary);
                    min-height: 60vh;
                    display: flex;
                    align-items: center;
                }
                
                .header--hero4::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(249, 246, 234, 0.9);
                    z-index: 1;
                }
                
                .header--hero4 .header__container {
                    position: relative;
                    z-index: 2;
                }
                
                .header__container {
                    max-width: var(--container-width);
                    margin: 0 auto;
                    padding: 0 var(--spacing-lg);
                    display: flex;
                    flex-direction: column;
                    min-height: inherit;
                }
                
                .header__top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: var(--spacing-lg) 0;
                }
                
                .header--simple .header__container,
                .header--business .header__container {
                    flex-direction: row;
                    align-items: center;
                    min-height: 70px;
                }
                
                .header__logo--small {
                    font-size: var(--font-size-lg);
                    font-weight: var(--font-weight-bold);
                }
                
                .header__logo--medium {
                    font-size: var(--font-size-xl);
                    font-weight: var(--font-weight-bold);
                }
                
                .header__logo--large {
                    font-size: var(--font-size-xxl);
                    font-weight: var(--font-weight-bold);
                }
                
                .header__logo-link {
                    color: inherit;
                    text-decoration: none;
                    transition: opacity var(--transition-fast);
                }
                
                .header__logo-link:hover {
                    opacity: 0.8;
                }
                
                .header__nav-list {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: var(--spacing-lg);
                }
                
                .header__nav-link {
                    color: inherit;
                    text-decoration: none;
                    font-weight: var(--font-weight-medium);
                    transition: opacity var(--transition-fast);
                    font-size: var(--font-size-md);
                }
                
                .header__nav-link:hover {
                    opacity: 0.7;
                }
                
                .header__mobile-toggle {
                    display: none;
                }
                
                .header__mobile-btn {
                    background: none;
                    border: none;
                    padding: var(--spacing-sm);
                    cursor: pointer;
                    color: inherit;
                }
                
                .header__mobile-icon {
                    display: block;
                    width: 24px;
                    height: 2px;
                    background: currentColor;
                    position: relative;
                }
                
                .header__mobile-icon::before,
                .header__mobile-icon::after {
                    content: '';
                    position: absolute;
                    width: 24px;
                    height: 2px;
                    background: currentColor;
                    left: 0;
                }
                
                .header__mobile-icon::before {
                    top: -8px;
                }
                
                .header__mobile-icon::after {
                    bottom: -8px;
                }
                
                .header__hero {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding: var(--spacing-xxl) 0;
                }
                
                .header__hero-content {
                    text-align: center;
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .header__hero-title {
                    font-size: var(--font-size-xxxl);
                    font-weight: var(--font-weight-bold);
                    margin: 0 0 var(--spacing-lg) 0;
                    line-height: 1.2;
                }
                
                .header__hero-subtitle {
                    font-size: var(--font-size-lg);
                    margin: 0 0 var(--spacing-xl) 0;
                    opacity: 0.9;
                    line-height: 1.5;
                }
                
                .header__hero-cta {
                    margin-top: var(--spacing-xl);
                }
                
                .header__cta-button {
                    background: var(--primary-main);
                    color: white;
                    border: none;
                    padding: var(--spacing-md) var(--spacing-xl);
                    font-size: var(--font-size-md);
                    font-weight: var(--font-weight-medium);
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    transition: all var(--transition-normal);
                    box-shadow: var(--shadow-medium);
                }
                
                .header__cta-button:hover {
                    background: var(--primary-dark);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-large);
                }
                
                @media (max-width: 768px) {
                    .header__nav {
                        display: none;
                    }
                    
                    .header__mobile-toggle {
                        display: block;
                    }
                    
                    .header__hero-title {
                        font-size: var(--font-size-xxl);
                    }
                    
                    .header__hero-subtitle {
                        font-size: var(--font-size-md);
                    }
                    
                    .header__container {
                        padding: 0 var(--spacing-md);
                    }
                }
            </style>
        `;
    }
}

export default Header;