import { useState, useEffect } from 'react';
import './App.css';

function App () {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pokemonName) {
      setPokemonData(null);
      setError('');
      return;
    }

    
    const timeoutId = setTimeout(() => {
      fetchPokemon(pokemonName);
    }, 500);

    
    return () => clearTimeout(timeoutId);

  }, [pokemonName]);

  const fetchPokemon = async (name) => {
    setLoading(true);
    setError('');
    setPokemonData(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Get the Pokemon</h1>
      <form className="poke-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="pokemon">Pokemon Name</label>
        <input
          type="text"
          id="pokemon"
          name="pokemon"
          placeholder="Enter Pokemon Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          autoComplete="off"
        />
      </form>

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
};

export default App;






 
