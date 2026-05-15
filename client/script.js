document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.page-section');
  const showSection = (id) => {
    sections.forEach(s => {
      if (s.id === id) s.classList.add('active'); else s.classList.remove('active');
    });
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  // nav link handlers
  const map = {
    'home-link': 'home-section',
    'donate-link': 'donor-section',
    'request-link': 'emergency-request',
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

  // hero CTA opens registration (donor) page and scrolls into view
  const cta = document.getElementById('donate-cta');
  if (cta) cta.addEventListener('click', (ev) => { ev.preventDefault(); showSection('donor-section'); });

  // show home on first load
  showSection('home-section');

  // slider hover/touch pause behavior
  const slider = document.querySelector('.slider');
  if (slider) {
    const track = slider.querySelector('.slide-track');
    slider.addEventListener('mouseenter', ()=> { if(track) track.style.animationPlayState = 'paused'; });
    slider.addEventListener('mouseleave', ()=> { if(track) track.style.animationPlayState = 'running'; });
    slider.addEventListener('touchstart', ()=> { if(track) track.style.animationPlayState = 'paused'; });
    slider.addEventListener('touchend', ()=> { if(track) track.style.animationPlayState = 'running'; });
  }
});

// donor form submit handling (if present)
const donorForm = document.querySelector("#donor-section form");
if (donorForm) {
  donorForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const donorData = {
      name: document.getElementById("name") ? document.getElementById("name").value : '',
      phone: document.getElementById("phone") ? document.getElementById("phone").value : '',
      bloodGroup: document.getElementById("bloodGroup") ? document.getElementById("bloodGroup").value : '',
      location: document.getElementById("location") ? document.getElementById("location").value : ''
    };
    try {
      const response = await fetch("http://localhost:5000/donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData)
      });
      const data = await response.json();
      alert(data.message || 'Registration submitted');
    } catch (error) {
      console.error(error);
      alert('Failed to submit. Check console for details.');
    }
  });
}
