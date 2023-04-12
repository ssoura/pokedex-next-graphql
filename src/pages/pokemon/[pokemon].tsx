import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../components/Layout";

import { initializeApollo, addApolloState } from "../../lib/client";
import Evolutions from "@/components/Evolutions";
import { useState } from "react";
import TypeButton from "../../components/TypeButton";

const GET_POKEMONS_IDS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
    }
  }
`;

const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image

      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        evolutions {
          id
        }
      }
    }
  }
`;

export default function Pokemon() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { pokemon } = router.query;

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { id: pokemon },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;

  if (pokemon) {
    return (
      <>
        <Layout title={data.pokemon.name} number={data.pokemon.number}>
          <div className="sm:flex justify-center mx-auto gap-4 max-h-[80vh]">
            <div className="bg-white rounded-lg p-4 basis-1/3">
              <Image
                className="max-h-[75vh]"
                src={data.pokemon.image}
                alt={data.pokemon.name}
                width={480}
                height={480}
              />
            </div>

            <div className="bg-slate-400 rounded p-5 flex-2 basis-2/3 text-2xl font-semibold">
              <ul>
                <li className="mb-4">
                  <span className="inline-block">Height:</span>
                  <span className="text-slate-800 ml-4">
                    {data.pokemon.height.maximum}
                  </span>
                </li>
                <li className="mb-4">
                  <span className="inline-block">Weight:</span>
                  <span className="text-slate-800 ml-4">
                    {data.pokemon.weight.maximum}
                  </span>
                </li>
                <li className="mb-4">
                  <span className="inline-block">Classification:</span>
                  <span className="text-slate-800 ml-4">
                    {data.pokemon.classification}
                  </span>
                </li>
                <li className="mb-4">
                  <span className="inline-block align-top">Types:</span>
                  <span>
                    {data.pokemon.types.map((type: string) => {
                      return <TypeButton key={type} type={type} />;
                    })}
                  </span>
                </li>
                <li className="mb-4">
                  <span className="inline-block align-top">Weaknesses:</span>
                  <span>
                    {data.pokemon.weaknesses.map((type: string) => {
                      return <TypeButton key={type} type={type} />;
                    })}
                  </span>
                </li>
                <li className="mb-4">
                  <span className="inline-block align-top">Resistant:</span>
                  <span>
                    {data.pokemon.resistant.map((type: string) => {
                      return <TypeButton key={type} type={type} />;
                    })}
                  </span>
                </li>
              </ul>
              {data.pokemon.evolutions && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Evolve
                </button>
              )}
            </div>
          </div>
        </Layout>
        <Evolutions
          id={data.pokemon.id}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </>
    );
  } else {
    return <div></div>;
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_POKEMONS_IDS,
    variables: {
      first: 20,
    },
  });

  type PokemonID = {
    id: string;
  };

  const paths = data.pokemons.map((pokemon: PokemonID) => ({
    params: { pokemon: pokemon.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: Params) {
  const apolloClient = initializeApollo();

  const pokemon = params.pokemon;

  await apolloClient.query({
    query: GET_POKEMON,
    variables: {
      id: pokemon,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
