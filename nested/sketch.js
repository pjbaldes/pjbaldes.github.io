
new p5(function(p) {

  let b1, b2, b3;

  const TRANSFER = 0.35;
  const MAX_SPEED = 6;

  let bg, c1, c2, c3;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100);
    p.rectMode(p.CORNER);
    p.noStroke();

    bg = { h: 25,  s: 100, b: 100, dh:  0.04, ds:  0.015, db:  0.01  };
    c1 = { h: 320, s: 100, b: 100, dh: -0.05, ds: -0.012, db:  0.008 };
    c2 = { h: 0,   s:   0, b:  62, dh:  0.07, ds:  0.02,  db: -0.013 };
    c3 = { h: 55,  s:  85, b:  96, dh: -0.06, ds: -0.018, db:  0.014 };

    initBoxes();
  };

  function initBoxes() {
    let w1 = p.width * 0.52, h1 = p.height * 0.62;
    b1 = { x: (p.width - w1) / 2, y: (p.height - h1) / 2,
           w: w1, h: h1,
           minW: p.width  * 0.25, maxW: p.width  * 0.75, dw:  0.3,
           minH: p.height * 0.25, maxH: p.height * 0.75, dh: -0.25,
           vx: 0.6, vy: 0.45 };

    let w2 = w1 * 0.52, h2 = h1 * 0.52;
    b2 = { x: b1.x + (b1.w - w2) / 2, y: b1.y + (b1.h - h2) / 2,
           w: w2, h: h2,
           minW: 60, maxW: null, dw: -0.22,   // maxW set dynamically
           minH: 60, maxH: null, dh:  0.18,
           vx: 0.9, vy: 0.7 };

    let w3 = w2 * 0.52, h3 = h2 * 0.52;
    b3 = { x: b2.x + (b2.w - w3) / 2, y: b2.y + (b2.h - h3) / 2,
           w: w3, h: h3,
           minW: 20, maxW: null, dw:  0.28,
           minH: 20, maxH: null, dh: -0.2,
           vx: 1.3, vy: 1.1 };
  }

  function driftColor(c) {
    c.h += c.dh;
    c.s += c.ds;
    c.b += c.db;
    if (c.h > 360) c.h -= 360;
    if (c.h < 0)   c.h += 360;
    if (c.s > 100 || c.s < 0)  { c.ds *= -1; c.s = p.constrain(c.s, 0, 100); }
    if (c.b > 100 || c.b < 20) { c.db *= -1; c.b = p.constrain(c.b, 20, 100); }
  }

  // Drift box size, keeping it within [minW/minH, maxW/maxH].
  // maxW/maxH can be null — caller passes the actual parent dimensions.
  function driftSize(box, parentW, parentH) {
    let maxW = box.maxW !== null ? box.maxW : parentW * 0.85;
    let maxH = box.maxH !== null ? box.maxH : parentH * 0.85;

    box.w += box.dw;
    box.h += box.dh;

    if (box.w > maxW || box.w < box.minW) { box.dw *= -1; box.w = p.constrain(box.w, box.minW, maxW); }
    if (box.h > maxH || box.h < box.minH) { box.dh *= -1; box.h = p.constrain(box.h, box.minH, maxH); }

    // Clamp position so box doesn't escape parent after resize
    box.x = p.constrain(box.x, 0, p.width  - box.w);
    box.y = p.constrain(box.y, 0, p.height - box.h);
  }

  function clampSpeed(box) {
    box.vx = p.constrain(box.vx, -MAX_SPEED, MAX_SPEED);
    box.vy = p.constrain(box.vy, -MAX_SPEED, MAX_SPEED);
  }

  function bounceInParent(child, parent, parentBox) {
    child.x += child.vx;
    child.y += child.vy;

    if (child.x < parent.x) {
      child.x = parent.x;
      if (child.vx < 0) { if (parentBox) parentBox.vx -= child.vx * TRANSFER; child.vx *= -1; }
    }
    if (child.x + child.w > parent.x + parent.w) {
      child.x = parent.x + parent.w - child.w;
      if (child.vx > 0) { if (parentBox) parentBox.vx += child.vx * TRANSFER; child.vx *= -1; }
    }
    if (child.y < parent.y) {
      child.y = parent.y;
      if (child.vy < 0) { if (parentBox) parentBox.vy -= child.vy * TRANSFER; child.vy *= -1; }
    }
    if (child.y + child.h > parent.y + parent.h) {
      child.y = parent.y + parent.h - child.h;
      if (child.vy > 0) { if (parentBox) parentBox.vy += child.vy * TRANSFER; child.vy *= -1; }
    }

    if (parentBox) clampSpeed(parentBox);
    clampSpeed(child);
  }

  function canvasBounds() {
    return { x: 0, y: 0, w: p.width, h: p.height };
  }

  p.draw = function() {
    driftColor(bg);
    driftColor(c1);
    driftColor(c2);
    driftColor(c3);

    // Drift sizes (inner boxes constrained relative to their parent)
    driftSize(b1, p.width, p.height);
    driftSize(b2, b1.w, b1.h);
    driftSize(b3, b2.w, b2.h);

    p.background(bg.h, bg.s, bg.b);

    bounceInParent(b3, b2, b2);
    bounceInParent(b2, b1, b1);
    bounceInParent(b1, canvasBounds(), null);

    p.fill(c1.h, c1.s, c1.b);
    p.rect(b1.x, b1.y, b1.w, b1.h);

    p.fill(c2.h, c2.s, c2.b);
    p.rect(b2.x, b2.y, b2.w, b2.h);

    p.fill(c3.h, c3.s, c3.b);
    p.rect(b3.x, b3.y, b3.w, b3.h);
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    initBoxes();
  };

});