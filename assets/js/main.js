const menuIcon = document.querySelector(".menu > button");
const tableOfContents = document.querySelector(".table-of-contents");

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

if (tableOfContents) {
  window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      const pathName = window.location.pathname;
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.toc a[href="${pathName}#${id}"]`);
        if (activeLink) {
          if (entry.intersectionRatio > 0) {
            activeLink.classList.add('toc__link--active');
          } else {
            activeLink.classList.remove('toc__link--active');
          }
        }
      });
    });
  
    // Track all sections that have an `id` applied
    document.querySelectorAll('h2[id]').forEach((section) => {
      observer.observe(section);
    });
  });
}