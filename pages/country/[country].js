import Link from 'next/link'
import sanityClient from '../../sanity-client'

export default function Country(props) {
  const { counties } = props

  return (
    <div>
      {counties.map(county => {
        return (
          <article key={county.id}>
            <h2>
              <Link href={`/county/${county.slug}`}>
                <a>{county.name}</a>
              </Link>
            </h2>
          </article>
        )
      })}
    </div>
  )
}

// load data for country with getStaticProps
export async function getStaticProps({ params }) {
  const country = params.country
  const [county] = await sanityClient.fetch(`
    *[_type == "country" && slug.current == '${country}']
	    {"counties": *[_type == "county" && references(^._id)]{
        'id': _id,
        name,
        'slug':slug.current
      }
    }`)
  return { props: { ...county } }
}

// Tell NextJS what pages are generated here
// with getStaticPaths
export async function getStaticPaths() {
  const countries = await sanityClient.fetch(
    `*[_type == "country"]{
      'country': slug.current
    }`
  )

  return {
    paths: countries.map(({ country }) => `/country/${country}`),
    fallback: false,
  }
}
