// Bundled into www/native.js for the Android app only (the website never loads it).
import { Capacitor, CapacitorHttp, registerPlugin } from "@capacitor/core";
import { CapacitorNfc } from "@capgo/capacitor-nfc";

window.KT_NATIVE = {
  Capacitor,
  CapacitorHttp,
  CapacitorNfc,
  BackgroundGeolocation: registerPlugin("BackgroundGeolocation"),
};
