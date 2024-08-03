document.addEventListener('DOMContentLoaded', function() {
  const draggables = document.querySelectorAll('.draggable');
  const characterImage = document.getElementById('character-image');
  const character = document.getElementById('character');

  draggables.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });

  character.addEventListener('dragover', dragOver);
  character.addEventListener('drop', drop);

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.mood);
  }

  function dragEnd() {
    this.classList.remove('dragging');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    const mood = e.dataTransfer.getData('text');
    changeMood(mood);
  }

  function changeMood(mood) {
    const moodImages = {
      happy: 'images/dj.png',
      gym: 'images/bodybuilder.png',
      sad: 'images/banana-catc.png',
      angry: 'images/angry.png',
      avacado: 'images/avacado.png'
    };
    characterImage.src = moodImages[mood];
  }
});
