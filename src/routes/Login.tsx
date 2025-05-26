import { useState } from "react";
import { useNavigate } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuarioId", data.id_pessoa); 
      navigate("/", { replace: true });
    } else {
      alert(`Erro: ${data.erro || "Falha no login"}`);
    }
  };

  const handleCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Entrar
          </button>
          <button
            type="button"
            onClick={handleCadastro}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
          >
            Criar Conta
          </button>
        </div>
      </form>
    </div>
  );
}
