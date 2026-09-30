let currentChapter = { type: 'node', id: 0 };

function updateChapterCheckpoint(nodeId) {
    if (typeof nodeId === 'number') {
        if (nodeId < 7) {
            currentChapter = { type: 'node', id: 0 };
            recordChapterProgress('ch1');
        } else if (nodeId >= 7 && nodeId < 12) {
            currentChapter = { type: 'node', id: 7 };
            recordChapterCompleted('ch1');
            recordChapterProgress('ch2');
        } else if (nodeId >= 12 && nodeId < 17) {
            currentChapter = { type: 'node', id: 12 };
            recordChapterCompleted('ch1');
            recordChapterCompleted('ch2');
            recordChapterCompleted('chase');
            recordChapterProgress('ch3');
        } else if (nodeId >= 17 && nodeId < 22) {
            currentChapter = { type: 'node', id: 17 };
            recordChapterCompleted('ch1');
            recordChapterCompleted('ch2');
            recordChapterCompleted('chase');
            recordChapterCompleted('ch3');
            recordChapterProgress('boss');
        } else if (nodeId >= 22) {
            currentChapter = { type: 'node', id: 22 };
            recordChapterCompleted('ch1');
            recordChapterCompleted('ch2');
            recordChapterCompleted('chase');
            recordChapterCompleted('ch3');
            recordChapterCompleted('boss');
            recordChapterProgress('victory');
        }
    } else if (nodeId === 'maroa_rescue' || nodeId === 'maroa_invite') {
        recordChapterProgress('ch1');
    }
}

function restartCurrentChapter() {
    initSFX();
    const screen = document.getElementById('ending-screen');
    screen.style.opacity = '0';
    screen.style.pointerEvents = 'none';
    document.getElementById('blood-overlay').style.opacity = '0';
    document.body.classList.remove('shake');

    const bg = document.getElementById('background');
    if (bg) bg.style.filter = "brightness(0.85) contrast(1.1)";

    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');

    if (currentChapter.type === 'node') {
        document.getElementById('chase-screen').style.display = 'none';
        document.getElementById('battle-screen').style.display = 'none';
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(currentChapter.id);
    } else if (currentChapter.type === 'chase') {
        startPlatformerChase();
    } else if (currentChapter.type === 'boss') {
        startBossBattle();
    }
}

async function renderNode(nodeId) {
    clearTimeout(typeTimeout);
    
    if (nodeId === 'ending_anderson_bad') {
        handleAndersonBadEnding();
        return;
    }
    if (nodeId === 'ending_sleep') {
        handleSleepEnding();
        return;
    }
    if (nodeId === 'ending_victory') {
        handleVictoryEnding();
        return;
    }
    if (nodeId === 'start_chase') {
        startPlatformerChase();
        return;
    }
    if (nodeId === 'start_boss_battle') {
        startBossBattle();
        return;
    }

    updateChapterCheckpoint(nodeId);

    const node = storyNodes[nodeId];
    if (!node) return;

    updateChapterBadge(node.chapter);

    const bg = document.getElementById('background');
    if (node.bg) {
        bg.style.backgroundImage = `url('${node.bg}')`;
    }

    const charImg = document.getElementById('character');
    charImg.className = '';
    if (node.char) {
        charImg.src = node.char;
        charImg.style.display = 'block';
        charImg.style.opacity = '1';
        if (node.charClass) charImg.classList.add(node.charClass);
    } else {
        charImg.src = '';
        charImg.style.display = 'none';
        charImg.style.opacity = '0';
        charImg.classList.add('hidden');
    }

    const speakerName = document.getElementById('speaker-name');
    speakerName.innerText = node.speaker;
    speakerName.className = (node.speaker === 'Ninja Đạo') ? 'ninja-name' : '';
    const speakerTagElem = document.getElementById('speaker-tag');
    if (node.speaker === 'Người Dẫn Chuyện' || !node.speakerTag) {
        speakerTagElem.innerText = '';
        speakerTagElem.style.display = 'none';
    } else {
        speakerTagElem.innerText = node.speakerTag;
        speakerTagElem.style.display = 'inline-block';
    }

    if (node.bgm && node.bgm !== currentBGMType) {
        playBGM(node.bgm);
    }

    if (node.onEnter) {
        node.onEnter();
    }

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    await typeWriter(node.text, 'dialogue-text');

    node.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        if (choice.primary) btn.classList.add('primary-action');
        if (choice.ninja) btn.classList.add('ninja-action');
        btn.innerText = choice.text;
        btn.onclick = () => {
            initSFX();
            renderNode(choice.next);
        };
        choicesContainer.appendChild(btn);
    });
}

        function handleAndersonBadEnding() {
    document.getElementById('ui-layer').style.display = 'none';
    const charImg = document.getElementById('character');
    charImg.src = '';
    charImg.style.display = 'none';
    charImg.style.opacity = '0';
    charImg.classList.add('hidden');

    playSFX('screech');
    flashScreen();
    triggerShake(1200);
    const bg = document.getElementById('background');
    const blood = document.getElementById('blood-overlay');
    bg.style.backgroundImage = "url('assets/images/backgrounds/meat_bg.webp')";
    blood.style.opacity = '1';

    showEndingScreen(
        "BẠN ĐÃ TRỞ THÀNH BỮA TỐI",
        "Một lựa chọn ngu ngốc... Anderson lao tới xé xác bạn trong màn đêm lạnh lẽo. Bạn đã không thể sống sót để gặp được bất kỳ ai cứu giúp.",
        [
            { text: "Bắt Đầu Lại Đầu Chương", action: restartCurrentChapter },
            { text: "Chơi Lại Từ Đầu", action: startGame }
        ]
    );
}

function handleSleepEnding() {
    document.getElementById('ui-layer').style.display = 'none';
    document.getElementById('character').classList.add('hidden');
    const bg = document.getElementById('background');
    const blood = document.getElementById('blood-overlay');
    
    playSFX('screech');
    flashScreen();
    triggerShake(1000);
    bg.style.backgroundImage = "url('assets/images/backgrounds/meat_bg.webp')";
    bg.style.filter = "brightness(0.85) contrast(1.1)";
    blood.style.opacity = '1';

    showEndingScreen(
        "BẠN ĐÃ TRỞ THÀNH BỮA TỐI",
        "Lưỡi dao phay đồ tể vung xuống xé toạc cổ họng bạn trong bóng tối lạnh lẽo... Tiếng cười man rợ của Maroa vang vọng khi hắn chặt bạn thành từng mảnh và thả vào chiếc vạc nước sôi nghi ngút khói. Bạn đã vĩnh viễn trở thành bữa tối của gã đồ tể.",
        [
            { text: "Bắt Đầu Lại Đầu Chương", action: restartCurrentChapter },
            { text: "Chơi Lại Từ Đầu", action: startGame }
        ]
    );
}

function showEndingScreen(title, description, buttons, isVictory = false) {
    if (!isVictory) {
        playBGM('death');
    }
    const screen = document.getElementById('ending-screen');
    const titleElem = document.getElementById('ending-title');
    const descElem = document.getElementById('ending-description');
    const btnGroup = document.getElementById('ending-buttons');

    titleElem.innerText = title;
    titleElem.style.color = isVictory ? '#00e5ff' : '#ff1111';
    titleElem.style.textShadow = isVictory ? '0 0 25px #00e5ff, 2px 2px 8px #000' : '0 0 25px #ff0000, 2px 2px 8px #000';
    
    descElem.innerText = description;
    btnGroup.innerHTML = '';

    buttons.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'action-button primary';
        btn.innerText = b.text;
        btn.onclick = () => {
            screen.style.opacity = '0';
            screen.style.pointerEvents = 'none';
            b.action();
        };
        btnGroup.appendChild(btn);
    });

    screen.style.opacity = '1';
    screen.style.pointerEvents = 'auto';
}
