'use client'
import { ArrowLeftFromLineIcon, ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function PokemonDetail({ params }) {
  const unwrappedParams = use(params);
  const { name } = unwrappedParams;;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
    }
    fetchPokemonDetails();
  }, [name]);

  if (!pokemon) return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;

  return (
    <div className="container my-4 mx-auto px-4">
      <Link href="/" className="flex items-center text-blue-700 mb-4">
        <ArrowLeftIcon className="mr-2" /> Back
      </Link>
      <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
        <Image
          className="w-full bg-blue-400 object-contain"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={300}
          height={300}
        />
        <div className="bg-yellow-500 p-5">
          <p className="my-2">
            <span className="font-semibold whitespace-nowrap inline-block">Name:</span> {pokemon.name}
          </p>
          <p className="my-2">
            <span className="font-semibold whitespace-nowrap inline-block">Type:</span>
            {pokemon.types.map((typ, index) => (
              <span key={index}>
                {typ.type.name}
                {index < pokemon.types.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p className="my-2">
            <span className="font-semibold whitespace-nowrap inline-block">Stats:</span>
            <>
              {pokemon.stats.map((stat, index) => (
                <span key={index}>
                  {stat.stat.name}
                  {index < pokemon.stats.length - 1 ? ", " : ""}
                </span>
              ))}
            </>
          </p>
          <p className="my-2">
            <span className="font-semibold whitespace-nowrap inline-block">Abilities:</span>
            <>
              {pokemon.abilities.map((ablt, index) => (
                <span key={index}>
                  {ablt.ability.name}
                  {index < pokemon.abilities.length - 1 ? ", " : ""}
                </span>
              ))}
            </>
          </p>
          <p className="my-2">
            <span className="font-semibold whitespace-nowrap inline-block">Some Moves:</span>
            <>
              {pokemon.moves.slice(0, 5).map((move, index) => (
                <span key={index}>
                  {move.move.name}
                  {index < 4 ? ", " : ""}
                </span>
              ))}
            </>
          </p>
        </div>
      </div>
    </div>
  );
}
