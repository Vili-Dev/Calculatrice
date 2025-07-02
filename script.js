// const display = document.getElementById('display');
// const keys = document.querySelector('keys');

// let currentInput = '0';


let current = "0"; // affiché
let previous = null; // opérande 1
let op = null; // opérateur choisi
let resetNext = false; // flag de reset
const displayEl = document.getElementById('display');


function compute() {
 const cur = parseFloat(current); // convertit la chaîne actuelle
 if (op === null || previous === null) return; // rien à faire
 let res;
 switch (op) {
 case '+': res = previous + cur; break;
 case '-': res = previous - cur; break;
 case '*': res = previous * cur; break;
 case '/': res = (cur === 0) ? 'Erreur' : previous / cur; break;
 }
 current = res.toString(); // prépare l’affichage
 op = null; // reset opérateur
 previous = null; // reset opérande
 resetNext = true; // prochain chiffre écrase
}

document.querySelectorAll('button[data-op]').forEach(btn => {
 btn.addEventListener('click', () => {chooseOp(btn.dataset.op); updateDisplay(); });
});

function chooseOp(o) {
 // Si un opérateur existait, effectue d'abord le calcul
 if (op !== null) compute();
 // Mémorise la valeur actuelle convertie en nombre
 previous = parseFloat(current);
 // Stocke l'opérateur choisi
 op = o;
 // Indique que l'affichage doit être écrasé au prochain chiffre
 resetNext = true;
}


// afficher à la suite les chiffres
function appendDigit(digit) {
  if (resetNext) {
    current = digit;
    resetNext = false;
  } else {
    current = current === "0" ? digit : current + digit;
  }
  updateDisplay();
}

document.getElementById('equal').addEventListener('click', () => {
  compute();
  updateDisplay();
});


function clearAll() {
 // Remet l'affichage à "0"
 current = "0";
 // Réinitialise les opérandes et l'opérateur
 previous = null;
 op = null;
 // Désactive le flag de reset
 resetNext = false;
}

document.getElementById('clear').addEventListener('click', () => {
 clearAll();
 updateDisplay();
});


// afficher l'element
function updateDisplay() {
 displayEl.textContent = current;
}
updateDisplay();

// ecouteur de clic
document.querySelectorAll('button[data-num]').forEach(btn => {
 btn.addEventListener('click', () => {
 appendDigit(btn.dataset.num);
 updateDisplay();
 });
});





