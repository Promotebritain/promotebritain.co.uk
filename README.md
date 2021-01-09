# Promote Britain

UK Flags: https://en.wikipedia.org/wiki/List_of_United_Kingdom_flags

Flags for counties:
https://en.wikipedia.org/wiki/List_of_English_flags#:~:text=%20List%20of%20English%20flags%20%201%20National,See%20also.%20%208%20Footnotes.%20%20More

Maps: https://www.npmjs.com/package/@sanity/google-maps-input

Sitemap example from Sanity slack via Knut:

```js
const client = require('../../client')
const sm = require('sitemap')

const defaultUrls = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/country', priority: 0.5 },
  { url: '/county', priority: 0.5 },
  { url: '/company', priority: 0.5 },
]

async function getSitemap() {
  const { routes, blogposts } = await client.fetch(`
  {
    "routes": *[_type == "route" && includeInSitemap],
    "blogposts": *[_type == 'post' && includeInSitemap == true && publishedAt < $now] | order(publishedAt desc) {
      slug
    }
  }
  `)
  const urls = routes
    .filter(({ slug = {} }) => slug.current)
    .reduce(
      (acc, route) => [
        ...acc,
        {
          url: route.slug.current,
          priority: route.sitemapPriority || 0.5,
        },
      ],
      defaultUrls
    )
  const blogUrls = blogposts
    .filter(({ slug = {} }) => slug.current)
    .map(post => {
      return {
        url: `/blog/${post.slug.current}`,
        priority: 0.5,
      }
    })
  return sm.createSitemap({
    hostname: 'https://www.sanity.io',
    cacheTime: 600000,
    urls: urls.concat(blogUrls),
  })
}
module.exports = function sitemapXML(req, res, next) {
  res.setHeader('Content-Type', 'application/xml')
  getSitemap()
    .then(result => {
      res.send(result.toString())
    })
    .catch(next)
}
```

another example from James Weis

> I got this working a different way. Not sure if it is the best way
> or not but I am using `getServerSideProps` on a page file that is
> called `sitemap.xml.tsx` and set the headers to text/xml.

```ts
import sanity from '@sanity/client'
import groq from 'groq'

export default function SiteMap() {
  return <div>loading</div>
}

export async function getServerSideProps({ res }) {
  const baseUrl = `https://promotebritain.co.uk`
  const query = groq`{
    "pages": *[_type == 'country']{slug},
  	"service": *[_type == 'service']{slug},
    "people": *[_type == 'person' && title->name != 'Service Ambassador']{slug} ,
	  "article": *[_type == 'article']{slug}
    }`
  const client = sanity({
    projectId: 'YOUR PROJECTID',
    dataset: 'YOUR DATASET',
    token: '', // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
  })
  const urls = await client.fetch(query)
  const pages = urls.pages.map(page => {
    const slug =
      page.slug.current === '/' ? '/' : `/${page.slug.current}`
    return `${baseUrl}${slug}`
  })
  const service = urls.service.map(page => {
    const slug = `/service/${page.slug.current}`
    return `${baseUrl}${slug}`
  })
  const people = urls.people.map(page => {
    const slug = `/people/${page.slug.current}`
    return `${baseUrl}${slug}`
  })
  const article = urls.article.map(page => {
    const slug = `/article/${page.slug.current}`
    return `${baseUrl}${slug}`
  })
  const locations = [...pages, ...service, ...people, ...article]
  const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${locations
          .map(location => {
            return `<url>
                        <loc>${location}</loc>
                        <changefreq>weekly</changefreq>
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
```
