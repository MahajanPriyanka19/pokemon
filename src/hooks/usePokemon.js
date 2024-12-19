"use client";   
import { useState, useEffect } from "react";
export function usePokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState({ type: "", search: "" });

  useEffect(() => {
    async function fetchData() {
      const [pokemonRes, typesRes] = await Promise.all([
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100"),
        fetch("https://pokeapi.co/api/v2/type"),
      ]);
      const pokemonData = await pokemonRes.json();
      const typesData = await typesRes.json();
      setPokemon(pokemonData.results);
      setTypes(typesData.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function filterPokemon() {
      let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
      if (filter.type) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${filter.type}`);
        const data = await res.json();
        setPokemon(data.pokemon.map((p) => p.pokemon));
      } else {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data.results);
      }
    }
    filterPokemon();
  }, [filter.type]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(filter.search.toLowerCase())
  );

  return { pokemon: filteredPokemon, types, filter, setFilter };
}
