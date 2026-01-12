const brendoviPodaci = [
    { id: "tissot", naziv: "Tissot", opis: "Švajcarski brend sa sportskim i elegantnim modelima.", logo: "img/tissot-logo.png", 
      modeli: [ {ime: "PRX Powermatic 80", cena: "750€", slika: "img/tissot1.jpg", dsc: "Retro dizajn sa modernim mehanizmom."} ] },
    { id: "seiko", naziv: "Seiko", opis: "Japanski brend poznat po kvalitetnim mehaničkim satovima.", logo: "img/seiko-logo.png",
      modeli: [ {ime: "Seiko 5 Sports", cena: "320€", slika: "img/seiko1.jpg", dsc: "Legendarna izdržljivost i automatski mehanizam."} ] },
    { id: "casio", naziv: "Casio", opis: "Popularan izbor za sportske i digitalne satove (G-SHOCK).", logo: "img/casio-logo.png",
      modeli: [ {ime: "G-SHOCK DW-5600", cena: "100€", slika: "img/casio1.png", dsc: "Neprikosnovena otpornost na udarce."} ] },
    { id: "citizen", naziv: "Citizen", opis: "Japanski brend sa Eco-Drive solar tehnologijom.", logo: "img/citizen-logo.png",
      modeli: [ {ime: "Promaster Marine", cena: "450€", slika: "img/citizen1.jpg", dsc: "Sat koji se puni bilo kojom svetlošću."} ] },
    { id: "fossil", naziv: "Fossil", opis: "Američki modni brend elegantnih satova.", logo: "img/fossil-logo.png",
      modeli: [ {ime: "Grant Chronograph", cena: "180€", slika: "img/fossil1.jpg", dsc: "Spoj klasičnog stila i modernih detalja."} ] },
    { id: "festina", naziv: "Festina", opis: "Španski brend koji nudi klasične i sportske modele.", logo: "img/festina-logo.png",
      modeli: [ {ime: "Chrono Sport", cena: "210€", slika: "img/festina1.jpg", dsc: "Dizajniran za ljubitelje dinamike."} ] },
    { id: "rolex", naziv: "Rolex", opis: "Luksuzna švajcarska marka, simbol prestiža.", logo: "img/rolex-logo.png",
      modeli: [ {ime: "Submariner Date", cena: "12.500€", slika: "img/rolex1.png", dsc: "Standard za ronilačke luksuzne satove."} ] },
    { id: "tagheuer", naziv: "TAG Heuer", opis: "Luksuzni švajcarski sportski satovi.", logo: "img/taghauer-logo.png",
      modeli: [ {ime: "Carrera Calibre", cena: "4.800€", slika: "img/tag1.jpg", dsc: "Inspirisan trkačkim stazama."} ] },
    { id: "omega", naziv: "Omega", opis: "Prestižni brend poznat po Moonwatch modelima.", logo: "img/omega-logo.png",
      modeli: [ {ime: "Speedmaster Professional", cena: "7.200€", slika: "img/omega1.jpg", dsc: "Prvi sat koji je bio na Mesecu."} ] },
    { id: "hublot", naziv: "Hublot", opis: "Luksuzni švajcarski satovi modernog dizajna.", logo: "img/hublot-logo.png",
      modeli: [ {ime: "Big Bang Unico", cena: "18.500€", slika: "img/hublot1.png", dsc: "Umetnost fuzije materijala i dizajna."} ] }
];

document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("brendovi-lista")) iscrtajBrendove();
});

function iscrtajBrendove() {
    let container = document.getElementById("brendovi-lista");
    container.innerHTML = brendoviPodaci.map(b => `
        <div class="brend-traka" onclick="prikaziModele('${b.id}')">
        <div class="brend-logo-okvir" style="background: white; padding: 5px; border-radius: 5px;">
            <img src="${b.logo}" alt="${b.naziv}" style="filter: none; height: 35px;">
        </div>
        <div class="brend-info">
            <h3>${b.naziv}</h3>
            <p>${b.opis}</p>
        </div>
        <div class="strelica">-></div>
    </div>
    `).join("");
}

function prikaziModele(id) {
    const brend = brendoviPodaci.find(x => x.id === id);
    const prikaz = document.getElementById("modeli-prikaz");
    
    prikaz.style.opacity = "0"; // Jednostavan efekat
    setTimeout(() => {
        prikaz.innerHTML = `
            <div class="modeli-header">
                <h3>Dostupni modeli: ${brend.naziv}</h3>
                <button onclick="zatvoriModele()" class="btn-zatvori">Zatvori X</button>
            </div>
            <div class="grid-layout">
                ${brend.modeli.map(m => `
                    <div class="model-kartica">
                        <img src="${m.slika}" alt="${m.ime}">
                        <h4>${m.ime}</h4>
                        <p class="model-cena">${m.cena}</p>
                        <p class="model-opis">${m.dsc}</p>
                        <button class="btn-kupi" onclick="dodajUKorpu('${m.ime}', '${m.cena}')">Dodaj u korpu</button>
                    </div>
                `).join("")}
            </div>
        `;
        prikaz.style.opacity = "1";
        prikaz.scrollIntoView({ behavior: 'smooth' });
    }, 200);
}

function zatvoriModele() {
    document.getElementById("modeli-prikaz").innerHTML = "";
}
let korpa = [];

// Funkcija za otvaranje/zatvaranje korpe
function toggleKorpa() {
    document.getElementById("korpa-sidebar").classList.toggle("korpa-otvorena");
}

// Funkcija koja dodaje model u korpu (Ovu pozivamo na klik dugmeta "Dodaj u korpu")
function dodajUKorpu(ime, cena) {
    // Pretvaramo cenu u broj (npr. "750€" -> 750)
    let numerickaCena = parseInt(cena.replace('€', '').replace('.', ''));
    
    korpa.push({ ime, cena: numerickaCena });
    azurirajPrikazKorpe();
    
    // Otvori korpu automatski kad se doda artikl
    if(!document.getElementById("korpa-sidebar").classList.contains("korpa-otvorena")) {
        toggleKorpa();
    }
}

function azurirajPrikazKorpe() {
    const listaStavki = document.getElementById("stavke-u-korpi");
    const ukupnoElement = document.getElementById("ukupna-cena");
    const brojac = document.getElementById("brojac-stavki");
    
    listaStavki.innerHTML = "";
    let ukupno = 0;

    if (korpa.length === 0) {
        listaStavki.innerHTML = '<p class="prazna-poruka">Korpa je prazna.</p>';
    } else {
        korpa.forEach((item, index) => {
            ukupno += item.cena;
            listaStavki.innerHTML += `
                <div class="stavka-korpa">
                    <span>${item.ime}</span>
                    <span>${item.cena}€</span>
                    <button onclick="ukloniIzKorpe(${index})" style="background:none; border:none; color:red; cursor:pointer;">X</button>
                </div>
            `;
        });
    }

    ukupnoElement.innerText = ukupno + "€";
    brojac.innerText = korpa.length;
}

function ukloniIzKorpe(index) {
    korpa.splice(index, 1);
    azurirajPrikazKorpe();
}
// Funkcija za otvaranje slike
function otvoriSliku(putanja) {
    const lightbox = document.getElementById('lightbox');
    const slika = document.getElementById('lightbox-slika');
    
    slika.src = putanja; // Postavlja URL slike na koju je kliknuto
    lightbox.classList.add('prikazi'); // Prikazuje tamnu pozadinu
}

// Funkcija za zatvaranje
function zatvoriSliku() {
    document.getElementById('lightbox').classList.remove('prikazi');
}

// Automatsko povezivanje klikova na sve slike u galeriji
document.addEventListener("DOMContentLoaded", () => {
    const sveSlike = document.querySelectorAll('.galerija-item img');
    
    sveSlike.forEach(slika => {
        slika.addEventListener('click', () => {
            otvoriSliku(slika.src);
        });
    });
});

if (document.getElementById('kontakt-forma')) {
    document.getElementById('kontakt-forma').addEventListener('submit', function(e) {
        e.preventDefault(); // Sprečava osvežavanje stranice
        alert('Hvala Vam! Vaša poruka je uspešno poslata. Naš tim će Vas kontaktirati uskoro.');
        this.reset(); // Briše podatke iz forme
    });
}