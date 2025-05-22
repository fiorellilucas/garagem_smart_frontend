import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    cidade: "",
    estado: "",
    dt_nascimento: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id_plano: 1 }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Cadastro realizado!");
    } else {
      alert(`Erro: ${data.erro || "Falha no cadastro"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>
        <div className="space-y-4">
          {["nome", "email", "senha", "cpf", "cidade", "estado", "dt_nascimento", "telefone"].map((campo) => (
            <input
              key={campo}
              type={campo === "senha" ? "password" : campo === "dt_nascimento" ? "date" : "text"}
              name={campo}
              placeholder={campo.toUpperCase()}
              value={(form as any)[campo]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={campo !== "telefone"}
            />
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
