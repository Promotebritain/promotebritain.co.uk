import { GrMap as icon } from 'react-icons/gr'

export default {
  name: 'county',
  title: 'Counties',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'County Name',
      type: 'string',
      description: 'Name of the county',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 200 },
    },
    {
      name: 'image',
      title: 'County flag',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
