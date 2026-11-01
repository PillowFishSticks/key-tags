// Adds the permissions the app needs and a build number, after `npx cap add android`.
const fs = require("fs");
const manifest = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(manifest, "utf8");
const perms = [
  "android.permission.NFC",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.FOREGROUND_SERVICE_LOCATION",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.WAKE_LOCK",
].filter(p => !m.includes(`"${p}"`)).map(p => `    <uses-permission android:name="${p}" />`).join("\n");
m = m.replace("</manifest>", `${perms}\n    <uses-feature android:name="android.hardware.nfc" android:required="false" />\n</manifest>`);
fs.writeFileSync(manifest, m);

const gradle = "android/app/build.gradle";
const run = process.env.GITHUB_RUN_NUMBER || "1";
let g = fs.readFileSync(gradle, "utf8");
g = g.replace(/versionCode \d+/, `versionCode ${run}`).replace(/versionName "[^"]*"/, `versionName "1.0.${run}"`);
fs.writeFileSync(gradle, g);
console.log("android patched, build", run);
