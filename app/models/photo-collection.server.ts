import imageUrlBuilder from "@sanity/image-url";

import { client } from "~/sanity-client";

const builder = imageUrlBuilder(client);

interface PhotoCollection {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
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

export async function getPhotoCollectionBySlug({ slug }: { slug: string }) {
  const [collection] = await client.fetch<PhotoCollection[]>(
    `*[_type == 'collection' && slug.current == $slug]{
      _id,
      title,
      slug,
      description,
      photos[]->,
    }`,
    { slug }
  );

  return {
    ...collection,
    photos: collection.photos.map((photo) => {
      return {
        ...photo,
        image: builder.image(photo.image.asset._ref).url(),
      };
    }),
  };
}

export async function getPhotoBySlug({ slug }: { slug: string }) {
  console.log(slug, "_slug");

  const [photo] = await client.fetch<PhotoCollection["photos"]>(
    `*[_type == 'photo' && slug.current == $slug]{
      _id,
      title,
      slug,
      image,
      caption,
    }`,
    { slug }
  );

  console.log(photo, "_photo");

  return {
    ...photo,
    image: builder.image(photo.image.asset._ref).url(),
  };
}
