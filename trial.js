class TrialManager {
    constructor() {
        this.caseData = null;
        this.dominance = 50; // 0 = Defense wins, 100 = Player wins
        this.round = 1;
        this.maxRounds = 5;
        this.usedEvidenceTypes = {}; // track diminishing returns
        this.selectedEvidenceIdx = [];
        this.isGameOver = false;
        
        // DOM Elements
        this.meterBar = document.getElementById('court-meter-bar');
        this.logContainer = document.getElementById('court-log');
        this.handContainer = document.getElementById('court-hand');
        this.roundStatus = document.getElementById('court-round-status');
        this.comboStatus = document.getElementById('court-combo-status');
        this.btnPresent = document.getElementById('btn-court-present');
        this.btnEnd = document.getElementById('btn-court-end');
    }

    startTrial() {
        this.caseData = game.getCurrentCase();
        this.dominance = 50;
        this.round = 1;
        this.usedEvidenceTypes = {};
        this.selectedEvidenceIdx = [];
        this.isGameOver = false;

        this.logContainer.innerHTML = `
            <div class="speech-bubble player">
                <div class="bubble-meta">Hakim</div>
                Sidang perkara ${this.caseData.name} dibuka. Penuntut, silakan ajukan alat bukti Anda.
            </div>
        `;
        
        this.updateMeter();
        this.updateStatus();
        this.renderHand();
        
        document.getElementById('court-result-overlay').classList.remove('active');
        
        // Hide overlay, bind buttons
        this.btnPresent.onclick = () => this.presentEvidence();
        this.btnEnd.onclick = () => this.endTrial();
        this.btnPresent.disabled = true;

        if (window.audio) audio.playTrialStart();
        UI.showScreen('court-screen');
    }

    updateMeter() {
        // Clamp
        this.dominance = Math.max(0, Math.min(100, this.dominance));
        this.meterBar.style.width = `${this.dominance}%`;
    }

    updateStatus() {
        this.roundStatus.innerText = `Ronde: ${this.round} / ${this.maxRounds}`;
        if (this.selectedEvidenceIdx.length === 0) {
            this.comboStatus.innerText = "Pilih 1 Bukti (Atau 2 untuk Rantai Bukti)";
        } else if (this.selectedEvidenceIdx.length === 1) {
            this.comboStatus.innerText = "1 Bukti Terpilih. Pilih 1 lagi untuk digabung (opsional).";
            this.btnPresent.disabled = false;
        } else if (this.selectedEvidenceIdx.length === 2) {
            this.comboStatus.innerText = "Rantai Bukti Siap Diajukan!";
            this.btnPresent.disabled = false;
        }
    }

    renderHand() {
        this.handContainer.innerHTML = '';
        game.collectedEvidence.forEach((ev, idx) => {
            const isUsed = ev.usedInCourt;
            const isSelected = this.selectedEvidenceIdx.includes(idx);
            
            const card = document.createElement('div');
            card.className = `ev-card ${isUsed ? 'used' : ''}`;
            if (isSelected) {
                card.style.borderColor = "#4caf50";
                card.style.backgroundColor = "#e8f5e9";
                card.style.transform = "translateY(-10px)";
            }
            
            const typeLabel = ev.type === "visual" ? "Bukti Visual" : 
                              ev.type === "financial" ? "Bukti Keuangan" : 
                              ev.type === "timeline" ? "Bukti Waktu" : 
                              ev.type === "vendor" ? "Bukti Vendor" : "Bukti Sosial";

            // Support visual description vs social body
            const bodyText = ev.body || ev.desc;

            card.innerHTML = `
                <div class="ev-card-type">${typeLabel}</div>
                <div class="ev-card-text">${bodyText}</div>
            `;

            if (!isUsed) {
                card.onclick = () => this.toggleSelection(idx);
            }
            
            this.handContainer.appendChild(card);
        });
    }

    toggleSelection(idx) {
        if (this.selectedEvidenceIdx.includes(idx)) {
            // Deselect
            this.selectedEvidenceIdx = this.selectedEvidenceIdx.filter(i => i !== idx);
        } else {
            // Select (Max 2)
            if (this.selectedEvidenceIdx.length >= 2) {
                this.selectedEvidenceIdx.shift(); // remove oldest
            }
            this.selectedEvidenceIdx.push(idx);
        }
        this.renderHand();
        this.updateStatus();
    }

    addLog(text, sender, impactClass = null, impactText = null) {
        const bubble = document.createElement('div');
        bubble.className = `speech-bubble ${sender}`;
        
        let meta = sender === 'player' ? 'Anda (Investigator)' : 'Tim Pembela';
        
        bubble.innerHTML = `
            <div class="bubble-meta">${meta}</div>
            <div>${text}</div>
            ${impactClass ? `<div class="impact-text ${impactClass}">${impactText}</div>` : ''}
        `;
        
        this.logContainer.appendChild(bubble);
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }

    presentEvidence() {
        if (this.selectedEvidenceIdx.length === 0) return;
        
        const ev1 = game.collectedEvidence[this.selectedEvidenceIdx[0]];
        const ev2 = this.selectedEvidenceIdx.length > 1 ? game.collectedEvidence[this.selectedEvidenceIdx[1]] : null;

        // Mark as used
        ev1.usedInCourt = true;
        if (ev2) ev2.usedInCourt = true;

        // Calculate Player Power
        let rawPower = (ev1.strength * ev1.validity * 10);
        let type1 = ev1.type || "social";
        
        let pText = `Kami mengajukan bukti: "${ev1.body || ev1.desc}"`;

        // Combo Logic
        if (ev2) {
            rawPower += (ev2.strength * ev2.validity * 10);
            rawPower *= 1.5; // Combo multiplier
            pText = `Kami menggabungkan bukti "${ev1.body || ev1.desc}" dengan fakta bahwa "${ev2.body || ev2.desc}". Keduanya membentuk pola yang jelas!`;
        }

        // Diminishing returns check
        let penalty = 1;
        if (this.usedEvidenceTypes[type1]) {
            penalty -= (this.usedEvidenceTypes[type1] * 0.2); // reduce by 20% for each reuse
        }
        this.usedEvidenceTypes[type1] = (this.usedEvidenceTypes[type1] || 0) + 1;
        
        if (ev2) {
            let type2 = ev2.type || "social";
            if (this.usedEvidenceTypes[type2]) {
                penalty -= (this.usedEvidenceTypes[type2] * 0.2);
            }
            this.usedEvidenceTypes[type2] = (this.usedEvidenceTypes[type2] || 0) + 1;
        }

        penalty = Math.max(0.3, penalty); // Min 30% power
        let finalPlayerPower = rawPower * penalty;

        // Determine if player has strong impact
        let pImpactClass = finalPlayerPower > 8 ? 'impact-strong' : finalPlayerPower < 4 ? 'impact-weak' : null;
        let pImpactText = finalPlayerPower > 8 ? 'TELAK!' : finalPlayerPower < 4 ? 'LEMAH' : null;

        this.addLog(pText, 'player', pImpactClass, pImpactText);
        this.dominance += finalPlayerPower;
        this.updateMeter();

        // Defense Turn
        setTimeout(() => {
            this.defenseTurn(type1, ev2 ? ev2.type : null, finalPlayerPower);
        }, 1500);

        // Clean up UI state
        this.selectedEvidenceIdx = [];
        this.btnPresent.disabled = true;
        this.renderHand();
    }

    defenseTurn(pType1, pType2, pPower) {
        // Defense tries to find a counter argument matching the types
        const defenses = this.caseData.defenses;
        
        // Find best match or random if no match
        let counter = defenses.find(d => d.trigger === pType1 || d.trigger === pType2);
        if (!counter) {
            counter = defenses[Math.floor(Math.random() * defenses.length)];
        }

        let dPower = counter.strength * 10;
        
        // Scale defense power based on case level (harder cases = stronger defense)
        dPower *= (1 + (this.caseData.level * 0.2));

        let dImpactClass = dPower > pPower ? 'impact-weak' : null;
        let dImpactText = dPower > pPower ? 'BANTAHAN KUAT!' : null;

        this.addLog(counter.text, 'defense', dImpactClass, dImpactText);
        
        this.dominance -= dPower;
        this.updateMeter();

        // Next Round
        setTimeout(() => {
            this.round++;
            if (this.round > this.maxRounds || this.dominance <= 0 || this.dominance >= 100) {
                this.endTrial();
            } else {
                this.updateStatus();
            }
        }, 1500);
    }

    endTrial() {
        if (this.isGameOver) return;
        this.isGameOver = true;

        let resultTitle, resultDesc, fundsChange, repChange, corrChange;

        // Result calculation based on dominance
        if (!this.caseData.isCorrupt && this.dominance >= 55) {
            resultTitle = "DAKWAAN GUGUR";
            resultDesc = "Sidang membuktikan proyek ini tidak korup. Ada masalah administrasi, tetapi bukan tindak pidana. Unit Anda mendapat teguran karena terlalu cepat membawa perkara.";
            fundsChange = -1200;
            repChange = -12;
            corrChange = +1;
        } else if (!this.caseData.isCorrupt) {
            resultTitle = "KASUS BERSIH";
            resultDesc = "Anda tidak memaksakan dakwaan. Hakim mencatat proyek bermasalah administratif dan meminta perbaikan tata kelola tanpa kriminalisasi.";
            fundsChange = 800;
            repChange = 8;
            corrChange = -1;
        } else if (this.dominance >= 75) {
            resultTitle = "MENANG TELAK";
            resultDesc = "Dominasi argumen Anda luar biasa. Majelis Hakim menjatuhkan hukuman maksimal tanpa keraguan.";
            fundsChange = 2500;
            repChange = 15;
            corrChange = -8;
        } else if (this.dominance >= 55) {
            resultTitle = "MENANG TIPIS";
            resultDesc = "Sidang berjalan alot, namun argumen Anda sedikit lebih meyakinkan. Terdakwa divonis ringan.";
            fundsChange = 1000;
            repChange = 5;
            corrChange = -2;
        } else {
            resultTitle = "KALAH DI PENGADILAN";
            resultDesc = "Tim pembela berhasil mematahkan dakwaan Anda. Terdakwa bebas demi hukum, institusi Anda kehilangan muka.";
            fundsChange = -1500;
            repChange = -15;
            corrChange = +5;
        }

        // Apply changes to game state
        game.funds += fundsChange;
        game.reputation = Math.max(0, Math.min(100, game.reputation + repChange));
        game.corruption = Math.max(0, Math.min(100, game.corruption + corrChange));
        
        game.updateQuestProgress("trial");
        if (!game.completedCases.includes(this.caseData.id)) {
            game.completedCases.push(this.caseData.id);
        }
        game.caseStars[this.caseData.id] = Math.max(game.getCaseStars(this.caseData.id), game.getQuestStars());
        game.currentLevel = game.calculateLevelFromCases();
        game.saveGame();

        // Show Overlay
        const overlay = document.getElementById('court-result-overlay');
        document.getElementById('court-result-stamp').innerText = resultTitle.includes("KALAH") ? "GAGAL" : "BERHASIL";
        document.getElementById('court-result-stamp').style.color = resultTitle.includes("KALAH") ? "#c62828" : "#2e7d32";
        
        document.getElementById('court-final-score').innerText = `${this.dominance.toFixed(0)}%`;
        
        const fEl = document.getElementById('court-final-funds');
        fEl.innerText = (fundsChange > 0 ? '+ ' : '- ') + Math.abs(fundsChange).toLocaleString('id-ID');
        fEl.style.color = fundsChange > 0 ? "#4caf50" : "#ef5350";

        const rEl = document.getElementById('court-final-rep');
        rEl.innerText = (repChange > 0 ? '+ ' : '') + repChange;
        rEl.style.color = repChange >= 0 ? "#4caf50" : "#ef5350";

        overlay.classList.add('active');

        // Bind next button
        document.getElementById('btn-court-next').onclick = () => {
            if (game.funds <= 0 || game.completedCases.length >= GAME_DATA.cases.length) {
                UI.renderEnding();
            } else {
                UI.renderHub();
                UI.showScreen('hub-screen');
            }
        };
    }
}

window.trialManager = new TrialManager();
