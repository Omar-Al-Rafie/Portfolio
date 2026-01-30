(function () {
  'use strict';

  var canvas = document.getElementById('ai-background');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var particleCount = 80;
  var connectionDistance = 140;
  var mouse = { x: null, y: null, radius: 180 };
  var time = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.2 + 0.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02
      });
    }
  }

  function drawParticle(p) {
    var gradient = ctx.createRadialGradient(
      p.x, p.y, 0,
      p.x, p.y, p.radius * 3
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }

  function drawConnection(p1, p2, distance) {
    var strength = 1 - distance / connectionDistance;
    var opacity = strength * 0.25;
    var lineWidth = 0.4 + strength * 0.6;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = 'rgba(139, 92, 246, ' + opacity + ')';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  function animate() {
    time += 0.016;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.96)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.baseX += p.vx;
      p.baseY += p.vy;
      if (p.baseX < 0 || p.baseX > canvas.width) p.vx *= -1;
      if (p.baseY < 0 || p.baseY > canvas.height) p.vy *= -1;

      p.x = p.baseX + Math.sin(time * 0.5 + p.phase) * 12;
      p.y = p.baseY + Math.cos(time * 0.4 + p.phase * 1.2) * 12;

      if (mouse.x !== null && mouse.y !== null) {
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          var force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 8;
          p.y += (dy / dist) * force * 8;
        }
      }

      drawParticle(p);
    }

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var p1 = particles[i];
        var p2 = particles[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectionDistance) {
          drawConnection(p1, p2, distance);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget || e.relatedTarget === document.body) {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
