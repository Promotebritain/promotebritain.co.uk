import groq from 'groq'
import sanityClient from '../sanity-client'

export default function SiteMap() {
  return <div>loading</div>
}

export async function getServerSideProps({ res }) {
  const baseUrl = `https://promotebritain.co.uk`
  const query = groq`{
      "countries": *[_type == 'country']{slug},
      "counties": *[_type == 'county']{slug},
      "companies": *[_type == 'company']{slug},      
    }`
  const urls = await sanityClient.fetch(query)
  const countries = urls.countries.map(country => {
    const slug =
      country.slug.current === '/' ? '/' : `/${country.slug.current}`
    return `
      <loc>${baseUrl}${slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    `
  })
  const counties = urls.counties.map(county => {
    const slug =
      county.slug.current === '/' ? '/' : `/${county.slug.current}`
    return `
      <loc>${baseUrl}${slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    `
  })
  const companies = urls.companies.map(company => {
    const slug =
      company.slug.current === '/' ? '/' : `/${company.slug.current}`
    return `
      <loc>${baseUrl}${slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    `
  })
  const locations = [...countries, ...counties, ...companies]
  const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${locations
          .map(location => {
            return `
              <url>
                ${location}
              </url>
            `
          })
          .join('')}
    </urlset>
    `
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap())
  res.end()
  return {
    props: {},
  }
}
