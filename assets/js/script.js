(() => {
  const pages = [...document.querySelectorAll('.page')];

  function showPage(id) {
    pages.forEach(page => page.classList.toggle('active', page.id === id));
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === id);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => showPage(link.dataset.page));
  });
  document.querySelectorAll('[data-go]').forEach(button => {
    button.addEventListener('click', () => showPage(button.dataset.go));
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    filters.forEach(item => item.classList.toggle('active', item === filter));
    cards.forEach(card => {
      card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
    });
  }));

  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const note = form.querySelector('.form-note');
    if (note) {
      note.textContent = 'Thanks for your interest. This form is a front-end demo and is not connected to an email service yet. Please use the GitHub link to connect.';
      note.setAttribute('role', 'status');
    }
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const topLink = document.querySelector('#back-to-top');
  if (topLink) topLink.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();