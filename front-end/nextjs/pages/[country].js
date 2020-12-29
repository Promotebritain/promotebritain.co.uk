// *[_type == "county" && name == 'Avon']{...,"companies": *[_type == "company" && references(^._id)]{...}}
import sanityClient from '../sanity-client'

export default function County(props) {
  const { counties } = props

  return (
    <div>
      {counties.map(county => {
        return (
          <>
            <p>{county.name}</p>
            <p>{county.slug}</p>
          </>
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
