import React from 'react'

export interface ReservationCardProps {
  key: number
  idEstabelecimento: number
  nomeEstabelecimento: string;
  endereco: string;
  valorEstacionamento: number;
  vagasDisponiveis: number;
  handleReservationClick: any;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  idEstabelecimento,
  nomeEstabelecimento,
  endereco,
  valorEstacionamento,
  vagasDisponiveis,
  handleReservationClick
}) => {

  return (
    <div className="border border-gray-200 rounded-lg p-4">
    <h3 className="text-lg font-semibold">{nomeEstabelecimento} - {endereco}</h3>
    <p className="text-gray-600 mb-2">{vagasDisponiveis} vagas disponíveis</p>
    <div className="flex justify-between items-center">
      <span className="text-green-600 font-semibold">R${valorEstacionamento}/hora</span>
      <button 
        onClick={() => handleReservationClick(idEstabelecimento)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Reservar
      </button>
    </div>

  </div>
  )
}

export default ReservationCard;