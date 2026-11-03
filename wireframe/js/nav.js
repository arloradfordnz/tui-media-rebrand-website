/* The menu on phones and tablets. Every page shares this file.

   Above 960px the four page links sit in the middle of the nav pill. Below
   that they used to be hidden outright, which was fine when the site was
   one long page, but with separate pages for monthly content, video ads,
   case studies and about it left phones (where most visitors are) with no
   way between them except the footer. So below 960px a round menu button
   sits beside "Book a free call", and opens the same links as a panel
   under the pill. The booking button stays the most visible thing in the
   bar.

   The button and its styles are both added here, so a page without script
   simply keeps the old behaviour (the links hidden, the footer to fall
   back on) and nothing is left half-built. The links themselves are the
   ones already in each page's nav, current page and all, so there is still
   one list to keep up to date per page.

   Closes on Escape (focus goes back to the button), a tap outside, choosing
   a link, or the screen widening past 960px. */
(function () {
  'use strict';
  var nav = document.querySelector('.nav');
  var links = nav && nav.querySelector('.nav-links');
  if (!links) return;

  var css = ''
    + '.nav-menu{display:none}'
    + '@media (max-width:960px){'
    +   '.nav-menu{display:grid;place-items:center;flex:none;width:44px;height:44px;margin:0 0 0 auto;padding:0;'
    +     'border:2px solid var(--hairline,rgba(239,242,248,.22));border-radius:50%;background:transparent;color:var(--ink);'
    +     'cursor:pointer;-webkit-tap-highlight-color:transparent;transition:border-color 160ms ease,background-color 160ms ease}'
    +   '.nav.is-open .nav-links a.btn{justify-content:center;min-height:48px;height:48px;margin:6px 0 0;padding:0 1.3rem;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:1rem;font-weight:600}'
    +   '.nav.is-open .nav-links a.btn:hover{background:transparent;color:var(--ink)}'
    +   '.nav-menu i{position:relative;display:block;width:16px;height:10px}'
    +   '.nav-menu i::before,.nav-menu i::after{content:"";position:absolute;left:0;right:0;height:2px;border-radius:2px;background:currentColor;'
    +     'transition:transform 220ms var(--ease-out,ease),top 220ms var(--ease-out,ease)}'
    +   '.nav-menu i::before{top:0}.nav-menu i::after{top:8px}'
    +   '.nav.is-open .nav-menu{border-color:var(--accent);color:var(--accent)}'
    +   '.nav.is-open .nav-menu i::before{top:4px;transform:rotate(45deg)}'
    +   '.nav.is-open .nav-menu i::after{top:4px;transform:rotate(-45deg)}'
    +   '.nav.is-open .nav-links{display:flex;flex-direction:column;gap:2px;position:absolute;z-index:60;'
    +     'top:calc(100% + 8px);left:0;right:0;transform:none;margin:0;padding:8px;'
    +     'border-radius:24px;background:var(--surface);box-shadow:0 18px 40px -12px rgba(0,0,0,.6);'
    +     'font-size:1.0625rem;font-weight:500;animation:navMenuIn 180ms var(--ease-out,ease)}'
    +   '.nav.is-open .nav-links a{display:flex;align-items:center;min-height:48px;padding:0 18px;border-radius:16px;color:var(--ink)}'
    +   '.nav.is-open .nav-links a[aria-current="page"]{background:var(--paper);color:var(--accent)}'
    +   '.nav.is-open .nav-links .nav-label>span:nth-child(2){display:none}'
    + '}'
    + '@keyframes navMenuIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'
    + '@media (prefers-reduced-motion:reduce){.nav.is-open .nav-links{animation:none}}'
    + '.nav-menu:focus-visible{outline:2px solid var(--accent);outline-offset:3px}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  if (!links.id) links.id = 'site-menu';
  if (!links.hasAttribute('aria-label')) links.setAttribute('aria-label', 'Pages');

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-menu';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', links.id);
  btn.innerHTML = '<i aria-hidden="true"></i>';
  /* before the links in the page's order, so a keyboard user who opens the
     menu tabs straight into it; it shows beside the booking button because
     the links themselves sit outside the flow of the bar */
  nav.insertBefore(btn, links);

  function set(open, refocus) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    if (!open && refocus) btn.focus();
  }

  btn.addEventListener('click', function () { set(!nav.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) set(false, true);
  });
  document.addEventListener('pointerdown', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) set(false);
  });
  /* The booking button leaves the bar on phones and tablets and lives only in
     the menu panel; the bar is then just the mark and the menu button. It is
     the same element, moved rather than copied, so the home page's script
     still turns it into "Back to site" on the form. On a wide screen it goes
     back to the end of the bar. Without this script it never moves. */
  var cta = nav.querySelector(':scope > .btn');
  function placeCta() {
    if (!cta) return;
    if (wide.matches) { if (cta.parentNode !== nav) nav.appendChild(cta); }
    else if (cta.parentNode !== links) links.appendChild(cta);
  }
  var wide = window.matchMedia('(min-width: 961px)');
  placeCta();
  var onWide = function () { placeCta(); if (wide.matches) set(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide);
  else if (wide.addListener) wide.addListener(onWide);
  /* back from another page through the back/forward cache: closed */
  window.addEventListener('pageshow', function (e) { if (e.persisted) set(false); });
})();
