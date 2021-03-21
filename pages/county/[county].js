import Link from 'next/link'
import sanityClient from '../../sanity-client'

export default function County(props) {
  const { companies } = props
  return (
    <div className="mb-24">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {companies.length ? (
          companies.map(company => {
            const { id, slug, name, visible } = company
            if (!visible) return
            return (
              <Link href={`/company/${slug}`} key={id}>
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 cursor-pointer">
                  <article className="flex-1 flex flex-col p-8">
                    <h3 className="mt-6 text-gray-900 text-lg font-medium">
                      {name}
                    </h3>
                  </article>
                </li>
              </Link>
            )
          })
        ) : (
          <p>no companies 😢</p>
        )}
      </ul>
    </div>
  )
}

// load data for company with getStaticProps
export async function getStaticProps({ params }) {
  const county = params.county
  const [company] = await sanityClient.fetch(`
  *[_type == "county" && slug.current == '${county}']{
    ...,
    "companies": 
      *[_type == "company" && references(^._id)]{
        'id': _id,
        name,
        visible,
        'slug':slug.current
      } | order(name asc)
    }
  `)
  return { props: { ...company } }
}

// Tell NextJS what pages are generated here
// with getStaticPaths
export async function getStaticPaths() {
  const counties = await sanityClient.fetch(
    `*[_type == "county"]{
      'county': slug.current
    }`
  )
  return {
    paths: counties.map(({ county }) => `/county/${county}`),
    fallback: false,
  }
}
