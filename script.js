function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

PROJECTS = [
  ['EquationSolver', 'Equation Solver'],
  ['Encoding', 'Encoding'],
  ['Snake', 'Snake'],
  ['RubixCube', 'Rubiks Cube'],
  ['Astroids', 'Astroids'],
  ['CarsAI', 'Cars AI'],
  ['ChessAI', 'Chess AI'],
  ['CircleTester', 'Circle Tester'],
  ['Darts', 'Darts'],
  ['EdenLanguage', 'Eden Language'],
  ['FlappyBirdAI', 'Flappy Bird AI'],
  ['Fnae', 'FNAE'],
  ['FourierSeries', 'Fourier Series'],
  ['GameEdiv', 'Sticky Red'],
  ['GameOfLife', 'Game Of Life'],
  ['Minecraft', 'Minecraft'],
  ['Minesweeper', 'Minesweeper'],
  ['MoneyPortal', 'Money Portal', true],
  ['Pacman', 'Pacman', true],
  ['SnakeAI', 'Snake AI'],
  ['SortSimulation', 'Sort Simulation'],
  ['TenTen', '1010!'],
  ['TowerDefense', 'Tower Defense'],
  ['VirusEvolution', 'Virus Evolution'],
  ['BalloonsPop', 'Balloons Pop', true],
  ['BeatMaker', 'Beat Maker'],
]



const getProjectHTML = p => {
  var link = `/projects/${p[0]}`
  if (p.length > 2 && p[2]) {
    link = `/${p[0]}`
  }
  return `
  <a href="${link}" class="small-link details-container color-container">
    <h2 class="experience-sub-title project-title">${p[1]}</h2>
  </a>
  `
}

for (const project of PROJECTS) {
  $('#otherProjects').append(getProjectHTML(project))
}

