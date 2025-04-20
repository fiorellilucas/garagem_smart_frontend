import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  idEstabelecimento: number;
  onConfirm: (block: string, spot: string) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  idEstabelecimento,
  onConfirm,
}) => {
  const [selectedBlock, setSelectedBlock] = React.useState('');
  const [selectedSpot, setSelectedSpot] = React.useState('');
  const [reservationModalData, setReservationModalData] = React.useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/reservation_modal?id=${idEstabelecimento}`)
    .then(res => res.json())
    .then(json => setReservationModalData(json))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedBlock, selectedSpot);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reservar Vaga - {reservationModalData["nome_estabelecimento"]}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione o Bloco
            </label>
            <select
              value={selectedBlock}
              onChange={(e) => (
                setSelectedBlock(e.target.value)
              )}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecione...</option>
              {reservationModalData["garagens"].map(garagem => {
                return <option key={garagem["id"]} value={garagem["id"]}>{garagem["nome_garagem"]}</option>
              })}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número da Vaga
            </label>
            <select
              value={selectedSpot}
              onChange={(e) => (
                setSelectedSpot(e.target.value)
              )}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecione...</option>
              {reservationModalData["garagens"]
                .filter(garagem => (garagem["id"] === Number(selectedBlock)))
                .flatMap(garagem =>
                  garagem["vagas"].map(vaga => (
                    <option key={vaga["id"]} disabled={vaga["status"] !== "livre"} value={vaga["id"]}>{vaga["numero_vaga"]}</option>
                  ))
                )}
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationModal;