export type PublicationEntry = {
  name: string
  link: string
  publishedAt: string
  contribution: string
  description: string
}

export const publications: PublicationEntry[] = [
  {
    name: 'Kubernetesで実践する Platform Engineering',
    link: 'https://www.shoeisha.co.jp/book/detail/9784798188379',
    publishedAt: '2025/02',
    contribution: 'Translation review contribution',
    description:
      'Supported the Japanese edition through technical translation checking and review assistance.',
  },
]
