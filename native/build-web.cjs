// Copies the website into www/ and adds the native bridge, for the Capacitor app.
const fs = require("fs");
const { execSync } = require("child_process");
fs.mkdirSync("www", { recursive: true });
execSync("npx esbuild native/entry.js --bundle --format=iife --outfile=www/native.js", { stdio: "inherit" });
const html = fs.readFileSync("index.html", "utf8");
const anchor = '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>';
if (!html.includes(anchor)) throw new Error("index.html: supabase script tag not found");
fs.writeFileSync("www/index.html", html.replace(anchor, anchor + '\n<script src="native.js"></script>'));
console.log("www/ ready");
