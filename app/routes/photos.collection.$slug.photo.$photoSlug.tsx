import { useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import globalStyles from "~/styles/global.css?url";

import { getPhotoBySlug } from "~/models/photo-collection.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

type LoaderData = {
  photo: Awaited<ReturnType<typeof getPhotoBySlug>>;
};

export default function Page() {
  const data = useLoaderData<LoaderData>();

  console.log(data, "__data");
  return (
    <div>
      <h1>Photo</h1>
      {/* <img src={photo.image} alt="" /> */}
    </div>
  );
}
