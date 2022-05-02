const menuIcon = document.querySelector(".menu > button");
const tableOfContents = document.querySelector(".table-of-contents");
copyButtons = document.querySelectorAll(".code-block__button");

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
    document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
      observer.observe(section);
    });
  });
}

copyButtons.forEach(copyButton => {
  copyButton.addEventListener("click", (e) => {
    e.preventDefault();
    let codeBlock = copyButton.closest(".code-block");
    const codeBlockHeader = codeBlock.querySelector(".code-block__header");
    codeBlock = codeBlock.querySelector(".code-block__markup").textContent;
    const messagePlaceholder = codeBlockHeader.nextElementSibling;
    oldCopyNotice = document.getElementById("copy-notice");

    if (oldCopyNotice) { oldCopyNotice.remove(); }

    message = document.createElement("span");
    message.setAttribute("id", "copy-notice");
    message.setAttribute("aria-live", "assertive");
    message.innerHTML = "Copied to clipboard!";

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(codeBlock);
    messagePlaceholder.append(message);
  });
});

document.addEventListener("keypress", function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 11 || e.key === 75)) {
    console.log("ctrl+k coming soon!");
  }
});