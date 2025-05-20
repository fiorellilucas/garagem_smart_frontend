import { useOutletContext } from 'react-router';
import AddressSearch from '../components/AddressSearch';
import ReservationCard, { ReservationCardProps } from '../components/ReservationCard';
import { useEffect, useState } from 'react';
import ReservationModal from '../components/ReservationModal';

function Home() {
  const [reservationCardData, setReservationCardData] = useState<ReservationCardProps[]>([]);
  const { selectedPlace, setSelectedPlace } = useOutletContext<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [idEstabelecimento, setIdEstabelecimento] = useState(0);

  const handleAddressSelect = (idEstabelecimento: number) => {
    setSelectedPlace(idEstabelecimento);
  };

  const handleReservationClick = (idEstabelecimento: number) => {
    setIdEstabelecimento(idEstabelecimento)
    setIsModalOpen(true);
  };

  const handleReservationConfirm = () => {
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
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
        handleReservationClick={handleReservationClick}
      />
    )
  }
  return (
    <div>
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Encontre vagas próximas</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <AddressSearch onAddressSelect={handleAddressSelect} />
            <button onClick={() => handleReservationClick(selectedPlace)} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Buscar Vagas
            </button>
          </div>
        </div>
      </section>

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

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Vagas em Destaque</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {ReservationCardsArray}
        </div>
      </section>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        idEstabelecimento={idEstabelecimento}
        onConfirm={handleReservationConfirm}
      />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          Parabéns! Vaga reservada com sucesso!
        </div>
      )}
    </div>
  )
}

export default Home;