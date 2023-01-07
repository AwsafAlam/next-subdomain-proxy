import type { NextPage } from 'next';

type Props = {
  data: { msg: string };
};

const Home: NextPage<Props> = ({ data }: Props) => {
  return <h1>Hello {data.msg}</h1>;
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  return {
    props: {
      data: { msg: 'World!' },
    },
  };
}

export default Home;
