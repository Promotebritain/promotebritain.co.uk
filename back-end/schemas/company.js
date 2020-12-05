import { GrShop as icon } from 'react-icons/gr'

export default {
  name: 'company',
  title: 'Companies',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      description: 'Name of the company',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 200 },
    },
    {
      name: 'image',
      title: 'Company image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us about this company',
    },
    {
      name: 'county',
      title: 'County',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'county' }] }],
    },
  ],
}
