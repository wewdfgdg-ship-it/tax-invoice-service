"use strict";

// 헤더 gnb 스크립트
const header = document.querySelector('.header');
const mobileGnb = document.querySelector('.mobile-gnb');
const DEFAULT_HEADER_HEIGHT = 60;
const DURATION = 500;
window.addEventListener('DOMContentLoaded', () => {
  initGnb(header);
  initMobileGnb(mobileGnb);
})

// PC
function initGnb(header) {
  let gnb = header.querySelector('.header-gnb');
  let gnbMenus = gnb.querySelectorAll('.gnb-depth-1 .depth-1');
  let gnbMenuLinks = gnb.querySelectorAll('.gnb-depth-1 .depth-1 .depth-1-link');
  let gnbAllLinks = gnb.querySelectorAll('a');
  let depthItems = gnb.querySelectorAll('.depth-item');

  header.addEventListener('mouseleave', (event) => {
    gnbClose(header, depthItems);
  });

  [...gnbMenus].forEach(menu => {
    menu.addEventListener('mouseenter', (event) => {
      menu.classList.add('current');
    });
    menu.addEventListener('focusin', (event) => {
      menu.classList.add('current');
    });

    menu.addEventListener('mouseleave', (event) => {
      menu.classList.remove('current');
    });
    menu.addEventListener('focusout', (event) => {
      menu.classList.remove('current');
    });
  });

  [...gnbMenuLinks].forEach(link => {
    link.addEventListener('mouseenter', (event) => {
      let item = link.nextElementSibling;
      gnbOpen(header, item);
    })
    link.addEventListener('focusin', (event) => {
      let item = link.nextElementSibling;
      gnbOpen(header, item);
    })
  });

  [...gnbAllLinks].at(-1).addEventListener('focusout', (event) => {
    gnbClose(header, depthItems);
  })

  function gnbOpen(header, item){
    item.style.display = 'block';
    let itemHeight = calculateHeight(item);
    let headerHeight = itemHeight + DEFAULT_HEADER_HEIGHT;

    depthItems.forEach(item => {
      item.style.display = 'none';
      item.style.opacity = '0';
    })

    header.animate([
      {height: `${headerHeight}px`}
    ], {
      duration: DURATION,
      fill: 'forwards',
      easing: 'ease-in-out'
    });

    item.style.display = 'block';
    item.animate([
      {opacity: '0'},
      {opacity: '1'},
    ], {
      duration: DURATION,
      fill: 'forwards',
    });
    header.classList.add('open');
  }

  function gnbClose(header, items){
    header.animate([
      {height: `${DEFAULT_HEADER_HEIGHT}px`}
    ], {
      duration: 0,
      fill: 'forwards',
    });
    header.classList.remove('open');
    items.forEach(item => {
      item.style.display = 'none';
      item.style.opacity = '0';
    })
  }

  function calculateHeight(item){
    let height = item.getBoundingClientRect().height;
    return height;
  }
}

// Mobile
function initMobileGnb(mobileGnb){
  let html = document.querySelector('html');
  let sidebarButton = mobileGnb.querySelector('.sidebar-btn');
  let mobileMenuButtons = mobileGnb.querySelectorAll('.depth-1 a');

  sidebarButton.addEventListener('click', (event) => {
    if (mobileGnb.classList.contains('open')) {
      mobileGnbClose(mobileGnb);
    } else {
      mobileGnbOpen(mobileGnb);
    }
  });

  mobileMenuButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const button = event.target.closest('a[class*="depth-"]');
      if (!button) return;
      if (siblings(button).length > 0) event.preventDefault();
      openAccordion(button);
    });
  })

  window.addEventListener('resize', function(){
    if (window.innerWidth > 1024) {
      mobileGnbClose(mobileGnb);
    }
  });

  function mobileGnbOpen(gnb){
    gnb.classList.add('open');
    html.classList.add('not-scroll');
  }

  function mobileGnbClose(gnb){
    gnb.classList.remove('open');
    html.classList.remove('not-scroll');
  }

  // 모바일 메뉴 아코디언
  function openAccordion($this) {
    let target = $this.parentElement;
    let depthTarget = $this.nextElementSibling;
    if (!depthTarget) return;
    let otherLinks = siblings(target);
    let otherItems = otherLinks.map(link => link.querySelector('ul'));

    if (target.classList.contains('depth-1')) closeDepth2(); // 열려있는 2차메뉴 닫기

    if (target.classList.contains('open')){
      target.classList.remove('open');
      depthTarget.style.maxHeight = '0px';
    } else {
      otherLinks.forEach(link => link.classList.remove('open'));
      otherItems.forEach(item => item ? item.style.maxHeight = '0px' : '');
      target.classList.add('open');
      depthTarget.style.maxHeight = depthTarget.scrollHeight + 'px';
      if (depthTarget.classList.contains('gnb-depth-3')) {
        const totalHeight = `${depthTarget.scrollHeight + depthTarget.closest('.gnb-depth-2').scrollHeight}px`;
        depthTarget.closest('.gnb-depth-2').style.maxHeight = totalHeight;
      }
    }
  }
}

function closeDepth2() {
  let OpenedChild = document.querySelectorAll('.depth-2.open');
  if (OpenedChild) {
    OpenedChild.forEach(link => {
      link.classList.remove('open');
      link.querySelector('.gnb-depth-3').style.maxHeight = '0px';
    })
  }
}

function siblings(element) {
  return [...element.parentElement.children].filter(value => value != element);
}