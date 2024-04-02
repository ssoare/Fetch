import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [type, setType] = useState([])
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(data => {
        const pokemonPromises = data.results.map(poke =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
            .then(res => res.json())
        );
        Promise.all(pokemonPromises)
          .then(pokemonDetails => setPokemon(pokemonDetails));
      })
  }, [])
  

  return (
    <>
      <section className='flex flex-wrap gap-8 p-4'>
        {pokemon.map((poke, index) => (
          <article key={index} className='border-2 w-60 p-4 rounded-xl shadow-md shadow-black group transition cursor-pointer'>
            <img className='size-40 drop-shadow-soare group-hover:scale-150 transition mx-auto mb-12' 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} 
              alt={`Imagen de ${poke}`} />
            <h2 className='capitalize text-center text-xl font-semibold group-hover:text-red-500 transition'>#{index + 1} <span className='capitalize'>{poke.name}</span>
            </h2>
            <p className='text-center italic text-gray-500'>{poke.types ? poke.types.map(type => type.type.name).join(', ') : 'No types found'}</p>
          </article>
        ))}
      </section>
    </>
  )
}  

export default App
