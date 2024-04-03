import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [search, setSearch] = useState('')
  const typeColors = {
    electric: 'bg-yellow-500',
    normal:   'bg-gray-500',
    fire:     'bg-red-500',
    water:    'bg-blue-500',
    ice:      'bg-blue-500',
    rock:     'bg-yellow-500',
    flying:   'bg-blue-500',
    grass:    'bg-green-500',
    poison:   'bg-green-500',
    ghost:    'bg-purple-500',
    bug:      'bg-green-500',
    dragon:   'bg-purple-500',
    steel:    'bg-gray-500',
    fighting: 'bg-red-500',
    default:  'bg-gray-500'
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        const pokemonPromises = data.results.map(poke =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
            .then(res => res.json())
        );
        Promise.all(pokemonPromises)
          .then(pokemonDetails => setPokemon(pokemonDetails));
      })
  }, [ limit ])

  return (
    <>
      <input className='border-2 border-black p-2 rounded-xl text-xl font-semibold block mx-auto outline-none focus:border-red-500 transition' 
              onChange={e => setSearch(e.target.value)}
              type="search" 
              placeholder='Search for a Pokemon...' />
      <section className='flex flex-wrap gap-8 p-4'>
        {pokemon.map((poke, index) => (
          <article key={index} className='border-2 w-60 p-4 rounded-xl shadow-lg shadow-black group transition cursor-pointer'>
            <img className='size-40 drop-shadow-soare group-hover:scale-150 transition mx-auto mb-12' 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} 
                  alt={`Imagen de ${poke.name}`} />
            <h2 className='capitalize text-center text-xl font-semibold group-hover:text-red-500 transition mb-4'>#{index + 1} <span className='capitalize'>{poke.name}</span></h2>
            <div className='flex flex-wrap justify-center'>
              {poke.types?.map(type => (
                <span key={type.slot} className={`px-2 py-1 mr-2 rounded-full text-xs font-semibold capitalize ${typeColors[type.type.name]}`}> 
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
