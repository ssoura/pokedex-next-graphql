interface pokemonType {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string;
}

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  number?: number;
};

type Params = {
  params: {
    pokemon: string;
  };
};
