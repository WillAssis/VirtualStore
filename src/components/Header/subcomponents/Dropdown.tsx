import { useState, useRef } from 'react';
import './Dropdown.css';

interface Params {
  username: string;
  logout: () => void;
}

function Dropdown({ username, logout }: Params) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement | null>(null);

  document.body.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (menu.current && open && !menu.current.contains(target)) {
      setOpen(!open);
    }
  });

  return (
    <div
      ref={menu}
      className={open ? 'settings-dropdown open' : 'settings-dropdown'}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir configurações de usuário"
      >
        {username}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7,10L12,15L17,10H7Z" />
        </svg>
      </button>
      <div className="settings">
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}

export default Dropdown;
