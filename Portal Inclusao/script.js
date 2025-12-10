// Improved script.js: Added resize listener for map invalidation (Leaflet responsiveness), and minor optimizations.

// Navegação com destaque da seção ativa
const menuButtons = document.querySelectorAll(".menu-principal button");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 100;
    if (pageYOffset >= secTop) current = sec.getAttribute("id");
  });

  menuButtons.forEach(btn => {
    btn.classList.remove("ativo");
    if (btn.dataset.section === current) btn.classList.add("ativo");
  });
});

// Rolagem suave ao clicar no menu
menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const section = document.getElementById(btn.dataset.section);
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// Acessibilidade
function ajustarFonte(acao) {
  let size = parseInt(window.getComputedStyle(document.body).fontSize);
  document.body.style.fontSize = acao === '+' ? `${size + 2}px` : `${size - 2}px`;
}

function alternarContraste() {
  document.body.classList.toggle("contraste");
}

function lerTexto() {
  let texto = document.body.innerText;
  let fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  window.speechSynthesis.speak(fala);
}

// Mapa Leaflet
let map = L.map('map').setView([-23.3103, -51.1628], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([-23.3103, -51.1628]).addTo(map).bindPopup('<b>Hospital Municipal</b><br>Rua Central, 123');
L.marker([-23.315, -51.17]).addTo(map).bindPopup('<b>Clínica de Fisioterapia</b><br>Av. Brasil, 456');
L.marker([-23.318, -51.165]).addTo(map).bindPopup('<b>Associação de Pais</b><br>Rua Esperança, 789');

// Make map responsive: Invalidate size on window resize
window.addEventListener('resize', () => {
  map.invalidateSize();
});