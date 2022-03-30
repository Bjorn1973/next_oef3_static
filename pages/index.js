import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { slug } from "../helpers";

export default function Home({ pokemons }) {
  return (
    <main>
      <h1>Pokemons</h1>
      <section>
        {pokemons.map(({ name }, i) => (
          <Link key={i} href={`/static/${i + 1}/${slug(name)}`}>
            <a>
              <aside>
                <h1>{name}</h1>
                <div className="imageWrapper">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                      i + 1
                    }.svg`}
                    alt={name}
                    width={"300px"}
                    height={"450px"}
                    layout={"responsive"}
                    priority
                  ></Image>
                </div>
              </aside>
            </a>
          </Link>
        ))}
      </section>
    </main>
  );
}

export const getStaticProps = async () => {
  const {
    data: { results: pokemons },
  } = await axios("https://pokeapi.co/api/v2/pokemon/");
  return { props: { pokemons } };
};
