document.addEventListener('DOMContentLoaded', (event) => {
    const partyMusic = document.getElementById('party-music');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
  
    const songs = [
      'music/song1.mp3',
      'music/song2.mp3',
      'music/song1.mp3'
    ];
    let currentSongIndex = 0;
  
    playBtn.addEventListener('click', () => {
      partyMusic.play();
    });
  
    pauseBtn.addEventListener('click', () => {
      partyMusic.pause();
    });
  
    prevBtn.addEventListener('click', () => {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      partyMusic.src = songs[currentSongIndex];
      partyMusic.play();
    });
  
    nextBtn.addEventListener('click', () => {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      partyMusic.src = songs[currentSongIndex];
      partyMusic.play();
    });
  
    volumeSlider.addEventListener('input', (event) => {
      partyMusic.volume = event.target.value;
    });
  
    // Automatically start playing music when the page loads
    partyMusic.play();
  });
  