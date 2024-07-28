/* fireworks.js */
document.addEventListener("DOMContentLoaded", function() {
    window.oncontextmenu = function () { return false; }
  
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var frameRate = 60.0;
    var frameDelay = 1000.0 / frameRate;
  
    var clientWidth = window.innerWidth;
    var clientHeight = window.innerHeight;
    var timer = 0;
    var x = 0;
    var y = 0;
  
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  
    var TimedFirework = 1000;
    var LimiterTicker = 0;
    var fireworks = [];
    var particles = [];
    var typecount = 1;
    var sparks = [];
    var num = 1;
    var colorchanger = 0;
  
    function distance(px1, py1, px2, py2) {
      var xdis = px1 - px2;
      var ydis = py1 - py2;
      return Math.sqrt((xdis * xdis) + (ydis * ydis));
    }
  
    function getAngle(posx1, posy1, posx2, posy2) {
      if (posx1 == posx2) {
        return (posy1 > posy2) ? 90 : 270;
      }
      if (posy1 == posy2) {
        return (posx1 > posx2) ? 0 : 180;
      }
  
      var xDist = posx1 - posx2;
      var yDist = posy1 - posy2;
  
      if (xDist == yDist) {
        return (posx1 < posx2) ? 225 : 45;
      }
      if (-xDist == yDist) {
        return (posx1 < posx2) ? 135 : 315;
      }
  
      return (posx1 < posx2) ? Math.atan2(posy2 - posy1, posx2 - posx1) * (180 / Math.PI) + 180 : Math.atan2(posy2 - posy1, posx2 - posx1) * (180 / Math.PI) + 180;
    }
  
    function random(min, max, round) {
      return (round == 'round') ? Math.round(Math.random() * (max - min) + min) : Math.random() * (max - min) + min;
    }
  
    function colors() {
      if (timer > colorchanger) {
        num = random(0, 7, 'round');
        colorchanger = timer + 500;
      }
      switch (num) {
        case 1: return '#ff0000';
        case 2: return '#ffff00';
        case 3: return '#00ff00';
        case 4: return '#00ffff';
        case 5: return '#0000ff';
        case 6: return '#ff00ff';
        case 7: return '#ffac00';
      }
    }
  
    function createFirework() {
      var firework = new Firework();
  
      firework.x = firework.sx = clientWidth / 2;
      firework.y = firework.sy = clientHeight;
  
      firework.color = colors();
  
      if (x != 0 && y != 0) {
        firework.tx = x;
        firework.ty = y;
        x = y = 0;
      } else {
        firework.tx = random(400, clientWidth - 400);
        firework.ty = random(0, clientHeight / 2);
      }
  
      var angle = getAngle(firework.sx, firework.sy, firework.tx, firework.ty);
  
      firework.vx = Math.cos(angle * Math.PI / 180.0);
      firework.vy = Math.sin(angle * Math.PI / 180.0);
  
      fireworks.push(firework);
    }
  
    function Firework() {
      this.x = 0;
      this.y = 0;
      this.sx = 0;
      this.sy = 0;
      this.tx = 0;
      this.ty = 0;
      this.vx = 0;
      this.vy = 0;
      this.color = 'rgb(255,255,255)';
      this.dis = distance(this.sx, this.sy, this.tx, this.ty);
      this.speed = random(700, 1100);
      this.gravity = 1.5;
      this.ms = 0;
      this.s = 0;
      this.del = false;
  
      this.update = function(ms) {
        this.ms = ms / 1000;
  
        if (this.s > 2000 / ms) {
          createParticles(typecount, 50, this.x, this.y, this.color);
          this.del = true;
        } else {
          this.speed *= 0.98;
          this.x -= this.vx * this.speed * this.ms;
          this.y -= this.vy * this.speed * this.ms - this.gravity;
        }
  
        this.s++;
      }
  
      this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  
    function createParticles(type, count, pox, poy, color) {
      for (var i = 0; i < count; i++) {
        var par = new Particles();
        par.type = type;
  
        par.color = color;
        par.x = pox;
        par.y = poy;
  
        var angle = random(0, 360);
        par.vx = Math.cos(angle * Math.PI / 180.0);
        par.vy = Math.sin(angle * Math.PI / 180.0);
  
        particles.push(par);
      }
    }
  
    function Particles() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.speed = random(200, 500);
      this.gravity = 1;
      this.wind = 0;
      this.type = 1;
      this.opacity = 1;
      this.s = 0;
      this.scale = 1;
      this.color = '#FFF';
      this.del = false;
  
      this.update = function(ms) {
        this.ms = ms / 1000;
  
        if (this.s > 900 / ms) {
          this.opacity = Math.max(0, this.opacity - 0.05);
        }
  
        if (this.type == 1) {
          this.speed *= 0.96;
          this.x -= this.vx * this.speed * this.ms + this.wind;
          this.y -= this.vy * this.speed * this.ms - this.gravity;
        } else if (this.type == 2) {
          if (this.s < 800 / ms) {
            this.scale += 0.1;
          } else {
            this.scale -= 0.2;
          }
          this.speed *= 0.96;
          this.x -= this.vx * this.speed * this.ms + this.wind;
          this.y -= this.vy * this.speed * this.ms - this.gravity;
        } else if (this.type == 3) {
          this.speed *= 0.95;
          this.x -= this.vx * this.speed * this.ms + this.wind;
          this.y -= this.vy * this.speed * this.ms;
        } else if (this.type == 4) {
          this.speed *= 0.96;
          this.x -= this.vx * this.speed * this.ms + this.wind;
          this.y -= this.vy * this.speed * this.ms - this.gravity;
  
          var spark = new Sparkler();
          spark.x = this.x;
          spark.y = this.y;
          spark.vx = Math.cos(random(0, 360, 'round') * (Math.PI / 180)) * 1.05;
          spark.vy = Math.sin(random(0, 360, 'round') * (Math.PI / 180)) * 1.05;
          spark.tx = this.x;
          spark.ty = this.y;
          spark.color = this.color;
          spark.limit = random(4, 10, 'round');
          sparks.push(spark);
        }
  
        if (this.opacity <= 0 || this.scale <= 0) {
          this.del = true;
        }
  
        this.s++;
      }
  
      this.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
  
        if (this.type == 1) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        } else if (this.type == 2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.scale, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (this.type == 3) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (this.type == 4) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
  
        ctx.restore();
      }
    }
  
    function Sparkler() {
      this.x = 0;
      this.y = 0;
      this.tx = 0;
      this.ty = 0;
      this.vx = 0;
      this.vy = 0;
      this.s = 0;
      this.color = 'rgb(255,255,255)';
      this.limit = 10;
      this.del = false;
  
      this.update = function(ms) {
        this.tx -= this.vx * (ms / 20);
        this.ty -= this.vy * (ms / 20);
  
        if (this.s > this.limit) {
          this.del = true;
        }
  
        this.s++;
      }
  
      this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.tx, this.ty, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  
    function update() {
      var dt = frameDelay;
      timer += dt;
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      if (timer > LimiterTicker) {
        createFirework();
        LimiterTicker = timer + TimedFirework;
      }
  
      for (var i = fireworks.length - 1; i >= 0; i--) {
        var f = fireworks[i];
  
        f.update(dt);
        f.draw();
  
        if (f.del) {
          fireworks.splice(i, 1);
        }
      }
  
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
  
        p.update(dt);
        p.draw();
  
        if (p.del) {
          particles.splice(i, 1);
        }
      }
  
      for (var i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i];
  
        s.update(dt);
        s.draw();
  
        if (s.del) {
          sparks.splice(i, 1);
        }
      }
    }
  
    setInterval(update, frameDelay);
  });
  