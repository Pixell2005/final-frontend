export function applyTheme() {
  const saved = localStorage.getItem("theme") || "light";

  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
