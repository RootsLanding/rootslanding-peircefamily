const albums = window.ROOTS_LANDING_ALBUMS;
const firstAlbum = Object.keys(albums)[0];
const heroPhoto = document.querySelector("#hero-photo");

heroPhoto.src = albums[firstAlbum][0];
