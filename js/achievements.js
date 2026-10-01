const ACHIEVEMENTS_DATA = [
    {
        id: 'ach_ch1',
        category: 'chapter',
        badge: 'CHƯƠNG 1',
        title: 'Bóng Ma Trong Rừng',
        desc: 'Sống sót qua cuộc chạm trán ban đầu với Anderson và được thợ săn Maroa cứu mạng.',
        image: 'assets/images/achievements/ach_ch1.png',
        icon: '🌲'
    },
    {
        id: 'ach_ch2',
        category: 'chapter',
        badge: 'CHƯƠNG 2',
        title: 'Căn Nhà Đẫm Máu',
        desc: 'Nhận ra sự khả nghi của nồi súp thịt rừng, vạch trần bộ mặt sát nhân của Maroa.',
        image: 'assets/images/achievements/ach_ch2.png',
        icon: '🥩'
    },
    {
        id: 'ach_chase',
        category: 'chapter',
        badge: 'RƯỢT ĐUỔI',
        title: 'Vượt Qua Tử Địa',
        desc: 'Vượt qua rừng cạm bẫy, né tránh thành công lưỡi dao phay đồ tể cuồng nộ.',
        image: 'assets/images/achievements/ach_chase.png',
        icon: '🏃'
    },
    {
        id: 'ach_ch3',
        category: 'chapter',
        badge: 'CHƯƠNG 3',
        title: 'Đạo Của Ninja',
        desc: 'Đặt chân tới Đền Cổ Trúc Lâm, lĩnh hội bí thuật và tiếp nhận Hắc Long Kiếm.',
        image: 'assets/images/achievements/ach_ch3.png',
        icon: '🥷'
    },
    {
        id: 'ach_boss',
        category: 'chapter',
        badge: 'CHƯƠNG KẾT',
        title: 'Trảm Ma Đoạt Mệnh',
        desc: 'Đánh bại ác thể Anderson tại Tế Đàn Huyết Nguyệt trong trận quyết đấu sinh tử.',
        image: 'assets/images/achievements/ach_boss.png',
        icon: '⚔️'
    },
    {
        id: 'ach_victory',
        category: 'chapter',
        badge: 'HẬU CHIẾN',
        title: 'Đại Chiến Binh Bóng Tối',
        desc: 'Lắng nghe lời hối hận của Anderson, được Ninja Đạo công nhận và khép lại cơn ác mộng.',
        image: 'assets/images/achievements/ach_victory.png',
        icon: '🌅'
    },
    {
        id: 'ach_end_anderson_bad',
        category: 'ending',
        badge: 'KẾT CỤC 1',
        title: 'Bữa Tối Của Quái Vật',
        desc: 'Lựa chọn liều lĩnh ngớ ngẩn khiến bạn bị Anderson xé xác ngay trong đêm sâu.',
        image: 'assets/images/achievements/ach_end_anderson_bad.png',
        icon: '💀'
    },
    {
        id: 'ach_end_sleep',
        category: 'ending',
        badge: 'KẾT CỤC 2',
        title: 'Giấc Ngủ Ngàn Thu',
        desc: 'Mất cảnh giác đi ngủ tại nhà Maroa và vĩnh viễn hóa thành món canh thịt trong vạc.',
        image: 'assets/images/achievements/ach_end_sleep.png',
        icon: '🍲'
    },
    {
        id: 'ach_end_chase_fail',
        category: 'ending',
        badge: 'KẾT CỤC 3',
        title: 'Sa Lưới Đồ Tể',
        desc: 'Chậm chân hoặc vấp ngã trong màn rượt đuổi, bị lưỡi dao phay của Maroa cắm phập vào lưng.',
        image: 'assets/images/achievements/ach_end_chase_fail.png',
        icon: '🔪'
    },
    {
        id: 'ach_end_boss_defeat',
        category: 'ending',
        badge: 'KẾT CỤC 4',
        title: 'Huyết Nguyệt Vùi Thân',
        desc: 'Gục ngã trước sức mạnh tà ác áp đảo của Anderson tại Tế Đàn Cổ.',
        image: 'assets/images/achievements/ach_end_boss_defeat.png',
        icon: '🩸'
    },
    {
        id: 'ach_end_victory',
        category: 'ending',
        badge: 'CHÂN KẾT CỤC',
        title: 'Chiến Thắng Huy Hoàng',
        desc: 'Phá tan bóng tối, giải thoát khu rừng và đón nhận ánh bình minh ấm áp.',
        image: 'assets/images/achievements/ach_end_victory.png',
        icon: '🏆'
    },
    {
        id: 'ach_master',
        category: 'special',
        badge: 'DANH HIỆU',
        title: 'Huyền Thoại Bất Diệt',
        desc: 'Chinh phục toàn bộ các chương và mọi kết cục đen tối trong trò chơi.',
        image: 'assets/images/achievements/ach_master.png',
        icon: '👑'
    }
];

let achievementToastTimeout = null;
let currentAchTab = 'all';

function getUnlockedAchievements() {
    try {
        const raw = localStorage.getItem('webg_achievements');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
}

function saveUnlockedAchievements(data) {
    try {
        localStorage.setItem('webg_achievements', JSON.stringify(data));
    } catch (e) {}
}

function isAchievementUnlocked(id) {
    const list = getUnlockedAchievements();
    return !!list[id];
}

function unlockAchievement(id, silent = false) {
    const target = ACHIEVEMENTS_DATA.find(a => a.id === id);
    if (!target) return false;

    const data = getUnlockedAchievements();
    if (data[id]) {
        // Already unlocked
        return false;
    }

    const now = new Date();
    data[id] = {
        unlockedAt: now.toISOString(),
        dateStr: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
    };
    saveUnlockedAchievements(data);

    updateAchievementButtonBadge();

    if (!silent) {
        showAchievementToast(target);
        if (typeof playSFX === 'function') {
            try {
                playSFX('heal');
            } catch (e) {}
        }
    }

    // Check if master achievement should unlock (all other 11 unlocked)
    if (id !== 'ach_master') {
        const baseAchs = ACHIEVEMENTS_DATA.filter(a => a.id !== 'ach_master');
        const allUnlocked = baseAchs.every(a => !!data[a.id]);
        if (allUnlocked && !data['ach_master']) {
            setTimeout(() => {
                unlockAchievement('ach_master', silent);
            }, 800);
        }
    }

    const modal = document.getElementById('achievement-modal');
    if (modal && modal.classList.contains('active')) {
        renderAchievementsList();
    }

    return true;
}

function showAchievementToast(ach) {
    const toast = document.getElementById('achievement-toast');
    if (!toast) return;

    const imgElem = document.getElementById('ach-toast-img');
    const titleElem = document.getElementById('ach-toast-title');
    const descElem = document.getElementById('ach-toast-desc');
    const badgeElem = document.getElementById('ach-toast-badge');

    if (imgElem) {
        imgElem.src = ach.image || 'assets/images/achievements/placeholder.png';
        imgElem.alt = ach.title;
    }
    if (titleElem) titleElem.innerText = ach.title;
    if (descElem) descElem.innerText = ach.desc;
    if (badgeElem) badgeElem.innerText = ach.badge;

    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');

    clearTimeout(achievementToastTimeout);
    achievementToastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

function updateAchievementButtonBadge() {
    const counter = document.getElementById('ach-badge-counter');
    if (!counter) return;
    const data = getUnlockedAchievements();
    const count = Object.keys(data).length;
    const total = ACHIEVEMENTS_DATA.length;
    counter.innerText = `${count}/${total}`;
    if (count > 0) {
        counter.classList.add('has-unlocked');
    }
}

function syncExistingProgressAchievements() {
    if (typeof getClearedChapters !== 'function') return;
    const cleared = getClearedChapters();
    if (!Array.isArray(cleared) || cleared.length === 0) return;

    if (cleared.includes('ch1')) unlockAchievement('ach_ch1', true);
    if (cleared.includes('ch2')) unlockAchievement('ach_ch2', true);
    if (cleared.includes('chase')) unlockAchievement('ach_chase', true);
    if (cleared.includes('ch3')) unlockAchievement('ach_ch3', true);
    if (cleared.includes('boss')) unlockAchievement('ach_boss', true);
    if (cleared.includes('victory')) {
        unlockAchievement('ach_victory', true);
        unlockAchievement('ach_end_victory', true);
    }
    updateAchievementButtonBadge();
}

function openAchievementModal() {
    if (typeof initSFX === 'function') initSFX();
    if (typeof playSFX === 'function') playSFX('dodge');

    const modal = document.getElementById('achievement-modal');
    const overlay = document.getElementById('achievement-modal-overlay');
    if (!modal || !overlay) return;

    renderAchievementsList();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeAchievementModal() {
    if (typeof initSFX === 'function') initSFX();
    const modal = document.getElementById('achievement-modal');
    const overlay = document.getElementById('achievement-modal-overlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function setAchievementTab(tab) {
    if (typeof initSFX === 'function') initSFX();
    if (typeof playSFX === 'function') playSFX('dodge');
    currentAchTab = tab;

    const tabs = document.querySelectorAll('.ach-tab-btn');
    tabs.forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderAchievementsList();
}

function renderAchievementsList() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;

    const unlockedMap = getUnlockedAchievements();
    const unlockedCount = Object.keys(unlockedMap).length;
    const totalCount = ACHIEVEMENTS_DATA.length;
    const percent = Math.round((unlockedCount / totalCount) * 100);

    const progressStat = document.getElementById('ach-progress-stat');
    const progressFill = document.getElementById('ach-progress-fill');
    if (progressStat) {
        progressStat.innerHTML = `Đã hoàn thành: <span>${unlockedCount} / ${totalCount}</span> (${percent}%)`;
    }
    if (progressFill) {
        progressFill.style.width = `${percent}%`;
    }

    let filtered = ACHIEVEMENTS_DATA;
    if (currentAchTab === 'chapter') {
        filtered = ACHIEVEMENTS_DATA.filter(a => a.category === 'chapter');
    } else if (currentAchTab === 'ending') {
        filtered = ACHIEVEMENTS_DATA.filter(a => a.category === 'ending');
    } else if (currentAchTab === 'special') {
        filtered = ACHIEVEMENTS_DATA.filter(a => a.category === 'special');
    }

    let html = '';
    filtered.forEach(ach => {
        const isUnlocked = !!unlockedMap[ach.id];
        const unlockInfo = unlockedMap[ach.id];

        if (isUnlocked) {
            const statusHtml = `<div class="ach-status-tag unlocked">✓ ĐÃ ĐẠT <span class="ach-unlock-time">${unlockInfo.dateStr || ''}</span></div>`;
            html += `\n                <div class="ach-card unlocked ach-cat-${ach.category}">
                    <div class="ach-icon-wrapper">
                        <img class="ach-icon-img" src="${ach.image || 'assets/images/achievements/placeholder.png'}" alt="${ach.title}" onerror="this.src='assets/images/achievements/placeholder.png'">
                    </div>
                    <div class="ach-info">
                        <div class="ach-card-top">
                            <span class="ach-badge-label">${ach.badge}</span>
                            ${statusHtml}
                        </div>
                        <div class="ach-title">${ach.title}</div>
                        <div class="ach-desc">${ach.desc}</div>
                    </div>
                </div>
            `;
        } else {
            html += `\n                <div class="ach-card locked ach-cat-${ach.category}">
                    <div class="ach-icon-wrapper ach-icon-locked">
                        <span class="ach-qmark">?</span>
                    </div>
                    <div class="ach-info">
                        <div class="ach-desc ach-desc-locked">${ach.desc}</div>
                    </div>
                </div>
            `;
        }
    });

    grid.innerHTML = html;
}

function cheatUnlockAllAchievements() {
    ACHIEVEMENTS_DATA.forEach(ach => {
        unlockAchievement(ach.id, true);
    });
    updateAchievementButtonBadge();
    renderAchievementsList();
    if (typeof showGameToast === 'function') {
        showGameToast("🏆 ADMIN: Đã mở khóa toàn bộ thành tựu!");
    }
}

function cheatResetAchievements() {
    localStorage.removeItem('webg_achievements');
    updateAchievementButtonBadge();
    renderAchievementsList();
    if (typeof showGameToast === 'function') {
        showGameToast("🏆 ADMIN: Đã đặt lại danh sách thành tựu!");
    }
}
