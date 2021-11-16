import type { LinksFunction, MetaFunction } from 'remix'
import {
  Meta,
  Links,
  Scripts,
  LiveReload,
  useCatch,
  useTransition,
} from 'remix'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpinDelay } from 'spin-delay'

import tailwindStyles from './styles/tailwind.css'
import noScriptStyles from './styles/no-script.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStyles }]
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

function PageLoading() {
  const transition = useTransition()
  const showLoader = useSpinDelay(Boolean(transition.state !== 'idle'), {
    delay: 400,
    minDuration: 1000,
  })

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0, x: 99 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 99 }}
          transition={{
            staggerChildren: 0.8,
            ease: 'easeInOut',
            duration: 0.3,
          }}
          className="fixed bottom-2 right-2 overflow-hidden z-50"
        >
          <motion.img
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            src="/images/masterball.png"
            alt="Masterball"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Document>
      <PageLoading />
      <Outlet />
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
