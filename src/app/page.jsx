import PokemonClient from "@/components/PokemonClient";

async function fetchPokemonData() {
  const pokemonRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  const typesRes = await fetch("https://pokeapi.co/api/v2/type");

  if (!pokemonRes.ok || !typesRes.ok) {
    throw new Error("Failed to fetch Pokémon data");
  }

  const pokemonData = await pokemonRes.json();
  const typesData = await typesRes.json();

  return { pokemon: pokemonData.results, types: typesData.results };
}

export default async function Home() {
  const data = await fetchPokemonData();

  return (
    <div className="bg-zinc-100">
      {/* <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1> */}
      <PokemonClient initialData={data} />
    </div>
  );
}
