export type WorkEntry = {
  name: string
  description: string
  url: string
  photo: string
  github?: string
}

export const works: WorkEntry[] = [
  {
    name: 'Cheeyo',
    description: 'It means "Cheer you up". That is CLI to cheer you up through the terminal.',
    url: 'https://github.com/yugo-ibuki/cheeyo',
    photo: '/assets/cheeyo.png',
    github: 'https://github.com/yugo-ibuki/cheeyo',
  },
  {
    name: "Yui's portfolio",
    description: 'Introduction of the illustrations drawn by Yui.',
    url: 'https://yuinosuke2.com',
    photo: '/assets/yui-san.png',
  },
  {
    name: 'Git and GitHub Learning Path',
    description: 'Git and GitHub learning tutorial for beginners.',
    url: 'https://chill-learn.work',
    photo: '/assets/chill-learn.png',
    github: 'https://github.com/yugo-ibuki/git-learning',
  },
  {
    name: 'UnitMux',
    description: 'Easy coding agent switcher with vim-like operation.',
    url: 'https://github.com/yugo-ibuki/unitmux',
    photo: '/assets/unitmux.png',
    github: 'https://github.com/yugo-ibuki/unitmux',
  },
]
