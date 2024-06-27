import { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData, Link, MetaFunction } from "@remix-run/react";

import { getPhotoCollections } from "~/models/photo-collection.server";
import globalStyles from "~/styles/global.css?url";
import pageStyles from "~/styles/photos-page.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Tanner Gaucher | Photos" },
    {
      name: "description",
      content: "A collection of photos taken by me.",
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    {
      rel: "stylesheet",
      href: pageStyles,
    },
  ];
};

type LoaderData = {
  collections: Awaited<ReturnType<typeof getPhotoCollections>>;
};

export const loader: LoaderFunction = async () => {
  return {
    collections: await getPhotoCollections(),
  };
};

export default function Page() {
  const { collections } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>
        <Link to="/">Tanner Gaucher</Link> {">"} Photos
      </h1>
      <div className="collections-grid">
        {collections.map((collection) => (
          <Link
            to={`/photos/collection/${collection.slug.current}`}
            key={collection._id}
          >
            <article>
              <img src={collection.coverImage} alt={collection.title} />
              <p>{collection.title}</p>
              <small>{collection.description}</small>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
