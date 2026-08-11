import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse projects, experiments, and web applications built with modern tools.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | Kenlie Jugarap',
    description: 'A collection of projects, experiments, and web applications.',
    url: 'https://kjugarap.top/projects',
    type: 'website',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
