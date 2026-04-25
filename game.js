const GameState = {
    playerName: "Agen Rahasia",
    funds: 0,
    corruption: 0,
    reputation: 50,
    completedCases: [],
    currentCaseId: null,
    collectedEvidence: [],
    quests: [],
    achievements: [],
    caseStars: {},
    tutorialStep: 0,
    tutorialCompleted: false,
    currentLevel: 0,
    characterVisible: true,
    
    init() {
        this.funds = GAME_DATA.startFunds;
        this.corruption = GAME_DATA.startCorruption;
        this.reputation = 50;
        this.completedCases = [];
        this.currentCaseId = null;
        this.collectedEvidence = [];
        this.quests = [];
        this.achievements = [];
        this.caseStars = {};
        this.tutorialStep = 0;
        this.tutorialCompleted = false;
        this.currentLevel = 0;
        this.characterVisible = true;
        this.loadGame();
    },

    saveGame() {
        const state = {
            playerName: this.playerName,
            funds: this.funds,
            corruption: this.corruption,
            reputation: this.reputation,
            completedCases: this.completedCases,
            achievements: this.achievements,
            caseStars: this.caseStars,
            tutorialStep: this.tutorialStep,
            tutorialCompleted: this.tutorialCompleted,
            currentLevel: this.currentLevel,
            characterVisible: this.characterVisible
        };
        localStorage.setItem('detektor_save', JSON.stringify(state));
    },

    loadGame() {
        const saved = localStorage.getItem('detektor_save');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.playerName = state.playerName || "Agen Rahasia";
                this.funds = Number.isFinite(state.funds) ? state.funds : this.funds;
                this.corruption = Number.isFinite(state.corruption) ? state.corruption : this.corruption;
                this.reputation = Number.isFinite(state.reputation) ? state.reputation : this.reputation;
                this.completedCases = state.completedCases || [];
                this.achievements = state.achievements || [];
                this.caseStars = state.caseStars || {};
                this.tutorialStep = state.tutorialStep || 0;
                this.tutorialCompleted = !!state.tutorialCompleted;
                this.currentLevel = Number.isFinite(state.currentLevel) ? state.currentLevel : this.calculateLevelFromCases();
                this.characterVisible = state.characterVisible !== false;
            } catch(e) {}
        }
    },

    setPlayerName(name) {
        this.playerName = name.trim() || "Agen Rahasia";
        const saved = localStorage.getItem('detektor_save');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                state.playerName = this.playerName;
                localStorage.setItem('detektor_save', JSON.stringify(state));
                return;
            } catch(e) {}
        }
        localStorage.setItem('detektor_save', JSON.stringify({
            playerName: this.playerName,
            funds: GAME_DATA.startFunds,
            corruption: GAME_DATA.startCorruption,
            reputation: 50,
            completedCases: [],
            achievements: [],
            caseStars: {},
            tutorialStep: 0,
            tutorialCompleted: false,
            currentLevel: 0,
            characterVisible: true
        }));
    },

    setCharacterVisible(visible) {
        this.characterVisible = !!visible;
        this.saveGame();
    },

    resetProgress() {
        const keepName = this.playerName;
        const keepTutorial = this.tutorialCompleted;
        const keepCharacter = this.characterVisible;
        this.funds = GAME_DATA.startFunds;
        this.corruption = GAME_DATA.startCorruption;
        this.reputation = 50;
        this.completedCases = [];
        this.currentCaseId = null;
        this.collectedEvidence = [];
        this.quests = [];
        this.achievements = [];
        this.caseStars = {};
        this.currentLevel = 0;
        this.playerName = keepName;
        this.tutorialCompleted = false;
        this.characterVisible = keepCharacter;
        this.saveGame();
    },

    addQuest(id, title) {
        if (!this.quests.find(q => q.id === id)) {
            this.quests.push({ id, title, completed: false });
            UI.renderQuests();
        }
    },

    completeQuest(id) {
        const quest = this.quests.find(q => q.id === id);
        if (quest && !quest.completed) {
            quest.completed = true;
            UI.renderQuests();
            if (window.audio) audio.playSuccess();
        }
    },

    setupCaseQuests() {
        const c = this.getCurrentCase();
        this.quests = (c?.quests || []).map(q => ({ ...q, completed: false }));
        if (window.UI) UI.renderQuests();
    },

    completeQuestByCondition(condition) {
        let changed = false;
        this.quests.forEach(q => {
            if (q.condition === condition && !q.completed) {
                q.completed = true;
                changed = true;
            }
        });
        if (changed) {
            if (window.UI) UI.renderQuests();
            if (window.audio) audio.playSuccess();
        }
    },

    updateQuestProgress(action = "") {
        if (!this.currentCaseId || this.quests.length === 0) return;
        const count = this.collectedEvidence.length;
        const score = this.getEvidenceScore();
        const types = new Set(this.collectedEvidence.map(ev => ev.type || "social"));
        if (count >= 2) this.completeQuestByCondition("evidence_count_2");
        if (count >= 3) this.completeQuestByCondition("evidence_count_3");
        if (count >= 4) this.completeQuestByCondition("evidence_count_4");
        if (score >= 2.5) this.completeQuestByCondition("score_25");
        if (score >= 3) this.completeQuestByCondition("score_30");
        ["financial", "vendor", "timeline", "visual", "social"].forEach(type => {
            if (types.has(type)) this.completeQuestByCondition(`type_${type}`);
        });
        if (this.collectedEvidence.some(ev => ev.id && String(ev.id).startsWith("p"))) this.completeQuestByCondition("phone_evidence");
        if (action) this.completeQuestByCondition(action);
    },

    getQuestStars() {
        const total = this.quests.length || 3;
        const done = this.quests.filter(q => q.completed).length;
        if (done >= total) return 3;
        if (done >= Math.ceil(total * 0.66)) return 2;
        if (done > 0) return 1;
        return 0;
    },

    getCaseStars(caseId) {
        return this.caseStars[caseId] || 0;
    },

    completeTutorial() {
        this.tutorialCompleted = true;
        this.tutorialStep = Math.max(this.tutorialStep, 1);
        this.saveGame();
    },

    unlockAchievement(id, title, desc) {
        if (!this.achievements.includes(id)) {
            this.achievements.push(id);
            this.saveGame();
            UI.showAchievement(title, desc);
            if (window.audio) audio.playSuccess();
        }
    },

    getCurrentLevel() {
        this.currentLevel = Math.max(this.currentLevel || 0, this.calculateLevelFromCases());
        return Math.min(this.currentLevel, GAME_DATA.levels.length - 1);
    },

    calculateLevelFromCases() {
        return Math.min(this.completedCases.length, GAME_DATA.levels.length - 1);
    },

    getAvailableCases() {
        const level = this.getCurrentLevel();
        return GAME_DATA.cases.map(c => ({
            ...c,
            locked: c.level > level,
            completed: this.completedCases.includes(c.id)
        }));
    },

    startCase(caseId) {
        this.currentCaseId = caseId;
        this.collectedEvidence = [];
        this.setupCaseQuests();
        return GAME_DATA.cases.find(c => c.id === caseId);
    },

    getCurrentCase() {
        if (!this.currentCaseId) return null;
        return GAME_DATA.cases.find(c => c.id === this.currentCaseId);
    },

    searchPosts(query) {
        const c = this.getCurrentCase();
        if (!c || !query) return [];
        const q = query.toLowerCase().trim();
        
        return c.posts.filter(post => {
            // Check if any keyword matches
            return post.keywords.some(kw => kw.toLowerCase().includes(q)) || 
                   post.author.toLowerCase().includes(q) ||
                   post.handle.toLowerCase().includes(q);
        });
    },

    toggleEvidence(item) {
        const existsIndex = this.collectedEvidence.findIndex(e => e.id === item.id);
        if (existsIndex >= 0) {
            this.collectedEvidence.splice(existsIndex, 1);
            if (window.UI) UI.showToast("Bukti dihapus dari berkas.", "warning");
            this.updateQuestProgress();
            return false; 
        } else {
            if (this.collectedEvidence.length >= 7) {
                if (window.UI) {
                    UI.showDialog({
                        title: "Berkas Bukti Penuh",
                        message: "Maksimal 7 bukti dapat dikumpulkan per kasus. Hapus salah satu bukti jika ingin mengganti strategi.",
                        variant: "warning"
                    });
                }
                return null; 
            }
            // Reset used state for trial
            item.usedInCourt = false;
            this.collectedEvidence.push(item);
            if (window.UI) UI.showToast("Bukti baru tersimpan ke berkas.", "success");
            this.updateQuestProgress();
            return true; 
        }
    },

    isEvidenceCollected(item) {
        return this.collectedEvidence.some(e => e.id === item.id);
    },

    getEvidenceScore() {
        let score = 0;
        for (const ev of this.collectedEvidence) {
            score += (ev.strength * ev.validity);
        }
        return score;
    },

    getFalseEvidenceCount() {
        return this.collectedEvidence.filter(ev => ev.validity < 0.3).length;
    },

    getDefenseScore() {
        const c = this.getCurrentCase();
        let dScore = 0;
        // Defense score scales with level
        const levelMod = 1 + (c.level * 0.2);
        
        // Take 3 random defenses
        const available = [...c.defenses].sort(() => 0.5 - Math.random()).slice(0, 3);
        available.forEach(d => dScore += (d.strength * levelMod));
        
        return dScore;
    },

    // Option 1: Release (No trial)
    resolveRelease() {
        const c = this.getCurrentCase();
        let title, desc, fundsChange, repChange, corrChange;
        
        if (c.isCorrupt) {
            // Bad decision: let a corrupt project go
            title = "KASUS DILEPASKAN";
            desc = "Anda menutup berkas dan menyatakan tidak ada pelanggaran. Sayangnya, indikasi korupsi pada proyek ini nyata. Dana negara bocor tanpa hambatan.";
            fundsChange = -1500;
            repChange = -15;
            corrChange = +5;
        } else {
            // Good decision: true negative (we don't have non-corrupt cases in data yet, but for future proofing)
            title = "KASUS DITUTUP (BERSIH)";
            desc = "Keputusan tepat. Proyek ini bersih dan Anda menghemat waktu serta biaya persidangan.";
            fundsChange = +500;
            repChange = +5;
            corrChange = -1;
        }

        return this.applyResult(title, desc, 0, 0, fundsChange, repChange, corrChange);
    },

    // Option 2: Trial (Standard vs Defense)
    resolveTrial() {
        const c = this.getCurrentCase();
        const pScore = this.getEvidenceScore();
        const dScore = this.getDefenseScore();
        
        let title, desc, fundsChange, repChange, corrChange;
        
        // Subtract for false evidence
        const falseEv = this.getFalseEvidenceCount();
        const penalty = falseEv * 500;
        let falseMsg = falseEv > 0 ? `\n(Denda Rp ${penalty} karena menyajikan ${falseEv} bukti tidak valid).` : "";

        if (!c.isCorrupt && pScore > dScore) {
            title = "DAKWAAN TIDAK TEPAT";
            desc = "Bukti terlihat ramai, tetapi tidak membuktikan korupsi. Proyek ini bermasalah secara administrasi, bukan pidana. Keputusan membawa ke sidang merusak reputasi unit.";
            fundsChange = -1200 - penalty;
            repChange = -12;
            corrChange = +1;
        } else if (pScore > dScore + 0.5) {
            title = "MENANG TELAK DI PENGADILAN";
            desc = "Bukti yang Anda bawa sangat kuat dan terverifikasi. Hakim menjatuhkan vonis maksimal." + falseMsg;
            fundsChange = 2000 - penalty;
            repChange = 10;
            corrChange = -5;
            
            if (falseEv === 0) {
                this.unlockAchievement('cermat', 'Detektif Cermat', 'Memenangkan sidang tanpa satu pun bukti palsu.');
            }
            if (this.tutorialStep === 1) {
                this.completeQuest("q3");
                this.tutorialStep = 2; // Tutorial done
                this.saveGame();
            }
        } else if (pScore > dScore) {
            title = "MENANG DENGAN SUSAH PAYAH";
            desc = "Bukti Anda sedikit lebih baik dari bantahan pembela. Terdakwa divonis ringan." + falseMsg;
            fundsChange = 1000 - penalty;
            repChange = 5;
            corrChange = -2;
        } else {
            title = "KALAH DI PENGADILAN";
            desc = "Argumen pembela jauh lebih meyakinkan. Terdakwa bebas demi hukum. Kasus ini merugikan instansi Anda." + falseMsg;
            fundsChange = -1500 - penalty;
            repChange = -10;
            corrChange = +3;
        }

        return this.applyResult(title, desc, pScore, dScore, fundsChange, repChange, corrChange);
    },

    // Option 3: Direct Arrest (High Risk, High Reward)
    resolveArrest() {
        const c = this.getCurrentCase();
        const pScore = this.getEvidenceScore();
        const falseEv = this.getFalseEvidenceCount();
        
        let title, desc, fundsChange, repChange, corrChange;

        // Arrest requires very strong internal evidence to succeed without court
        if (c.isCorrupt && pScore >= 2.5 && falseEv === 0) {
            title = "PENANGKAPAN SUKSES";
            desc = "Tindakan berani dan akurat! Tersangka langsung ditangkap tangan beserta bukti tak terbantahkan. Publik bersorak.";
            fundsChange = 4000;
            repChange = 25;
            corrChange = -10;
        } else {
            // Failed arrest
            title = "SALAH TANGKAP / BUKTI LEMAH";
            desc = "Tindakan gegabah! Penangkapan dilakukan dengan bukti yang kurang kuat atau cacat secara hukum. Tersangka menuntut balik pemerintah dengan nilai fantastis.";
            fundsChange = -4000;
            repChange = -30;
            corrChange = +8;
        }

        return this.applyResult(title, desc, pScore, "-", fundsChange, repChange, corrChange);
    },

    applyResult(title, desc, pScore, dScore, fundsChange, repChange, corrChange) {
        this.funds += fundsChange;
        this.reputation = Math.max(0, Math.min(100, this.reputation + repChange));
        this.corruption = Math.max(0, Math.min(100, this.corruption + corrChange));
        
        if (!this.completedCases.includes(this.currentCaseId)) {
            this.completedCases.push(this.currentCaseId);
        }
        this.caseStars[this.currentCaseId] = Math.max(this.getCaseStars(this.currentCaseId), this.getQuestStars());

        this.currentLevel = this.calculateLevelFromCases();

        this.saveGame();

        return {
            title, desc, pScore, dScore, fundsChange, repChange, corrChange,
            isGameOver: this.funds <= 0 || this.completedCases.length >= GAME_DATA.cases.length,
            endingId: this.funds <= 0 ? "negative" : this.determineEnding()
        };
    },

    determineEnding() {
        if (this.corruption > 60) return "negative";
        if (this.corruption > 30) return "neutral";
        if (this.corruption > 10) return "positive";
        return "perfect";
    }
};

window.game = GameState;
