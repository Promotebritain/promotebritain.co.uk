export default function County() {
  return <p>wheee</p>
}

// import Image from 'next/image'
// import { useState } from 'react'
// import sanityClient from '../../sanity-client'

// export default function CompanyPage({
//   name,
//   description,
//   likes,
//   _id,
//   imageUrl,
//   technology,
// }) {
//   const [likeState, setLikes] = useState(likes)

//   return (
//     <>
//       <h1>{name}</h1>
//       <h3>{description}</h3>
//       <Image src={imageUrl} alt={name} width={500} height={500} />
//       <button onClick={addLike}>{likeState} likes</button>
//       {technology &&
//         technology.map(tech => {
//           return <p>{tech.name}</p>
//         })}
//     </>
//   )
// }

// export async function getStaticProps({ params }) {
//   const slug = params.slug
//   const [devs] = await sanityClient.fetch(
//     `*[_type == 'dev' && slug.current == '${slug}']{
//       _id,
//       name,
//       description,
//       likes,
//       "imageUrl": image.asset->url,
//       technology[]->,
//     }`
//   )
//   return { props: { ...devs } }
// }

// export async function getStaticPaths() {
//   const devs = await sanityClient.fetch(
//     `*[_type == 'dev']{
//       'slug': slug.current
//     }`
//   )

//   return {
//     paths: devs.map(({ slug }) => `/dev/${slug}`),
//     fallback: false,
//   }
// }
