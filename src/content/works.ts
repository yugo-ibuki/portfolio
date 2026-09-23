export type WorkEntry = {
  name: string
  description: string
  url: string
  photo: string
  github?: string
}

export const works: WorkEntry[] = [
  {
    name: "Yui's portfolio",
    description: 'Introduction of the illustrations drawn by Yui.',
    url: 'https://yuinosuke2.com',
    photo: '/assets/yui-san.png',
  },
  {
    name: 'UnitMux',
    description: 'Easy coding agent switcher with vim-like operation.',
    url: 'https://github.com/yugo-ibuki/unitmux',
    photo: '/assets/unitmux.png',
    github: 'https://github.com/yugo-ibuki/unitmux',
  },
]
