const ArtigoCard = ({ artigo }) => {
  return (
    <div className="artigo">
      <h2>📝 {artigo.titulo}</h2>
      <p dangerouslySetInnerHTML={{ __html: artigo.conteudo.replace(/\n/g, '<br />') }} />
      <p><strong>Palavras:</strong> {artigo.palavras}</p>
    </div>
  );
}

export default ArtigoCard;
