class ChickenRoadGame {
    constructor() {
        this.game = document.getElementById("game");
        this.char = document.getElementById("game-char");
        this.field = document.getElementById("game-field");
        this.sectors = document.querySelectorAll(".game__sector");

        this.spinButton = document.getElementById("go-btn");
        this.cashButton = document.getElementById("cash-btn");
        this.winButton = document.getElementById("win-button-modal");

        this.modal = document.getElementById("modal");
        this.controls = document.getElementById("game-controls");

        this.rateElement = document.getElementById("rate");
        this.balance = document.getElementById("balance");
        this.modalBalance = document.getElementById("modal-balance");

        this.modalMultiplier = document.getElementById("modal-multiplier");
        this.charMultiplier = document.getElementById("char-multiplier");
        this.charMultiplierElement = document.getElementById("char-multiplier-element");

        this.effectsContainer = document.getElementById("effects");
        this.effectsImage = document.getElementById("effects-image");

        this.rateButtons = document.querySelectorAll(".game-controls__rate-btn");
        this.defaultRateButtons = document.querySelectorAll(".game-controls__defaults-item");
        this.difficultyButtons = document.querySelectorAll(".game-controls__switcher-item");

        this.spinSound = new Audio("../../assets/general/sound/chicken-road-2-button-click.mp3");
        this.jumpSound = new Audio("../../assets/general/sound/chicken-road-2-jump.mp3");
        this.cashOutSound = new Audio("../../assets/general/sound/chicken-road-2-cahout.mp3");
        this.winSound = new Audio("../../assets/general/sound/chicken-road-2-win.mp3");
        this.loseSound = new Audio("../../assets/general/sound/chicken-road-2-lose.mp3");

        this.rate = Number(this.game.dataset.rate) || 100;
        this.spins = Number(this.game.dataset.spins) || 1;
        this.crashes = this.game.dataset.crashes || "1,2,3,4,5";
        this.multipliers = this.game.dataset.multipliers || "1.02,2.25,3.46,5.75,12.3,18.50,24.50";

        this.sectorWidth = this.sectors[0].offsetWidth;
        this.charMoves = 0;
        this.currentStep = 0;
        this.firstStepIndex = 1;
        this.lastStepIndex = 7;
        this.stepTime = 700;
        this.spaceScrolled = window.innerWidth;
        this.isDesktop = window.innerWidth > 768;
        this.currentSpin = 1;
        this.failStep = null;

        this.minRate = 1;
        this.maxRate = 100;
    }

    initGame() {
        this.showNextSector(this.currentStep);

        this.calculateFontSize(this.spinButton);
        this.calculateFontSize(this.cashButton);
        this.calculateFontSize(this.winButton, {
            threshold: 30,
            step: 0.02,
            minPercent: 0.6
        });

        this.initRateControls();
        this.initDifficultyControls();
        this.setInitialActiveRateButton();

        this.updateBalance(this.currentStep);
        this.updateMultiplier(this.currentStep);

        window.addEventListener("placementOpenModal", () => {
            this.showModal();
        });

        this.spinButton.addEventListener("click", () => {
            this.setTemporaryButtonActive(this.spinButton);
            this.initSpin();
        });

        this.cashButton.addEventListener("click", () => {
            this.setTemporaryButtonActive(this.cashButton);
            this.handleCashOut();
        });
    }

    setTemporaryButtonActive(button, duration = 180) {
        if (!button) return;

        button.classList.add("is--active");

        setTimeout(() => {
            button.classList.remove("is--active");
        }, duration);
    }

    setRate(value, activeButton = null) {
        const cleanValue = Number(value);

        if (Number.isNaN(cleanValue)) return;

        this.rate = cleanValue;
        this.game.dataset.rate = String(cleanValue);

        if (this.rateElement) {
            this.rateElement.innerText = String(cleanValue);
        }

        this.clearRateActiveButtons();

        if (activeButton) {
            activeButton.classList.add("is--active");
        }

        this.updateBalance(this.currentStep);
    }

    clearRateActiveButtons() {
        this.rateButtons.forEach((button) => {
            button.classList.remove("is--active");
        });

        this.defaultRateButtons.forEach((button) => {
            button.classList.remove("is--active");
        });
    }

    setInitialActiveRateButton() {
        this.clearRateActiveButtons();

        let activeFound = false;

        this.defaultRateButtons.forEach((button) => {
            const valueElement = button.querySelector(".game-controls__defaults-item-value");

            if (!valueElement) return;

            const value = Number(valueElement.innerText.trim());

            if (value === this.rate) {
                button.classList.add("is--active");
                activeFound = true;
            }
        });

        if (activeFound) return;

        this.rateButtons.forEach((button) => {
            const buttonText = button.innerText.trim().toUpperCase();

            if (buttonText === "MIN" && this.rate === this.minRate) {
                button.classList.add("is--active");
            }

            if (buttonText === "MAX" && this.rate === this.maxRate) {
                button.classList.add("is--active");
            }
        });
    }

    initRateControls() {
        this.rateButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (this.currentStep !== 0) return;

                const buttonText = button.innerText.trim().toUpperCase();

                if (buttonText === "MIN") {
                    this.setRate(this.minRate, button);
                }

                if (buttonText === "MAX") {
                    this.setRate(this.maxRate, button);
                }
            });
        });

        this.defaultRateButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (this.currentStep !== 0) return;

                const valueElement = button.querySelector(".game-controls__defaults-item-value");

                if (!valueElement) return;

                const value = Number(valueElement.innerText.trim());

                this.setRate(value, button);
            });
        });
    }

    initDifficultyControls() {
        const difficultySettings = {
            Easy: {
                multipliers: "1.02,2.25,3.46,5.75,12.3,18.50,24.50",
                crashes: "1,2,3,4,5"
            },
            Medium: {
                multipliers: "1.20,2.80,5.00,9.50,18.00,35.00,70.00",
                crashes: "1,2,3,4,5"
            },
            Hard: {
                multipliers: "1.50,4.00,9.00,20.00,45.00,100.00,250.00",
                crashes: "1,2,3,4,5"
            },
            Hardcore: {
                multipliers: "2.00,8.00,25.00,80.00,250.00,800.00,2500.00",
                crashes: "1,2,3,4,5"
            }
        };

        this.difficultyButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (this.currentStep !== 0) return;

                const difficulty = button.innerText.trim();
                const settings = difficultySettings[difficulty];

                if (!settings) return;

                this.difficultyButtons.forEach((item) => {
                    item.classList.remove("is--active");
                });

                button.classList.add("is--active");

                this.multipliers = settings.multipliers;
                this.crashes = settings.crashes;

                this.game.dataset.multipliers = settings.multipliers;
                this.game.dataset.crashes = settings.crashes;

                this.updateSectorMultipliers();
                this.updateBalance(this.currentStep);
                this.updateMultiplier(this.currentStep);
            });
        });
    }

    updateSectorMultipliers() {
        const multipliers = this.multipliers.split(",");
        const sectorValues = document.querySelectorAll(".game__sector-multify-value span");

        sectorValues.forEach((element, index) => {
            const multiplierIndex = Math.floor(index / 2);

            if (multipliers[multiplierIndex]) {
                element.innerText = multipliers[multiplierIndex];
            }
        });
    }

    getFailStep() {
        this.failStep = Number(this.crashes.split(",")[this.currentSpin - 1]) || null;
    }

    initSpin() {
        if (window.isMobile && window.pushPlacement && !window.firstClick && this.currentStep === 0) {
            window.dispatchEvent(
                new CustomEvent("placementFirstClick", {
                    detail: [this.spin.bind(this)]
                })
            );
        } else {
            this.spin();
        }
    }

    spin() {
        this.currentStep += 1;
        this.getFailStep();
        this.playSound(this.spinSound);

        if (
            this.isDesktop &&
            (
                this.currentStep === this.firstStepIndex ||
                this.currentStep === this.lastStepIndex ||
                this.spaceScrolled > this.field.offsetWidth
            )
        ) {
            this.charMoves += 1;
        }

        if (this.currentSpin < this.spins && this.currentStep === this.failStep) {
            this.handleFail();
            return;
        }

        this.playSound(this.jumpSound, 100);
        this.moveChar(this.currentStep);
        this.moveField(this.currentStep);
        this.disableControls(this.stepTime);

        setTimeout(() => {
            this.showNextSector(this.currentStep);
            this.showActiveSector(this.currentStep);
            this.showFinishedSector(this.currentStep);
            this.updateBalance(this.currentStep);
            this.updateMultiplier(this.currentStep);
        }, this.stepTime / 2);

        if (this.currentStep === this.firstStepIndex) {
            this.setControlPanelActivated();
            this.setCashOutActivated();

            setTimeout(() => {
                this.showCharMultiplier();
            }, this.stepTime);
        }

        if (this.currentStep === this.lastStepIndex) {
            this.handleWin();
        }
    }

    handleWin() {
        setTimeout(() => {
            this.hideCharMultiplier();
        }, this.stepTime / 2);

        setTimeout(() => {
            this.charMoves += 1.3;
            this.moveChar(this.currentStep + 1.3);
            this.moveField(this.currentStep + 1.3);
            this.showFinishedSector(this.currentStep + 1);
            this.showEffects(1000);
            this.playSound(this.winSound, 1000);
            this.triggerShowModal(1000);
            this.disableControls(10000);
        }, this.stepTime);
    }

    handleCashOut() {
        this.showEffects();
        this.triggerShowModal();
        this.playSound(this.cashOutSound);
        this.disableControls(10000);
    }

    handleFail() {
        this.setCashOutDisabled();
        this.disableControls(1500);
        this.moveLoseChar(this.currentStep);
        this.moveField(this.currentStep);
        this.hideCharMultiplier();
        this.playSound(this.loseSound, 500);
        this.showLoseSector(this.currentStep);
        this.showFinishedSector(this.currentStep);

        setTimeout(() => {
            this.resetGame();
        }, 1500);
    }

    resetGame() {
        this.currentSpin += 1;
        this.currentStep = 0;
        this.charMoves = 0;
        this.spaceScrolled = window.innerWidth;

        this.char.classList.remove("is--lose");

        this.sectors.forEach((sector) => {
            sector.classList.remove("is--lose");
            sector.classList.remove("is--active");
            sector.classList.remove("is--finished");
            sector.classList.remove("is--next");
        });

        this.char.style.transform = "translateX(0px)";
        this.field.style.transform = "translateX(0px)";

        this.updateBalance(this.currentStep);
        this.updateMultiplier(this.currentStep);
        this.showNextSector(this.currentStep);
    }

    showNextSector(step) {
        const sector = this.sectors[step];

        if (sector) {
            sector.classList.add("is--next");
        }
    }

    showActiveSector(step) {
        const sector = this.sectors[step - 1];

        if (sector) {
            sector.classList.add("is--active");
            sector.classList.remove("is--next");
        }
    }

    showLoseSector(step) {
        const sector = this.sectors[step - 1];

        if (sector) {
            sector.classList.add("is--lose");
            sector.classList.remove("is--next");
        }
    }

    showFinishedSector(step) {
        const sector = this.sectors[step - 2];

        if (sector) {
            sector.classList.add("is--finished");
            sector.classList.remove("is--next");
            sector.classList.remove("is--active");
        }
    }

    moveField(step) {
        const moveX = this.sectorWidth * (step - this.charMoves);

        this.field.style.transform = `translateX(-${moveX}px)`;
        this.spaceScrolled += moveX;
    }

    moveChar(step) {
        this.char.classList.add("is--active");

        if (
            step === this.firstStepIndex ||
            step >= this.lastStepIndex ||
            this.spaceScrolled > this.field.offsetWidth
        ) {
            const moveX = this.sectorWidth * this.charMoves;
            this.char.style.transform = `translateX(${moveX}px)`;
        }

        setTimeout(() => {
            this.char.classList.remove("is--active");
        }, this.stepTime);
    }

    moveLoseChar(step) {
        this.char.classList.add("is--lose");

        if (
            this.isDesktop &&
            (
                step === 1 ||
                step === 7 ||
                this.spaceScrolled > this.field.offsetWidth
            )
        ) {
            const moveX = this.sectorWidth * this.charMoves;
            this.char.style.transform = `translateX(${moveX}px)`;
        }
    }

    updateBalance(step) {
        const multipliers = this.multipliers.split(",");
        const rate = Number(this.rate);

        const balanceValue = step !== 0
            ? (rate * Number(multipliers[step - 1])).toFixed(2)
            : rate.toFixed(2);

        this.balance.innerText = balanceValue;
        this.modalBalance.innerText = balanceValue;
    }

    updateMultiplier(step) {
        const multipliers = this.multipliers.split(",");
        const multiplierValue = step !== 0 ? multipliers[step - 1] : "0";

        this.modalMultiplier.innerText = multiplierValue;
        this.charMultiplier.innerText = multiplierValue;
    }

    showCharMultiplier() {
        this.charMultiplierElement.classList.add("is--active");
    }

    hideCharMultiplier() {
        this.charMultiplierElement.classList.remove("is--active");
    }

    setControlPanelActivated() {
        this.controls.classList.add("is--active");
    }

    setCashOutActivated() {
        this.controls.classList.add("is--cashout-active");
    }

    setCashOutDisabled() {
        this.controls.classList.remove("is--cashout-active");
    }

    disableControls(timeout) {
        this.spinButton.setAttribute("disabled", "");

        if (timeout) {
            setTimeout(() => {
                this.spinButton.removeAttribute("disabled");
            }, timeout);
        }
    }

    showEffects(delay = 0, duration = 1500) {
        this.effectsContainer.classList.add("visible");
        this.effectsContainer.classList.remove("hidden");

        setTimeout(() => {
            const effectBlock = document.createElement("div");

            effectBlock.style.backgroundImage = `url(${this.effectsImage.src})`;
            effectBlock.classList.add("effects__block");

            this.effectsContainer.appendChild(effectBlock);

            setTimeout(() => {
                this.effectsContainer.classList.remove("visible");
                this.effectsContainer.classList.add("hidden");
            }, duration);
        }, delay);
    }

    showModal() {
        document.body.classList.add("is--modal-open");
        this.modal.classList.add("is--active");
    }

    playSound(sound, delay = 0) {
        setTimeout(() => {
            sound.muted = false;
            sound.currentTime = 0;

            sound.play().catch((error) => {
                console.error("Audio playback error:", error);
            });
        }, delay);
    }

    triggerShowModal(delay = 0) {
        setTimeout(() => {
            window.dispatchEvent(new Event("placementOpenModal"));
        }, delay);
    }

    calculateFontSize(element, options = { threshold: 25, step: 0.03, minPercent: 0.6 }) {
        if (!element) return;

        const spans = element.querySelectorAll("span");

        spans.forEach((span) => {
            const textLength = String(span.innerText).length;
            const computedStyle = window.getComputedStyle(span);
            const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
            const originalSize = fontSize;
            const minimumSize = fontSize * options.minPercent;
            const overflowLength = Math.max(0, textLength - options.threshold);
            const newSize = Math.max(
                originalSize - overflowLength * (fontSize * options.step),
                minimumSize
            );

            span.style.fontSize = `${newSize}px`;
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ChickenRoadGame().initGame();
});