// Function to detect if the user is on a mobile device
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Function to display a message and hide website content on mobile devices
function disableOnMobile() {
  if (isMobileDevice()) {
    document.getElementById("mobile-message").style.display = "block"; // Show message
    document.getElementById("website-content").style.display = "none"; // Hide content
  } else {
    // enterFullScreen(); // Automatically enter full-screen mode on desktop
  }
}

// Function to request full-screen mode
function enterFullScreen() {
  const elem = document.documentElement; // The whole document

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // IE/Edge
    elem.msRequestFullscreen();
  }
}

// Call the disableOnMobile function on page load
window.onload = disableOnMobile;
