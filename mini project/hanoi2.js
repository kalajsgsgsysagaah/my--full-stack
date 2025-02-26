document.addEventListener('DOMContentLoaded', () => {
  const discSelect = document.getElementById('discSelect');
  const newGameBtn = document.getElementById('newGameBtn');
  const btnSolve = document.getElementById('btnSolve');
  const speedRange = document.getElementById('speedRange');

  let numDiscs = parseInt(discSelect.value);
  let towers = [[], [], []];

  // Initialize the towers with discs
  function initTowers() {
    towers = [[], [], []];
    for (let i = numDiscs; i >= 1; i--) {
      towers[0].push(i);
    }
    renderTowers();
  }

  // Render the towers on the stage
  function renderTowers() {
    const towerElements = document.querySelectorAll('.tower');
    towerElements.forEach((tower, index) => {
      tower.innerHTML = '';
      towers[index].forEach(disc => {
        const discElement = document.createElement('div');
        discElement.classList.add('disc');
        discElement.style.width = `${disc * 30}px`; // adjust size for each disc
        tower.appendChild(discElement);
      });
    });
  }

  // Solve the Tower of Hanoi problem recursively
  function solveHanoi(n, from, to, aux) {
    if (n === 0) return;
    solveHanoi(n - 1, from, aux, to);
    towers[to].push(towers[from].pop());
    renderTowers();
    setTimeout(() => solveHanoi(n - 1, aux, to, from), 1000 / speedRange.value);
  }

  // Start new game event
  newGameBtn.addEventListener('click', () => {
    numDiscs = parseInt(discSelect.value);
    initTowers();
  });

  // Solve button event
  btnSolve.addEventListener('click', () => {
    solveHanoi(numDiscs, 0, 2, 1); // Move discs from Tower 0 to Tower 2 using Tower 1 as auxiliary
  });

  // Initialize the game on page load
  initTowers();
});
