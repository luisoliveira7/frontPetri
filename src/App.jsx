import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [query, setQuery] = useState("iron man");
  const [shows, setShows] = useState([]);
  const [error, setError] = useState('');

  async function fetchShows(searchTerm) {
    try {
      setError("");
      const response = await api.get(searchTerm);
      setShows(response.data);
    } catch (error) {
      setError("Não foi possível carregar os dados da API", erro);
    } finally {
    }
  }

  useEffect(() => {
    fetchShows("iron man");
  }, []);
  function handleSubmit(event){
    event.preventDefault();

    if (!query.trim()){
      setError("Digite um titulo para pesquisar")
      return
    }

    fetchShows(query);
  }

  return (
    <main className="container">
      <h1>Consumo de API com React</h1>
      

      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="query"> Pesquisar por título:</label>
        <input
        id="query"
        type="text"
        value={query}
        onChange={(event => setQuery(event.target.value))}
        placeholder="Eex: Star Wars"
        />
      </form>
    {error && <p>{error}</p>}

      <ul className="show-list">
        {shows.map((item) => (
          <li key={item.show.id} className="show-card">
            <h2>{item.show.name}</h2>
            {item.show.image?.medium ? (
              <img
                src={item.show.image.medium}
                alt={"Capa de ${item.show.name}"}
              />
            ) : (
              <div className="no-image"> Sem Imagem</div>
            )}

            <p>
              <strong> Link:</strong>
              <a href={item.show.url} target="_blank" rel="noferrer">
                Acessar página do Card
              </a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App;
