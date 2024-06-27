import {Rule} from 'sanity'

export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'reference',
      to: {type: 'photo'},
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{type: 'reference', to: {type: 'photo'}}],
    },
  ],
}
