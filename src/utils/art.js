function seededRandomFactory(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function pick(rand, list) {
  return list[Math.floor(rand() * list.length)];
}

function drawTempleSilhouette(ctx, width, height, rand) {
  const baseY = height * 0.74;
  const templeX = width * (0.22 + rand() * 0.55);
  const templeW = 160 + rand() * 140;
  const templeH = 130 + rand() * 100;

  ctx.save();
  ctx.translate(templeX, baseY);

  ctx.fillStyle = "rgba(20, 11, 5, 0.88)";
  ctx.fillRect(-templeW / 2, -templeH * 0.62, templeW, templeH * 0.62);

  const steps = 6;
  for (let i = 0; i < steps; i += 1) {
    const stepWidth = templeW * (1 - i * 0.12);
    const stepHeight = templeH * 0.08;
    const y = -templeH * 0.62 - stepHeight * (i + 1);
    ctx.fillRect(-stepWidth / 2, y, stepWidth, stepHeight);
  }

  ctx.beginPath();
  ctx.moveTo(-22, -templeH * 1.1);
  ctx.lineTo(0, -templeH * 1.35);
  ctx.lineTo(22, -templeH * 1.1);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 206, 103, 0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -templeH * 1.35);
  ctx.lineTo(0, -templeH * 1.48);
  ctx.stroke();

  ctx.restore();
}

function drawBannerPattern(ctx, width, height, rand) {
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "rgba(255, 196, 70, 0.65)";
  ctx.lineWidth = 1.4;

  for (let y = height * 0.08; y < height * 0.48; y += 36) {
    ctx.beginPath();
    for (let x = 0; x <= width; x += 30) {
      const offset = Math.sin(x * 0.02 + y * 0.05 + rand() * 4) * 8;
      if (x === 0) {
        ctx.moveTo(x, y + offset);
      } else {
        ctx.lineTo(x, y + offset);
      }
    }
    ctx.stroke();
  }

  ctx.restore();
}

function drawHorseHint(ctx, width, height, rand) {
  const x = width * (0.3 + rand() * 0.4);
  const y = height * (0.76 + rand() * 0.08);

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(255, 228, 170, 0.12)";

  ctx.beginPath();
  ctx.ellipse(0, 0, 70, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(58, -18, 20, 12, -0.3, 0, Math.PI * 2);
  ctx.fill();

  for (let i = -2; i <= 2; i += 2) {
    ctx.fillRect(i * 15 - 8, 8, 6, 25);
  }

  ctx.restore();
}

function drawForegroundParticles(ctx, width, height, rand) {
  for (let i = 0; i < 180; i += 1) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 2.3;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, ${190 + Math.floor(rand() * 55)}, ${70 + Math.floor(rand() * 40)}, ${
      0.08 + rand() * 0.3
    })`;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawDevotionalArt(canvas, seed, title) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rand = seededRandomFactory(seed);
  const width = canvas.width;
  const height = canvas.height;

  const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
  skyGradient.addColorStop(0, pick(rand, ["#2f1204", "#431700", "#5b1f05", "#261108"]));
  skyGradient.addColorStop(0.5, pick(rand, ["#7f2f03", "#9a3c04", "#813100", "#612106"]));
  skyGradient.addColorStop(1, pick(rand, ["#241004", "#1b0c03", "#150902", "#291405"]));

  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 22; i += 1) {
    const x = rand() * width;
    const y = rand() * (height * 0.72);
    const r = 1 + rand() * 4;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, ${180 + Math.floor(rand() * 70)}, ${80 + Math.floor(rand() * 80)}, ${
      0.06 + rand() * 0.24
    })`;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const sunX = width * (0.2 + rand() * 0.6);
  const sunY = height * (0.18 + rand() * 0.16);
  const sunR = 52 + rand() * 48;

  const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 2.6);
  sunGradient.addColorStop(0, "rgba(255,238,163,0.95)");
  sunGradient.addColorStop(0.38, "rgba(255,198,74,0.54)");
  sunGradient.addColorStop(1, "rgba(255,165,34,0)");

  ctx.fillStyle = sunGradient;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 2.6, 0, Math.PI * 2);
  ctx.fill();

  for (let layer = 0; layer < 3; layer += 1) {
    const baseY = height * (0.5 + layer * 0.13 + rand() * 0.05);

    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, baseY);

    for (let x = 0; x <= width; x += 40) {
      const y =
        baseY -
        Math.sin((x / width) * Math.PI * (1.5 + rand() * 2.3) + rand() * 2) *
          (26 + rand() * 52) -
        rand() * 18;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();

    const mountainGradient = ctx.createLinearGradient(0, baseY - 120, 0, height);
    mountainGradient.addColorStop(
      0,
      `rgba(${70 + layer * 15}, ${36 + layer * 13}, ${12 + layer * 9}, 0.88)`
    );
    mountainGradient.addColorStop(
      1,
      `rgba(${20 + layer * 8}, ${10 + layer * 6}, ${5 + layer * 4}, 0.95)`
    );

    ctx.fillStyle = mountainGradient;
    ctx.fill();
  }

  drawTempleSilhouette(ctx, width, height, rand);
  drawBannerPattern(ctx, width, height, rand);

  if (/horse/i.test(title)) {
    drawHorseHint(ctx, width, height, rand);
  }

  drawForegroundParticles(ctx, width, height, rand);

  ctx.fillStyle = "rgba(255,238,206,0.2)";
  ctx.font = "600 16px Cinzel";
  ctx.fillText("Shri Khandoba Divya Darbar", 20, height - 20);
}
