import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import heroSrc from "~/assets/fish-light.webp";

export default function App() {
  const fontUrl =
    "https://fonts.googleapis.com/css2?family=Outfit:wght@200;800&family=Spline+Sans:wght@300&display=swap";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preload" href={heroSrc} as="image" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" href={fontUrl} as="style" />
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
