/**
 * Define o tema (dark ou light) quando a página é carregada
 * Prioridade: localStorage > Sistema do usuário
 */
function loadPageTheme() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    root.className = savedTheme === 'dark' ? 'dark' : 'light';
  } else {
    root.className = isSystemThemeDark ? 'dark' : 'light';
  }
}

export default loadPageTheme;
