import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { useState } from "react";

import { Switch } from "@headlessui/react";

export default function App() {
  const [enabled, setEnabled] = useState(true);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Switch
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
          }}
          checked={enabled}
          onChange={setEnabled}
          // className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
          />
        </Switch>

        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
