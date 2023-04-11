import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import Layout from "../../components/Layout";

import { initializeApollo, addApolloState } from "../../lib/client";

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
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        evolutions {
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
        }
        maxHP
        image
      }
    }
  }
`;

export default function Pokemon() {
  const router = useRouter();
  const { pokemon } = router.query;

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { id: pokemon },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;
  console.log(data.pokemon);

  if (pokemon) {
    return (
      <>
        <Layout title={data.pokemon.name} number={data.pokemon.number}>
          <div className="lg:flex justify-center mx-auto gap-4 max-h-[80vh]">
            <div className="bg-white rounded-lg p-4 basis-1/3">
              <Image
                className="max-h-[75vh]"
                src={data.pokemon.image}
                alt={data.pokemon.name}
                width={480}
                height={480}
              />
            </div>

            <div className="bg-slate-400 rounded p-5 flex-2 basis-2/3">
              {/* <ul className="flex gap-5">{renderTypes()}</ul> */}

              {/* <div>{renderStats()}</div> */}
              <div>
                <h2>{data.pokemon.name}</h2>
                {/* <p>Number: </p> */}
                <p>Classification: {data.pokemon.classification}</p>
                <p>Types: {data.pokemon.types.join(", ")}</p>
                <p>Resistant: {data.pokemon.resistant.join(", ")}</p>
                <p>Weaknesses: {data.pokemon.weaknesses.join(", ")}</p>
                <p>Flee Rate: {data.pokemon.fleeRate}</p>
                <p>Max CP: {data.pokemon.maxCP}</p>
                <p>Max HP: {data.pokemon.maxHP}</p>
              </div>
            </div>
          </div>
        </Layout>
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

type Params = {
  params: {
    pokemon: string;
  };
};

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
