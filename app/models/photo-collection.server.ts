import imageUrlBuilder from "@sanity/image-url";

import { photosClient } from "~/sanity";

const builder = imageUrlBuilder(photosClient);

export interface PhotoCollection {
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
  return await photosClient
    .fetch<PhotoCollection[]>(
      `*[_type == 'collection']{
     _id,
     title,
     slug,
     description,
     coverImage->,
     }`
    )
    .then((collections) => {
      return collections.map((collection) => {
        return {
          ...collection,
          coverImage: builder
            .image(collection.coverImage.image.asset._ref)
            .width(600)
            .quality(100)
            .format("webp")
            .url(),
        };
      });
    });
}

export async function getPhotoCollectionBySlug({ slug }: { slug: string }) {
  const [collection] = await photosClient.fetch<PhotoCollection[]>(
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
        image: builder
          .image(photo.image.asset._ref)
          .width(600)
          .format("webp")
          .quality(100)
          .url(),
      };
    }),
  };
}

export async function getPhotoBySlug({ slug }: { slug: string }) {
  const [photo] = await photosClient.fetch<PhotoCollection["photos"]>(
    `*[_type == 'photo' && slug.current == $slug]{
      _id,
      title,
      slug,
      image,
      caption,
    }`,
    { slug }
  );

  return {
    ...photo,
    image: builder.image(photo.image.asset._ref).url(),
  };
}
