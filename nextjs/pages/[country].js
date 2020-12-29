// *[_type == "county" && name == 'Avon']{...,"companies": *[_type == "company" && references(^._id)]{...}}
import Link from 'next/link'
import sanityClient from '../sanity-client'

export default function County(props) {
  const { counties } = props

  return (
    <div>
      {counties.map(county => {
        return (
          <article key={county.id}>
            <h2>
              <Link href={`${county.slug}`}>
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
        '_id': id,
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
    paths: countries.map(({ country }) => `/${country}`),
    fallback: false,
  }
}
