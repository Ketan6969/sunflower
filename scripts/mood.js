document.addEventListener('DOMContentLoaded', function() {
  const draggables = document.querySelectorAll('.draggable');
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
    character.className = mood;
    // Add additional logic to change character's appearance or play sound
  }
});
