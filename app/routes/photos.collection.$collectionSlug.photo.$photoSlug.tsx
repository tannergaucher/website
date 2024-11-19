import { Dialog, DialogPanel } from "@headlessui/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
  MetaFunction,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import {
  getPhotoBySlug,
  PhotoCollection,
} from "~/models/photo-collection.server";
import globalStyles from "~/styles/global.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Tanner Gaucher" },
    {
      name: "description",
      content: "A photo by Tanner Gaucher.",
    },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

type LoaderData = {
  photo: Awaited<ReturnType<typeof getPhotoBySlug>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.photoSlug) throw new Error("No id provided");

  return {
    photo: await getPhotoBySlug({ slug: params.photoSlug }),
  };
};

function getPhotoUrl({
  photos,
  photoSlug,
  collectionSlug,
  direction,
}: {
  photos: PhotoCollection["photos"];
  photoSlug: string;
  collectionSlug: string;
  direction: "next" | "prev";
}) {
  const currentIndex = photos.findIndex((p) => p.slug.current === photoSlug);

  if (currentIndex === -1) return null;

  const nextPhoto =
    direction === "next" ? photos[currentIndex + 1] : photos[currentIndex - 1];

  if (!nextPhoto) return null;

  return `/photos/collection/${collectionSlug}/photo/${nextPhoto.slug.current}`;
}

export default function Page() {
  const { photo } = useLoaderData<LoaderData>();

  const params = useParams();

  const context = useOutletContext<PhotoCollection["photos"]>();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [photo]);

  // handle left and right arrow keys to navigate between photos
  useEffect(() => {
    const photoSlug = params.photoSlug;
    const collectionSlug = params.collectionSlug;

    if (!photoSlug || !collectionSlug) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        const prevPhotoUrl = getPhotoUrl({
          photos: context,
          photoSlug,
          collectionSlug,
          direction: "prev",
        });

        if (prevPhotoUrl) {
          navigate(prevPhotoUrl);
        }
      }

      if (event.key === "ArrowRight") {
        const nextPhotoUrl = getPhotoUrl({
          photos: context,
          photoSlug,
          collectionSlug,
          direction: "next",
        });

        if (nextPhotoUrl) {
          navigate(nextPhotoUrl);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [context, navigate, params.photoSlug, params.collectionSlug]);

  // handle swipe left and right to navigate between photos
  useEffect(() => {
    let startX: number;
    let endX: number;

    const photoSlug = params.photoSlug;
    const collectionSlug = params.collectionSlug;

    if (!photoSlug || !collectionSlug) return;

    const handleTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      endX = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diffX = startX - endX;

      if (Math.abs(diffX) > 100) {
        // Threshold for swipe action
        if (diffX > 0) {
          // Swipe left
          const nextPhotoUrl = getPhotoUrl({
            photos: context,
            photoSlug,
            collectionSlug,
            direction: "next",
          });

          if (nextPhotoUrl) {
            navigate(nextPhotoUrl);
          }
        } else {
          // Swipe right
          const prevPhotoUrl = getPhotoUrl({
            photos: context,
            photoSlug,
            collectionSlug,
            direction: "prev",
          });

          if (prevPhotoUrl) {
            navigate(prevPhotoUrl);
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [context, navigate, params.photoSlug, params.collectionSlug]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        display: isOpen ? "block" : "none",
      }}
    >
      <DialogPanel
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "100vmin",
          overflow: "auto",
          backgroundColor: "var(--bg-2)",
          padding: "var(--space-1)",
          boxShadow: "var(--shadow)",
        }}
      >
        <img
          src={photo.image}
          alt=""
          style={{
            width: "100%",
            height: "auto",
            boxShadow: "var(--shadow)",
          }}
        />
      </DialogPanel>
    </Dialog>
  );
}
