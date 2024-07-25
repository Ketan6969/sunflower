const countdownElement = document.getElementById('countdown');
const environmentElement = document.getElementById('environment');
const messageElement = document.getElementById('message');

const targetDate = new Date().getTime() + 5000; // 5 seconds from now for testing

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "";
    showSunflower();
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);

function showSunflower() {
  console.log('Countdown finished. Showing environment and message.');
  environmentElement.classList.remove('hidden');
  messageElement.classList.remove('hidden');
  setTimeout(() => {
    console.log('Displaying birthday message.');
    messageElement.innerHTML = "Happiest birthday to this cutie patootie sunflower!";
  }, 5000); // Show message after 5 seconds
}

// Initial state check
console.log('Initial state:', {
  countdownElement: countdownElement.className,
  environmentElement: environmentElement.className,
  messageElement: messageElement.className
});
