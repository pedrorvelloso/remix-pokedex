import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'
import {
  Meta,
  Links,
  Scripts,
  useLoaderData,
  LiveReload,
  useCatch,
} from 'remix'
import { Outlet } from 'react-router-dom'

import tailwindStyles from './styles/tailwind.css'
import noScriptStyles from './styles/no-script.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStyles }]
}

export const loader: LoaderFunction = async () => {
  return { date: new Date() }
}

export const meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
  }
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <noscript>
          <link rel="stylesheet" href={noScriptStyles} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData()

  return (
    <Document>
      <Outlet />
      <footer>
        <p>This page was rendered at {data.date.toLocaleString()}</p>
      </footer>
    </Document>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      )

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`,
      )
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  )
}
