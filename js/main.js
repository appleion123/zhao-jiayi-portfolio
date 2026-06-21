/* Zhao Jiayi Portfolio - main.js | Updated 2026-06-20 */
﻿const showcaseWorks = [
  { title: "Bleeding Edge", desc: "《Bleeding Edge》游戏音效重制项目，涵盖角色技能、环境音效与战斗反馈设计", file: "videos/bleeding-edge.mp4" },
  { title: "\u300a\u7edd\u533a\u96f6\u300b\u8fc7\u573a\u52a8\u753b", desc: "\u300a\u7edd\u533a\u96f6\u300b\u8fc7\u573a\u52a8\u753b\u58f0\u97f3\u8bbe\u8ba1\u91cd\u5236\uff0c\u7cbe\u7ec6\u8fd8\u539f\u6e38\u620f\u6218\u6597\u97f3\u6548", file: "videos/zzz-cutscene.mp4" },
  { title: "\u52a8\u6f2b\u914d\u97f3\u4e0e\u97f3\u6548\u5236\u4f5c", desc: "\u52a8\u6f2b\u89d2\u8272\u914d\u97f3 \u00b7 \u97f3\u6548\u8bbe\u8ba1\u4e0e\u5236\u4f5c", file: "videos/anime-dub.mp4", startTime: 23 },
  { title: "\u5e7f\u544a\u7247\u914d\u97f3\u548c\u97f3\u6548\u5236\u4f5c", desc: "\u5546\u4e1a\u5e7f\u544a\u914d\u97f3 \u00b7 \u54c1\u724c\u97f3\u6548\u8bbe\u8ba1 \u00b7 \u540e\u671f\u6df7\u97f3\u5236\u4f5c", file: "videos/commercial-dub.mp4" },
  { title: "\u77ed\u5267\u914d\u97f3\u548c\u97f3\u6548\u5236\u4f5c", desc: "\u77ed\u5267\u89d2\u8272\u914d\u97f3 \u00b7 \u573a\u666f\u97f3\u6548\u8bbe\u8ba1 \u00b7 \u58f0\u97f3\u540e\u671f\u5236\u4f5c", file: "videos/short-drama.mp4" }
];
const demoWorks = [
  { title: "\u7edd\u533a\u96f6", desc: "\u300a\u7edd\u533a\u96f6\u300b\u5de5\u7a0b\u6f14\u793a \u00b7 \u97f3\u4e50\u5236\u4f5c\u5de5\u7a0b", file: "videos/zzz-demo.mp4" },
  { title: "wwise\u6e38\u620f\u4e2d\u95f4\u4ef6\u67b6\u6784", desc: "Wwise\u6e38\u620f\u97f3\u9891\u4e2d\u95f4\u4ef6\u67b6\u6784\u8bbe\u8ba1\u4e0e\u5b9e\u73b0", file: "videos/wwise-demo.mp4" },
  { title: "\u914d\u4e50\u4f5c\u54c1", desc: "\u539f\u521b\u914d\u4e50 \u00b7 \u97f3\u4e50\u5236\u4f5c \u00b7 \u5f71\u89c6\u914d\u4e50\u8bbe\u8ba1", file: "videos/music-demo.mp4" },
  { title: "\u50cf\u6211\u4eec\u4ece\u524d", desc: "\u300a\u50cf\u6211\u4eec\u4ece\u524d\u300b\u97f3\u4e50\u5236\u4f5c\u5de5\u7a0b\u6f14\u793a\uff0c\u5c55\u793a\u7f16\u66f2\u3001\u6df7\u97f3\u4e0e\u58f0\u97f3\u8bbe\u8ba1\u7684\u5b8c\u6574\u6d41\u7a0b", file: "videos/xiangwomen-demo.mp4" }
];

function formatTime(s) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}
function createCard(w) {
  const file = w.file, title = w.title, desc = w.desc || "", startSec = w.startTime, endSec = w.endTime;
  const card = document.createElement("div");
  card.className = "works-item";
  const vid = document.createElement("video");
  vid.src = file; vid.preload = window.innerWidth < 768 ? "none" : "metadata"; vid.setAttribute("playsinline", "");
  const playIcon = document.createElement("div");
  const labelOverlay = document.createElement('div');
  labelOverlay.className = 'thumb-label';
  labelOverlay.textContent = title;

  playIcon.className = "play-icon";
  playIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg>';
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.appendChild(vid);
  thumb.appendChild(labelOverlay);
  thumb.appendChild(playIcon);
  const label = document.createElement("h3");
  label.textContent = title;
  const descEl = document.createElement("p");
  descEl.className = "works-desc";
  descEl.textContent = desc;
  const bar = document.createElement("div");
  bar.className = "audio-bar";
  const playBtn = document.createElement("button");
  playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg>';
  const track = document.createElement("div");
  track.className = "track";
  const fill = document.createElement("div");
  fill.className = "track-fill";
  track.appendChild(fill);
  const timeEl = document.createElement("span");
  timeEl.className = "time";
  function doPlay() {
    document.querySelectorAll('.works-item video').forEach(function(v){if(v!==vid&&!v.paused)v.pause()});
    if (startSec != null) vid.currentTime = startSec;
    vid.play();
  }
  function togglePlay() {
    if (vid.paused) { doPlay(); playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'; }
    else { vid.pause(); playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg>'; }
  }
  playBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePlay(); });
  thumb.addEventListener("click", function() {
    doPlay();
    var el = vid;
    if (el.requestFullscreen) { el.requestFullscreen(); }
    else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen(); }
    else if (el.msRequestFullscreen) { el.msRequestFullscreen(); }
  });
  track.addEventListener("click", (e) => {
    const rect = track.getBoundingClientRect();
    var t = ((e.clientX - rect.left) / rect.width) * (vid.duration || 0);
    if (startSec != null && t < startSec) t = startSec;
    if (endSec != null && t > endSec) t = endSec;
    vid.currentTime = t;
  });
  vid.addEventListener("timeupdate", () => {
    if (endSec != null && vid.currentTime >= endSec) { vid.pause(); vid.currentTime = startSec || 0; }
    const d = endSec != null ? (endSec - (startSec || 0)) : vid.duration;
    const cur = endSec != null ? (vid.currentTime - (startSec || 0)) : vid.currentTime;
    const pct = d ? (cur / d) : 0;
    fill.style.width = (pct * 100) + "%";
    var displayDur = endSec != null ? (endSec - (startSec || 0)) : vid.duration;
    var displayCur = vid.paused && vid.currentTime == (startSec || 0) ? displayDur : cur;
    timeEl.textContent = formatTime(cur) + " / " + formatTime(displayDur);
  });
  vid.addEventListener("ended", () => {
    playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg>';
    fill.style.width = "0%";
  });
  vid.addEventListener('canplay', function(){labelOverlay.classList.add('fade')});
  vid.addEventListener('loadedmetadata', () => {
    if (typeof vid.videoHeight !== "undefined" && vid.videoHeight > vid.videoWidth) {
      vid.style.objectFit = "contain";
      vid.style.background = "#111";
    }
    if (vid.duration && vid.duration < Infinity) {
      var d = endSec != null ? (endSec - (startSec || 0)) : vid.duration;
      timeEl.textContent = formatTime(0) + " / " + formatTime(d);
    }
  });
  vid.addEventListener("error", function() {
    var msg = document.createElement("div");
    msg.style.cssText = "display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-size:0.72rem;text-align:center;padding:0 1rem";
    msg.textContent = "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25";
    thumb.innerHTML = "";
    thumb.appendChild(msg);
  });

  bar.appendChild(playBtn);
  bar.appendChild(track);
  bar.appendChild(timeEl);

  card.appendChild(thumb);
  card.appendChild(label);
  if (desc) card.appendChild(descEl);
  card.appendChild(bar);
  return card;
}

document.getElementById("showcase-grid") && showcaseWorks.forEach(w => document.getElementById("showcase-grid").appendChild(createCard(w)));
document.getElementById("demo-grid") && demoWorks.forEach(w => document.getElementById("demo-grid").appendChild(createCard(w)));








