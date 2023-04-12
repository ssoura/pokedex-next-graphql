import { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";

import Layout from "../components/Layout";
import PokemonCard from "../components/PokemonCard";

import { useInView } from "react-intersection-observer";

import { initializeApollo, addApolloState } from "../lib/client";

const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
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
  }
`;

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView, entry } = useInView({
    onChange: (inView, entry) => {
      if (inView) {
        onLoadMore();
      }
    },
    threshold: 0,
  });

  const onLoadMore = () => {
    if (offset < 151) {
      setOffset((prev) => prev + 20);
    }
  };

  const [getData, { loading, error, data }] = useLazyQuery(GET_POKEMONS, {
    variables: { first: 20 + offset },
  });
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const nextPage = () => {
    setOffset((prev) => prev + 20);
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setOffset((prev) => prev - 20);
    setPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="flex mx-auto justify-center text-slate-900 text-5xl w-screen mt-32">
        Loading..
      </div>
    );
  }
  if (error) return <p>Error :( </p>;
  return (
    <Layout title={"Pokemon"}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data &&
          data.pokemons
            .slice(offset)
            .map((pokemon: pokemonType) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
            ))}
      </div>

      <nav className="flex justify-center mx-auto m-4 gap-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
          disabled={page === 1}
          onClick={prevPage}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
          onClick={nextPage}
          disabled={data?.pokemons && data.pokemons.length === 151}
        >
          Next
        </button>
      </nav>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_POKEMONS,
    variables: {
      first: 20,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
