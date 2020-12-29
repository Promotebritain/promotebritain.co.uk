import Head from 'next/head'
import sanityClient from '../sanity-client'

export default function Home({ countries }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {countries.map(country => (
          <p key={country.id}>{country.name}</p>
        ))}
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
