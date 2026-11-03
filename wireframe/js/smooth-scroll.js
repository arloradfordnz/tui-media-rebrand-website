/* Smooth, inertial scrolling for every page, the same feel as sites like
   adambonemedia.com. Lenis (js/lenis.min.js, self-hosted, MIT) takes the
   mouse wheel and trackpad and eases the page toward where they point.

   What it deliberately leaves alone:
   - touch: phones and tablets keep their own native momentum scrolling,
     which is already smooth and which Lenis can only make worse
   - reduced motion: people who ask their system for less motion get the
     browser's ordinary scrolling
   - the keyboard, find-in-page and anchor jumps still work: Lenis sets the
     real scroll position, it doesn't replace it
   - scrollable boxes inside the page (the booking form's dropdown lists):
     marked data-lenis-prevent so they scroll themselves

   window.__lenis is the instance, so a page's own scripts can jump somewhere
   through it (lenis.scrollTo) instead of fighting it with window.scrollTo.
   Remove the two <script> tags, or this file, to switch it off. */
(function () {
  'use strict';
  if (typeof Lenis === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var lenis = new Lenis({
    duration: 1.2,
    /* ease-out expo: quick off the mark, long soft landing */
    easing: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: false,
    autoRaf: true
  });
  window.__lenis = lenis;

  /* a page that hides everything it was showing (the booking view swap)
     should be able to pause it: lenis.stop() / lenis.start() */
})();
