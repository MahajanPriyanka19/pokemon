import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ name, url }) {
  const id = url.split("/").filter(Boolean).pop();

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
        <Link href={`/pokemon/${name}`}>
        <Image width={200} height={200}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          className="w-24 h-24"
        />
        <p className="capitalize mt-2 font-semibold text-blue-500">{name}</p>
    </Link>
    <Link href={`/pokemon/${name}`} className="text-sm flex items-center mt-4">Details <ArrowRight className="ml-2 w-4 h-4"/></Link>
      </div>
  );
}
