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

const ratingInput = document.getElementById('rating-input');
const categoryRatings = document.getElementById('category-ratings');
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
let selectedRating = 0;

if (ratingInput) {
  for (let i = 1; i <= 10; i += 1) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'star-btn';
    btn.textContent = '★';
    btn.dataset.value = String(i);

    btn.addEventListener('click', () => {
      selectedRating = i;
      highlightStars();
      categoryRatings.classList.toggle('hidden', selectedRating < 1);
    });

    ratingInput.appendChild(btn);
  }
}

function highlightStars() {
  const stars = document.querySelectorAll('.star-btn');
  for (const star of stars) {
    star.classList.toggle('active', Number(star.dataset.value) <= selectedRating);
  }
}

if (reviewForm) {
  reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = document.getElementById('review-text').value.trim();
    const tone = document.getElementById('review-tone').value;
    const link = document.getElementById('review-link').value.trim();
    const isAnon = document.getElementById('review-anon').checked;

    if (!text || selectedRating === 0) {
      return;
    }

    const categoryInputs = categoryRatings.querySelectorAll('input');
    const adminRating = categoryInputs[0].value || '-';
    const leaderRating = categoryInputs[1].value || '-';

    const card = document.createElement('article');
    card.className = 'review-item';
    card.dataset.likes = '0';

    const starsText = `${'★'.repeat(selectedRating)}${'☆'.repeat(10 - selectedRating)}`;
    const badgeText = tone === 'positive' ? 'Положительный' : 'Отрицательный';
    const authorName = isAnon ? 'Аноним' : 'Новый_пользователь';

    card.innerHTML = `
      <header>
        <div class="author">
          <img src="https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(authorName)}" alt="Аватар автора" />
          <div>
            <strong>${authorName}</strong>
            <span>только что</span>
          </div>
        </div>
        <span class="badge ${tone}">${badgeText}</span>
      </header>
      <p>${text}</p>
      <div class="review-meta">
        <span>Оценка: ${starsText} (${selectedRating}/10)</span>
        <span>Администратор: ${adminRating}/10 • Лидер: ${leaderRating}/10</span>
        ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">Ссылка на доказательство</a>` : ''}
      </div>
      <div class="review-actions">
        <button class="like-btn" type="button">👍 0</button>
        <button class="delete-btn" type="button">Удалить</button>
      </div>
    `;

    reviewsList.prepend(card);
    reviewForm.reset();
    selectedRating = 0;
    highlightStars();
    categoryRatings.classList.add('hidden');
  });
}

if (reviewsList) {
  reviewsList.addEventListener('click', (event) => {
    const likeButton = event.target.closest('.like-btn');
    const deleteButton = event.target.closest('.delete-btn');

    if (likeButton) {
      const review = likeButton.closest('.review-item');
      const currentLikes = Number(review.dataset.likes || '0') + 1;
      review.dataset.likes = String(currentLikes);
      likeButton.textContent = `👍 ${currentLikes}`;
    }

    if (deleteButton) {
      deleteButton.closest('.review-item').remove();
    }
  });
}
