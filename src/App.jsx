import { useState, useEffect } from 'react';
import './App.css';


function usePokemon(name) {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name) {
      setPokemonData(null);
      setError('');
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchPokemon(name);
    }, 500);

    return () => clearTimeout(timeoutId);

    async function fetchPokemon(pokemonName) {
      setLoading(true);
      setError('');
      setPokemonData(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        setPokemonData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [name]);

  return { pokemonData, error, loading };
}


function PokemonForm({ value, onChange }) {
  return (
    <form className="poke-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="pokemon">Pokemon Name</label>
      <input
        type="text"
        id="pokemon"
        name="pokemon"
        placeholder="Enter Pokemon Name"
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </form>
  );
}

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const { pokemonData, error, loading } = usePokemon(pokemonName);

  return (
    <>
      <div className="poke-container">
        <h1>Get the Pokemon</h1>
        <PokemonForm value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemonData && (
        <div className="pokemon-info">
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}
    </>
  );
}

export default App;







 
