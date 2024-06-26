import { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import { Dialog, DialogPanel } from "@headlessui/react";

import globalStyles from "~/styles/global.css?url";

import {
  getPhotoBySlug,
  PhotoCollection,
} from "~/models/photo-collection.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

type LoaderData = {
  photo: Awaited<ReturnType<typeof getPhotoBySlug>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.photoSlug) throw new Error("No id provided");

  const photo = await getPhotoBySlug({ slug: params.photoSlug });

  return {
    photo,
  };
};

export default function Page() {
  const { photo } = useLoaderData<LoaderData>();

  const params = useParams();

  const context = useOutletContext<PhotoCollection["photos"]>();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [photo]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const currentPhoto = context.find(
        (p) => p.slug.current === params.photoSlug?.toString()
      );

      if (!currentPhoto) return;

      const prevPhoto = context[context.indexOf(currentPhoto) - 1];
      const nextPhoto = context[context.indexOf(currentPhoto) + 1];

      if (event.key === "ArrowLeft") {
        if (prevPhoto) {
          navigate(
            `/photos/collection/${params.slug}/photo/${prevPhoto.slug.current}`
          );
        }
      }

      if (event.key === "ArrowRight") {
        if (nextPhoto) {
          console.log("next", nextPhoto);

          navigate(
            `/photos/collection/${params.slug}/photo/${nextPhoto.slug.current}`
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [context, navigate, params.photoSlug, params.slug]);

  return (
    <div>
      <div
        role="dialog"
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
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
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
            borderRadius: "var(--radius)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={photo.image}
            alt=""
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </DialogPanel>
      </Dialog>
    </div>
  );
}
