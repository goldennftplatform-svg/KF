// Public songs verified on @presetrecords, 2026-10-11. Official Suno embeds
// keep playback on-site without copying audio or relying on private API URLs.
const songs = [
  ["Pickin' a Sky", "eac48965-ec68-4885-a43b-145d08c9dba8"],
  [
    "Hope They Don't Charge for Breathin'",
    "b00bc649-d5fc-430d-9962-9c512da2799c",
  ],
  ["GEOFF Enters the Chat", "bf5a677b-4e5f-4233-878d-0d4cdb65c7a8"],
  ["Basement Triumph x Vinyl Victory", "79904d75-400d-472d-8d00-e0914a914d4a"],
  ["Bang", "066bb489-0afa-4f9a-bee0-4a09c6289ae2"],
  ["Oxtail Rumble", "b1159fcf-759c-49b1-a7d3-3581d51ef500"],
  ["Twist Them", "608f78c9-c2d5-4143-8ef3-91391ef9a2a9"],
  ["Paper Football", "fa86bdc7-6e92-4938-9a3f-07e3eb8dcfc9"],
  ["Geoff Bubble", "f55fc181-f592-41e9-b93f-5451cf0e472b"],
  ["Dance", "8e5270b5-8e96-4d95-bb74-7173285657e6"],
  ["Union Scapegoat", "434ee494-1454-482a-a7ec-2c510b20bbb9"],
  ["Stacks/Stacks", "a57976e8-fe89-4851-86af-fe8883295a1d"],
  ["loading.....", "84d940fb-1ad5-4c55-ab43-cb652a7b935c"],
  ["Forget", "0d3c5201-6695-4d6f-a452-9c7175761a96"],
  ["Blade of the Knife", "8e6fdf2b-d5aa-4df8-ab45-d2df8d9b708a"],
  ["Stupid-Ass Remix-Rhymes", "07efae4c-b033-44f8-aa64-e4174ac77442"],
];
const select = document.querySelector("#legacy-song");
const container = document.querySelector("#legacy-embed");
const load = document.querySelector("#legacy-load");
const status = document.querySelector("#legacy-status");
let selected = 0;
select.replaceChildren(
  ...songs.map(
    ([title], i) =>
      new Option(`${String(i + 1).padStart(2, "0")} / ${title}`, String(i)),
  ),
);

export function stopLegacy() {
  if (!container.firstChild) return;
  container.replaceChildren();
  load.hidden = false;
  status.textContent =
    "Legacy player paused. Load your selected song to listen again.";
}

function loadSong() {
  document.dispatchEvent(new Event("legacy-listen"));
  const [title, id] = songs[selected];
  const iframe = document.createElement("iframe");
  iframe.src = `https://suno.com/embed/${id}`;
  iframe.title = `${title} — official Suno music player`;
  iframe.allow = "autoplay; encrypted-media; fullscreen";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  container.replaceChildren(iframe);
  load.hidden = true;
  status.textContent =
    "Press play in the player above. You’re still on PRESET RECORDS.";
}
select.addEventListener("change", () => {
  selected = Number(select.value);
  loadSong();
});
load.addEventListener("click", loadSong);
for (const [id, delta] of [
  ["legacy-prev", -1],
  ["legacy-next", 1],
]) {
  document.querySelector(`#${id}`).addEventListener("click", () => {
    selected = (selected + delta + songs.length) % songs.length;
    select.value = String(selected);
    loadSong();
  });
}
