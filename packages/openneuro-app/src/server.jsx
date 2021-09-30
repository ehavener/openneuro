/**
 * Server entrypoint (CJS) - see client.tsx for browser entrypoint
 */
import './scripts/apm.js'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { ApolloProvider } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { createClient } from '@openneuro/client'
import App from './scripts/app'
import Index from './scripts/index'
import { config } from './scripts/config'
import { mediaStyle } from './scripts/styles/media'
import { version } from './lerna.json'
import redesignStyles from '@openneuro/components/page/page.scss'
import classicStyles from './sass/main.scss'
import { apm } from './scripts/apm.js'

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

const RootComponent = ({ cookies, mediaStyle, client, url }) => (
  <App cookies={cookies}>
    <Helmet>
      <style type="text/css">{mediaStyle}</style>
    </Helmet>
    <ApolloProvider client={client}>
      <StaticRouter location={url}>
        <Index />
      </StaticRouter>
    </ApolloProvider>
  </App>
)

export async function render(url, cookies) {
  // Client must be created on every call to avoid mixing credentials
  const client = createClient(config.graphql.uri, {
    clientVersion: version,
    ssrMode: true,
    getAuthorization: () => cookies.get('accessToken'),
  })
  // Backup render without data
  const fallbackClient = createClient(config.graphql.uri, {
    clientVersion: version,
    ssrMode: false,
    getAuthorization: () => cookies.get('accessToken'),
  })

  const css =
    cookies.get('redesign-2021') == 'true' ? redesignStyles : classicStyles

  let react = ''
  try {
    // Return SSR render with data if complete in under 5 seconds
    react = await Promise.race([
      getDataFromTree(
        <RootComponent
          cookies={cookies}
          mediaStyle={mediaStyle}
          client={client}
          url={url}
        />,
      ),
      wait(5000).then(() =>
        getDataFromTree(
          <RootComponent
            cookies={cookies}
            mediaStyle={mediaStyle}
            client={fallbackClient}
            url={url}
          />,
        ),
      ),
    ])
  } catch (err) {
    apm.captureError(err)
    console.error(err)
  }

  // Required for Helmet to work in SSR mode
  const helmet = Helmet.renderStatic()
  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.style.toString()}`

  // Prevent <script> tags from strings
  const apolloState = Buffer.from(JSON.stringify(client.extract())).toString(
    'base64',
  )

  return { react, apolloState, head, css }
}
