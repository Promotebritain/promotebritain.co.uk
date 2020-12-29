import Link from 'next/link'
import sanityClient from '../../sanity-client'

export default function County(props) {
  const { companies } = props
  return (
    <div>
      {companies.map(company => {
        return (
          <article key={company.id}>
            <h2>
              <Link href={`/company/${company.slug.current}`}>
                <a>{company.name}</a>
              </Link>
            </h2>
          </article>
        )
      })}
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
        ...
      }
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
