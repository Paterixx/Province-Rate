const dropdowns = document.querySelectorAll('.dropdown');

for (const dropdown of dropdowns) {
  const button = dropdown.querySelector('.dropdown-toggle');

  button.addEventListener('click', () => {
    const isOpen = dropdown.classList.contains('open');

    for (const item of dropdowns) {
      item.classList.remove('open');
      item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    }

    if (!isOpen) {
      dropdown.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    for (const dropdown of dropdowns) {
      dropdown.classList.remove('open');
      dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    }
  }
});
