import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: `aw3g79ut`,
  dataset: process.env.NODE_ENV,
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
})
