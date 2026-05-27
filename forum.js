// Încercăm să luăm postările salvate anterior în browser, iar dacă nu există, le punem pe cele implicite
let postariData = JSON.parse(localStorage.getItem('postari_flowerart')) || [
  {
    id: 1,
    autor: "Elena Dumitrescu",
    tip: "Review ⭐",
    text: "Articolul despre Călătoria unei flori este superb! Mi-a plăcut la nebunie animația petalelor.",
    raspunsuri: []
  },
  {
    id: 2,
    autor: "Andrei M.",
    tip: "Întrebare ❓",
    text: "Ce flori recomandați pentru o grădină cu foarte multă umbră? Crizantemele rezistă?",
    raspunsuri: [
      { autor: "Admin FlowerArt", text: "Bună Andrei! Crizantemele preferă soarele. Pentru umbră îți recomandăm cu drag Hortensiile sau Astilbe!" }
    ]
  }
];

// Funcție ajutătoare care salvează datele în browser ca să nu se piardă la refresh
function salveazaInMemorie() {
  localStorage.setItem('postari_flowerart', JSON.stringify(postariData));
}

// Funcție care randează (afișează) postările pe ecran
function afiseazaPostari() {
  const container = document.getElementById('container-mesaje');
  if(!container) return; // Siguranță în caz că nu găsește elementul
  
  container.innerHTML = ''; // Curățăm containerul

  postariData.forEach(postare => {
    let clasaEticheta = 'sugestie';
    if (postare.tip.includes('Review')) clasaEticheta = 'review';
    if (postare.tip.includes('Întrebare')) clasaEticheta = 'intrebare';

    // Construim HTML-ul pentru postarea principală
    let postareHTML = `
      <div class="postare-card" style="margin-bottom: 25px;">
        <div class="postare-header">
          <span class="postare-autor">${postare.autor}</span>
          <span class="postare-eticheta ${clasaEticheta}">${postare.tip}</span>
        </div>
        <p class="postare-text">${postare.text}</p>
        
        <div class="zona-raspunsuri" style="margin-left: 20px; margin-top: 10px; border-left: 2px solid #c4b497; padding-left: 15px;">
    `;

    // Adăugăm fiecare răspuns din interiorul postării
    postare.raspunsuri.forEach(raspuns => {
      postareHTML += `
        <div class="raspuns-item" style="background: #fdfcf7; padding: 8px; margin-top: 5px; border-radius: 4px; font-size: 13px;">
          <strong>✍️ ${raspuns.autor}:</strong> ${raspuns.text}
        </div>
      `;
    });

    // Adăugăm mini-formularul de răspuns ascuns la început, care apare la click
    postareHTML += `
        </div>
        <button onclick="afiseazaFormularRaspuns(${postare.id})" class="buton-verde" style="width: auto; padding: 4px 10px; font-size: 12px; margin-top: 10px; background-color: #7c9a49;">💬 Răspunde</button>
        
        <div id="form-raspuns-${postare.id}" style="display:none; margin-top: 10px; background: #f3f0ea; padding: 10px; border-radius: 6px;">
          <input type="text" id="nume-raspuns-${postare.id}" placeholder="Numele tău..." style="width:95%; padding: 5px; margin-bottom: 5px; border: 1px solid #c4b497; border-radius:4px; font-size:12px;"><br>
          <textarea id="text-raspuns-${postare.id}" placeholder="Scrie răspunsul..." rows="2" style="width:95%; padding: 5px; border: 1px solid #c4b497; border-radius:4px; font-size:12px; font-family:'Open Sans';"></textarea><br>
          <button onclick="trimiteRaspuns(${postare.id})" class="buton-verde" style="width: auto; padding: 4px 10px; font-size: 12px; margin-top: 5px;">Trimite Răspunsul</button>
        </div>
      </div>
    `;

    container.innerHTML += postareHTML;
  });
}

// Funcție care arată/ascunde formularul de răspuns
window.afiseazaFormularRaspuns = function(id) {
  const form = document.getElementById(`form-raspuns-${id}`);
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Funcție care adaugă răspunsul în baza de date locală
window.trimiteRaspuns = function(idPostare) {
  const nume = document.getElementById(`nume-raspuns-${idPostare}`).value;
  const text = document.getElementById(`text-raspuns-${idPostare}`).value;

  if(!nume || !text) {
    alert("Te rugăm să completezi ambele câmpuri pentru a răspunde!");
    return;
  }

  // Găsim postarea corectă după ID și îi adăugăm răspunsul în listă
  const postare = postariData.find(p => p.id === idPostare);
  if(postare) {
    postare.raspunsuri.push({ autor: nume, text: text });
    salveazaInMemorie(); // Salvează modificarea în browser
    afiseazaPostari(); // Reîmprospătăm lista vizuală
  }
}

// Ascultătorul pentru formularul principal de postare (Adăugare Întrebare nouă)
const formPostare = document.getElementById('formular-postare');
if(formPostare) {
  formPostare.addEventListener('submit', function(e) {
    e.preventDefault();

    const autor = document.getElementById('autor-postare').value;
    const tip = document.getElementById('tip-postare').value;
    const text = document.getElementById('text-postare').value;

    const nouaPostare = {
      id: Date.now(), // Generează un ID unic pe baza timpului curent
      autor: autor,
      tip: tip,
      text: text,
      raspunsuri: []
    };

    postariData.unshift(nouaPostare); // Adaugă la începutul listei
    salveazaInMemorie(); // Salvează modificarea în browser
    afiseazaPostari(); // Reîmprospătează ecranul
    document.getElementById('formular-postare').reset(); // Resetează formularul mare
  });
}

// Pornim afișarea inițială la încărcarea paginii
afiseazaPostari();