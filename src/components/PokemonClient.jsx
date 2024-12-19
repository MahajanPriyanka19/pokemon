"use client";

import { useState, useEffect } from "react";
import PokemonFilter from "@/components/PokemonFilter";
import PokemonCard from "@/components/PokemonCard";

export default function PokemonClient({ initialData }) {
  const [pokemon, setPokemon] = useState(initialData.pokemon || []);
  const [types] = useState(initialData.types || []);
  const [filter, setFilter] = useState({ type: "", search: "" });

  useEffect(() => {
    // No data fetch or DOM manipulation during SSR-hydrated initial render
    if (!filter.type) return;

    async function fetchFilteredPokemon() {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${filter.type}`);
      const data = await res.json();
      setPokemon(data.pokemon.map((p) => p.pokemon));
    }

    fetchFilteredPokemon();
  }, [filter.type]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name?.toLowerCase().includes(filter.search.toLowerCase())
  );

  return (
    <>
      <PokemonFilter types={types} filter={filter} setFilter={setFilter} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((p) => (
            <PokemonCard key={p.name} name={p.name} url={p.url} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No Pokémon found</p>
        )}
      </div>
    </>
  );
}
