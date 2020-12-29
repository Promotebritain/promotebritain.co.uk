import Head from 'next/head'
import Link from 'next/link'
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
                <Link href={`${country.slug}`}>
                  <a>{country.name}</a>
                </Link>
              </h2>
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
       'slug': slug.current 
     } | order(name asc)`
  )

  return {
    props: {
      countries,
    },
  }
}
