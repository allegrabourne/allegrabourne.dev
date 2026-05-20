const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    primaryNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            primaryNav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
        });
    });

    document.addEventListener("click", event => {
        if (!primaryNav.classList.contains("open")) return;
        if (!primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
            primaryNav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
        }
    });
}


const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const setTheme = theme => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);

    if (themeToggle) {
        const nextTheme = theme === "dark" ? "light" : "dark";
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
        const icon = themeToggle.querySelector(".theme-toggle-icon");
        if (icon) {
            icon.textContent = theme === "dark" ? "☼" : "☾";
        }
    }
};

const savedTheme = localStorage.getItem("site-theme") || getSystemTheme();
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") || getSystemTheme();
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
}
