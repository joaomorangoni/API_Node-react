import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [cadastros, setCadastros] = useState([]);
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = "http://localhost:3000/cadastros";

  useEffect(() => {
    fetchCadastros();
  }, []);

  const fetchCadastros = async () => {
    try {
      const res = await axios.get(API_URL);
      setCadastros(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await axios.put(`${API_URL}/${editId}`, formData);
      else await axios.post(API_URL, formData);
      setFormData({ nome: "", email: "" });
      setIsEditing(false);
      setEditId(null);
      setShowForm(false);
      fetchCadastros();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (cadastro) => {
    setFormData({ nome: cadastro.nome, email: cadastro.email });
    setIsEditing(true);
    setEditId(cadastro.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCadastros();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Cadastro de Usuários</h1>

        <button className="toggle-btn" onClick={() => setShowForm(!showForm)}>
          {isEditing ? "Cancelar Edição" : "Cadastrar"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="form">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite o email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              {isEditing ? "Atualizar" : "Cadastrar"}
            </button>
          </form>
        )}

        <div className="cadastro-list">
          {cadastros.map((cadastro) => (
            <div key={cadastro.id} className="cadastro-item">
              <div className="cadastro-info">
                <p className="nome">{cadastro.nome}</p>
                <p className="email">{cadastro.email}</p>
              </div>
              <div className="buttons">
                <button onClick={() => handleEdit(cadastro)} className="edit-btn">
                  ✏️ Editar
                </button>
                <button onClick={() => handleDelete(cadastro.id)} className="delete-btn">
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
