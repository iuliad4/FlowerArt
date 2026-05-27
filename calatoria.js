const floare = document.getElementById("floare");
const descriere = document.getElementById("descriere");

const etape = [
  "1. Semința prinde viață.",
  "2. Apare un mugure delicat.",
  "3. Tulpina se ridică spre lumină.",
  "4. Se formează primele petale.",
  "5. Floarea se deschide timid.",
  "6. Floarea își arată toată frumusețea.",
  "Călătoria s-a încheiat – o floare minunată! 🌸"
];

let pas = 0;

function inainteaza() {
  if (pas < 6) {
    const petala = document.createElement("div");
    petala.className = `petala petala${pas + 1}`;
    floare.appendChild(petala);
    setTimeout(() => {
      petala.classList.add("aparuta");
    }, 100);

    descriere.textContent = etape[pas];
    pas++;
  } else if (pas === 6) {
    descriere.textContent = etape[6];
    pas++;
  } else {
    floare.innerHTML = '<div class="mijloc"></div>';
    descriere.textContent = "Apasă pe buton pentru a începe călătoria.";
    pas = 0;
  }
}