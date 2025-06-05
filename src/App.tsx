// import { Car, MapPin, User, LogOut } from 'lucide-react'
import { FaCarSide, FaMapPin, FaUser,  } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useState } from 'react';
import { Outlet, useNavigate  } from 'react-router';

function App() {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCarSide className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Garagem Smart</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => navigate('/')} className="flex items-center space-x-2 hover:text-blue-200">
              <FaMapPin className="w-5 h-5" />
              <span>Encontrar Vagas</span>
            </button>
            <button onClick={() => navigate('/minhas-reservas')} className="flex items-center space-x-2 hover:text-blue-200">
              <FaUser className="w-5 h-5" />
              <span>Minhas Reservas</span>
            </button>
            <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-blue-200">
              <RiLogoutBoxRLine className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        <Outlet context={{ selectedPlace, setSelectedPlace }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Sobre</h4>
              <p className="text-gray-400">
                Garagem Smart - Sua solução inteligente para encontrar vagas de estacionamento.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <p className="text-gray-400">
                Email: contato@garagemsmart.com.br<br />
                Telefone: (15) 1234-5678
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
