import React, { useState } from 'react'
import ReservationModal from './ReservationModal';

export interface ReservationCardProps {
  key: number
  idEstabelecimento: number
  nomeEstabelecimento: string;
  endereco: string;
  valorEstacionamento: number;
  vagasDisponiveis: number
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  idEstabelecimento,
  nomeEstabelecimento,
  endereco,
  valorEstacionamento,
  vagasDisponiveis
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleReservationClick = () => {
    setIsModalOpen(true);
  };

  const handleReservationConfirm = () => {
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
    <h3 className="text-lg font-semibold">{nomeEstabelecimento} - {endereco}</h3>
    <p className="text-gray-600 mb-2">{vagasDisponiveis} vagas disponíveis</p>
    <div className="flex justify-between items-center">
      <span className="text-green-600 font-semibold">R${valorEstacionamento}/hora</span>
      <button 
        onClick={() => handleReservationClick()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Reservar
      </button>
    </div>

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

export default ReservationCard;