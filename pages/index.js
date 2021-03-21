import Image from 'next/image'
import Link from 'next/link'
import sanityClient from '../sanity-client'

export default function Home({ countries }) {
  return (
    <div>
      <main className="mb-24">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {countries.map(country => {
            return (
              <Link
                href={`/country/${country.slug}`}
                key={country.id}
              >
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 cursor-pointer">
                  <article className="flex-1 flex flex-col p-8">
                    <div className="bg-gray-100 rounded-xl">
                      <div className="relative w-40 h-40 flex-shrink-0 mx-auto">
                        <Image
                          src={country.image}
                          alt={country.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                    <h3 className="mt-6 text-gray-900 text-lg font-medium">
                      {country.name}
                    </h3>
                  </article>
                </li>
              </Link>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const countries = await sanityClient.fetch(
    `*[_type == 'country']{
       'id': _id,
       name,
       'slug': slug.current,
       "image": image.asset->url
     } | order(name asc)`
  )

  return {
    props: {
      countries,
    },
  }
}
