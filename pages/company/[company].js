// import Link from 'next/link'
import sanityClient from '../../sanity-client'

export default function County({
  companyPhone,
  companyType,
  companyUrl,
  name,
}) {
  return (
    <div>
      <p>{companyPhone}</p>
      {/* {companyType.map(t => {
        console.log('=====================')
        console.log(t)
        console.log('=====================')
        return <p>yo</p>
      })} */}
      <p>{companyUrl}</p>
      <p>{name}</p>
    </div>
  )
}

// load data for company with getStaticProps
export async function getStaticProps({ params }) {
  const companySlug = params.company
  const [company] = await sanityClient.fetch(`
  *[_type == "company" && slug.current == '${companySlug}']{
    ...
    }
  `)
  return { props: { ...company } }
}

// Tell NextJS what pages are generated here
// with getStaticPaths
export async function getStaticPaths() {
  const companies = await sanityClient.fetch(
    `*[_type == "company"]{
      'company': slug.current
    }`
  )
  return {
    paths: companies.map(({ company }) => `/company/${company}`),
    fallback: false,
  }
}
