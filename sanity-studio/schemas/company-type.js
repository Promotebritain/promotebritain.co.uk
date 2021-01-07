import { CgDuplicate as icon } from 'react-icons/cg'

export default {
  name: 'companyType',
  title: 'Company type',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Company Type',
      type: 'string',
      description: 'Type of company',
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
      title: 'Company image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us about this type',
    },
  ],
}
