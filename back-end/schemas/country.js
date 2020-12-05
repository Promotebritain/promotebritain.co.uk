import { GrMapLocation as icon } from 'react-icons/gr'

export default {
  name: 'country',
  title: 'Countries',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Country Name',
      type: 'string',
      description: 'Name of the country',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 200 },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
