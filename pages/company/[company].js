// import Link from 'next/link'
import Image from 'next/image'
import { Box } from 'theme-ui'
import sanityClient from '../../sanity-client'

export default function County({
  companyPhone,
  companyType,
  companyUrl,
  name,
  image,
}) {
  return (
    <div>
      <p>{companyPhone}</p>
      <p>Company Type</p>
      {companyType.map(t => {
        return <span>{t.name}</span>
      })}
      <p>{companyUrl}</p>
      <p>{name}</p>
      <Box
        as="div"
        sx={{
          position: 'relative',
          width: 200,
          height: 100,
        }}
      >
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </div>
  )
}

// load data for company with getStaticProps
export async function getStaticProps({ params }) {
  const companySlug = params.company
  const [company] = await sanityClient.fetch(`
  *[_type == "company" && slug.current == '${companySlug}']{
    "image": image.asset->url,
    companyType[]->{
      _id,
      name,
      slug
    },
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
      'company': slug.current,
    }`
  )
  return {
    paths: companies.map(({ company }) => `/company/${company}`),
    fallback: false,
  }
}
