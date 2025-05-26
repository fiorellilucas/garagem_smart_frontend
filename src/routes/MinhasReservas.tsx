import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Reserva {
  id: number;
  dthr_reserva: string;
  status: string;
  vaga: string;
  garagem: string;
  estabelecimento: string;
}

export default function MinhasReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/api/minhas-reservas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setReservas(data))
      .catch(err => console.error("Erro ao buscar reservas", err));
  }, [navigate]);

  const cancelarReserva = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!confirm("Deseja realmente cancelar esta reserva?")) return;

    const res = await fetch(`http://localhost:3000/api/reservas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setReservas(reservas.filter(r => r.id !== id));
      alert("Reserva cancelada com sucesso!");
    } else {
      alert("Erro ao cancelar reserva.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Reservas</h1>
      {reservas.length === 0 ? (
        <p>Você não possui reservas.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva) => (
            <li
              key={reserva.id}
              className="p-4 border rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Estabelecimento:</strong> {reserva.estabelecimento}</p>
                <p><strong>Garagem:</strong> {reserva.garagem}</p>
                <p><strong>Vaga:</strong> {reserva.vaga}</p>
                <p><strong>Data Reserva:</strong> {new Date(reserva.dthr_reserva).toLocaleString()}</p>
                <p><strong>Status:</strong> {reserva.status}</p>
              </div>
              {reserva.status === 'ativa' && (
                <button
                  onClick={() => cancelarReserva(reserva.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
