import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])

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
              alt={`Imagen de ${poke.name}`} />
            <h2 className='capitalize text-center text-xl font-semibold group-hover:text-red-500 transition mb-4'>#{index + 1} <span className=' capitalize'>{poke.name}</span></h2>
            <div className='flex flex-wrap justify-center'>
              {poke.types?.map(type => (
                <span key={type.slot} className={`px-2 py-1 mr-2 rounded-full text-xs font-semibold capitalize 
                  ${type.type.name === 'poison' ? 'bg-green-500 text-white' :
                    type.type.name === 'fire' ? 'bg-red-500 text-white' : 
                    type.type.name === 'water' ? 'bg-blue-500 text-white' : 
                    type.type.name === 'electric' ? 'bg-yellow-500 text-white' : 
                    type.type.name === 'grass' ? 'bg-green-500 text-white' :
                    type.type.name === 'water' ? 'bg-blue-500 text-white' :
                    type.type.name === 'ground' ? 'bg-yellow-500 text-white' :
                    type.type.name === 'flying' ? 'bg-blue-500 text-white' :
                    type.type.name === 'bug' ? 'bg-green-500 text-white' :
                    type.type.name === 'normal' ? 'bg-gray-500 text-white' :
                    type.type.name === 'fighting' ? 'bg-red-500 text-white' :
                    type.type.name === 'psychic' ? 'bg-purple-500 text-white' :
                    type.type.name === 'rock' ? 'bg-yellow-500 text-white' :
                    type.type.name === 'ghost' ? 'bg-purple-500 text-white' :
                    type.type.name === 'ice' ? 'bg-blue-500 text-white' :
                    type.type.name === 'dragon' ? 'bg-purple-500 text-white' :
                    type.type.name === 'dark' ? 'bg-gray-500 text-white' :
                    type.type.name === 'steel' ? 'bg-gray-500 text-white' :
                    type.type.name === 'fairy' ? 'bg-pink-500 text-white' :
                    'bg-gray-500 text-white'}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default App
