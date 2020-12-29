import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: `aw3g79ut`,
  dataset: `production`,
  useCdn: false,
})
