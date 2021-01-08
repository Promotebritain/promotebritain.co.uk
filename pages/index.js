import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from 'theme-ui'
import sanityClient from '../sanity-client'

export default function Home({ countries }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {countries.map(country => {
          return (
            <article key={country.id}>
              <h2>
                <Link href={`/country/${country.slug}`}>
                  <a>{country.name}</a>
                </Link>
              </h2>
              <Link href={`/country/${country.slug}`}>
                <Box
                  as="div"
                  sx={{
                    position: 'relative',
                    width: 200,
                    height: 100,
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={country.image}
                    alt={country.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Link>
            </article>
          )
        })}
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
