import { Slug } from './slug'

it('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example of question title')
  expect(slug.value).toEqual('example-of-question-title')
})
