document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.page-section');
  const showSection = (id) => {
    sections.forEach(s => {
      if (s.id === id) s.classList.add('active'); else s.classList.remove('active');
    });
    // small scroll into view for nicer UX
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  // nav link handlers
  const map = {
    'home-link': 'home-section',
    'find-link': 'donor-section',
    'contact-link': 'contact-section',
    'about-link': 'home-section'
  };

  Object.keys(map).forEach(linkId => {
    const el = document.getElementById(linkId);
    if (!el) return;
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
      showSection(map[linkId]);
    });
  });

  // hero CTA opens registration (donor) page
  const cta = document.getElementById('donate-cta');
  if (cta) cta.addEventListener('click', (ev) => { ev.preventDefault(); showSection('donor-section'); });

  // show home on first load
  showSection('home-section');
});
