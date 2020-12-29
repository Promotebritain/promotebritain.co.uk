import { GrShop as icon } from 'react-icons/gr'
// import PhoneNumberInput from '../components/phone-number'

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
      validation: Rule => Rule.required(),
      description: 'This will the part of the URL for this content.',
    },
    {
      name: 'image',
      title: 'Company image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'companyUrl',
      title: 'Company URL',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      description: 'Add the full URL including https or http',
    },
    {
      name: 'companyPhone',
      title: 'Company Phone',
      type: 'string',
      validation: Rule =>
        Rule.optional().custom(input => {
          if (/^\d+$/.test(input)) return true
          return `Only accepts numbers!`
        }),
      // inputComponent: PhoneNumberInput,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us about this company',
    },
    {
      name: 'companyType',
      title: 'Company type',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'companyType' }] }],
    },
    {
      name: 'county',
      title: 'County',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'county' }] }],
    },
  ],
  initialValue: {
    companyUrl: `https://`,
  },
}
