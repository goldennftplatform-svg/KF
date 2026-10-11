import "./style.css";
import "./personal.css";

const media = (file) => `${import.meta.env.BASE_URL}media/${file}`;
const tracks = [
  {
    title: "Diesel n’ Diamonds",
    artist: "KOUNTRY FOLK",
    group: "kountry",
    file: "diesel-n-diamonds-youtube.mp3",
    art: "diesel-cover.webp",
    style: "diesel",
    note: "DIRT-ROAD LUXURY",
    video: "g2eb1S1GKiI",
    bagpipesSlug: "diesel-n-diamonds",
    nftEdition: true,
  },
  {
    title: "Feels Right",
    artist: "KOUNTRY FOLK",
    group: "kountry",
    file: "feels-right.mp3",
    art: "hero.webp",
    style: "feels",
    note: "FOLLOW THAT FEELING",
    bagpipesSlug: "feels-right-3",
    nftEdition: true,
  },
  {
    title: "Party in the Pines",
    artist: "KOUNTRY FOLK",
    group: "kountry",
    file: "party-in-the-pines.mp3",
    art: "pines.webp",
    style: "pines",
    note: "TAKE IT OFF THE GRID",
    bagpipesSlug: "party-in-the-pines-2",
    nftEdition: true,
  },
  {
    title: "Hi & Dry",
    artist: "KOUNTRY FOLK",
    group: "kountry",
    file: "hi-and-dry.mp3",
    art: "truck.webp",
    style: "dry",
    note: "A DIFFERENT KIND OF HIGH",
    bagpipesSlug: "hi-dry-2",
    nftEdition: false,
  },
  {
    title: "Static In",
    artist: "PRESET",
    group: "preset",
    file: "static-in.mp3",
    art: "preset.webp",
    style: "static",
    note: "FIND YOUR FREQUENCY",
  },
  {
    title: "Choosin’ Fun",
    artist: "PRESET",
    group: "preset",
    file: "choosin-fun.mp3",
    art: "preset.webp",
    style: "fun",
    note: "MAKE THE GOOD CALL",
  },
  {
    title: "Hard Work",
    artist: "PRESET",
    group: "preset",
    art: "preset.webp",
    style: "work",
    note: "WATCH THE MUSIC VIDEO",
    video: "m83cjSP6rQE",
  },
];
const audio = document.querySelector("#music-audio");
const sample = document.querySelector("#sample-audio");
const playToggle = document.querySelector("#play-toggle");
const seek = document.querySelector("#seek");
let current = 0;
let filter = "kountry";
let request = 0;
audio.volume = 0.8;
const time = (seconds) =>
  Number.isFinite(seconds)
    ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`
    : "—:—";

function renderReleases() {
  document.querySelector("#release-grid").innerHTML = tracks
    .map((track, index) =>
      track.group === filter
        ? `<article class="release-card"><button class="cover ${track.style}" ${track.file ? `data-play="${index}" aria-label="Play ${track.title}"` : `data-video="${track.video}" data-title="${track.title}" aria-label="Watch ${track.title}"`}><img src="${media(track.art)}" alt="${track.title} artwork" loading="lazy" />${index === 0 ? "" : `<span class="cover-label">${track.artist}<span>PRESET RECORDS</span></span><span class="cover-type">${track.title}</span><span class="cover-bottom">${track.note} <span>PR—00${index + 1}</span></span>`}<span class="cover-play" aria-hidden="true">${current === index && !audio.paused ? "Ⅱ" : "↗"}</span></button><div class="release-meta"><div><h3>${track.title}</h3><p>${track.artist} <span>•</span> ${track.file ? "SINGLE" : "VIDEO"}</p></div><button class="track-button" ${track.file ? `data-play="${index}" aria-label="${current === index && !audio.paused ? "Pause" : "Play"} ${track.title}"` : `data-video="${track.video}" data-title="${track.title}" aria-label="Watch ${track.title}"`}>${current === index && !audio.paused ? "Ⅱ" : "▶"}</button></div></article>`
        : "",
    )
    .join("");
  const visibleTracks = tracks.filter((track) => track.group === filter);
  document.querySelectorAll(".release-card").forEach((card, index) => {
    const track = visibleTracks[index];
    if (!track.bagpipesSlug) return;
    const link = document.createElement("a");
    link.className = `collect-button${track.nftEdition ? "" : " secondary"}`;
    link.href = `https://bagpipes.studio/track/${track.bagpipesSlug}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = track.nftEdition
      ? "BUY / COLLECT NFT ↗"
      : "VIEW ON BAGPIPES ↗";
    link.setAttribute(
      "aria-label",
      `${track.nftEdition ? "Buy or collect" : "View"} ${track.title} on Bagpipes (opens in a new tab)`,
    );
    const note = document.createElement("p");
    note.className = "collect-caption";
    note.textContent = track.nftEdition
      ? "Fan edition · checkout on Bagpipes"
      : "Check edition availability on Bagpipes";
    card.append(link, note);
  });
  document.querySelector("#collect-guide").hidden = filter !== "kountry";
}

function setFilter(value) {
  filter = value;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const active = button.dataset.filter === value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector(".heading-aside > p").innerHTML =
    value === "kountry"
      ? "Four tracks. One hell of an introduction.<br />Find your backroad anthem."
      : "Another side of the same original.<br />Two tracks. One music film. No limits.";
  renderReleases();
}

async function playTrack(index, toggle = true) {
  const ticket = ++request;
  if (
    index === current &&
    audio.getAttribute("src") &&
    toggle &&
    !audio.paused
  ) {
    audio.pause();
    return;
  }
  sample.pause();
  if (index !== current || !audio.getAttribute("src")) {
    current = index;
    const track = tracks[index];
    audio.src = media(track.file);
    document.querySelector("#player-title").textContent = track.title;
    document.querySelector("#player-artist").textContent = track.artist;
    document.querySelector("#player-art").src = media(track.art);
    document.querySelector("#elapsed").textContent = "0:00";
    document.querySelector("#duration").textContent = "—:—";
    seek.value = 0;
    if ("mediaSession" in navigator)
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: "PRESET RECORDS",
        artwork: [
          {
            src: new URL(media(track.art), location.href).href,
            type: "image/webp",
          },
        ],
      });
  }
  document.querySelector("#player-status").textContent = "";
  try {
    await audio.play();
  } catch (error) {
    if (ticket === request && error.name !== "AbortError")
      document.querySelector("#player-status").textContent =
        "Playback could not start. Please press play to try again.";
  }
}
function syncPlayer() {
  playToggle.textContent = audio.paused ? "▶" : "Ⅱ";
  playToggle.setAttribute(
    "aria-label",
    `${audio.paused ? "Play" : "Pause"} ${tracks[current].title}`,
  );
  document
    .querySelector(".player")
    .classList.toggle("is-playing", !audio.paused);
  renderReleases();
}
function nextTrack(direction) {
  const playable = tracks
    .map((t, i) => (t.file ? i : -1))
    .filter((i) => i >= 0);
  const index =
    (playable.indexOf(current) + direction + playable.length) % playable.length;
  playTrack(playable[index], false);
}
playToggle.addEventListener("click", () => playTrack(current));
document
  .querySelector("#previous")
  .addEventListener("click", () => nextTrack(-1));
document.querySelector("#next").addEventListener("click", () => nextTrack(1));
audio.addEventListener("play", syncPlayer);
audio.addEventListener("pause", syncPlayer);
audio.addEventListener("ended", () => nextTrack(1));
audio.addEventListener("error", () => {
  document.querySelector("#player-status").textContent =
    "This track could not load. Try another track or reload the page.";
});
audio.addEventListener("loadedmetadata", () => {
  document.querySelector("#duration").textContent = time(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  document.querySelector("#elapsed").textContent = time(audio.currentTime);
  seek.value = Number.isFinite(audio.duration)
    ? (audio.currentTime / audio.duration) * 100
    : 0;
  seek.style.setProperty("--progress", `${seek.value}%`);
});
seek.addEventListener("input", () => {
  if (Number.isFinite(audio.duration))
    audio.currentTime = (Number(seek.value) / 100) * audio.duration;
});
document.querySelector("#volume").addEventListener("input", (event) => {
  audio.volume = Number(event.target.value);
  audio.muted = false;
  updateMute();
});
function updateMute() {
  const muted = audio.muted || audio.volume === 0;
  document.querySelector("#mute").textContent = muted ? "×" : "♪";
  document
    .querySelector("#mute")
    .setAttribute("aria-label", muted ? "Unmute audio" : "Mute audio");
}
document.querySelector("#mute").addEventListener("click", () => {
  audio.muted = !audio.muted;
  if (!audio.muted && audio.volume === 0) {
    audio.volume = 0.8;
    document.querySelector("#volume").value = "0.8";
  }
  updateMute();
});
if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("play", () =>
    playTrack(current, false),
  );
  navigator.mediaSession.setActionHandler("pause", () => audio.pause());
  navigator.mediaSession.setActionHandler("previoustrack", () => nextTrack(-1));
  navigator.mediaSession.setActionHandler("nexttrack", () => nextTrack(1));
}

const dialog = document.querySelector("#video-dialog");
function openVideo(id, title) {
  audio.pause();
  sample.pause();
  document.querySelector("#video-title").textContent = title;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  iframe.title = `${title} — music video`;
  iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  document.querySelector("#video-container").replaceChildren(iframe);
  document.querySelector("#video-external").href = `https://youtu.be/${id}`;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}
document
  .querySelector("#close-video")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  document.querySelector("#video-container").replaceChildren();
  document.body.classList.remove("dialog-open");
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  }
});
document.addEventListener("click", (event) => {
  const play = event.target.closest("[data-play]");
  const video = event.target.closest("[data-video]");
  const filterButton = event.target.closest("[data-filter]");
  const artist = event.target.closest("[data-artist]");
  if (play) playTrack(Number(play.dataset.play));
  if (video) openVideo(video.dataset.video, video.dataset.title);
  if (filterButton) setFilter(filterButton.dataset.filter);
  if (artist) setFilter(artist.dataset.artist);
});

const menu = document.querySelector(".menu-toggle");
menu.addEventListener("click", () => {
  const opened = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(opened));
  menu.setAttribute(
    "aria-label",
    opened ? "Close navigation" : "Open navigation",
  );
  menu.textContent = opened ? "✕" : "☰";
  document.querySelector(".site-header").classList.toggle("menu-open", opened);
});
document.querySelectorAll(".site-header a").forEach((link) =>
  link.addEventListener("click", () => {
    if (menu.getAttribute("aria-expanded") === "true") menu.click();
  }),
);

let sampleUrl;
const fileInput = document.querySelector("#voice-file");
const sampleStatus = document.querySelector("#sample-status");
function clearSample() {
  sample.pause();
  sample.removeAttribute("src");
  sample.load();
  if (sampleUrl) URL.revokeObjectURL(sampleUrl);
  sampleUrl = undefined;
  fileInput.value = "";
  document.querySelector("#sample-preview").hidden = true;
  document.querySelector("#sample-name").textContent = "";
  sampleStatus.textContent = "";
}
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;
  clearSample();
  if (!(
    file.type.startsWith("audio/") ||
    /\.(mp3|wav|m4a|ogg|flac|aac|webm)$/i.test(file.name)
  )) {
    sampleStatus.textContent =
      "Please choose an audio file such as MP3, WAV, or M4A.";
    return;
  }
  if (file.size > 20 * 1024 * 1024 || file.size === 0) {
    sampleStatus.textContent =
      "Choose a non-empty audio file smaller than 20 MB.";
    return;
  }
  sampleUrl = URL.createObjectURL(file);
  sample.src = sampleUrl;
  document.querySelector("#sample-name").textContent = file.name;
  document.querySelector("#sample-preview").hidden = false;
  sampleStatus.textContent =
    "Your sample is ready to preview. It stays in this browser; no generation has been run.";
});
sample.addEventListener("play", () => audio.pause());
sample.addEventListener("error", () => {
  if (sampleUrl)
    sampleStatus.textContent =
      "Your browser cannot play this file. Try an MP3 or WAV sample.";
});
document.querySelector("#clear-sample").addEventListener("click", clearSample);
window.addEventListener("pagehide", () => {
  if (sampleUrl) URL.revokeObjectURL(sampleUrl);
});
document.querySelector("#year").textContent = new Date().getFullYear();
renderReleases();
