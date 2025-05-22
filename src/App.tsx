import { Car, MapPin, User, Settings } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';

function App() {
  const [selectedPlace, setSelectedPlace] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Garagem Smart</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button className="flex items-center space-x-2 hover:text-blue-200">
              <MapPin className="w-5 h-5" />
              <span>Encontrar Vagas</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-200">
              <User className="w-5 h-5" />
              <span>Minhas Reservas</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-200">
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <Outlet context={{ selectedPlace, setSelectedPlace }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
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
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-white">Como Funciona</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">Termos de Uso</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">Política de Privacidade</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;