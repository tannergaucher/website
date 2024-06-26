import { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getPhotoCollectionById } from "~/models/photo-collection.server";

import globalStyles from "~/styles/global.css";
import pageStyles from "~/styles/photos-collection-page.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    {
      rel: "stylesheet",
      href: pageStyles,
    },
  ];
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

  console.log(collection, "collection");

  return (
    <main>
      <h1>
        <Link to="/">Tanner Gaucher</Link> {">"}{" "}
        <Link to="/photos">Photos</Link>
      </h1>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      <div className="photos-grid">
        {collection.photos.map((photo) => (
          <Link
            to={`/photos/collection/${collection._id}/${photo.slug.current}`}
            key={photo.image}
          >
            <img
              src={photo.image}
              alt={collection.title}
              style={{
                width: "500px",
              }}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
