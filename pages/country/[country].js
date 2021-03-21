import Link from 'next/link'
import sanityClient from '../../sanity-client'

export default function Country(props) {
  const { counties } = props

  return (
    <div className="mb-24">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {counties.map(county => {
          return (
            <Link href={`/county/${county.slug}`} key={county.id}>
              <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 cursor-pointer">
                <article className="flex-1 flex flex-col p-8">
                  <h3 className="mt-6 text-gray-900 text-lg font-medium">
                    {county.name}
                  </h3>
                </article>
              </li>
            </Link>
          )
        })}
      </ul>
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
      } | order(name asc)
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
