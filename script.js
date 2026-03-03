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

const detailsModal = document.getElementById('detailsModal');
const openDetailsModalBtn = document.getElementById('openDetailsModal');
const closeDetailsModalBtn = document.getElementById('closeDetailsModal');

const openModal = () => {
  detailsModal.classList.add('open');
  detailsModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  detailsModal.classList.remove('open');
  detailsModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

openDetailsModalBtn.addEventListener('click', (event) => {
  event.preventDefault();
  openModal();
});

closeDetailsModalBtn.addEventListener('click', closeModal);

detailsModal.addEventListener('click', (event) => {
  if (event.target === detailsModal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && detailsModal.classList.contains('open')) {
    closeModal();
  }
});
