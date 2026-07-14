const albums = window.ROOTS_LANDING_ALBUMS;
const albumNames = Object.keys(albums);
let currentAlbum = 0;
let currentPhoto = 0;
const albumMenu = document.querySelector("#albums");
const photo = document.querySelector("#photo");
const title = document.querySelector("#album-title");
const count = document.querySelector("#photo-count");
const thumbnails = document.querySelector("#thumbnails");

function renderAlbums() {
  albumMenu.innerHTML = "";
  albumNames.forEach((name, index) => {
    const button = document.createElement("button");
    button.className = "album"; button.textContent = name;
    button.setAttribute("aria-current", index === currentAlbum ? "true" : "false");
    button.onclick = () => { currentAlbum = index; currentPhoto = 0; render(); };
    albumMenu.append(button);
  });
}
function render() {
  const name = albumNames[currentAlbum]; const photos = albums[name];
  photo.src = photos[currentPhoto]; photo.alt = `${name}, photo ${currentPhoto + 1}`;
  title.textContent = name; count.textContent = `${currentPhoto + 1} of ${photos.length}`;
  renderAlbums(); thumbnails.innerHTML = "";
  photos.forEach((src, index) => {
    const image = document.createElement("img"); image.src = src; image.className = "thumbnail";
    image.alt = `${name}, photo ${index + 1}`; image.setAttribute("aria-current", index === currentPhoto ? "true" : "false");
    image.onclick = () => { currentPhoto = index; render(); }; thumbnails.append(image);
  });
}
function move(amount) { const photos = albums[albumNames[currentAlbum]]; currentPhoto = (currentPhoto + amount + photos.length) % photos.length; render(); }
document.querySelector("#previous").onclick = () => move(-1);
document.querySelector("#next").onclick = () => move(1);
document.addEventListener("keydown", event => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); });
render();
