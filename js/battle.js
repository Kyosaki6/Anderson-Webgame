/* ==============================================================
   FINAL SHOWDOWN: TURN-BASED COMBAT WITH ANDERSON
   ============================================================== */
let battleState = {
    playerHP: 120,
    playerMaxHP: 120,
    playerKi: 100,
    playerMaxKi: 100,
    bossHP: 350,
    bossMaxHP: 350,
    isDodging: false,
    bleedTurns: 0,
    isBossEnraged: false,
    turnInProgress: false,
    bossChargingUltimate: false,
    hasUsedUltimate: false
};

let bossSpeechTimeout = null;
let bossTurnTimeout = null;
let bossVictoryTimeout = null;
function showBossSpeech(speaker, tag, text, duration = 5200) {
    return new Promise(resolve => {
        clearTimeout(bossSpeechTimeout);
        const bubble = document.getElementById('boss-speech-bubble');
        const nameElem = document.getElementById('boss-speech-name');
        const tagElem = document.getElementById('boss-speech-tag');
        const textElem = document.getElementById('boss-speech-text');

        if (!bubble || !nameElem || !textElem) {
            setTimeout(resolve, duration);
            return;
        }

        nameElem.innerText = speaker;
        tagElem.innerText = tag;
        textElem.innerHTML = '';
        bubble.classList.add('active');

        let i = 0;
        const speed = 25;
        function type() {
            if (i < text.length) {
                textElem.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();

        bossSpeechTimeout = setTimeout(() => {
            bubble.classList.remove('active');
            setTimeout(resolve, 300);
        }, duration);
    });
}

function hideBossSpeech() {
    clearTimeout(bossSpeechTimeout);
    const bubble = document.getElementById('boss-speech-bubble');
    if (bubble) bubble.classList.remove('active');
}

async function triggerBossEnragedSequence() {
    battleState.isBossEnraged = true;
    battleState.turnInProgress = true;
    updateBattleHUD();

    flashScreen();
    triggerShake(1200);
    playSFX('anderson_roar');

    const bossSprite = document.getElementById('battle-boss-sprite');
    if (bossSprite) {
        bossSprite.src = 'assets/images/characters/anderson_enraged.png';
        bossSprite.classList.add('enraged');
    }

    const bossNameElem = document.getElementById('boss-name-label');
    if (bossNameElem) {
        bossNameElem.innerText = "Anderson - Hắc Lâm Tàn Sát Giả";
    }
    const statusTag = document.getElementById('boss-status-tag');
    if (statusTag) {
        statusTag.innerText = "CUỒNG NỘ";
        statusTag.style.background = "#ff0000";
        statusTag.style.color = "#fff";
    }

    logBattle("Anderson gầm rú man dại, ma khí cuộn trào xé rách lốt người... Hắn đã biến hình thành ANDERSON - HẮC LÂM TÀN SÁT GIẢ!", "damage");

    await showBossSpeech(
        "Anderson - Hắc Lâm Tàn Sát Giả",
        "CUỒNG NỘ",
        "LŨ SÂU BỌ! Ngươi nghĩ thứ kiếm pháp cỏn con đó có thể hạ được ta sao?! Tế đàn này sẽ ngập tràn huyết nhục của ngươi! HÃY CHỨNG KIẾN BẢN THỂ TÀN SÁT!",
        5600
    );

    battleState.turnInProgress = false;
    updateBattleHUD();
}

async function handlePlayerDefeatSequence() {
    battleState.turnInProgress = true;
    updateBattleHUD();

    triggerShake(800);
    playSFX('anderson_roar');

    const bossName = battleState.isBossEnraged ? "Anderson - Hắc Lâm Tàn Sát Giả" : "Anderson";
    logBattle(`${bossName} cười sằng sặc đắc thắng: 'Xác thịt ngươi sẽ bón cho khu rừng này!'`, "boss-act");

    await showBossSpeech(
        bossName,
        "KẾT LIỄU",
        "Ha ha ha ha! Chỉ có bấy nhiêu thôi sao, đệ tử của Đạo?! Xác thịt ngươi sẽ bón cho cây rừng, và linh hồn ngươi sẽ vĩnh viễn bị chôn vùi trong bóng tối!",
        5400
    );

    handlePlayerDefeat();
}

function startBossBattle() {
    currentChapter = { type: 'boss' };
    recordChapterCompleted('ch1');
    recordChapterCompleted('ch2');
    recordChapterCompleted('chase');
    recordChapterCompleted('ch3');
    recordChapterProgress('boss');
    document.getElementById('ui-layer').style.display = 'none';
    document.getElementById('chase-screen').style.display = 'none';
    document.getElementById('ending-screen').style.opacity = '0';
    document.getElementById('ending-screen').style.pointerEvents = 'none';

    // Hide #character (Ninja Dao / other sprites) completely
    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');

    // Reset blood overlay and effects on battle start / rematch
    document.getElementById('blood-overlay').style.opacity = '0';
    document.body.classList.remove('shake');

    document.getElementById('battle-screen').style.display = 'flex';
    updateChapterBadge("CHƯƠNG KẾT: QUYẾT CHIẾN ANDERSON");
    document.getElementById('background').style.backgroundImage = "url('assets/images/backgrounds/boss_altar.jpg')";
    
    hideBossSpeech();

    // Reset boss appearance & status tag & name
    const bossStatusTag = document.getElementById('boss-status-tag');
    if (bossStatusTag) {
        bossStatusTag.innerText = "Bình Thường";
        bossStatusTag.style.background = "rgba(255, 255, 255, 0.1)";
        bossStatusTag.style.color = "#aaa";
    }
    const bossNameLabel = document.getElementById('boss-name-label');
    if (bossNameLabel) {
        bossNameLabel.innerText = "ANDERSON - ÁC QUỶ ĐẦM LẦY";
    }
    const bossSpriteElem = document.getElementById('battle-boss-sprite');
    if (bossSpriteElem) {
        bossSpriteElem.src = "assets/images/characters/anderson_char.webp";
        bossSpriteElem.classList.remove('enraged');
        bossSpriteElem.style.filter = "drop-shadow(0 0 35px rgba(255, 0, 0, 0.8))";
    }

    playBGM('boss');

    battleState = {
        playerHP: adminGodMode ? 999 : 120,
        playerMaxHP: adminGodMode ? 999 : 120,
        playerKi: 100,
        playerMaxKi: 100,
        bossHP: 350,
        bossMaxHP: 350,
        isDodging: false,
        bleedTurns: 0,
        isBossEnraged: false,
        turnInProgress: false,
        bossChargingUltimate: false,
        hasUsedUltimate: false
    };

    updateBattleHUD();
    logBattle("Anderson gầm lên man dại: 'Tế đàn này sẽ chôn vùi ngươi cùng thanh kiếm gỉ đó!'", "damage");
}

function logBattle(text, type = "normal") {
    const logBox = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerText = text;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
}

function updateBattleHUD() {
    const bossPercent = Math.max(0, (battleState.bossHP / battleState.bossMaxHP) * 100);
    document.getElementById('boss-hp-fill').style.width = bossPercent + '%';
    document.getElementById('boss-hp-text').innerText = `${Math.max(0, battleState.bossHP)} / ${battleState.bossMaxHP} HP`;

    const playerHPPercent = Math.max(0, (battleState.playerHP / battleState.playerMaxHP) * 100);
    document.getElementById('player-hp-fill').style.width = playerHPPercent + '%';
    document.getElementById('player-hp-text').innerText = `${Math.max(0, battleState.playerHP)} / ${battleState.playerMaxHP}`;

    const playerKiPercent = Math.max(0, (battleState.playerKi / battleState.playerMaxKi) * 100);
    document.getElementById('player-ki-fill').style.width = playerKiPercent + '%';
    document.getElementById('player-ki-text').innerText = `${battleState.playerKi} / ${battleState.playerMaxKi}`;

    const canAct = !battleState.turnInProgress && battleState.playerHP > 0 && battleState.bossHP > 0;
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        if (!canAct) {
            skillsGrid.classList.add('turn-locked');
        } else {
            skillsGrid.classList.remove('turn-locked');
        }
    }

    const slashBtn = document.getElementById('skill-slash-btn');
    if (slashBtn) slashBtn.disabled = !canAct;
    document.getElementById('skill-kunai-btn').disabled = !canAct || battleState.playerKi < 20;
    document.getElementById('skill-dodge-btn').disabled = !canAct || battleState.playerKi < 20;
    document.getElementById('skill-dragon-btn').disabled = !canAct || battleState.playerKi < 50;
    document.getElementById('skill-heal-btn').disabled = !canAct || battleState.playerKi < 30;
}

function showDamageNumber(targetElem, text, color = '#ff3333') {
    const rect = targetElem.getBoundingClientRect();
    const dmgElem = document.createElement('div');
    dmgElem.className = 'damage-number';
    dmgElem.style.color = color;
    dmgElem.innerText = text;
    dmgElem.style.left = (rect.left + rect.width / 2 - 25) + 'px';
    dmgElem.style.top = (rect.top + rect.height / 3) + 'px';
    document.body.appendChild(dmgElem);
    setTimeout(() => { dmgElem.remove(); }, 900);
}

async function executePlayerTurn(skillType) {
    if (battleState.turnInProgress || battleState.playerHP <= 0 || battleState.bossHP <= 0) return;
    battleState.turnInProgress = true;
    updateBattleHUD();

    const bossSprite = document.getElementById('battle-boss-sprite');

    if (skillType === 'slash') {
        playSFX('slash');
        const dmg = Math.floor(Math.random() * 7) + 18;
        battleState.bossHP -= dmg;
        battleState.playerKi = Math.min(battleState.playerMaxKi, battleState.playerKi + 25);
        bossSprite.classList.add('boss-hit');
        showDamageNumber(bossSprite, `-${dmg}`, '#ff3333');
        logBattle(`Bạn vung Hắc Long Kiếm chém trúng Anderson, gây ${dmg} sát thương (+25 Ki).`, "damage");
    } else if (skillType === 'kunai') {
        playSFX('kunai');
        battleState.playerKi -= 20;
        const dmg = 25;
        battleState.bossHP -= dmg;
        battleState.bleedTurns = 2;
        bossSprite.classList.add('boss-hit');
        showDamageNumber(bossSprite, `-${dmg} ĐỘC`, '#ff8800');
        logBattle(`Phi Đao Hắc Ám cắm phập vào ngực Anderson. Gây ${dmg} sát thương và làm xuất huyết.`, "damage");
    } else if (skillType === 'dodge') {
        playSFX('dodge');
        battleState.playerKi -= 20;
        battleState.isDodging = true;
        logBattle(`Bạn kích hoạt Thân Pháp Ninja, hòa mình vào bóng tối sẵn sàng phản đòn.`, "dodge");
    } else if (skillType === 'dragon') {
        playSFX('dragon');
        flashScreen();
        triggerShake(600);
        battleState.playerKi -= 50;
        const dmg = Math.floor(Math.random() * 16) + 55;
        battleState.bossHP -= dmg;
        bossSprite.classList.add('boss-hit');
        showDamageNumber(bossSprite, `CRIT -${dmg}`, '#00d2ff');
        logBattle(`BÍ THUẬT LONG HỐNG. Kình lực rồng xanh xuyên thủng lồng ngực Anderson, gây ${dmg} sát thương cực mạnh.`, "heal");
    } else if (skillType === 'heal') {
        playSFX('heal');
        battleState.playerKi -= 30;
        const healAmt = 45;
        battleState.playerHP = Math.min(battleState.playerMaxHP, battleState.playerHP + healAmt);
        showDamageNumber(document.getElementById('player-status-box'), `+${healAmt} HP`, '#55ff77');
        logBattle(`Vận Khí Công Hồi Xuân, kinh mạch lưu thông phục hồi ${healAmt} HP.`, "heal");
    }

    updateBattleHUD();

    setTimeout(() => {
        bossSprite.classList.remove('boss-hit');
    }, 400);

    if (battleState.bossHP <= 0) {
        bossVictoryTimeout = setTimeout(handleBossVictory, 800);
        return;
    }

    if (battleState.bossHP <= 140 && !battleState.isBossEnraged) {
        await triggerBossEnragedSequence();
    }

    bossTurnTimeout = setTimeout(executeBossTurn, 1000);
}

async function executeBossTurn() {
    if (currentChapter.type !== 'boss') return;
    battleState.turnInProgress = true;
    updateBattleHUD();

    if (battleState.bleedTurns > 0) {
        const bleedDmg = 15;
        battleState.bossHP -= bleedDmg;
        logBattle(`Vết thương độc làm Anderson mất thêm ${bleedDmg} máu.`, "damage");
        battleState.bleedTurns--;
        updateBattleHUD();

        if (battleState.bossHP <= 0) {
            handleBossVictory();
            return;
        }

        if (battleState.bossHP <= 140 && !battleState.isBossEnraged) {
            await triggerBossEnragedSequence();
        }
    }

    const bossSprite = document.getElementById('battle-boss-sprite');

    // Ultimate desperate move mechanic (<= 70 HP)
    if (battleState.bossChargingUltimate) {
        // Unleash ultimate attack
        battleState.bossChargingUltimate = false;
        battleState.hasUsedUltimate = true;

        flashScreen();
        triggerShake(900);

        if (battleState.isDodging) {
            playSFX('dodge');
            logBattle("Anderson giáng trọn một kích hủy diệt long trời lở đất! Nhưng bạn đã kịp thời hòa vào hư ảnh của Thân Pháp Ninja, hoàn toàn tránh thoát sát thương!", "dodge");
        } else {
            playSFX('desperation');
            playSFX('hit');
            const ultDmg = 100;
            battleState.playerHP -= ultDmg;
            showDamageNumber(document.getElementById('player-status-box'), `-${ultDmg} CRIT`, '#ff0000');
            logBattle(`Anderson gầm vang: 'HỦY DIỆT ĐI!' - Cực sát chiêu bộc phát cuồng nộ giáng thẳng vào bạn, gây ${ultDmg} sát thương chí mạng!`, "boss-act");
        }
    } else if (battleState.bossHP <= 70 && !battleState.hasUsedUltimate) {
        // Enter charging turn
        battleState.bossChargingUltimate = true;
        battleState.turnInProgress = true;
        updateBattleHUD();

        triggerShake(800);
        playSFX('desperation');
        bossSprite.style.filter = "drop-shadow(0 0 80px #9400d3) contrast(1.7) brightness(1.2)";
        logBattle("Anderson ngửa cổ cười the thé trong điên loạn: 'Ngươi nghĩ dồn được ta vào đường cùng sao?! ĐÃ QUÁ MUỘN ĐỂ CẦU XIN RỒI! HÃY NẾM TRẢI ÁC LINH DIỆT THẾ CỦA TA!'", "boss-act");
        logBattle("Huyết khí và sương đen cuồn cuộn ngưng tụ quanh Anderson... Hắn đang vận tụ một luồng tà khí hủy diệt kinh hoàng!", "damage");

        const bossDisplayName = battleState.isBossEnraged ? "Anderson - Hắc Lâm Tàn Sát Giả" : "Anderson";
        await showBossSpeech(
            bossDisplayName,
            "TỤ KHÍ TUYỆT KỸ",
            "Ngươi nghĩ dồn được ta vào đường cùng sao?! ĐÃ QUÁ MUỘN RỒI! HÃY NẾM TRẢI ÁC LINH DIỆT THẾ! HẮC LÂM NÀY SẼ CHÔN VÙI TẤT CẢ!",
            5400
        );

        battleState.isDodging = false;
        battleState.turnInProgress = false;
        updateBattleHUD();
        return;
    } else {
        const moves = ['rend', 'roar', 'devour'];
        const move = moves[Math.floor(Math.random() * moves.length)];

        triggerShake(400);

        if (move === 'rend') {
            playSFX('rend');
            let dmg = Math.floor(Math.random() * 9) + 20;
            if (battleState.isBossEnraged) dmg = Math.floor(dmg * 1.35);

            if (battleState.isDodging) {
                playSFX('dodge');
                dmg = Math.floor(dmg * 0.4);
                const counterDmg = 22;
                battleState.bossHP -= counterDmg;
                logBattle(`Anderson gầm: 'CHẾT ĐI!' - Bạn lách người né đòn vuốt quỷ, chỉ mất ${dmg} HP và phản kích ${counterDmg} sát thương.`, "dodge");
                showDamageNumber(bossSprite, `-${counterDmg}`, '#00d2ff');

                if (battleState.bossHP <= 0) {
                    handleBossVictory();
                    return;
                }
                if (battleState.bossHP <= 140 && !battleState.isBossEnraged) {
                    await triggerBossEnragedSequence();
                }
            } else {
                playSFX('hit');
                battleState.playerHP -= dmg;
                showDamageNumber(document.getElementById('player-status-box'), `-${dmg}`, '#ff1111');
                logBattle(`Anderson rít lên: 'CÁI ĐẦU NGƯƠI SẼ THUỘC VỀ TA!' - Vuốt quỷ cào xé gây ${dmg} sát thương.`, "boss-act");
            }
        } else if (move === 'roar') {
            playSFX('roar');
            let dmg = 15;
            battleState.playerHP -= dmg;
            battleState.playerKi = Math.max(0, battleState.playerKi - 10);
            showDamageNumber(document.getElementById('player-status-box'), `-${dmg} HP (-10 Ki)`, '#ff5555');
            logBattle(`Anderson gầm rú: 'TIẾNG THÉT CỦA NGƯƠI SẼ NUÔI DƯỠNG BÓNG TỐI!' - Tiếng hét tử thần gây ${dmg} sát thương, giảm 10 Ki.`, "boss-act");
        } else if (move === 'devour') {
            playSFX('bite');
            let dmg = 22;
            if (battleState.isBossEnraged) dmg = Math.floor(dmg * 1.3);

            if (battleState.isDodging) {
                dmg = Math.floor(dmg * 0.4);
                logBattle(`Anderson cười the thé: 'THỊT TƯƠI ĐÂY RỒI!' nhưng bạn đã né được hàm răng sắc nhọn. Chỉ mất ${dmg} HP.`, "dodge");
            } else {
                battleState.playerHP -= dmg;
                battleState.bossHP = Math.min(battleState.bossMaxHP, battleState.bossHP + 8);
                showDamageNumber(document.getElementById('player-status-box'), `-${dmg}`, '#ff1111');
                showDamageNumber(bossSprite, `+8 HP`, '#55ff77');
                logBattle(`Anderson ngoạm ngập răng: 'MÁU THẬT NGỌT NGÀO!' - Gây ${dmg} sát thương và hồi phục 8 HP.`, "boss-act");
            }
        }
    }

    if (adminGodMode) {
        battleState.playerHP = battleState.playerMaxHP;
    }

    battleState.isDodging = false;
    updateBattleHUD();

    if (battleState.playerHP <= 0) {
        await handlePlayerDefeatSequence();
    } else {
        battleState.turnInProgress = false;
        updateBattleHUD();
    }
}

function handlePlayerDefeat() {
    hideBossSpeech();
    document.getElementById('battle-screen').style.display = 'none';
    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');
    flashScreen();
    triggerShake(1200);
    playSFX('screech');
    const bg = document.getElementById('background');
    const blood = document.getElementById('blood-overlay');
    bg.style.backgroundImage = "url('assets/images/backgrounds/meat_bg.webp')";
    blood.style.opacity = '1';

    showEndingScreen(
        "BẠN ĐÃ NGÃ XUỐNG DƯỚI TAY ANDERSON",
        "Mặc dù đã cố gắng hết sức cùng các kỹ năng Ninja bí truyền, sức mạnh quái vật của Anderson vẫn quá áp đảo... Bóng tối nuốt chửng linh hồn bạn tại Tế Đàn Cổ.",
        [
            { text: "Bắt Đầu Lại Đầu Chương", action: restartCurrentChapter },
            { text: "Chơi Lại Từ Đầu", action: startGame }
        ]
    );
}

function handleBossVictory() {
    hideBossSpeech();
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('ui-layer').style.display = 'block';
    flashScreen();
    triggerShake(1200);
    playSFX('slash');
    playBGM('victory');

    renderNode(22);
}

function handleVictoryEnding() {
    recordChapterCompleted('ch1');
    recordChapterCompleted('ch2');
    recordChapterCompleted('chase');
    recordChapterCompleted('ch3');
    recordChapterCompleted('boss');
    recordChapterCompleted('victory');
    document.getElementById('ui-layer').style.display = 'none';
    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');

    flashScreen();
    triggerShake(1200);
    playSFX('heal');

    const bg = document.getElementById('background');
    bg.style.backgroundImage = "url('assets/images/backgrounds/ninja_dojo.jpeg')";

    showEndingScreen(
        "CHIẾN THẮNG HUY HOÀNG",
        "Thanh Hắc Long Kiếm chém đứt xiềng xích của bóng tối. Ác quỷ Anderson đã tan biến vào cõi hư vô trong sự thanh thản và tiếc nuối muộn màng.\n\nNinja Đạo đích thân công nhận bạn là Đại Chiến Binh Bóng Tối mới. Ánh bình minh ấm áp sau bao năm tăm tối đã chiếu rọi khắp khu rừng. Cơn ác mộng đã chính thức khép lại!",
        [
            { text: "Chơi Lại Toàn Bộ Câu Chuyện", action: startGame }
        ],
        true
    );
}
