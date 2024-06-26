import { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getPhotoCollectionById } from "~/models/photo-collection.server";

import globalStyles from "~/global.css?url";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error("No id provided");

  const collection = await getPhotoCollectionById({ id: params.id });

  return {
    collection,
  };
};

type LoaderData = {
  collection: Awaited<ReturnType<typeof getPhotoCollectionById>>;
};

export default function Page() {
  const { collection } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>
        <Link to="/">Tanner Gaucher</Link> {">"}{" "}
        <Link to="/photos">Photos</Link>
      </h1>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      {collection.photos.map((photo) => (
        <img
          key={photo.image}
          src={photo.image}
          alt={collection.title}
          style={{
            width: "500px",
          }}
        />
      ))}
    </main>
  );
}
