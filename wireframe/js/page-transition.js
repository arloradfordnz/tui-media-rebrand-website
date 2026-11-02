/* The curtain between pages. Every page carries the same curtain as the
   home page ([data-page-loader]):

   - arriving: a page whose curtain is marked data-first-paint starts
     covered and lifts it once loaded (the home page runs its own version
     of this, with the progress bar)
   - leaving: a click on a link to another page on the site drops the
     curtain first, then navigates, so the next page's lift completes it
   - coming back with the back button: the page is restored from memory
     with the curtain down, so it's reset straight away

   Links to the same page (anchors, the booking view), other sites, new
   tabs, downloads and modified clicks are left to the browser. */
(function () {
  'use strict';
  var el = document.querySelector('[data-page-loader]');
  if (!el) return;

  /* ---- arriving */
  if (el.hasAttribute('data-first-paint')) {
    var shown = false;
    var lift = function () {
      if (shown) return;
      shown = true;
      el.classList.add('page-loader--exit');
    };
    var started = Date.now();
    var settle = function () { setTimeout(lift, Math.max(0, 380 - (Date.now() - started))); };
    if (document.readyState === 'complete') settle();
    else window.addEventListener('load', settle, { once: true });
    setTimeout(lift, 4000);   /* never leave a page covered */
    el.addEventListener('animationend', function (e) {
      if (e.target !== el || !el.classList.contains('page-loader--exit')) return;
      el.classList.remove('page-loader--exit');
      el.classList.add('page-loader--idle');
    });
  }

  /* ---- leaving */
  function samePage(url) {
    var strip = function (p) { return p.replace(/index\.html$/, '').replace(/\/$/, '') || '/'; };
    return strip(url.pathname) === strip(location.pathname) && url.search === location.search;
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var url;
    try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
    if (url.origin !== location.origin || samePage(url)) return;
    e.preventDefault();
    if (el.hasAttribute('data-leaving')) return;
    el.setAttribute('data-leaving', '');
    el.classList.remove('page-loader--idle', 'page-loader--exit');
    void el.offsetWidth;   /* restart the animation from the bottom */
    el.classList.add('page-loader--enter');
    var gone = false;
    var go = function () { if (gone) return; gone = true; location.href = url.href; };
    el.addEventListener('animationend', go, { once: true });
    setTimeout(go, 900);
  });

  /* ---- back from the back/forward cache with the curtain still down */
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted || !el.hasAttribute('data-leaving')) return;
    el.removeAttribute('data-leaving');
    el.classList.remove('page-loader--enter', 'page-loader--exit');
    el.classList.add('page-loader--idle');
  });
})();
