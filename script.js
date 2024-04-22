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
  ['FlappyBirdAi', 'Flappy Bird AI'],
  ['Fnae', 'FNAE'],
  ['FourierSeries', 'Fourier Series'],
  ['GameEdiv', 'Sticky Red'],
  ['GameOfLife', 'Game Of Life'],
  ['Minecraft', 'Minecraft'],
  ['Minesweeper', 'Minesweeper'],
  ['MoneyPortal', 'Money Portal'],
  ['Pacman', 'Pacman'],
  ['SnakeAI', 'Snake AI'],
  ['SortSimulation', 'Sort Simulation'],
  ['TenTen', '1010!'],
  ['TowerDefense', 'Tower Defense'],
  ['VirusEvolution', 'Virus Evolution'],
  ['BalloonsPop', 'Balloons Pop'],
  ['BeatMaker', 'Beat Maker'],
]



const getProjectHTML = p => `
<a href="/projects/${p[0]}" class="details-container color-container">
  <h2 class="experience-sub-title project-title">${p[1]}</h2>
</a>
`

for (const project of PROJECTS) {
  $('#otherProjects').append(getProjectHTML(project))
}

