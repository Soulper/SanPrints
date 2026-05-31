import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://sanmethods.com'
const DEFAULT_IMAGE = '/favicon.svg'

export default function SEO({ title, description, image, url }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="og:url" content={url || SITE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || DEFAULT_IMAGE} />
    </Helmet>
  )
}
