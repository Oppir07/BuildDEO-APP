import { BellIcon, UserIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';

type SidebarProps = {
  className?: string;
};

export default function HeaderNav({className}: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: '60px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <nav>
      <div style={headerStyle}>
      <div>
        <button onClick={handleToggle} aria-label="Open sidebar" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>☰</span>
        </button>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button aria-label="Search" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <SearchIcon size={24} color="#333" />
        </button>
        <button aria-label="Notifications" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <BellIcon size={24} color="#333" />
        </button>
        <button aria-label="User Profile" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <UserIcon size={24} color="#333" />
        </button>
      </div>
    </div>
    </nav>
  );
}
