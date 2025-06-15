import { useState } from 'react';
import './App.css';

function App () {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setPokemonData(null);
    setError('')

    try {
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLocaleLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemonData(data);
      setPokemonName(''); 

    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
  <>
    <h1>Get the Pokemon</h1>
    <form onSubmit={handlerSubmit} className="poke-form">
      <label htmlFor="pokemon">Pokemon Name</label>
      <input
        type="text"
        id="pokemon"
        name="pokemon"
        placeholder="Enter Pokemon Name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button type="submit">Get Pokemon</button>
    </form>

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
  )
};

export default App;





 
