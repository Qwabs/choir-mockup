(function () {
  'use strict';

  var COLORS = [
    { id: 'white', name: 'White', hex: '#F1EADF', inkName: 'Espresso',     ink: '#2A2119' },
    { id: 'green', name: 'Green', hex: '#3B4A39', inkName: 'Warm ecru',    ink: '#F1E5CD' },
    { id: 'blue',  name: 'Blue',  hex: '#2A3650', inkName: 'Antique gold', ink: '#E0AE58' }
  ];

  var heroFront = document.getElementById('hero-front');
  var heroBack = document.getElementById('hero-back');
  var stageMeta = document.getElementById('stage-meta');
  var stage = document.getElementById('stage');
  var shirtPair = document.querySelector('.shirt-pair');
  var viewButtons = Array.prototype.slice.call(document.querySelectorAll('.view-btn'));
  var swatchWrap = document.getElementById('swatches');
  var grid = document.getElementById('colour-grid');
  var current = 'white';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function imagePath(id, view) {
    return 'assets/img/tees/' + id + '-' + view + '.webp';
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function makeSwatches() {
    COLORS.forEach(function (color) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'swatch';
      button.dataset.id = color.id;
      button.style.setProperty('--c', color.hex);
      button.style.setProperty('--inkdot', color.ink);
      button.setAttribute('aria-label', color.name + ' — ' + color.inkName + ' print');
      button.setAttribute('aria-pressed', color.id === current ? 'true' : 'false');
      button.addEventListener('click', function () {
        setColor(color.id);
      });
      swatchWrap.appendChild(button);
    });
  }

  function makeGrid() {
    COLORS.forEach(function (color, index) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'colour-card';
      card.dataset.id = color.id;
      card.style.setProperty('--c', color.hex);
      card.style.setProperty('--inkdot', color.ink);
      card.setAttribute('aria-label', 'Select ' + color.name + ' — ' + color.inkName + ' print');
      card.innerHTML =
        '<span class="card-top">' +
          '<span class="card-name">' + color.name + '</span>' +
          '<span class="card-num">' + pad(index + 1) + '</span>' +
        '</span>' +
        '<span class="card-ink"><i></i>' + color.inkName + '</span>' +
        '<span class="card-pair">' +
          '<img src="' + imagePath(color.id, 'front') + '" width="966" height="1088" decoding="async" alt="' + color.name + ' shirt, front, with the staff mark on the left chest">' +
          '<img src="' + imagePath(color.id, 'back') + '" width="950" height="1088" decoding="async" alt="' + color.name + ' shirt, back, with the Meto Dwom 2nd Edition wordmark">' +
        '</span>' +
        '<span class="card-foot"><span>Front / Back</span><span class="card-select">Select →</span></span>';
      card.addEventListener('click', function () {
        setColor(color.id, true);
      });
      grid.appendChild(card);
    });
  }

  function updateActive() {
    var swatches = swatchWrap.querySelectorAll('.swatch');
    swatches.forEach(function (swatch) {
      var active = swatch.dataset.id === current;
      swatch.classList.toggle('is-active', active);
      swatch.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    grid.querySelectorAll('.colour-card').forEach(function (card) {
      card.classList.toggle('is-active', card.dataset.id === current);
    });
  }

  function setColor(id, scrollToStage) {
    var color = COLORS.filter(function (item) { return item.id === id; })[0];
    if (!color) return;
    var changed = id !== current;
    current = id;

    stageMeta.textContent = color.name + ' — ' + color.inkName;

    if (changed) {
      [heroFront, heroBack].forEach(function (img) {
        img.classList.add('is-swapping');
      });
      heroFront.src = imagePath(color.id, 'front');
      heroBack.src = imagePath(color.id, 'back');
      heroFront.alt = color.name + ' T-shirt, front view, with the Meto Dwom staff mark on the left chest';
      heroBack.alt = color.name + ' T-shirt, back view, with the Meto Dwom 2nd Edition wordmark';

      var loaded = 0;
      function settle() {
        loaded += 1;
        if (loaded >= 2) {
          heroFront.classList.remove('is-swapping');
          heroBack.classList.remove('is-swapping');
        }
      }
      heroFront.onload = settle;
      heroBack.onload = settle;
      window.setTimeout(function () {
        heroFront.classList.remove('is-swapping');
        heroBack.classList.remove('is-swapping');
      }, 420);
    }

    updateActive();

    if (scrollToStage) {
      var top = stage.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }

  function setView(view) {
    if (!shirtPair) return;
    if (view !== 'front' && view !== 'back') return;
    shirtPair.dataset.view = view;
    viewButtons.forEach(function (button) {
      var active = button.dataset.view === view;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function bindViewToggle() {
    viewButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        setView(button.dataset.view);
      });
    });
  }

  function preload() {
    COLORS.forEach(function (color) {
      ['front', 'back'].forEach(function (view) {
        var img = new Image();
        img.src = imagePath(color.id, view);
      });
    });
  }

  function init() {
    if (!heroFront || !heroBack || !stageMeta || !swatchWrap || !grid) return;
    stageMeta.setAttribute('aria-live', 'polite');
    bindViewToggle();
    setView(shirtPair && shirtPair.dataset.view === 'back' ? 'back' : 'front');
    makeSwatches();
    makeGrid();

    var requested = new URLSearchParams(window.location.search).get('colour') ||
                    new URLSearchParams(window.location.search).get('color');
    if (requested && COLORS.some(function (color) { return color.id === requested; })) {
      setColor(requested);
    } else {
      updateActive();
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preload, { timeout: 2400 });
    } else {
      window.setTimeout(preload, 1200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
