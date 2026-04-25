const UI = {
    screens: ['intro-screen', 'title-screen', 'tutorial-screen', 'hub-screen', 'briefing-screen', 'case-screen', 'court-screen', 'ending-screen'],
    currentPage: 1,
    totalPages: 3,
    isTyping: false,
    tutorialIndex: 0,
    tutorialScenes: [
        {
            title: "Baca Dokumen dengan Teliti",
            copy: "Setiap berkas punya tiga halaman: ringkasan proyek, laporan anggaran, dan catatan lapangan. Teks yang bergaris putus-putus bisa dijadikan bukti jika terlihat janggal."
        },
        {
            title: "Kumpulkan Bukti yang Kuat",
            copy: "Bukti punya kekuatan dan validitas. Ambil bukti dari dokumen, foto lapangan, komentar warga, dan jejak vendor. Maksimal tujuh bukti per kasus, jadi pilih yang paling bernilai."
        },
        {
            title: "Gunakan Chirp untuk Jejak Digital",
            copy: "Ponsel di kanan bawah membuka Chirp. Cari nama pejabat, kontraktor, lokasi, atau topik proyek. Kiriman dan balasan tertentu dapat disimpan sebagai bukti."
        },
        {
            title: "Pilih Strategi Penyelesaian",
            copy: "Melepaskan kasus cepat tapi berbahaya jika proyek korup. Sidang lebih aman jika bukti cukup. Tangkap langsung memberi hasil besar, tetapi hanya cocok saat bukti sangat kuat dan valid."
        },
        {
            title: "Progres Disimpan Otomatis",
            copy: "Game menyimpan nama agen, level, kasus selesai, achievement, dan status tutorial. Setelah pelatihan ini selesai, scene tutorial tidak akan muncul lagi."
        }
    ],
    
    init() {
        game.loadGame();
        this.bindEvents();
        this.bindDialogEvents();
        // Load settings
        if (window.audio) {
            audio.setBgmVolume(document.getElementById('setting-bgm').value);
            audio.setSfxVolume(document.getElementById('setting-sfx').value);
        }
        this.syncSettingsForm();
        this.showScreen(game.playerName && game.playerName !== "Agen Rahasia" ? 'title-screen' : 'intro-screen');
    },

    bindEvents() {
        // Global Click Sound
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.classList.contains('clickable')) {
                if (window.audio) audio.playClick();
            }
        });

        // Settings
        document.getElementById('btn-open-settings').addEventListener('click', () => {
            this.syncSettingsForm();
            document.getElementById('settings-modal').classList.remove('hidden');
        });
        document.getElementById('btn-open-settings-hud').addEventListener('click', () => {
            this.syncSettingsForm();
            document.getElementById('settings-modal').classList.remove('hidden');
        });
        document.getElementById('btn-open-settings-title').addEventListener('click', () => {
            this.syncSettingsForm();
            document.getElementById('settings-modal').classList.remove('hidden');
        });
        document.getElementById('btn-close-settings').addEventListener('click', () => {
            document.getElementById('settings-modal').classList.add('hidden');
        });
        document.getElementById('setting-bgm').addEventListener('input', (e) => {
            if (window.audio) audio.setBgmVolume(e.target.value);
        });
        document.getElementById('setting-sfx').addEventListener('input', (e) => {
            if (window.audio) audio.setSfxVolume(e.target.value);
        });
        document.getElementById('btn-save-player-name').addEventListener('click', async () => {
            const name = document.getElementById('setting-player-name').value.trim();
            if (!name) {
                await this.showDialog({ title: "Nama Kosong", message: "Nama agen tidak boleh kosong.", variant: "warning" });
                return;
            }
            game.setPlayerName(name);
            this.showToast("Nama agen disimpan.", "success");
        });
        document.getElementById('setting-show-character').addEventListener('change', (e) => {
            game.setCharacterVisible(e.target.checked);
            this.showScreen(this.getActiveScreenId());
        });
        document.getElementById('btn-reset-progress').addEventListener('click', async () => {
            const ok = await this.showDialog({
                title: "Reset Level?",
                message: "Semua level selesai, bintang, achievement, dan progres kasus akan dihapus. Nama agen dan status tutorial tetap disimpan.",
                variant: "danger",
                confirmText: "Reset",
                cancelText: "Batal"
            });
            if (!ok) return;
            game.resetProgress();
            this.renderQuests();
            this.updateHUD();
            document.getElementById('hud').classList.remove('visible');
            this.showToast("Level berhasil direset.", "warning");
            this.showScreen('title-screen');
        });

        // Name Entry
        document.getElementById('btn-submit-name').addEventListener('click', async () => {
            const name = document.getElementById('input-player-name').value;
            if (name) {
                game.setPlayerName(name);
                this.showScreen('title-screen');
                if (window.audio) audio.playBGM('main');
            } else {
                await this.showDialog({
                    title: "Nama Agen Kosong",
                    message: "Masukkan nama terlebih dahulu sebelum melapor bertugas.",
                    variant: "warning"
                });
            }
        });

        document.getElementById('btn-start-game').addEventListener('click', () => this.startGameFlow());

        document.getElementById('btn-tutorial-next').addEventListener('click', () => this.nextTutorialScene());
        document.getElementById('btn-tutorial-skip').addEventListener('click', () => this.finishTutorial());

        document.getElementById('btn-case-back').addEventListener('click', () => {
            this.renderHub();
            this.showScreen('hub-screen');
            document.getElementById('phone-overlay').classList.remove('open');
            this.updateCharacterState('reading');
        });

        // Briefing Start
        document.getElementById('btn-start-investigation').addEventListener('click', () => {
            this.showScreen('case-screen');
            document.getElementById('player-character-container').classList.remove('hidden');
            this.updateCharacterState('reading');
            this.updateInvestigationPanel();
        });

        // Pagination
        document.getElementById('btn-page-prev').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                if (window.audio) audio.playPageTurn();
                this.updatePagination();
            }
        });

        document.getElementById('btn-page-next').addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                if (window.audio) audio.playPageTurn();
                this.updatePagination();
                
                if (game.tutorialStep === 0) {
                    game.completeQuest("q1");
                    this.showDialogue("Mentor", "Bagus. Jangan lupa periksa lampiran keuangan dan foto lapangan di halaman berikutnya.", () => {
                        game.addQuest("q2", "Kumpulkan 2 Bukti");
                    });
                }
            }
        });

        // Phone Interactions
        document.getElementById('phone-icon').addEventListener('click', () => {
            document.getElementById('phone-overlay').classList.add('open');
            this.updateCharacterState('phone');
        });
        
        document.getElementById('btn-phone-close').addEventListener('click', () => {
            document.getElementById('phone-overlay').classList.remove('open');
            this.updateCharacterState('reading');
        });

        document.getElementById('phone-search-input').addEventListener('input', (e) => {
            this.renderPhoneFeed(e.target.value);
        });

        document.getElementById('btn-phone-back').addEventListener('click', () => {
            this.switchPhoneView('home');
        });

        // Resolution Buttons
        document.getElementById('btn-open-analysis').addEventListener('click', () => {
            this.showEvidenceAnalysis();
        });
        document.getElementById('btn-open-quests').addEventListener('click', () => {
            this.showQuestDialog();
        });

        document.getElementById('btn-resolve-release').addEventListener('click', async () => {
            const ok = await this.showDialog({
                title: "Tutup Kasus?",
                message: "Yakin ingin menutup kasus ini tanpa dakwaan?",
                variant: "warning",
                confirmText: "Tutup Kasus",
                cancelText: "Periksa Lagi"
            });
            if(ok) {
                const res = game.resolveRelease();
                await this.showResultDialog(res);
                this.renderHub();
                this.showScreen('hub-screen');
            }
        });
        
        document.getElementById('btn-resolve-trial').addEventListener('click', async () => {
            if (game.collectedEvidence.length === 0) {
                await this.showDialog({
                    title: "Belum Ada Bukti",
                    message: "Anda belum mengumpulkan bukti apa pun. Cari bukti dari dokumen atau sosial media terlebih dahulu.",
                    variant: "warning"
                });
                return;
            }
            const ok = await this.showDialog({
                title: "Bawa ke Sidang?",
                message: "Bawa kasus ini ke persidangan interaktif? Pastikan Anda telah mengumpulkan bukti terbaik.",
                variant: "info",
                confirmText: "Mulai Sidang",
                cancelText: "Periksa Lagi"
            });
            if(ok) {
                document.getElementById('phone-overlay').classList.remove('open');
                
                trialManager.startTrial();
            }
        });

        document.getElementById('btn-resolve-arrest').addEventListener('click', async () => {
            const ok = await this.showDialog({
                title: "Risiko Tinggi",
                message: "Penangkapan langsung berisiko sangat tinggi. Lanjutkan hanya jika bukti sudah kuat dan valid.",
                variant: "danger",
                confirmText: "Tangkap",
                cancelText: "Batal"
            });
            if(ok) {
                const res = game.resolveArrest();
                await this.showResultDialog(res);
                if (game.funds <= 0 || game.completedCases.length >= GAME_DATA.cases.length) {
                    this.renderEnding();
                } else {
                    this.renderHub();
                    this.showScreen('hub-screen');
                }
            }
        });
    },

    bindDialogEvents() {
        const dialog = document.getElementById('app-dialog');
        if (!dialog) return;

        dialog.addEventListener('click', (e) => {
            if (e.target === dialog && this.dialogResolver) {
                this.closeDialog(false);
            }
        });

        document.getElementById('app-dialog-cancel').addEventListener('click', () => this.closeDialog(false));
        document.getElementById('app-dialog-confirm').addEventListener('click', () => this.closeDialog(true));

        document.addEventListener('keydown', (e) => {
            if (dialog.classList.contains('hidden')) return;
            if (e.key === 'Escape') this.closeDialog(false);
            if (e.key === 'Enter') this.closeDialog(true);
        });
    },

    showDialog({ title = "Informasi", message = "", variant = "info", confirmText = "OK", cancelText = null } = {}) {
        const dialog = document.getElementById('app-dialog');
        const titleEl = document.getElementById('app-dialog-title');
        const messageEl = document.getElementById('app-dialog-message');
        const accent = document.getElementById('app-dialog-accent');
        const confirmBtn = document.getElementById('app-dialog-confirm');
        const cancelBtn = document.getElementById('app-dialog-cancel');

        titleEl.innerText = title;
        messageEl.innerText = message;
        confirmBtn.innerText = confirmText;
        cancelBtn.innerText = cancelText || "Batal";
        cancelBtn.style.display = cancelText ? "inline-flex" : "none";

        accent.className = `app-dialog-accent ${variant}`;
        dialog.classList.remove('hidden');
        confirmBtn.focus();

        return new Promise(resolve => {
            this.dialogResolver = resolve;
        });
    },

    closeDialog(value) {
        const dialog = document.getElementById('app-dialog');
        dialog.classList.add('hidden');
        if (this.dialogResolver) {
            this.dialogResolver(value);
            this.dialogResolver = null;
        }
    },

    showResultDialog(res) {
        const funds = `${res.fundsChange >= 0 ? '+' : '-'} Rp ${Math.abs(res.fundsChange).toLocaleString('id-ID')}`;
        const rep = `${res.repChange >= 0 ? '+' : ''}${res.repChange}`;
        const stars = this.renderStars(game.getCaseStars(game.currentCaseId));
        return this.showDialog({
            title: res.title,
            message: `${res.desc}\n\nBintang Quest: ${stars}\nPerubahan Dana: ${funds}\nPerubahan Reputasi: ${rep}`,
            variant: res.fundsChange >= 0 ? "success" : "danger",
            confirmText: "Lanjut"
        });
    },

    showToast(message, variant = "info") {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${variant}`;
        toast.innerText = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(8px)";
            setTimeout(() => toast.remove(), 220);
        }, 2600);
    },

    showScreen(screenId) {
        this.screens.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.remove('active');
        });
        const target = document.getElementById(screenId);
        if(target) {
            target.classList.add('active');
            window.scrollTo(0, 0);
        }

        const phoneIcon = document.getElementById('phone-icon');
        const character = document.getElementById('player-character-container');
        const phoneOverlay = document.getElementById('phone-overlay');
        if (phoneIcon && character && phoneOverlay) {
            if (screenId === 'case-screen') {
                phoneIcon.classList.remove('hidden');
                character.classList.toggle('hidden', !game.characterVisible);
            } else {
                phoneIcon.classList.add('hidden');
                character.classList.add('hidden');
                phoneOverlay.classList.remove('open');
            }
        }

        const questContainer = document.getElementById('quest-container');
        if (questContainer) {
            questContainer.classList.toggle('hidden', screenId === 'hub-screen' || screenId === 'title-screen' || screenId === 'intro-screen');
        }

        if (window.audio) {
            const trackMap = {
                'title-screen': 'main',
                'tutorial-screen': 'tutorial',
                'hub-screen': 'main',
                'briefing-screen': 'investigation',
                'case-screen': 'investigation',
                'court-screen': 'trial',
                'ending-screen': 'ending'
            };
            if (trackMap[screenId]) audio.playBGM(trackMap[screenId]);
        }
    },

    getActiveScreenId() {
        const active = this.screens.find(id => document.getElementById(id)?.classList.contains('active'));
        return active || 'title-screen';
    },

    syncSettingsForm() {
        const nameInput = document.getElementById('setting-player-name');
        const showCharacter = document.getElementById('setting-show-character');
        if (nameInput) nameInput.value = game.playerName || "";
        if (showCharacter) showCharacter.checked = game.characterVisible !== false;
    },

    startGameFlow() {
        game.init();
        this.updateHUD();
        document.getElementById('hud').classList.add('visible');

        if (!game.tutorialCompleted) {
            this.startTutorialScene();
            return;
        }

        this.openHub();
    },

    openHub() {
        this.renderHub();
        this.showScreen('hub-screen');
    },

    startTutorialScene() {
        this.tutorialIndex = 0;
        this.renderTutorialScene();
        this.showScreen('tutorial-screen');
        if (window.audio) audio.playDialogOpen();
    },

    renderTutorialScene() {
        const scene = this.tutorialScenes[this.tutorialIndex];
        document.getElementById('tutorial-title').innerText = scene.title;
        document.getElementById('tutorial-copy').innerText = scene.copy;
        document.getElementById('btn-tutorial-next').innerText = this.tutorialIndex === this.tutorialScenes.length - 1 ? "Mulai Investigasi" : "Lanjut";

        const progress = document.getElementById('tutorial-progress');
        progress.innerHTML = '';
        this.tutorialScenes.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = `tutorial-dot ${idx <= this.tutorialIndex ? 'active' : ''}`;
            progress.appendChild(dot);
        });
    },

    nextTutorialScene() {
        if (this.tutorialIndex < this.tutorialScenes.length - 1) {
            this.tutorialIndex++;
            this.renderTutorialScene();
            if (window.audio) audio.playPageTurn();
            return;
        }
        this.finishTutorial();
    },

    finishTutorial() {
        game.completeTutorial();
        game.addQuest("q1", "Buka Berkas Kasus Pertama");
        this.showToast("Pelatihan selesai. Progres tutorial disimpan.", "success");
        this.openHub();
    },

    updateHUD() {
        document.getElementById('hud-funds').innerText = `Rp ${game.funds.toLocaleString('id-ID')}`;
        document.getElementById('hud-level').innerText = GAME_DATA.levels[game.getCurrentLevel()] || "Maksimal";
        document.getElementById('hud-corruption').innerText = `${game.corruption}%`;
        document.getElementById('hud-rep').innerText = game.reputation;
        
        const fundsEl = document.getElementById('hud-funds');
        fundsEl.style.color = game.funds < 2000 ? "#c62828" : "#2b2b2b";
    },

    renderHub() {
        this.updateHUD();
        const currentLevel = game.getCurrentLevel();
        document.getElementById('hub-level-label').innerText = `Level ${currentLevel + 1} - ${GAME_DATA.levels[currentLevel] || "Maksimal"}`;
        document.getElementById('hub-case-progress').innerText = `${game.completedCases.length} / ${GAME_DATA.cases.length} kasus selesai`;
        const container = document.getElementById('cases-container');
        container.innerHTML = '';

        const cases = game.getAvailableCases();
        cases.forEach(c => {
            const folder = document.createElement('div');
            folder.className = `case-folder ${c.completed ? 'completed' : ''} ${c.locked ? 'locked' : ''}`;
            
            folder.innerHTML = `
                <div class="folder-label">
                    <img class="folder-emblem" src="assets/case_emblem.svg" alt="">
                    <div style="font-size: 10px; color: #666; margin-bottom: 5px;">NOMOR BERKAS: #00${c.id}-${new Date().getFullYear()}</div>
                    <div class="folder-title">${c.name}</div>
                    <div style="color: #444;">Wilayah: ${c.region}</div>
                    <div class="folder-level">Level ${c.level + 1} - ${GAME_DATA.levels[c.level]}</div>
                    <div class="folder-stars">${this.renderStars(game.getCaseStars(c.id))}</div>
                </div>
            `;

            if (!c.locked && !c.completed) {
                folder.addEventListener('click', () => {
                    if (window.audio) audio.playCaseOpen();
                    game.startCase(c.id);
                    this.renderCaseDocument();
                    this.renderBriefing();
                    document.getElementById('phone-search-input').value = "";
                    this.switchPhoneView('home');
                    this.renderPhoneFeed(""); 
                    this.showScreen('briefing-screen');
                    document.getElementById('player-character-container').classList.add('hidden');
                });
            }
            container.appendChild(folder);
        });
    },

    renderCaseDocument() {
        const c = game.getCurrentCase();
        if (!c) return;

        document.getElementById('case-title').innerText = c.name;
        document.getElementById('case-region').innerText = c.region;
        document.getElementById('case-category').innerText = c.category;
        document.getElementById('case-vendor').innerText = c.vendor.name;
        document.getElementById('case-timeline').innerText = `${c.estDuration} Bulan / ${c.actDuration} Bulan`;
        
        document.getElementById('case-desc').innerHTML = c.description;
        
        document.getElementById('case-budget').innerText = `Rp ${c.budget.toLocaleString('id-ID')}`;
        document.getElementById('case-spent').innerText = `Rp ${c.spent.toLocaleString('id-ID')}`;
        document.getElementById('case-progress').innerText = `${c.completion}% Fisik`;
        
        const tbody = document.getElementById('budget-table');
        tbody.innerHTML = '';
        c.budgetBreakdown.forEach(b => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${b.item}</td>
                <td>${b.allocated.toLocaleString('id-ID')}</td>
                <td>${b.spent.toLocaleString('id-ID')}</td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('case-notes').innerHTML = c.fieldNotes;

        // Render Visual Evidence
        const visualContainer = document.getElementById('visual-evidence-container');
        if (visualContainer) {
            visualContainer.innerHTML = '';
            if (c.visualEvidence && c.visualEvidence.length > 0) {
                c.visualEvidence.forEach(ve => {
                    const thumb = document.createElement('div');
                    const isCollected = game.isEvidenceCollected(ve);
                    thumb.className = `visual-thumbnail ${isCollected ? 'collected' : ''}`;
                    thumb.innerText = ve.desc;
                    thumb.onclick = () => {
                        const added = game.toggleEvidence(ve);
                        if (added !== null) {
                            if (added) {
                                thumb.classList.add('collected');
                            } else {
                                thumb.classList.remove('collected');
                            }
                            this.updateInvestigationPanel();
                            this.updateEvidenceQuestProgress();
                        }
                    };
                    visualContainer.appendChild(thumb);
                });
            } else {
                visualContainer.innerHTML = '<span style="font-size:12px; color:#999;">Tidak ada foto terlampir.</span>';
            }
        }

        const sigContainer = document.getElementById('case-personnel');
        sigContainer.innerHTML = '';
        c.personnel.forEach(p => {
            sigContainer.innerHTML += `
                <div class="signature-box">
                    <div>Mengetahui,</div>
                    <div class="signature-line">${p.name}</div>
                    <div style="font-size: 12px; color: #666;">${p.role}</div>
                </div>
            `;
        });

        this.currentPage = 1;
        this.updatePagination();
        this.updateInvestigationPanel();
        
        // Setup clickable text evidence
        this.parseClickableText('case-screen');
    },

    renderBriefing() {
        const c = game.getCurrentCase();
        if (!c) return;
        document.getElementById('briefing-text').innerText = c.briefing || "Tidak ada arahan khusus untuk kasus ini. Selidiki dengan teliti.";
        const exchange = document.getElementById('briefing-exchange');
        const suspicion = c.isCorrupt ? "Ada indikasi pidana, tapi kita tetap butuh bukti yang tidak mudah dipatahkan." : "Jangan paksakan dakwaan. Bisa saja ini proyek bersih dengan gangguan administrasi.";
        exchange.innerHTML = `
            <div class="brief-line mc"><strong>${game.playerName}</strong>Saya akan cek dokumen, jejak sosial, dan pola vendor sebelum mengambil keputusan.</div>
            <div class="brief-line"><strong>Inspektur Senior</strong>${suspicion}</div>
        `;
    },

    updatePagination() {
        document.querySelectorAll('.doc-page').forEach(el => el.classList.remove('active'));
        const pageEl = document.getElementById(`doc-page-${this.currentPage}`);
        if (pageEl) pageEl.classList.add('active');

        document.getElementById('page-indicator').innerText = `${this.currentPage} / ${this.totalPages}`;
        document.getElementById('btn-page-prev').disabled = this.currentPage === 1;
        document.getElementById('btn-page-next').disabled = this.currentPage === this.totalPages;
    },

    updateCharacterState(state) {
        document.querySelectorAll('.player-sprite').forEach(el => el.classList.remove('active'));
        if (state === 'phone') {
            document.getElementById('player-sprite-phone').classList.add('active');
        } else {
            document.getElementById('player-sprite-reading').classList.add('active');
        }
    },

    switchPhoneView(viewName) {
        document.querySelectorAll('.phone-view').forEach(v => v.classList.remove('active'));
        document.getElementById(`phone-view-${viewName}`).classList.add('active');

        const backBtn = document.getElementById('btn-phone-back');
        const title = document.getElementById('phone-app-title');

        if (viewName === 'home') {
            backBtn.style.visibility = 'hidden';
            title.innerText = "Chirp";
        } else if (viewName === 'profile') {
            backBtn.style.visibility = 'visible';
            title.innerText = "Profil";
        } else if (viewName === 'thread') {
            backBtn.style.visibility = 'visible';
            title.innerText = "Utas";
        }
    },

    renderPhoneFeed(query) {
        const container = document.getElementById('phone-feed');
        container.innerHTML = '';

        const posts = query ? game.searchPosts(query) : [];

        if (posts.length === 0) {
            container.innerHTML = `<div style="text-align: center; margin-top: 50px; color: var(--anime-muted); font-size: 14px; font-weight: bold;">
                ${query ? 'Tidak ada hasil ditemukan.' : 'Ketik kata kunci untuk mencari informasi<br>(Cth: nama pejabat, lokasi, kontraktor)'}
            </div>`;
            return;
        }

        posts.forEach(post => {
            container.appendChild(this.createPostElement(post, false));
        });
    },

    renderPhoneProfile(handle) {
        const c = game.getCurrentCase();
        const profile = c.profiles[handle];
        if(!profile) return;

        document.getElementById('profile-avatar').innerText = profile.avatar;
        document.getElementById('profile-name').innerText = profile.name;
        document.getElementById('profile-handle').innerText = handle;
        document.getElementById('profile-bio').innerText = profile.bio;
        
        document.getElementById('profile-followers').innerText = this.formatNumber(profile.followers);
        document.getElementById('profile-following').innerText = this.formatNumber(profile.following);
        document.getElementById('profile-posts').innerText = this.formatNumber(profile.posts);

        const feed = document.getElementById('profile-feed');
        feed.innerHTML = '';

        // Find all posts by this handle
        const userPosts = c.posts.filter(p => p.handle === handle);
        if(userPosts.length > 0) {
            userPosts.forEach(post => {
                feed.appendChild(this.createPostElement(post, false));
            });
        } else {
            feed.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--anime-muted);">Tidak ada kiriman publik terbaru.</div>`;
        }

        this.switchPhoneView('profile');
    },

    renderPhoneThread(post) {
        const mainContainer = document.getElementById('thread-main');
        mainContainer.innerHTML = '';
        
        // Add the main post but disable its click-to-thread
        const mainEl = this.createPostElement(post, true);
        mainEl.className += " thread-main-post";
        mainContainer.appendChild(mainEl);

        const repliesContainer = document.getElementById('thread-replies');
        repliesContainer.innerHTML = '';

        if(post.comments && post.comments.length > 0) {
            post.comments.forEach(comment => {
                const isCollected = game.isEvidenceCollected(comment);
                const cEl = document.createElement('div');
                cEl.className = 'social-comment';
                cEl.innerHTML = `
                    <div class="sp-header">
                        <div class="sp-avatar" onclick="UI.renderPhoneProfile('${comment.handle}')">${comment.avatar}</div>
                        <div class="sp-meta">
                            <span class="sp-name" style="font-size: 13px;">${comment.author}</span>
                            <span class="sp-handle">${comment.handle} • ${comment.time}</span>
                        </div>
                    </div>
                    <div class="sp-body">${comment.body}</div>
                    <div class="sp-actions" style="border:none; padding:0;">
                        <button class="sp-btn ${isCollected ? 'collected' : ''}">
                            ${isCollected ? 'Tersimpan' : 'Jadikan Bukti'}
                        </button>
                    </div>
                `;

                const btn = cEl.querySelector('.sp-btn');
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleEvidenceBtn(comment, btn);
                });

                repliesContainer.appendChild(cEl);
            });
        } else {
            repliesContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--anime-muted); font-size:13px;">Belum ada balasan.</div>`;
        }

        this.switchPhoneView('thread');
    },

    createPostElement(post, isThreadView) {
        const isCollected = game.isEvidenceCollected(post);
        const card = document.createElement('div');
        card.className = 'social-post';
        
        card.innerHTML = `
            <div class="sp-header">
                <div class="sp-avatar profile-link" data-handle="${post.handle}">${post.avatar}</div>
                <div class="sp-meta">
                    <span class="sp-name">${post.author}</span>
                    <span class="sp-handle">${post.handle} • ${post.time}</span>
                </div>
            </div>
            <div class="sp-body post-body-link">${post.body}</div>
            <div class="sp-engagements">
                <div class="sp-eng-item">💬 ${post.replies || 0}</div>
                <div class="sp-eng-item">🔁 ${post.reposts || 0}</div>
                <div class="sp-eng-item">❤️ ${post.likes || 0}</div>
            </div>
            <div class="sp-actions">
                <button class="sp-btn evidence-btn ${isCollected ? 'collected' : ''}">
                    ${isCollected ? 'Tersimpan ke Bukti' : 'Jadikan Bukti'}
                </button>
            </div>
        `;

        // Routing binds
        card.querySelector('.profile-link').addEventListener('click', (e) => {
            e.stopPropagation();
            this.renderPhoneProfile(post.handle);
        });

        if (!isThreadView) {
            card.querySelector('.post-body-link').addEventListener('click', () => {
                this.renderPhoneThread(post);
            });
        }

        // Evidence bind
        const btn = card.querySelector('.evidence-btn');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleEvidenceBtn(post, btn);
        });

        return card;
    },

    toggleEvidenceBtn(item, btnElement) {
        const added = game.toggleEvidence(item);
        if (added !== null) {
            if (added) {
                btnElement.classList.add('collected');
                btnElement.innerText = 'Tersimpan';
            } else {
                btnElement.classList.remove('collected');
                btnElement.innerText = 'Jadikan Bukti';
            }
            this.updateInvestigationPanel();
            this.updateEvidenceQuestProgress();
        }
    },

    updateInvestigationPanel() {
        const countEl = document.getElementById('intel-evidence-count');
        if (!countEl || !window.game) return;

        const total = game.collectedEvidence.length;
        const score = game.getEvidenceScore();
        const falseCount = game.getFalseEvidenceCount();
        const risk = falseCount > 0 ? "Tinggi" : total >= 5 ? "Stabil" : total >= 2 ? "Sedang" : "Rendah";

        countEl.innerText = `${total} / 7`;
        document.getElementById('intel-evidence-score').innerText = score.toFixed(1);
        document.getElementById('intel-risk-level').innerText = risk;
    },

    updateEvidenceQuestProgress() {
        game.updateQuestProgress();
    },

    showEvidenceAnalysis() {
        game.updateQuestProgress("analysis");
        const total = game.collectedEvidence.length;
        if (total === 0) {
            return this.showDialog({
                title: "Analisis Bukti",
                message: "Belum ada bukti untuk dianalisis. Tandai kejanggalan di dokumen atau simpan posting sosial media sebagai bukti.",
                variant: "warning"
            });
        }

        const score = game.getEvidenceScore().toFixed(1);
        const falseCount = game.getFalseEvidenceCount();
        const list = game.collectedEvidence
            .map((ev, idx) => `${idx + 1}. ${ev.body || ev.desc}`)
            .join('\n');
        const note = falseCount > 0
            ? `Terdeteksi ${falseCount} bukti berisiko rendah validitas. Hati-hati saat sidang.`
            : "Tidak ada bukti berisiko tinggi yang terdeteksi dari validitas data.";

        return this.showDialog({
            title: "Analisis Bukti",
            message: `Jumlah Bukti: ${total} / 7\nSkor Kekuatan: ${score}\n${note}\n\nDaftar Bukti:\n${list}`,
            variant: falseCount > 0 ? "warning" : "success",
            confirmText: "Mengerti"
        });
    },

    showQuestDialog() {
        const c = game.getCurrentCase();
        if (!c) return;
        const quests = game.quests.length ? game.quests : (c.quests || []);
        const lines = quests.map(q => `${q.completed ? '✓' : '○'} ${q.title}`).join('\n');
        return this.showDialog({
            title: `Quest Level ${c.level + 1}`,
            message: `${c.name}\n\n${lines}\n\nBintang saat ini: ${this.renderStars(game.getQuestStars())}`,
            variant: game.getQuestStars() === 3 ? "success" : "info",
            confirmText: "Tutup"
        });
    },

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    },

    renderStars(count) {
        const filled = Math.max(0, Math.min(3, count || 0));
        return `${'★'.repeat(filled)}${'☆'.repeat(3 - filled)}`;
    },

    renderEnding() {
        document.getElementById('hud').classList.remove('visible');
        document.getElementById('phone-icon').classList.add('hidden');
        document.getElementById('phone-overlay').classList.remove('open');
        
        const endingId = game.funds <= 0 ? "negative" : game.determineEnding();
        const endingData = GAME_DATA.endings.find(e => e.id === endingId);

        document.getElementById('ending-title').innerText = endingData.title;
        document.getElementById('ending-subtitle').innerText = endingData.subtitle;
        document.getElementById('ending-desc').innerText = endingData.narrative;
        
        document.getElementById('end-stat-cases').innerText = game.completedCases.length;
        document.getElementById('end-stat-corr').innerText = `${game.corruption}%`;
        document.getElementById('end-stat-level').innerText = GAME_DATA.levels[game.getCurrentLevel()] || "Maksimal";
        
        this.showScreen('ending-screen');
    },

    // --- Dialogue System ---
    showDialogue(name, text, callback) {
        const overlay = document.getElementById('dialogue-overlay');
        const textContainer = document.getElementById('dialogue-text');
        document.getElementById('dialogue-name').innerText = name;
        textContainer.innerText = "";
        overlay.classList.remove('hidden');
        if (window.audio) audio.playDialogOpen();
        
        let speedSetting = parseInt(document.getElementById('setting-text-speed').value);
        this.isTyping = true;

        if (speedSetting === 0) {
            textContainer.innerText = text;
            this.isTyping = false;
        } else {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    textContainer.innerText += text.charAt(i);
                    i++;
                    if (window.audio && i % 3 === 0) audio.playTypewriter();
                    setTimeout(typeWriter, speedSetting);
                } else {
                    this.isTyping = false;
                }
            };
            typeWriter();
        }

        overlay.onclick = () => {
            if (this.isTyping) {
                textContainer.innerText = text;
                this.isTyping = false;
            } else {
                overlay.classList.add('hidden');
                overlay.onclick = null;
                if (callback) callback();
            }
        };
    },

    // --- Quest & Achievement Rendering ---
    renderQuests() {
        const container = document.getElementById('quest-container');
        container.innerHTML = '';
        game.quests.forEach(q => {
            const el = document.createElement('div');
            el.className = `quest-item ${q.completed ? 'completed' : ''}`;
            el.innerHTML = `<div class="quest-item-title">Misi</div><div>${q.title}</div>`;
            container.appendChild(el);
        });
    },

    showAchievement(title, desc) {
        const popup = document.getElementById('achievement-popup');
        popup.querySelector('.achieve-title').innerText = title;
        popup.querySelector('.achieve-desc').innerText = desc;
        popup.classList.remove('hidden');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 5000);
    },

    // --- Parse Clickable Evidence in Text ---
    parseClickableText(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const spans = container.querySelectorAll('.clickable-evidence');
        spans.forEach(span => {
            span.addEventListener('click', (e) => {
                e.stopPropagation();
                if (span.classList.contains('collected')) return;

                const evData = {
                    id: span.getAttribute('data-id'),
                    type: span.getAttribute('data-type') || 'text',
                    desc: span.innerText,
                    strength: parseFloat(span.getAttribute('data-strength')) || 0.5,
                    validity: parseFloat(span.getAttribute('data-validity')) || 0.8
                };

                const added = game.toggleEvidence(evData);
                if (added) {
                    span.classList.add('collected');
                    if (window.audio) audio.playEvidenceCollect();
                    this.updateInvestigationPanel();
                    this.updateEvidenceQuestProgress();
                    
                    // Check tutorial
                    if (game.tutorialStep === 0 && game.collectedEvidence.length >= 2) {
                        game.completeQuest("q2");
                        this.showDialogue("Mentor", "Bagus sekali. Sekarang bawa bukti itu ke Pengadilan.", () => {
                            game.tutorialStep = 1;
                            game.saveGame();
                        });
                    }
                } else if (added === false) {
                    span.classList.remove('collected');
                    this.updateInvestigationPanel();
                    this.updateEvidenceQuestProgress();
                }
            });
        });
    }
};

window.UI = UI;

document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
