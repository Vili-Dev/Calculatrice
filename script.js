// const display = document.getElementById('display');
// const keys = document.querySelector('keys');

// let currentInput = '0';


let current = "0";
// reperer element
const displayEl = document.getElementById('display');

// afficher à la suite les chiffres
function appendDigit(d) {
 if (current === "0" && d !== ".") {
 current = d;
 } else if (d === "." && current.includes(".")) {
 return;
 } else {
 current += d;
 }
}


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
