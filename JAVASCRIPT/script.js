// script.js - small, robust utilities for navigation and animations
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setCurrentYear();
  initActiveNav();
  initScrollObserver();
});

/* NAV */
function initNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navMenu) return;

  const openMenu = () => {
    navMenu.classList.add('show-menu');
    navMenu.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded','true');
    // prevent body scroll when menu open on small screens
    document.documentElement.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    navMenu.classList.remove('show-menu');
    navMenu.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded','false');
    document.documentElement.style.overflow = '';
  };

  if (navToggle) navToggle.addEventListener('click', openMenu);
  if (navClose) navClose.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // small delay so user sees link press on mobile
      closeMenu();
    });
  });

  // close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!navMenu.contains(target) && navToggle && !navToggle.contains(target) && navMenu.classList.contains('show-menu')) {
      closeMenu();
    }
  });
}

/* Active nav link based on pathname */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* Simple scroll-reveal using IntersectionObserver */
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  const targets = document.querySelectorAll('.work-item, .service-card, .process-step, .skill-category, .timeline-item');
  targets.forEach(t => {
    t.classList.add('fade-in');
    observer.observe(t);
  });
}

/* Set footer year(s) */
function setCurrentYear() {
  const year = new Date().getFullYear();
  const els = [document.getElementById('current-year'), document.getElementById('current-year-2'), document.getElementById('current-year-3')];
  els.forEach(el => { if (el) el.textContent = year; });
}

/* Smooth anchor scrolling for internal links (#) */
document.addEventListener('click', function(e){
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  e.preventDefault();
  const id = link.getAttribute('href');
  if (id === '#' || id === '') return;
  const el = document.querySelector(id);
  if (el) {
    const headerOffset = 80;
    const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
});
