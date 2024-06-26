import { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getPhotoCollections } from "~/models/photo-collection.server";

import globalStyles from "~/global.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
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
  const data = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>
        <Link to="/">Tanner Gaucher</Link> {">"} Photos
      </h1>
      <ul>
        {data.collections.map((collection) => (
          <li key={collection._id}>
            <Link to={`/photos/collection/${collection._id}`}>
              <h2>{collection.title}</h2>
              <p>{collection.description}</p>
              <img
                src={collection.coverImage}
                alt={collection.title}
                style={{
                  width: "500px",
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
