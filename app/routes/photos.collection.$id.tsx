import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getPhotoCollectionById } from "~/models/photo-collection.server";

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
    <div>
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
    </div>
  );
}
