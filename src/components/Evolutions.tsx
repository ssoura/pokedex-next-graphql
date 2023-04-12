import React from "react";
import { gql, useQuery } from "@apollo/client";

import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

const GET_EVOLUTIONS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      image
      evolutions {
        id
        number
        image
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        evolutions {
          name
        }
      }
    }
  }
`;

export default function Evolutions({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data, loading, error } = useQuery(GET_EVOLUTIONS, {
    variables: {
      id: id,
    },
  });
  const handleonClose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!isOpen) return null;
  return (
    <div
      onClick={handleonClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white text-slate-800 sm:p-8 rounded p-2 h-screen w-screen sm:h-auto sm:w-auto overflow-auto align-middle sm:">
        <div className="flex justify-between mb-8">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Evolution
          </h1>
          <button
            onClick={onClose}
            className="ml-auto text-gray-700 hover:text-gray-900"
          >
            Close
          </button>
        </div>
        <div className="sm:flex h-96 mx-auto sm:gap-8 align-middle justify-center">
          <div
            key={data?.pokemon?.id}
            className="flex flex-col items-center justify-center"
          >
            <img src={data?.pokemon?.image} alt={data?.pokemon?.name} />
            <p>{data?.pokemon?.name}</p>
          </div>
          {data?.pokemon?.evolutions.map((pokemon: pokemonType) => {
            return (
              <>
                <AiFillCaretRight className="hidden sm:block text-4xl text-gray-500 h-96" />

                <AiFillCaretDown className="sm:hidden block text-4xl text-gray-500 h-24 mx-auto" />
                <div
                  key={pokemon.id}
                  className="flex flex-col items-center justify-center"
                >
                  <img src={pokemon.image} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
