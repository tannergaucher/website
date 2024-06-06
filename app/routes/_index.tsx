import { MetaFunction } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import globalStyles from "../global.css?url";
import pageStyles from "./index.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Tanner Gaucher" },
    {
      name: "description",
      content: "Welcome to my personal site!",
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: pageStyles },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ];
};

export default function Index() {
  return (
    <main>
      <section className="intro">
        <h1>Tanner Gaucher</h1>
        <h2>Full Stack Software Developer</h2>
      </section>
      <img className="hero-image" alt="Grainy B&W koi fish in Japan" />
      <p className="bio">
        Based in Brooklyn, New York. Current location Hanoi, Vietnam. Passionate
        generalist, equally comfortable solving problems on both sides of the
        stack. Other computational interests include history of computer science
        and exploring parallels between computation and the natural world.
      </p>
    </main>
  );
}
