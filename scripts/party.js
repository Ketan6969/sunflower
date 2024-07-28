document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('audio');
  const playButton = document.getElementById('play-button');
  const pauseButton = document.getElementById('pause-button');
  const nextButton = document.getElementById('next-button');
  const prevButton = document.getElementById('prev-button');
  const volumeControl = document.getElementById('volume-control');

  const playlist = [
    'path/to/song1.mp3',
    'path/to/song2.mp3',
    'path/to/song3.mp3'
  ];
  
  let currentTrack = 0;

  audio.src = playlist[currentTrack];

  playButton.addEventListener('click', () => {
    audio.play();
  });

  pauseButton.addEventListener('click', () => {
    audio.pause();
  });

  nextButton.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    audio.src = playlist[currentTrack];
    audio.play();
  });

  prevButton.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    audio.src = playlist[currentTrack];
    audio.play();
  });

  volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value / 100;
  });
});
