import { useEffect, useState } from 'react';
import { Car, MapPin, User, Settings } from 'lucide-react';
import ReservationCard, { ReservationCardProps } from './components/ReservationCard';
import AddressSearch from './components/AddressSearch';

function App() {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [reservationCardData, setReservationCardData] = useState<ReservationCardProps[]>([]);
  
  const handleAddressSelect = (address: string) => {
    setSelectedPlace(address);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/reservation_card')
    .then(res => res.json())
    .then(json => setReservationCardData(json))
  }, [])

  let ReservationCardsArray = []

  for (let idx in reservationCardData) {
    ReservationCardsArray.push(
    <ReservationCard
      key={reservationCardData[idx]["key"]}
      idEstabelecimento={reservationCardData[idx]["key"]}
      endereco={reservationCardData[idx]["endereco"]} 
      nomeEstabelecimento={reservationCardData[idx]["nome_estabelecimento"]}
      vagasDisponiveis={reservationCardData[idx]["vagas_disponiveis"]}
      valorEstacionamento={reservationCardData[idx]["valor_estacionamento"]}
      />
    )
  }

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
              <span>Minha Conta</span>
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
        {/* Search Section */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Encontre vagas próximas</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <AddressSearch onAddressSelect={handleAddressSelect} />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Buscar Vagas
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Vagas Disponíveis</h3>
            <p className="text-gray-600">
              Encontre vagas em tempo real nos estabelecimentos próximos a você.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Reserva Antecipada</h3>
            <p className="text-gray-600">
              Garanta sua vaga com antecedência e evite contratempos.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Pagamento Digital</h3>
            <p className="text-gray-600">
              Pague de forma segura usando PIX ou cartão de crédito.
            </p>
          </div>
        </section>

        {/* Example Parking Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Vagas em Destaque</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ReservationCardsArray}
          </div>
        </section>
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