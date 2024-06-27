import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import globalStyles from "~/styles/global.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  console.log({ name, email, message });

  return null;
};

export default function Page() {
  return (
    <main>
      <Link to="/">
        <h1>Tanner Gaucher</h1>
      </Link>
      <h2>Contact</h2>
      <form
        name="contact-form"
        method="POST"
        action="/contact/?index"
        data-netlify
      >
        <fieldset>
          <em>
            <legend>Get in touch</legend>
          </em>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required rows={5}></textarea>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}
