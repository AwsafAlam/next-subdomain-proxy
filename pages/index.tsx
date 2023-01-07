import type { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  data: { msg: string };
};

const links = [
  {
    url: '/blog/category/resources',
    text: 'Senior Living Resources',
  },
  { url: '/blog/veterans-benefits-long-term-care', text: 'Veterans Benefits Guide' },
  { url: '/blog/medicare-benefits-guide', text: 'Medicare Benefits Guide' },
  { url: '/blog/a-beginners-guide-to-medicaid', text: 'Medicaid Benefits Guide' },
  { url: '/blog', text: 'Blog' },
];

const Home: NextPage<Props> = ({ data }: Props) => {
  return (
    <>
      <h1>Hello {data.msg}</h1>
      <br />
      <Link href={'/page2'}>Page 2</Link>
      <br />
      <Link href={'/blog'}>Blog using Next Link</Link>
      <br />
      <br />
      <h2>Internal links</h2>
      <br />
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url}>{link.text}</a>
          </li>
        ))}
      </ul>
    </>
  );
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
