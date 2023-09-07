// Altera o tema da página entre dark e light e salva a opção escolhida no localSorage
function changePageTheme() {
  const root = document.documentElement;
  const nextTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = nextTheme;
  localStorage.setItem('theme', nextTheme);
}

export default changePageTheme;
