function startGame() {
    initSFX();

    currentChapter = { type: 'node', id: 0 };
    document.getElementById('ending-screen').style.opacity = '0';
    document.getElementById('ending-screen').style.pointerEvents = 'none';
    document.getElementById('chase-screen').style.display = 'none';
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('ui-layer').style.display = 'block';
    document.getElementById('blood-overlay').style.opacity = '0';
    document.body.classList.remove('shake');

    const bg = document.getElementById('background');
    bg.style.backgroundImage = "url('assets/images/backgrounds/darkforest_bg.jpg')";
    const charImg = document.getElementById('character');
    charImg.style.opacity = '1';
    charImg.classList.remove('hidden');

    renderNode(0);
}

let adminKeySequence = '';
let adminGodMode = false;

function toggleAdminConsole(forceState) {
    initSFX();
    const modal = document.getElementById('admin-console');
    const overlay = document.getElementById('admin-overlay');
    if (!modal || !overlay) return;
    const isActive = modal.classList.contains('active');
    const targetState = (typeof forceState === 'boolean') ? forceState : !isActive;

    if (targetState) {
        modal.classList.add('active');
        overlay.classList.add('active');
    } else {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function jumpToChapter(chapterKey) {
    initSFX();

    if (chaseRunning) {
        chaseRunning = false;
        if (chaseAnimId) cancelAnimationFrame(chaseAnimId);
    }
    hideBossSpeech();
    clearTimeout(bossSpeechTimeout);
    clearTimeout(bossTurnTimeout);
    clearTimeout(bossVictoryTimeout);
    bossTurnTimeout = null;
    bossVictoryTimeout = null;
    clearTimeout(typeTimeout);

    document.getElementById('ending-screen').style.opacity = '0';
    document.getElementById('ending-screen').style.pointerEvents = 'none';
    document.getElementById('chase-screen').style.display = 'none';
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('blood-overlay').style.opacity = '0';
    document.body.classList.remove('shake');

    const charImg = document.getElementById('character');
    charImg.classList.remove('hidden');

    if (chapterKey === 'ch1_start') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(0);
        showGameToast("⚔ Chuyển đến: Chương 1 - Khởi Đầu");
    } else if (chapterKey === 'ch1_maroa') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode('maroa_rescue');
        showGameToast("⚔ Chuyển đến: Chương 1 - Thoát Nạn & Maroa");
    } else if (chapterKey === 'ch2_house') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(7);
        showGameToast("⚔ Chuyển đến: Chương 2 - Nhà Của Maroa");
    } else if (chapterKey === 'ch2_angry') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(11);
        showGameToast("⚔ Chuyển đến: Chương 2 - Chân Tướng Đồ Tể");
    } else if (chapterKey === 'chase') {
        startPlatformerChase();
        showGameToast("⚔ Bắt đầu: Màn Rượt Đuổi Trốn Chạy Maroa");
    } else if (chapterKey === 'ch3_dojo') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(12);
        showGameToast("⚔ Chuyển đến: Chương 3 - Đạo Của Ninja");
    } else if (chapterKey === 'ch3_skills') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(16);
        showGameToast("⚔ Chuyển đến: Chương 3 - Nhận Hắc Long Kiếm");
    } else if (chapterKey === 'boss_dialogue') {
        document.getElementById('ui-layer').style.display = 'block';
        renderNode(17);
        showGameToast("⚔ Chuyển đến: Chương Kết - Đối Thoại Tế Đàn");
    } else if (chapterKey === 'boss_battle') {
        startBossBattle();
        showGameToast("⚔ Bắt đầu: Trận Đánh Boss Anderson");
    } else if (chapterKey === 'victory') {
        handleBossVictory();
        showGameToast("⚔ Chuyển đến: Hậu Chiến - Chiến Thắng Huy Hoàng");
    }
}

function adminJumpChapter(chapterKey) {
    toggleAdminConsole(false);
    jumpToChapter(chapterKey);
}

function adminCheat(type) {
    initSFX();
    if (type === 'godmode') {
        adminGodMode = true;
        battleState.playerHP = 999;
        battleState.playerMaxHP = 999;
        updateBattleHUD();
        playSFX('heal');
        logBattle("ADMIN CHEAT: Bất Tử Sinh Lực (999 HP).", "heal");
    } else if (type === 'fullki') {
        battleState.playerKi = 100;
        updateBattleHUD();
        playSFX('heal');
        logBattle("ADMIN CHEAT: Chân Khí đã nạp đầy (100 Ki).", "heal");
    } else if (type === 'onehit') {
        battleState.bossHP = 1;
        updateBattleHUD();
        playSFX('slash');
        logBattle("ADMIN CHEAT: Anderson suy kiệt, chỉ còn 1 HP!", "damage");
    } else if (type === 'winchase') {
        if (chaseRunning) {
            toggleAdminConsole(false);
            handleChaseSuccess();
        } else {
            adminJumpChapter('ch3_dojo');
        }
    } else if (type === 'unlock_chapters') {
        localStorage.setItem('webg_unlock_all', 'true');
        setHasPlayedThrough(true);
        updateChapterBadge();
        playSFX('heal');
        showGameToast("ADMIN CHEAT: Đã mở khóa toàn bộ chọn chương!");
    } else if (type === 'unlock_achievements') {
        if (typeof cheatUnlockAllAchievements === 'function') {
            cheatUnlockAllAchievements();
        }
    } else if (type === 'reset_achievements') {
        if (typeof cheatResetAchievements === 'function') {
            cheatResetAchievements();
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const confirmDialog = document.getElementById('chapter-confirm-dialog');
        if (confirmDialog && !confirmDialog.classList.contains('hidden')) {
            hideChapterConfirm();
            return;
        }
        const chapterModal = document.getElementById('chapter-select-modal');
        if (chapterModal && chapterModal.classList.contains('active')) {
            closeChapterSelectModal();
            return;
        }
        const achModal = document.getElementById('achievement-modal');
        if (achModal && achModal.classList.contains('active')) {
            closeAchievementModal();
            return;
        }
        const modal = document.getElementById('admin-console');
        if (modal && modal.classList.contains('active')) {
            toggleAdminConsole(false);
            return;
        }
    }

    if (e.key && e.key.length === 1) {
        adminKeySequence += e.key.toLowerCase();
        if (adminKeySequence.length > 20) {
            adminKeySequence = adminKeySequence.slice(-20);
        }
        if (adminKeySequence.endsWith('admin')) {
            toggleAdminConsole();
            adminKeySequence = '';
        }
    }
});

window.onload = () => {
    if (typeof syncExistingProgressAchievements === 'function') {
        syncExistingProgressAchievements();
    }
    if (typeof updateAchievementButtonBadge === 'function') {
        updateAchievementButtonBadge();
    }
    startGame();
};