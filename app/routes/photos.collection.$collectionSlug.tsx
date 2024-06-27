import { LoaderFunction, LinksFunction } from "@remix-run/node";
import { useLoaderData, Link, Outlet, MetaFunction } from "@remix-run/react";

import { getPhotoCollectionBySlug } from "~/models/photo-collection.server";
import globalStyles from "~/styles/global.css?url";
import pageStyles from "~/styles/photos-collection-page.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Tanner Gaucher" },
    {
      name: "description",
      content: "A collection of photos by Tanner Gaucher.",
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

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.collectionSlug) throw new Error("No id provided");

  const collection = await getPhotoCollectionBySlug({
    slug: params.collectionSlug,
  });

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
        <Link to="/photos">Photos</Link> {">"}{" "}
        <Link to="#">{collection.title}</Link>
      </h1>
      <h2>{collection.description}</h2>
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
