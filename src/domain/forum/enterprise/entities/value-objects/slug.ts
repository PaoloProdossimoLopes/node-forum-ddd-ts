export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/__+/g, '-')
      .replace(/_$/g, '')

    return new Slug(slugText)
  }
}
