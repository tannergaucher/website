import { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";

import { getPhotoCollectionBySlug } from "~/models/photo-collection.server";

import globalStyles from "~/styles/global.css?url";
import pageStyles from "~/styles/photos-collection-page.css?url";

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
  if (!params.slug) throw new Error("No id provided");

  const collection = await getPhotoCollectionBySlug({ slug: params.slug });

  return {
    collection,
  };
};

type LoaderData = {
  collection: Awaited<ReturnType<typeof getPhotoCollectionBySlug>>;
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
      <hr />
      <div className="photos-grid">
        {collection.photos.map((photo) => (
          <Link
            to={`/photos/collection/${collection.slug.current}/photo/${photo.slug.current}`}
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
      <Outlet context={collection.photos} />
    </main>
  );
}
