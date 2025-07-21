// const display = document.getElementById('display');
// const keys = document.querySelector('keys');

// let currentInput = '0';

const historyEl = document.getElementById('history');
let lastOp = '';


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
 case '/': 
  if (cur === 0) {
    showError('Erreur');
    return;
  }
  res = previous / cur; 
  break;
 }
 lastOp = `${previous} ${op} ${cur} =`;
 current = res.toString(); // prépare l’affichage
 op = null; // reset opérateur
 previous = null; // reset opérande
 resetNext = true; // prochain chiffre écrase
}

document.querySelectorAll('button[data-op]').forEach(btn => {
 btn.addEventListener('click', () => {chooseOp(btn.dataset.op); updateDisplay(); });
});

function chooseOp(o) {
 if (resetNext && op) return; // empêche les opérateurs à la suite
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
  if (digit === "." && current.includes(".")) return; // bloque les multiples points
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

document.getElementById('plusminus').addEventListener('click', () => {
  if (current !== "0" && current !== "Erreur") {
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
  }
});


// afficher l'element
function updateDisplay() {
  displayEl.textContent = current;
  historyEl.textContent = lastOp;

}
updateDisplay();

function showError(msg) {
  displayEl.textContent = msg;
  displayEl.classList.add('error');
  setTimeout(() => {
    clearAll();
    lastOp = '';
    updateDisplay();
    displayEl.classList.remove('error');
  }, 1200);
}

// ecouteur de clic
document.querySelectorAll('button[data-num]').forEach(btn => {
  btn.addEventListener('click', () => {
    appendDigit(btn.dataset.num);
    updateDisplay();

    // Animation sur le bouton
    btn.classList.add('anim');
    setTimeout(() => btn.classList.remove('anim'), 150);
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key >= '0' && e.key <= '9') appendDigit(e.key);
  if (e.key === '.') appendDigit('.');
  if (['+', '-', '*', '/'].includes(e.key)) {
    chooseOp(e.key);
    updateDisplay();
  }
  const btn = document.querySelector(`button[data-num="${e.key}"]`);
    if (btn) {
      btn.classList.add('anim');
      setTimeout(() => btn.classList.remove('anim'), 150);
    }
  if (e.key === '.') {
    appendDigit('.');
    const btn = document.querySelector('button[data-num="."]');
    if (btn) {
      btn.classList.add('anim');
      setTimeout(() => btn.classList.remove('anim'), 150);
    }
  }
  if (e.key === 'Enter' || e.key === '=') {
    compute();
    updateDisplay();
  }
  if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
    clearAll();
    updateDisplay();
  }
});





