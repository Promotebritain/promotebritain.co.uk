// import Link from 'next/link'
import Image from 'next/image'
import sanityClient from '../../sanity-client'

export default function County({
  companyPhone,
  companyType,
  companyUrl,
  name,
  image,
}) {
  return (
    <div className="mb-24">
      <ul className="">
        <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 cursor-pointer">
          <article className="flex-1 flex flex-col p-8">
            <h2 className="mt-6 text-gray-900 text-2xl font-medium">
              {name}
            </h2>
            {!image ? null : (
              <div className="bg-gray-100 rounded-xl">
                <div className="relative w-40 h-40 flex-shrink-0 mx-auto">
                  <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            )}
            <p>{companyPhone}</p>
            <p>Company Type</p>
            {companyType.map(t => {
              return <span key={t}>{t.name}</span>
            })}
            <p>{companyUrl}</p>
          </article>
        </li>
      </ul>
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
