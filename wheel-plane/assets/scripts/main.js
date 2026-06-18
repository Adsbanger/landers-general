import {
    makeExit,
    makeRedirect
} from "./shared-SX2B747D.js";
import {
    parseConfig
} from "./shared-4COQCWMM.js";
import "./shared-5XR54UIB.js";
import {
    getTranslations
} from "./shared-PQWVR7YF.js";
import "./shared-IZBMCQM6.js";
var CURRENT_QUESTION_KEY = "step";

function removeUrlParameter(paramKey) {
    const url = window.location.href;
    const r = new URL(url);
    r.searchParams.delete(paramKey);
    const newUrl = r.href;
    window.history.replaceState(window.history.state, "", newUrl);
}
var getCurrentStepFromURL = (key = CURRENT_QUESTION_KEY, shouldDeleteKey = true) => {
    const url = new URL(window.location.href);
    const step = url.searchParams.get(key);
    if (shouldDeleteKey) removeUrlParameter(key);
    return step;
};
var getTranslation = (translations, key, defaultValue = "No data") => {
    if (!key || !translations[key]) {
        console.warn(!key ? "Key is not found" : `Key "${key}" is not found in translation files.`);
        return defaultValue;
    }
    return translations[key];
};
var tabUnderClick = async (config, newTabParamValue, key = CURRENT_QUESTION_KEY) => {
    const newTab = new URL(window.location.href);
    newTab.searchParams.append(key, newTabParamValue.toString());
    makeExit({
            ...config,
            tabUnderClick: {
                ...config.tabUnderClick,
                newTab: {
                    url: newTab.toString()
                }
            }
        },
        "tabUnderClick"
    );
};
var loadFallbackTranslation = async () => {
    return {
        spin_now: "SPIN NOW",
        spin: "SPIN",
        title_time: "You only have {timer} to spin the wheel",
        text_attempts: "Attempts",
        congratulations: "Congratulations!",
        text_congrats: `Today's your lucky day - you've been selected to spin the wheel!`,
        start: "START",
        age_question: "Are you over 21 years old?",
        no: "NO",
        yes: "YES",
        bad_luck: "Bad Luck!",
        try_again_translated: "TRY AGAIN",
        final_text: "A personalized offer is waiting for you! Just press the CONTINUE button!",
        continue: "CONTINUE",
        answer_questions_count: "Answer all questions to continue"
    };
};
var SELECTORS = {
    spinScreen: "#spin-screen",
    wheelContainer: "#wheel-container",
    timerText: "#timer-text",
    timerDisplay: "#timer-display",
    attemptsValue: "#attempts-value",
    modalInitial: "#modal-initial",
    modalAge: "#modal-age",
    modalSecond: "#modal-second",
    modalFinal: "#modal-final",
    wheelSegments: ".wheel-segments"
};
var URL_PARAMS = {
    first_click: "first_click"
};
var WHEEL_SEGMENTS = [{
        id: 1,
        value: "10 000",
        rotate: -50,
        left: "7%",
        top: "23%"
    },
    {
        id: 2,
        value: "3 FREE\nSPINS",
        rotate: 0,
        left: "28%",
        top: "10%"
    },
    {
        id: 3,
        value: "2 FREE\nSPINS",
        rotate: 45,
        left: "50%",
        top: "20%"
    },
    {
        id: 4,
        value: "SPECIAL\nOFFER",
        rotate: 90,
        left: "65%",
        top: "42%"
    },
    {
        id: 5,
        value: "10 000",
        rotate: 137,
        left: "50%",
        top: "59%"
    },
    {
        id: 6,
        value: "TRY\nAGAIN",
        rotate: 177,
        left: "33%",
        top: "80%"
    },
    {
        id: 7,
        value: "20 000",
        rotate: 223,
        left: "10%",
        top: "65%"
    },
    {
        id: 8,
        value: "TRY\nAGAIN",
        rotate: 270,
        left: "-5%",
        top: "45%"
    }
];
var WHEEL_SEGMENTS_MOBILE = [{
        id: 1,
        value: "10 000",
        rotate: -50,
        left: "12%",
        top: "27%"
    },
    {
        id: 2,
        value: "3 FREE\nSPINS",
        rotate: 0,
        left: "28%",
        top: "19%"
    },
    {
        id: 3,
        value: "2 FREE\nSPINS",
        rotate: 45,
        left: "45%",
        top: "25%"
    },
    {
        id: 4,
        value: "SPECIAL\nOFFER",
        rotate: 90,
        left: "54%",
        top: "42%"
    },
    {
        id: 5,
        value: "10 000",
        rotate: 137,
        left: "47%",
        top: "59%"
    },
    {
        id: 6,
        value: "TRY\nAGAIN",
        rotate: 177,
        left: "32%",
        top: "67%"
    },
    {
        id: 7,
        value: "20 000",
        rotate: 223,
        left: "15%",
        top: "60%"
    },
    {
        id: 8,
        value: "TRY\nAGAIN",
        rotate: 270,
        left: "5%",
        top: "45%"
    }
];
var DEFAULT_INITIAL_TIME_LEFT = 165;
var COUNT_ATTEMPTS = 3;
var MODAL_OPEN_DELAY = 2300;
var AGE_MODAL_OPEN_DELAY = 1e3;
var ONE_SECOND_MS = 1e3;
var SPIN_TO_NOTHING_ANGLE = 0;
var WHEEL_ANGLE_STORAGE_KEY = "wheel_plane_saved_angle";
var AGE_ANSWER_SPIN_ANGLE = 1530;
var AFTER_TRY_AGAIN_SPIN_ANGLE = 1351;
(async () => {
    const config = parseConfig(APP_CONFIG);
    if (!config) return;
    const translations = await getTranslations(loadFallbackTranslation);
    const getTranslationText = (key, fallback = "") => {
        return getTranslation(translations, key, fallback);
    };
    const applyTranslations = () => {
        const elementsToTranslate = document.querySelectorAll("[data-translate]");
        elementsToTranslate.forEach((element) => {
            const key = element.getAttribute("data-translate");
            if (key) {
                if (key === "title_time" && element.id === "timer-text") {
                    renderTimerPhrase(getFormattedTime());
                    return;
                }
                const translatedText = getTranslationText(key, element.textContent || "");
                if (element.hasAttribute("data-translate-html")) {
                    element.innerHTML = translatedText;
                } else {
                    element.textContent = translatedText;
                }
            }
        });
    };
    const wheelContainer = document.querySelector(SELECTORS.wheelContainer);
    const timerText = document.querySelector(SELECTORS.timerText);
    const timerDisplay = document.querySelector(SELECTORS.timerDisplay);
    const attemptsValue = document.querySelector(SELECTORS.attemptsValue);
    const modalInitial = document.querySelector(SELECTORS.modalInitial);
    const modalAge = document.querySelector(SELECTORS.modalAge);
    const modalSecond = document.querySelector(SELECTORS.modalSecond);
    const modalFinal = document.querySelector(SELECTORS.modalFinal);
    const wheelSegments = document.querySelector(SELECTORS.wheelSegments);
    const getInitialTimeLeft = () => {
        var _a;
        const configuredTimeToRedirect = Number(
            (_a = config.autoexit) == null ? void 0 : _a.timeToRedirect
        );
        if (!Number(configuredTimeToRedirect) || Number(configuredTimeToRedirect) <= 0) {
            return DEFAULT_INITIAL_TIME_LEFT;
        }
        return Math.floor(Number(configuredTimeToRedirect));
    };
    let currentStep = "initial";
    let attempt = COUNT_ATTEMPTS;
    let timeLeft = getInitialTimeLeft();
    let isSpinning = false;
    const isMobile = window.innerWidth < 768;
    const formatTime = (value) => value.toString().padStart(2, "0");
    const getFormattedTime = () => {
        const minutes = formatTime(Math.floor(timeLeft / 60));
        const seconds = formatTime(timeLeft % 60);
        return `${minutes}:${seconds}`;
    };
    const renderTimerPhrase = (formattedTime) => {
        if (!timerText) return;
        const timerTemplate = getTranslationText("title_time", "{timer}");
        const timerHTML = `<span class="timer-highlight" id="timer-display">${formattedTime}</span>`;
        const isTimerPlaceholder = timerTemplate.includes("{timer}");
        if (isTimerPlaceholder) {
            timerText.innerHTML = timerTemplate.replace("{timer}", timerHTML);
            return;
        }
        timerText.innerHTML = `${timerTemplate} ${timerHTML}`;
    };
    const updateTimer = () => {
        const formattedTime = getFormattedTime();
        renderTimerPhrase(formattedTime);
        if (timerDisplay) {
            timerDisplay.textContent = formattedTime;
        }
    };
    const updateAttempts = () => {
        if (attemptsValue) {
            attemptsValue.textContent = attempt.toString();
        }
    };
    const saveWheelAngle = (angle) => {
        try {
            sessionStorage.setItem(WHEEL_ANGLE_STORAGE_KEY, String(angle));
        } catch (error) {
            console.warn("Failed to save wheel angle", error);
        }
    };
    const getSavedWheelAngle = () => {
        try {
            const rawValue = sessionStorage.getItem(WHEEL_ANGLE_STORAGE_KEY);
            if (!rawValue) return null;
            const parsedValue = Number(rawValue);
            if (Number.isNaN(parsedValue)) return null;
            return parsedValue;
        } catch (error) {
            console.warn("Failed to read saved wheel angle", error);
            return null;
        }
    };
    const applySavedWheelAngle = (angle) => {
        if (!wheelContainer || angle === null) return;
        wheelContainer.style.transform = `rotate(${angle}deg)`;
    };
    const initWheelSegments = () => {
        if (!wheelSegments) return;
        const segments = isMobile ? WHEEL_SEGMENTS_MOBILE : WHEEL_SEGMENTS;
        wheelSegments.innerHTML = "";
        segments.forEach((segment) => {
            const segmentDiv = document.createElement("div");
            segmentDiv.className = "wheel-segment";
            segmentDiv.style.transform = `rotate(${segment.rotate}deg)`;
            segmentDiv.style.left = segment.left;
            segmentDiv.style.top = segment.top;
            const valueP = document.createElement("p");
            valueP.textContent = segment.value;
            segmentDiv.appendChild(valueP);
            wheelSegments.appendChild(segmentDiv);
        });
    };
    const showModal = (modal) => {
        if (modal) {
            modal.classList.remove("hidden");
        }
    };
    const hideModal = (modal) => {
        if (modal) {
            modal.classList.add("hidden");
        }
    };
    const finishSpinWithDelay = ({
        animationClassName,
        finalAngle,
        modalToShow,
        delayMs
    }) => {
        setTimeout(() => {
            wheelContainer == null ? void 0 : wheelContainer.classList.remove(animationClassName);
            wheelContainer == null ? void 0 : wheelContainer.style.setProperty("transform", `rotate(${finalAngle}deg)`);
            saveWheelAngle(finalAngle);
            showModal(modalToShow);
            isSpinning = false;
        }, delayMs);
    };
    const runSpinStep = ({
        finalAngle,
        modalToShow,
        delayMs,
        nextStep
    }) => {
        const animationClassName = finalAngle === SPIN_TO_NOTHING_ANGLE ? "spinning-to-nothing" : `spinning-to-prize-${finalAngle}`;
        wheelContainer == null ? void 0 : wheelContainer.classList.add(animationClassName);
        finishSpinWithDelay({
            animationClassName,
            finalAngle,
            modalToShow,
            delayMs
        });
        currentStep = nextStep;
    };
    const handleTabUnderRedirect = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const isFirstClick = urlParams.get(URL_PARAMS.first_click);
        if (!isFirstClick) {
            await tabUnderClick(config, "1", URL_PARAMS.first_click);
        }
    };
    const handleWheelSpin = async () => {
        if (isSpinning) return;
        isSpinning = true;
        wheelContainer == null ? void 0 : wheelContainer.classList.remove("wheel-initial-sway");
        wheelContainer == null ? void 0 : wheelContainer.style.removeProperty("transform");
        attempt -= 1;
        updateAttempts();
        if (currentStep === "initial") {
            await handleTabUnderRedirect();
            runSpinStep({
                finalAngle: SPIN_TO_NOTHING_ANGLE,
                modalToShow: modalAge,
                delayMs: AGE_MODAL_OPEN_DELAY,
                nextStep: "first"
            });
        } else if (currentStep === "first") {
            runSpinStep({
                finalAngle: AGE_ANSWER_SPIN_ANGLE,
                modalToShow: modalSecond,
                delayMs: MODAL_OPEN_DELAY,
                nextStep: "second"
            });
        } else if (currentStep === "second") {
            runSpinStep({
                finalAngle: AFTER_TRY_AGAIN_SPIN_ANGLE,
                modalToShow: modalFinal,
                delayMs: MODAL_OPEN_DELAY,
                nextStep: "final"
            });
        }
    };
    const initTimer = () => {
        updateTimer();
        const timerInterval = setInterval(() => {
            timeLeft -= 1;
            updateTimer();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                makeRedirect(config, "autoexit");
            }
        }, ONE_SECOND_MS);
    };
    const firstClickFromURL = getCurrentStepFromURL(URL_PARAMS.first_click, false);
    const savedWheelAngle = getSavedWheelAngle();
    if (savedWheelAngle !== null) {
        applySavedWheelAngle(savedWheelAngle);
    }
    if (firstClickFromURL) {
        currentStep = "initial";
        attempt = COUNT_ATTEMPTS;
        updateAttempts();
        handleWheelSpin();
    } else {
        wheelContainer == null ? void 0 : wheelContainer.classList.add("wheel-initial-sway");
        setTimeout(() => {
            showModal(modalInitial);
        }, AGE_MODAL_OPEN_DELAY);
    }
    const modalInitialBtn = document.querySelector("#modal-initial-btn");
    if (modalInitialBtn) {
        modalInitialBtn.addEventListener("click", () => {
            hideModal(modalInitial);
            handleTabUnderRedirect();
        });
    }
    const modalAgeNo = document.querySelector("#modal-age-no");
    if (modalAgeNo) {
        modalAgeNo.addEventListener("click", async () => {
            hideModal(modalAge);
            await makeExit(config, "ageExit");
        });
    }
    const modalAgeYes = document.querySelector("#modal-age-yes");
    if (modalAgeYes) {
        modalAgeYes.addEventListener("click", () => {
            hideModal(modalAge);
            handleWheelSpin();
        });
    }
    const modalSecondBtn = document.querySelector("#modal-second-btn");
    if (modalSecondBtn) {
        modalSecondBtn.addEventListener("click", () => {
            hideModal(modalSecond);
            handleWheelSpin();
        });
    }
    const modalFinalBtn = document.querySelector("#modal-final-btn");
    if (modalFinalBtn) {
        modalFinalBtn.addEventListener("click", async () => {
            await makeExit(config, "mainExit");
        });
    }
    applyTranslations();
    initWheelSegments();
    initTimer();
    updateAttempts();
})();