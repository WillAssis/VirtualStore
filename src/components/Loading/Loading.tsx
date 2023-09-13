import './Loading.css';

interface Params {
  error: string | null;
}

function Loading({ error }: Params) {
  return (
    <div aria-label="Carregando dados" className="loading-screen">
      <div className="spinner"></div>
      <p>{error ?? 'Carregando...'}</p>
    </div>
  );
}

export default Loading;
