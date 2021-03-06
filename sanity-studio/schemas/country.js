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
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Country flag',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
// query for counties
// *[_type == "country"]{...,county[]->}
