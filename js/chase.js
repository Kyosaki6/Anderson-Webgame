/* ==============================================================
   CHASE MINI-GAME (3-LANE RUNNER WITH BEAR TRAP & TREE)
   ============================================================== */
let chaseRunning = false;
let chaseAnimId = null;
let chasePlayerLane = 1; // 0: Left, 1: Center, 2: Right
let chasePlayerY = 0; // jump offset
let chasePlayerJumping = false;
let chaseJumpVelocity = 0;
let chaseDistance = 100; // meters to escape
let chaseMaroaDist = 25; // meters behind
let chaseObstacles = [];
let chaseLastSpawn = 0;
let chaseSpeed = 1.0;

// Image assets for chase
const bearTrapImg = new Image();
bearTrapImg.src = 'assets/images/hazards/bear_trap.png';
const treeImg = new Image();
treeImg.src = 'assets/images/hazards/tree.png';

function startPlatformerChase() {
    currentChapter = { type: 'chase' };
    recordChapterCompleted('ch1');
    recordChapterCompleted('ch2');
    recordChapterProgress('chase');
    document.getElementById('ui-layer').style.display = 'none';
    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');

    document.getElementById('chase-screen').style.display = 'flex';
    updateChapterBadge("MÀN RƯỢT ĐUỔI: TRỐN CHẠY ĐỒ TỂ MAROA");
    
    // Background is darkforest_bg.jpg as requested
    document.getElementById('background').style.backgroundImage = "url('assets/images/backgrounds/darkforest_bg.jpg')";
    document.getElementById('blood-overlay').style.opacity = '0';
    document.body.classList.remove('shake');

    playBGM('chase');

    // Reset state
    chaseRunning = true;
    chasePlayerLane = 1;
    chasePlayerY = 0;
    chasePlayerJumping = false;
    chaseJumpVelocity = 0;
    chaseDistance = 100;
    chaseMaroaDist = 25;
    chaseObstacles = [];
    chaseLastSpawn = Date.now();
    chaseSpeed = 1.0;

    initChaseCanvas();
    bindChaseControls();
    chaseLoop();
}

function initChaseCanvas() {
    const canvas = document.getElementById('chase-canvas');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

window.addEventListener('resize', () => {
    if (chaseRunning) initChaseCanvas();
});

function bindChaseControls() {
    const leftBtn = document.getElementById('chase-left-btn');
    const rightBtn = document.getElementById('chase-right-btn');
    const jumpBtn = document.getElementById('chase-jump-btn');

    leftBtn.ontouchstart = (e) => { e.preventDefault(); chaseMoveLeft(); };
    leftBtn.onclick = () => chaseMoveLeft();

    rightBtn.ontouchstart = (e) => { e.preventDefault(); chaseMoveRight(); };
    rightBtn.onclick = () => chaseMoveRight();

    jumpBtn.ontouchstart = (e) => { e.preventDefault(); chaseJump(); };
    jumpBtn.onclick = () => chaseJump();

    window.onkeydown = (e) => {
        if (!chaseRunning) return;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            chaseMoveLeft();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            chaseMoveRight();
        } else if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') {
            chaseJump();
        }
    };
}

function chaseMoveLeft() {
    if (chasePlayerLane > 0) {
        chasePlayerLane--;
        playSFX('dodge');
    }
}

function chaseMoveRight() {
    if (chasePlayerLane < 2) {
        chasePlayerLane++;
        playSFX('dodge');
    }
}

function chaseJump() {
    if (!chasePlayerJumping) {
        chasePlayerJumping = true;
        chaseJumpVelocity = 14;
        playSFX('jump');
    }
}

function chaseLoop() {
    if (!chaseRunning) return;

    const canvas = document.getElementById('chase-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Distance progression
    chaseDistance -= 0.13 * chaseSpeed;
    if (chaseDistance <= 0) chaseDistance = 0;

    // Maroa pressure
    chaseMaroaDist -= 0.015;

    // Jump physics
    if (chasePlayerJumping) {
        chasePlayerY += chaseJumpVelocity;
        chaseJumpVelocity -= 0.9;
        if (chasePlayerY <= 0) {
            chasePlayerY = 0;
            chasePlayerJumping = false;
        }
    }

    // Track geometry
    const horizonY = height * 0.36;
    const bottomY = height * 0.88;
    const laneBottomWidth = Math.min(width * 0.28, 140);
    const centerBottomX = width / 2;

    // Spawn obstacles (bear_trap and tree)
    const now = Date.now();
    if (now - chaseLastSpawn > 1150 && chaseDistance > 8) {
        const lane = Math.floor(Math.random() * 3);
        const type = Math.random() < 0.5 ? 'tree' : 'bear_trap';
        chaseObstacles.push({
            lane: lane,
            y: 0,
            type: type,
            speed: 6.2
        });
        chaseLastSpawn = now;
    }

    // Draw Perspective Track Guide Lines
    ctx.save();
    ctx.strokeStyle = "rgba(180, 50, 50, 0.4)";
    ctx.lineWidth = 3;
    for (let i = -1.5; i <= 1.5; i += 1.0) {
        ctx.beginPath();
        ctx.moveTo(width / 2 + i * 35, horizonY);
        ctx.lineTo(centerBottomX + i * laneBottomWidth, bottomY);
        ctx.stroke();
    }
    ctx.restore();

    // Draw Obstacles (with sprites)
    for (let i = chaseObstacles.length - 1; i >= 0; i--) {
        const obs = chaseObstacles[i];
        obs.y += obs.speed;
        const progress = obs.y / (bottomY - horizonY);

        if (progress >= 0 && progress <= 1.1) {
            const currentY = horizonY + obs.y;
            const laneSpread = 35 + (laneBottomWidth - 35) * progress;
            const laneOffset = (obs.lane - 1);
            const currentX = (width / 2) + laneOffset * laneSpread;

            ctx.save();
            if (obs.type === 'tree') {
                // Tree obstacle
                const w = 25 + progress * 75;
                const h = w * (1083 / 600) * 0.9;
                if (treeImg.complete && treeImg.naturalWidth !== 0) {
                    ctx.drawImage(treeImg, currentX - w / 2, currentY - h + 15, w, h);
                } else {
                    ctx.fillStyle = "#5c3a21";
                    ctx.fillRect(currentX - w * 0.5, currentY - 20, w, 20);
                }
            } else {
                // Bear trap obstacle
                const w = 30 + progress * 65;
                const h = w * (572 / 860);
                if (bearTrapImg.complete && bearTrapImg.naturalWidth !== 0) {
                    ctx.drawImage(bearTrapImg, currentX - w / 2, currentY - h / 2, w, h);
                } else {
                    ctx.fillStyle = "#8a0303";
                    ctx.beginPath();
                    ctx.arc(currentX, currentY, w * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();

            // Collision check
            if (progress > 0.85 && progress < 1.02) {
                if (obs.lane === chasePlayerLane) {
                    // Tree can be jumped
                    if (obs.type === 'tree' && chasePlayerY > 28) {
                        // Jumped safely over tree!
                    } else if (obs.type === 'bear_trap' && chasePlayerY > 35) {
                        // Jumped safely over bear trap!
                    } else {
                        // Hit obstacle!
                        chaseObstacles.splice(i, 1);
                        handleChaseHit();
                        continue;
                    }
                }
            }
        }

        if (obs.y > (bottomY - horizonY) * 1.2) {
            chaseObstacles.splice(i, 1);
        }
    }

    // Draw Player Runner Silhouette
    const playerLaneOffset = (chasePlayerLane - 1);
    const playerX = centerBottomX + playerLaneOffset * laneBottomWidth;
    const playerY = bottomY - 20 - chasePlayerY;

    ctx.save();
    ctx.shadowColor = "#00d2ff";
    ctx.shadowBlur = 20;

    // Player body
    ctx.fillStyle = "#00d2ff";
    ctx.beginPath();
    ctx.arc(playerX, playerY - 35, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = "#00d2ff";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(playerX, playerY - 22);
    ctx.lineTo(playerX, playerY + 8);
    ctx.stroke();

    const legSwing = Math.sin(Date.now() * 0.02) * 15;
    ctx.beginPath();
    ctx.moveTo(playerX, playerY + 8);
    ctx.lineTo(playerX - 10 + (chasePlayerJumping ? -10 : legSwing), playerY + 30);
    ctx.moveTo(playerX, playerY + 8);
    ctx.lineTo(playerX + 10 - (chasePlayerJumping ? -10 : legSwing), playerY + 30);
    ctx.stroke();
    ctx.restore();

    // Menacing Maroa red eyes / aura behind when near
    if (chaseMaroaDist < 20) {
        const maroaOpacity = (20 - chaseMaroaDist) / 20;
        ctx.save();
        ctx.fillStyle = `rgba(180, 0, 0, ${maroaOpacity * 0.35})`;
        ctx.fillRect(0, 0, width, height);

        const eyePulse = Math.sin(Date.now() * 0.015);
        ctx.fillStyle = "#ff0000";
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(width / 2 - 40, height * 0.28, 6 + eyePulse * 2, 0, Math.PI * 2);
        ctx.arc(width / 2 + 40, height * 0.28, 6 + eyePulse * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Update HUD
    const distPercent = Math.max(0, Math.min(100, 100 - chaseDistance));
    document.getElementById('distance-fill').style.width = distPercent + '%';
    document.getElementById('distance-text').innerText = Math.round(chaseDistance) + 'm';

    const dangerPercent = Math.max(0, Math.min(100, (30 - chaseMaroaDist) / 30 * 100));
    document.getElementById('danger-fill').style.width = dangerPercent + '%';
    document.getElementById('danger-text').innerText = Math.max(0, Math.round(chaseMaroaDist)) + 'm';

    // Win Condition
    if (chaseDistance <= 0) {
        chaseRunning = false;
        cancelAnimationFrame(chaseAnimId);
        handleChaseSuccess();
        return;
    }

    // Lose Condition
    if (chaseMaroaDist <= 0) {
        chaseRunning = false;
        cancelAnimationFrame(chaseAnimId);
        handleChaseCaught("Maroa đã đuổi kịp bạn và vung con dao phay kinh hoàng!");
        return;
    }

    chaseAnimId = requestAnimationFrame(chaseLoop);
}

function handleChaseHit() {
    chaseMaroaDist -= 6;
    flashScreen();
    triggerShake(400);
    playSFX('hit');
}

function handleChaseCaught(reason) {
    chaseRunning = false;
    cancelAnimationFrame(chaseAnimId);

    document.getElementById('chase-screen').style.display = 'none';
    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');

    flashScreen();
    triggerShake(1000);
    playSFX('screech');

    const bg = document.getElementById('background');
    const blood = document.getElementById('blood-overlay');
    bg.style.backgroundImage = "url('assets/images/backgrounds/meat_bg.webp')";
    blood.style.opacity = '1';

    showEndingScreen(
        "BỊ MAROA BẮT ĐƯỢC!",
        reason || "Bước chân chậm trễ khiến bạn bị gã đồ tể tóm gọn. Lưỡi dao phay cắm phập xuống lưng bạn giữa đêm lạnh giá.",
        [
            { text: "Bắt Đầu Lại Đầu Chương", action: restartCurrentChapter },
            { text: "Chơi Lại Từ Đầu", action: startGame }
        ]
    );
}

function handleChaseSuccess() {
    chaseRunning = false;
    cancelAnimationFrame(chaseAnimId);

    document.getElementById('chase-screen').style.display = 'none';
    playSFX('dodge');
    flashScreen();
    triggerShake(600);

    document.getElementById('ui-layer').style.display = 'block';
    renderNode(12);
}
