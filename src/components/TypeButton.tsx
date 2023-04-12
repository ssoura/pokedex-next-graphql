import React from "react";
import Image from "next/image";

import bug from "../assets/types/bug.png";
import dark from "../assets/types/dark.svg";
import dragon from "../assets/types/dragon.png";
import electric from "../assets/types/electric.svg";
import fairy from "../assets/types/fairy.svg";
import fighting from "../assets/types/fighting.svg";
import fire from "../assets/types/fire.png";
import flying from "../assets/types/flying.png";
import ghost from "../assets/types/ghost.png";
import grass from "../assets/types/grass.png";
import ground from "../assets/types/ground.svg";
import ice from "../assets/types/ice.svg";
import normal from "../assets/types/normal.svg";
import poison from "../assets/types/poison.svg";
import psychic from "../assets/types/psychic.svg";
import rock from "../assets/types/rock.svg";
import steel from "../assets/types/steel.svg";
import water from "../assets/types/water.svg";

export const pokemonTypes: any = {
  Bug: {
    image: bug,
  },
  Dark: {
    image: dark,
  },
  Dragon: {
    image: dragon,
  },
  Electric: {
    image: electric,
  },
  Fairy: {
    image: fairy,
  },
  Fighting: {
    image: fighting,
  },
  Fire: {
    image: fire,
  },
  Flying: {
    image: flying,
  },
  Ghost: {
    image: ghost,
  },
  Grass: {
    image: grass,
  },
  Ground: {
    image: ground,
  },
  Ice: {
    image: ice,
  },
  Normal: {
    image: normal,
  },
  Poison: {
    image: poison,
  },
  Psychic: {
    image: psychic,
  },
  Rock: {
    image: rock,
  },
  Steel: {
    image: steel,
  },
  Water: {
    image: water,
  },
};

export default function TypeButton({ type }: { type: string }) {
  return (
    <button className="bg-slate-900 hover:bg-grey text-grey-darkest font-bold pr-2 rounded-3xl inline-flex items-center mx-1">
      <Image
        src={pokemonTypes[type]?.image || pokemonTypes["Normal"].image}
        alt={type}
        width={40}
        height={40}
      />
      <span className=" pl-2 text-xm">{type}</span>
    </button>
  );
}
