import { useState, useEffect } from 'react'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [type, setType] = useState([])
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results.map(poke => poke.name))
      })
  }, [])

  return (
    <>
      <section className='flex flex-wrap gap-8 p-4'>
          {pokemon.map((poke, index) => {
            return(
              <>
                  <article key={index} className='border-2 w-60 p-4 rounded-xl shadow-md shadow-black hover:scale-105 group transition cursor-pointer'>
                    <h2 className='capitalize text-center text-xl font-semibold'>#{index + 1}</h2>
                    <h2 className='capitalize text-center text-xl font-semibold'>{poke}</h2>
                    <img className='size-40 drop-shadow-soare group-hover:drop-shadow-soare2 transition mx-auto' 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} 
                      alt={`Imagen de ${poke}`} />
                    <p>{type}</p>
                  </article>
              </>
            )
          })}
      </section>
    </>
  )
}

export default App
