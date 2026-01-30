(function () {
  'use strict';

  var canvas = document.getElementById('hero-card-canvas');
  var card = canvas && canvas.closest('.hero-card');
  if (!canvas || !card) return;

  var ctx = canvas.getContext('2d');
  var rockets = [];
  var time = 0;

  function resize() {
    var rect = card.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    if (rockets.length === 0) {
      rockets = [
        { x: rect.width * 0.15, y: rect.height * 0.7, speed: 0.15, size: 8, phase: 0 },
        { x: rect.width * 0.5, y: rect.height * 0.85, speed: 0.1, size: 6, phase: 1.5 },
        { x: rect.width * 0.75, y: rect.height * 0.6, speed: 0.12, size: 7, phase: 3 }
      ];
    }
  }

  function drawRocket(r, w, h) {
    r.y -= r.speed;
    if (r.y < -20) {
      r.y = h + 10;
      r.x = (Math.random() * 0.6 + 0.2) * w;
    }

    var sx = r.size;
    var sy = r.size * 1.4;
    var flameH = sy * 0.7 + Math.sin(time * 8 + r.phase) * 3;

    ctx.save();
    ctx.translate(r.x, r.y);

    var flameGrad = ctx.createLinearGradient(0, sy, 0, sy + flameH);
    flameGrad.addColorStop(0, 'rgba(139, 92, 246, 0.9)');
    flameGrad.addColorStop(0.5, 'rgba(167, 139, 250, 0.5)');
    flameGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
    ctx.beginPath();
    ctx.moveTo(-sx * 0.4, sy);
    ctx.lineTo(0, sy + flameH);
    ctx.lineTo(sx * 0.4, sy);
    ctx.closePath();
    ctx.fillStyle = flameGrad;
    ctx.fill();

    ctx.fillStyle = 'rgba(200, 200, 220, 0.95)';
    ctx.beginPath();
    ctx.moveTo(0, -sy);
    ctx.lineTo(sx, sy);
    ctx.lineTo(0, sy * 0.7);
    ctx.lineTo(-sx, sy);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  function animate() {
    time += 0.016;
    var rect = card.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;
    if (w === 0 || h === 0) {
      requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, w, h);

    rockets.forEach(function (r) { drawRocket(r, w, h); });

    requestAnimationFrame(animate);
  }

  var ro = new ResizeObserver(function () {
    resize();
  });
  ro.observe(card);
  window.addEventListener('resize', resize);
  resize();
  animate();
})();
