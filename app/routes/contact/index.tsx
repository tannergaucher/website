import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import globalStyles from "~/global.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ];
};

export default function Page() {
  return (
    <main>
      <Link to="/">
        <h1>Tanner Gaucher</h1>
      </Link>
      <h2>Contact</h2>
      <form>
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <legend>Get in Touch</legend>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}