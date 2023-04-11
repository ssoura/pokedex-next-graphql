import React from "react";
import Link from "next/link";
import Image from "next/image";

type PokemonCardProps = {
  pokemon: {
    id: string;
    number: string;
    name: string;
    image: string;
    types: string;
  };
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`pokemon/${pokemon.id}`}>
      <div className="bg-white rounded p-5 flex flex-col justify-center items-center relative">
        <div className="">
          <span className="absolute text-2xl text-slate-600 font-semibold top-0 right-3">
            #{pokemon.number}
          </span>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={240}
            height={240}
          />
          <span className="">
            <h2 className="uppercase font-semibold tracking-wider text-amber-400 mx-auto">
              {pokemon.name}
            </h2>
            <p className="text-xs text-slate-800">Types: {pokemon.types}</p>
          </span>
        </div>
      </div>
    </Link>
  );
}
