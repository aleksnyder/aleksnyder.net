var menuIcon = document.querySelector(".menu > button");

menuIcon.addEventListener('click', function() {
  document.querySelector(".menu").classList.toggle("open");
}, false);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(reg) {
    // registration worked
    console.log('Service worker registred!');
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}