import { Helmet } from 'react-helmet-async'

export function SEO({ title, description, canonical, lang = 'es' }) {
  const full = `${title} | Doig Woodwork`
  const url = `https://www.doigwoodwork.com${canonical}`

  console.log('[SEO] rendering:', full)

  return (
    <Helmet prioritizeSeoTags>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'es' ? 'es_MX' : 'en_US'} />
    </Helmet>
  )
}
