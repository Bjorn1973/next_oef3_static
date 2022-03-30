import React from "react";
import Image from "next/image";
import axios from "axios";
import { slug } from "../../../helpers";

const pokemonDetail = ({
  details: {
    abilities,
    base_experience,
    name,
    height,
    weight,
    sprites: {
      other: {
        dream_world: { front_default },
      },
    },
    id,
  },
}) => {
  return (
    <main>
      <h1>Detail of {name}</h1>
      <section>
        <aside>
          <h1>{name}</h1>
          <div className="imageWrapper">
            <Image
              src={front_default}
              alt={name}
              width={"300px"}
              height={"450px"}
              layout={"responsive"}
              priority
            ></Image>
          </div>
          <div className="abilityWrapper">
            <p>
              Weigth: <span>{weight}</span>
            </p>
            <p>
              Height: <span>{height}</span>
            </p>
            <p>
              Abilities: <span>{abilities[0].ability.name}</span> |{" "}
              <span>{abilities[1].ability.name}</span>
            </p>
            <p>
              Base-experience: <span>{base_experience}</span>
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default pokemonDetail;

export const getStaticProps = async (req) => {
  const {
    params: { id },
  } = req;
  const { data: details } = await axios(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return {
    props: { details },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const {
    data: { results: pokemons },
  } = await axios("https://pokeapi.co/api/v2/pokemon/");
  return {
    paths: pokemons.map(({ name }, i) => ({
      params: { id: `${i + 1}`, slug: slug(name) },
    })),
    fallback: "blocking",
  };
};

// export const getStaticPaths = async () => {
//   const {
//     data: { drinks },
//   } = await axios(
//     `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
//   );
//   return {
//     paths: drinks.map(({ idDrink, strDrink }) => ({
//       params: { id: idDrink, slug: slug(strDrink) },
//     })),

//     fallback: "blocking",
//   };
// };
