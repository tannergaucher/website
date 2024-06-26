import imageUrlBuilder from "@sanity/image-url";

import { client } from "~/sanity-client";

const builder = imageUrlBuilder(client);

interface PhotoCollection {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage: {
    image: {
      asset: {
        _ref: string;
      };
    };
  };
  photos: {
    slug: {
      current: string;
    };
    image: {
      asset: {
        _ref: string;
      };
    };
  }[];
}

export async function getPhotoCollections() {
  return await client
    .fetch<PhotoCollection[]>(
      `*[_type == 'collection']{
     _id,
     title,
     slug,
     description,
     coverImage->,
     photos[]->,
     }`
    )
    .then((collections) => {
      return collections.map((collection) => {
        return {
          ...collection,
          coverImage: builder
            .image(collection.coverImage.image.asset._ref)
            .url(),
          photos: collection.photos.map((photo) => {
            return {
              ...photo,
              image: builder.image(photo.image.asset._ref).url(),
            };
          }),
        };
      });
    });
}

export async function getPhotoCollectionById({ id }: { id: string }) {
  const [collection] = await client.fetch<PhotoCollection[]>(
    `*[_type == 'collection' && _id == $id]{
      _id,
      title,
      slug,
      description,
      photos[]->,
    }`,
    { id }
  );

  return {
    ...collection,
    photos: collection.photos.map((photo) => {
      console.log(photo, "photo");
      return {
        ...photo,
        image: builder.image(photo.image.asset._ref).url(),
      };
    }),
  };
}
