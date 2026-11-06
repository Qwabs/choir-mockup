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
  var backButtons = Array.prototype.slice.call(document.querySelectorAll('.back-btn'));
  var swatchWrap = document.getElementById('swatches');
  var studySwatches = document.getElementById('study-swatches');
  var studyColour = document.getElementById('study-colour');
  var studyImgs = Array.prototype.slice.call(document.querySelectorAll('.study-img'));
  var heroBackCaption = document.getElementById('hero-back-caption');
  var grid = document.getElementById('colour-grid');
  var current = 'white';
  var currentBack = 'above';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frontPath(id) {
    return 'assets/img/tees/' + id + '-front.webp';
  }

  function backPath(id, layout) {
    return 'assets/img/tees/' + id + '-back-' + layout + '.webp';
  }

  function colorById(id) {
    return COLORS.filter(function (item) { return item.id === id; })[0];
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function backAlt(color, layout) {
    return color.name + ' T-shirt, back view, with the treble clef ' +
      layout + ' the Meto Dwom wordmark';
  }

  function makeSwatches(container) {
    if (!container) return;
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
      container.appendChild(button);
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
          '<img src="' + frontPath(color.id) + '" width="966" height="1088" decoding="async" alt="' + color.name + ' shirt, front, with the staff mark on the left chest">' +
          '<img class="card-back" src="' + backPath(color.id, currentBack) + '" width="950" height="1088" decoding="async" alt="' + backAlt(color, currentBack) + '">' +
        '</span>' +
        '<span class="card-foot"><span>Front / Back</span><span class="card-select">Select →</span></span>';
      card.addEventListener('click', function () {
        setColor(color.id, true);
      });
      grid.appendChild(card);
    });
  }

  function updateActive() {
    document.querySelectorAll('.swatch').forEach(function (swatch) {
      var active = swatch.dataset.id === current;
      swatch.classList.toggle('is-active', active);
      swatch.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    grid.querySelectorAll('.colour-card').forEach(function (card) {
      card.classList.toggle('is-active', card.dataset.id === current);
    });
  }

  function updateBackImages() {
    var color = colorById(current);

    heroBack.src = backPath(current, currentBack);
    heroBack.alt = backAlt(color, currentBack);

    grid.querySelectorAll('.colour-card').forEach(function (card) {
      var cardColor = colorById(card.dataset.id);
      var img = card.querySelector('.card-back');
      if (!img) return;
      img.src = backPath(cardColor.id, currentBack);
      img.alt = backAlt(cardColor, currentBack);
    });

    studyImgs.forEach(function (img) {
      var layout = img.dataset.study;
      img.src = backPath(current, layout);
      img.alt = backAlt(color, layout);
    });

    if (studyColour) {
      studyColour.textContent = color.name + ' — ' + color.inkName;
    }
    if (heroBackCaption) {
      heroBackCaption.textContent = '· Note ' + currentBack;
    }
  }

  function updateBackButtons() {
    backButtons.forEach(function (button) {
      var active = button.dataset.back === currentBack;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setBackLayout(layout) {
    if (layout !== 'above' && layout !== 'below') return;
    currentBack = layout;
    updateBackButtons();
    if (heroBackCaption) heroBackCaption.textContent = '· Note ' + currentBack;

    heroBack.classList.add('is-swapping');
    updateBackImages();
    heroBack.onload = function () {
      heroBack.classList.remove('is-swapping');
    };
    window.setTimeout(function () {
      heroBack.classList.remove('is-swapping');
    }, 420);
  }

  function setColor(id, scrollToStage) {
    var color = colorById(id);
    if (!color) return;
    var changed = id !== current;
    current = id;

    stageMeta.textContent = color.name + ' — ' + color.inkName;

    if (changed) {
      [heroFront, heroBack].forEach(function (img) {
        img.classList.add('is-swapping');
      });
      heroFront.src = frontPath(color.id);
      heroFront.alt = color.name + ' T-shirt, front view, with the Meto Dwom staff mark on the left chest';
      heroBack.src = backPath(color.id, currentBack);
      heroBack.alt = backAlt(color, currentBack);

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

    updateBackImages();
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
    stage.dataset.view = view;
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
    backButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        setBackLayout(button.dataset.back);
      });
    });
  }

  function preload() {
    COLORS.forEach(function (color) {
      var front = new Image();
      front.src = frontPath(color.id);
      ['above', 'below'].forEach(function (layout) {
        var back = new Image();
        back.src = backPath(color.id, layout);
      });
    });
  }

  function init() {
    if (!heroFront || !heroBack || !stageMeta || !swatchWrap || !grid) return;
    stageMeta.setAttribute('aria-live', 'polite');
    makeSwatches(swatchWrap);
    makeSwatches(studySwatches);
    makeGrid();
    bindViewToggle();
    setView('front');
    updateBackButtons();

    var params = new URLSearchParams(window.location.search);
    var requested = params.get('colour') || params.get('color');
    var requestedView = params.get('view');
    var requestedBack = params.get('back');
    if (requested && colorById(requested)) {
      setColor(requested);
    } else {
      setColor('white');
    }
    if (requestedView === 'back' || requestedView === 'front') {
      setView(requestedView);
    }
    if (requestedBack === 'above' || requestedBack === 'below') {
      setBackLayout(requestedBack);
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
