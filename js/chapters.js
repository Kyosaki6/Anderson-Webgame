const CHAPTER_LIST = [
    {
        id: 'ch1',
        key: 'ch1_start',
        badge: 'CHƯƠNG 1',
        title: 'Bóng Ma Trong Rừng',
        desc: 'Anderson thức tỉnh, bắt đầu cơn ác mộng rùng rợn trong rừng sâu.',
        bg: 'assets/images/backgrounds/darkforest_bg.jpg',
        subOptions: [
            { label: 'Khởi Đầu (Node 0)', key: 'ch1_start' },
            { label: 'Thoát Nạn & Maroa', key: 'ch1_maroa' }
        ]
    },
    {
        id: 'ch2',
        key: 'ch2_house',
        badge: 'CHƯƠNG 2',
        title: 'Căn Nhà Của Maroa',
        desc: 'Bữa tối canh thịt rừng nồng mùi tanh & Chân tướng tên đồ tể quái thai.',
        bg: 'assets/images/backgrounds/maroa_house.jpg',
        subOptions: [
            { label: 'Căn Nhà Gỗ (Node 7)', key: 'ch2_house' },
            { label: 'Maroa Cuồng Nộ (Node 11)', key: 'ch2_angry' }
        ]
    },
    {
        id: 'chase',
        key: 'chase',
        badge: 'MÀN RƯỢT ĐUỔI',
        title: 'Trốn Chạy Đồ Tể Maroa',
        desc: 'Mini-game: Né bẫy gấu và rễ cây ma quái để thoát khỏi lưỡi dao của Maroa.',
        bg: 'assets/images/backgrounds/chase_woods.jpg',
        subOptions: [
            { label: 'Bắt Đầu Rượt Đuổi', key: 'chase' }
        ]
    },
    {
        id: 'ch3',
        key: 'ch3_dojo',
        badge: 'CHƯƠNG 3',
        title: 'Đạo Của Ninja',
        desc: 'Bái kiến Ninja Đạo, rèn luyện bí thuật và nhận lấy thanh Hắc Long Kiếm.',
        bg: 'assets/images/backgrounds/ninja_dojo.jpeg',
        subOptions: [
            { label: 'Đền Cổ Ninja (Node 12)', key: 'ch3_dojo' },
            { label: 'Nhận Hắc Long Kiếm (Node 16)', key: 'ch3_skills' }
        ]
    },
    {
        id: 'boss',
        key: 'boss_dialogue',
        badge: 'CHƯƠNG KẾT',
        title: 'Quyết Chiến Anderson',
        desc: 'Tế Đàn Huyết Nguyệt - Trận quyết đấu theo lượt sống còn bảo vệ khu rừng.',
        bg: 'assets/images/backgrounds/boss_altar.jpg',
        subOptions: [
            { label: 'Đối Thoại Tế Đàn (Node 17)', key: 'boss_dialogue' },
            { label: 'Vào Thẳng Đánh Boss', key: 'boss_battle' }
        ]
    },
    {
        id: 'victory',
        key: 'victory',
        badge: 'HẬU CHIẾN',
        title: 'Chiến Thắng Huy Hoàng',
        desc: 'Hạ gục Anderson, sự hối hận của ác thể và sự vinh danh Đại Chiến Binh.',
        bg: 'assets/images/backgrounds/boss_altar.jpg',
        subOptions: [
            { label: 'Hậu Chiến & Đối Thoại (Node 22)', key: 'victory' }
        ]
    }
];

function getClearedChapters() {
    try {
        const raw = localStorage.getItem('webg_cleared_chapters');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
}

function getUnlockedChapters() {
    try {
        const raw = localStorage.getItem('webg_unlocked_chapters');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return ['ch1'];
}

function hasPlayedThroughChapter() {
    try {
        if (localStorage.getItem('webg_unlock_all') === 'true') return true;
        if (localStorage.getItem('webg_has_played_through') === 'true') return true;
        const cleared = getClearedChapters();
        return cleared.length > 0;
    } catch (e) {
        return false;
    }
}

function setHasPlayedThrough(val) {
    try {
        localStorage.setItem('webg_has_played_through', val ? 'true' : 'false');
    } catch (e) {}
}

function recordChapterCompleted(chapterId) {
    let cleared = getClearedChapters();
    if (!cleared.includes(chapterId)) {
        cleared.push(chapterId);
        try {
            localStorage.setItem('webg_cleared_chapters', JSON.stringify(cleared));
        } catch (e) {}
    }
    setHasPlayedThrough(true);
    updateChapterBadge();
}

function recordChapterProgress(chapterId) {
    let unlocked = getUnlockedChapters();
    if (!unlocked.includes(chapterId)) {
        unlocked.push(chapterId);
        try {
            localStorage.setItem('webg_unlocked_chapters', JSON.stringify(unlocked));
        } catch (e) {}
    }
}

let currentBadgeTitle = "CHƯƠNG 1: BÓNG MA TRONG RỪNG";
let pendingChapterKey = null;

function showChapterConfirm(chapterKey) {
    pendingChapterKey = chapterKey;
    const dialog = document.getElementById('chapter-confirm-dialog');
    if (!dialog) {
        if (confirm("Chương này chưa mở khóa theo tiến độ cốt truyện. Bạn có muốn chuyển thẳng tới chương này không?")) {
            closeChapterSelectModal();
            jumpToChapter(chapterKey);
        }
        return;
    }
    const okBtn = document.getElementById('chapter-confirm-ok');
    if (okBtn) {
        okBtn.onclick = () => {
            const keyToJump = pendingChapterKey;
            hideChapterConfirm();
            closeChapterSelectModal();
            if (keyToJump) {
                jumpToChapter(keyToJump);
            }
        };
    }
    dialog.classList.remove('hidden');
}

function hideChapterConfirm() {
    pendingChapterKey = null;
    const dialog = document.getElementById('chapter-confirm-dialog');
    if (dialog) dialog.classList.add('hidden');
}

function updateChapterBadge(title) {
    if (title) currentBadgeTitle = title;
    const badge = document.getElementById('chapter-badge');
    if (!badge) return;

    badge.className = 'clickable-chapter';
    badge.setAttribute('role', 'button');
    badge.setAttribute('tabindex', '0');
    badge.title = "Nhấn để chọn chương truyện";
    badge.innerHTML = `<span class="chapter-badge-text">${currentBadgeTitle}</span><span class="chapter-select-pill">&#9662; CHỌN CHƯƠNG</span>`;
}

function handleChapterBadgeClick() {
    initSFX();
    playSFX('dodge');
    openChapterSelectModal();
}

function openChapterSelectModal() {
    initSFX();
    hideChapterConfirm();
    const modal = document.getElementById('chapter-select-modal');
    const overlay = document.getElementById('chapter-modal-overlay');
    if (!modal || !overlay) return;
    renderChapterCards();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeChapterSelectModal() {
    initSFX();
    hideChapterConfirm();
    const modal = document.getElementById('chapter-select-modal');
    const overlay = document.getElementById('chapter-modal-overlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function toggleUnlockAllChapters() {
    initSFX();
    try {
        const isAll = (localStorage.getItem('webg_unlock_all') === 'true');
        const nextState = !isAll;
        localStorage.setItem('webg_unlock_all', nextState ? 'true' : 'false');
        if (nextState) {
            setHasPlayedThrough(true);
            playSFX('heal');
            showGameToast("🔓 Đã mở khóa tự do toàn bộ chương!");
        } else {
            playSFX('dodge');
            showGameToast("🔒 Đã trở về chế độ mở khóa theo cốt truyện.");
        }
        updateChapterBadge();
        renderChapterCards();
    } catch (e) {}
}

function handleCardClick(event, defaultKey, isUnlocked) {
    if (event.target.closest('button')) return;
    selectChapterFromModal(defaultKey, isUnlocked);
}

function selectChapterFromModal(chapterKey, isUnlocked) {
    initSFX();
    const isUnlockAll = (localStorage.getItem('webg_unlock_all') === 'true');
    if (!isUnlocked && !isUnlockAll) {
        showChapterConfirm(chapterKey);
        return;
    }
    hideChapterConfirm();
    closeChapterSelectModal();
    jumpToChapter(chapterKey);
}

function renderChapterCards() {
    const container = document.getElementById('chapter-cards-grid');
    if (!container) return;

    const cleared = getClearedChapters();
    const unlocked = getUnlockedChapters();
    const isUnlockAll = (localStorage.getItem('webg_unlock_all') === 'true');

    const statElem = document.getElementById('chapter-progress-stat');
    if (statElem) {
        statElem.innerHTML = `Chương đã vượt qua: <span>${cleared.length} / 6</span>`;
    }
    const unlockAllBtn = document.getElementById('chapter-unlock-all-btn');
    if (unlockAllBtn) {
        unlockAllBtn.innerText = isUnlockAll ? "🔒 Trở Về Theo Tiến Độ" : "🔓 Mở Khóa Tự Do Tất Cả Chương";
    }

    let currentActId = 'ch1';
    if (currentChapter.type === 'chase') {
        currentActId = 'chase';
    } else if (currentChapter.type === 'boss') {
        currentActId = 'boss';
    } else if (currentChapter.type === 'node') {
        const id = currentChapter.id;
        if (typeof id === 'number') {
            if (id < 7) currentActId = 'ch1';
            else if (id < 12) currentActId = 'ch2';
            else if (id < 17) currentActId = 'ch3';
            else if (id < 22) currentActId = 'boss';
            else currentActId = 'victory';
        }
    }

    let html = '';
    CHAPTER_LIST.forEach((chap) => {
        const isCurrent = (chap.id === currentActId);
        const isCompleted = cleared.includes(chap.id);
        const isChapUnlocked = isUnlockAll || isCompleted || unlocked.includes(chap.id) || (chap.id === 'ch1');

        let statusBadge = '';
        if (isCurrent) {
            statusBadge = `<span class="chapter-status-pill status-current">● ĐANG CHƠI</span>`;
        } else if (isCompleted) {
            statusBadge = `<span class="chapter-status-pill status-completed">&#10003; ĐÃ HOÀN THÀNH</span>`;
        } else if (isChapUnlocked) {
            statusBadge = `<span class="chapter-status-pill status-unlocked">&#128275; ĐÃ MỞ KHÓA</span>`;
        } else {
            statusBadge = `<span class="chapter-status-pill status-locked">&#128274; CHƯA QUA</span>`;
        }

        let buttonsHtml = '';
        chap.subOptions.forEach((opt, optIdx) => {
            const btnClass = optIdx === 0
                ? (isChapUnlocked ? 'chapter-jump-btn' : 'chapter-jump-btn btn-locked')
                : (isChapUnlocked ? 'chapter-jump-btn sub-btn' : 'chapter-jump-btn sub-btn btn-locked');

            buttonsHtml += `
                <button type="button" class="${btnClass}" onclick="event.stopPropagation(); selectChapterFromModal('${opt.key}', ${isChapUnlocked})">
                    ${opt.label} ${!isChapUnlocked ? ' [Chưa Qua]' : ''}
                </button>
            `;
        });

        html += `
            <div class="chapter-card ${isChapUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current-playing' : ''}" onclick="handleCardClick(event, '${chap.subOptions[0].key}', ${isChapUnlocked})" style="background-image: linear-gradient(rgba(10, 5, 5, 0.9), rgba(10, 5, 5, 0.92)), url('${chap.bg}');">
                <div class="chapter-card-header">
                    <span class="chapter-badge-tag-label">${chap.badge}</span>
                    ${statusBadge}
                </div>
                <div class="chapter-card-title">${chap.title}</div>
                <div class="chapter-card-desc">${chap.desc}</div>
                <div class="chapter-card-actions">
                    ${buttonsHtml}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
