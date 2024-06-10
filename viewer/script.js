const content_box = document.getElementById("content");
const lineNumbers = document.getElementById("line-numbers");

const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get("path");
const theme = urlParams.get("theme");

const lastSlash = path.lastIndexOf("\\");
document.getElementById("filename").innerText = path.substring(lastSlash + 1);

var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";

switch (theme) {
  case "dark": {
    link.href = "atom-one-dark.min.css";
    break;
  }
  case "light": {
    link.href = "atom-one-light.min.css";
    break;
  }
}

function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

document.head.appendChild(link);

const extensionClassMap = {
  "language-python": ["py"],
  "language-css": ["css"],
  "language-html": ["html", "htm"],
  "language-scss": ["scss"],
  "language-js": ["js"],
  "language-rust": ["rs"],
  "language-cpp": ["cpp", "c++", "h"],
  "language-csharp": ["cs"],
  "language-java": ["java"],
  "language-yaml": ["yaml"],
  "language-typescript": ["ts"],
  "language-powershell": ["ps1", "psm1", "psd1", "ps"],
  "language-php": ["php"],
  "language-ruby": ["rb"],
  "language-swift": ["swift"],
  "language-go": ["go"],
  "language-perl": ["pl"],
  "language-r": ["R", "r"],
  "language-shell": ["sh", "console"],
  "language-clojure": ["clj"],
  "language-scala": ["scala"],
  "language-haskell": ["hs"],
  "language-lua": ["lua"],
  "language-erlang": ["erl"],
  "language-sql": ["sql"],
  "language-xml": ["xml"],
  "language-json": ["json"],
  "language-dockerfile": ["dockerfile"],
  "language-makefile": ["makefile"],
  "language-tcl": ["tcl"],
  "language-fortran": ["f", "for", "f90", "f95"],
  "language-less": ["less"],
  "language-stylus": ["styl"],
  "language-coffeescript": ["coffee", "cson", "iced"],
  "language-javascript": ["jsx"],
  "language-ada": ["ada"],
  "language-brainfuck": ["bf"],
  "language-dns": ["dns", "zone", "bind"],
  "language-haxe": ["hx"],
  "language-ini": ["ini", "toml"],
  "language-julia-repl": ["julia-repl"],
  "language-kotlin": ["kt", "kts"]
};

const lastDot = path.lastIndexOf(".");
const extension = path.substring(lastDot + 1);

let className;

for (const [key, extensions] of Object.entries(extensionClassMap)) {
  if (extensions.includes(extension)) {
    className = key;
    break;
  }
}

if (className) {
  content_box.classList.add(className);
}

(async function () {
  const fs = require("fs");
  const content = await fs.promises.readFile(path, "utf8");

  content_box.innerHTML = escapeHTML(content);

  let style = window.getComputedStyle(content_box);

  let totalHeight = content_box.offsetHeight - 20;

  let lines = Math.floor(totalHeight / 15);

  numbers = "";
  for (let i = 1; i <= lines; i++) {
    numbers += i + "\n";
  }
  lineNumbers.innerHTML = numbers;

  hljs.highlightAll();
})();
