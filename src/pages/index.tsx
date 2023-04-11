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
    console.log("oddset", offset);
    if (offset < 151) {
      setOffset((prev) => prev + 20);
    }
  };

  // const { loading, error, data, refetch } = useLazyQuery(GET_POKEMONS, {
  //   variables: { first: 20 + offset },
  //   pollInterval: 500,
  //   onCompleted: () => {
  //     setData2(data.pokemons);
  //   },
  // });
  const [getData, { loading, error, data }] = useLazyQuery(GET_POKEMONS, {
    variables: { first: 20 + offset },
  });
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [offset]);

  // useEffect(() => {
  //   console.log("offset", offset);
  //   setOffset((prev) => prev + 20);
  //   console.log("offset", offset);
  // }, [page]);

  console.log("current state of data", data);

  const nextPage = () => {
    setOffset((prev) => prev + 20);
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setOffset((prev) => prev - 20);
    setPage((prev) => prev - 1);
  };
  if (loading) return <p>Loading...</p>;
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
        >
          Next
        </button>
      </nav>
    </Layout>
  );
}

// <div ref={ref}>
//   {loading && <p>Loading...</p>}
//   {/* <h2>{`Header inside viewport ${inView}.`}</h2> */}
// </div>;

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
