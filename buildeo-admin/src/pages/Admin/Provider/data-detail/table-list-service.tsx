import { Link } from 'react-router-dom';
import { Eye, PencilLine, Trash2 } from 'lucide-react';
import Box from '@mui/material/Box';
import Profil from '../../../../../public/profil.png'

const services = [
  {
    id: 1,
    title: 'Lay LVT: up to 20 m²',
    description: 'Painter Company',
    href: Profil,
  },
  {
    id: 2,
    title: 'Wallpaper Installation/Removal',
    description: 'Painter Company',
    href: Profil,
  },
  {
    id: 3,
    title: 'Interior Painting',
    description: 'Painter Company',
    href: Profil,
  },
  {
    id: 4,
    title: 'Interior Painting',
    description: 'Painter Company',
    href: Profil,
  },
];

const ActionButtons = () => (
  <div style={{ display: 'flex', gap: '10px' }}>
    <Link to={'/sa-servive/detail'}>
      <button
        style={{
          backgroundColor: '#00CFFF',
          border: 'none',
          borderRadius: '8px',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Eye color="white" size={20} />
      </button>
    </Link>
    <button
      style={{
        backgroundColor: '#FFA500',
        border: 'none',
        borderRadius: '8px',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <PencilLine color="white" size={20} />
    </button>
    <button
      style={{
        backgroundColor: '#FF4500',
        border: 'none',
        borderRadius: '8px',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <Trash2 color="white" size={20} />
    </button>
  </div>
);

export default function ListService() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        padding: '20px',
      }}
    >
      {services.map((service) => (
        <Box
          key={service.id}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <img
            src={service.href}
            alt={service.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <Box sx={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#888', fontSize: '18px' }}><b>{service.title}</b></h3>
            <p style={{ margin: 0, color: '#888' }}>{service.description}</p>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px',
              borderTop: '1px solid #eee',
            }}
          >
            <ActionButtons />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
