// Keep profile destinations here so real contact details can be filled in
// without changing the page or terminal components.
export const site = {
  name: 'Zed Li',
  shortName: 'Zed',
  role: 'Software Developer',
  location: 'Toronto, CA',
  github: 'https://github.com/fortii2',
  linkedin: 'https://www.linkedin.com/in/dongze42/',
  readme: 'https://raw.githubusercontent.com/fortii2/fortii2/main/README.md',
  threads: 'https://www.threads.com/@forty2.me',
  instagram: 'https://www.instagram.com/forty2.me',
  xiaohongshu: 'https://xhslink.cn/o/9qh6JpsTeek',
  telegram: 'https://t.me/Hereisb612',
  email: 'hi@forty2.me',
  resumePdf: '',
}

export const externalLinks = [
  { label: 'GitHub', href: site.github, detail: '@fortii2' },
  { label: 'LinkedIn', href: site.linkedin, detail: '@dongze42' },
  { label: 'Threads', href: site.threads, detail: '@forty2.me' },
  { label: 'Instagram', href: site.instagram, detail: '@forty2.me' },
  { label: 'RedNote', href: site.xiaohongshu, detail: '@forty2' },
  { label: 'Telegram', href: site.telegram, detail: '@Hereisb612' },
  { label: 'Email', href: `mailto:${site.email}`, detail: site.email },
]
