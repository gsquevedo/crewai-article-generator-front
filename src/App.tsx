import { useState } from 'react'
import ArtigoCard from './components/ArtigoCard'
import './App.css'

function App() {
  const [topico, setTopico] = useState('')
  const [artigo, setArtigo] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  const gerarArtigo = async () => {
    setErro(null)
    setArtigo('')
    setCarregando(true)

    try {
      const res = await fetch('http://localhost:8000/gerar_artigo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topico })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Erro ao gerar artigo')

      setArtigo(data.artigo)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="container">
      <h1>Gerador de Artigos com IA</h1>
      <input
        type="text"
        placeholder="Digite o tópico"
        value={topico}
        onChange={(e) => setTopico(e.target.value)}
      />
      <button onClick={gerarArtigo}>Gerar Artigo</button>

      {carregando && <p>⏳ Gerando...</p>}
      {erro && <p style={{ color: 'red' }}>❌ {erro}</p>}

      {artigo && <ArtigoCard artigo={artigo} />}
    </div>
  )
}

export default App
