import {
    makeExit
} from "./shared-GJQ3EDPC.js";
import {
    parseConfig
} from "./shared-YOBGUKJZ.js";
import "./shared-KTIGGNNS.js";
import "./shared-5YO44CBQ.js";
var CURRENT_QUESTION_KEY = "step";
var tabUnderClick = async (config, newTabParamValue, key = CURRENT_QUESTION_KEY) => {
    const newTab = new URL(window.location.href);
    newTab.searchParams.set(key, newTabParamValue.toString());
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
document.addEventListener("DOMContentLoaded", function() {
    const config = parseConfig();
    const firstScreen = document.getElementById("firstScreen");
    const finalScreen = document.getElementById("finalScreen");
    const chestSection = document.getElementById("chestSection");
    const claimBtn = document.getElementById("claimBtn");

    function showFinalScreen() {
        firstScreen == null ? void 0 : firstScreen.classList.remove("active");
        finalScreen == null ? void 0 : finalScreen.classList.add("active");
    }
    const savedStep = sessionStorage.getItem("luck-chest-step");
    if (savedStep === "finalScreen") {
        showFinalScreen();
    }
    chestSection == null ? void 0 : chestSection.addEventListener("click", function() {
        var _a;
        sessionStorage.setItem("luck-chest-step", "finalScreen");
        showFinalScreen();
        if ((_a = config.tabUnderClick) == null ? void 0 : _a.currentTab) tabUnderClick(config, "1");
    });
    claimBtn == null ? void 0 : claimBtn.addEventListener("click", function() {
        makeExit(config, "mainExit");
    });
});