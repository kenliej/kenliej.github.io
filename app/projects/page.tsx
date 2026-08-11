'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Code2, ExternalLink } from 'lucide-react'
import { TbCircleDashedLetterK } from "react-icons/tb";
import projects from '@/data/projects.json'

type Project = (typeof projects)[number]

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background">
          <Code2 size={14} /> GitHub <ArrowUpRight size={13} />
        </a>
      )}
      {project.websiteUrl && (
        <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background">
          <ExternalLink size={13} /> Live site <ArrowUpRight size={13} />
        </a>
      )}
    </div>
  )
}

function getProjectImage(project: Project) {
  if (project.projectImage?.trim()) return project.projectImage
  if (project.websiteUrl) return `https://image.thum.io/get/width/1200/crop/800/${project.websiteUrl}`
  if (project.githubUrl) return `https://opengraph.githubassets.com/1/${project.githubUrl.replace('https://github.com/', '')}`
  return null
}

function ProjectCard({ project }: { project: Project }) {
  const image = getProjectImage(project)

  return (
    <article className="group grid gap-6 border-t border-border py-8 transition-colors hover:border-foreground sm:grid-cols-[96px_1fr_auto] sm:gap-8">
      <div className="flex items-start justify-between sm:block">
        <span className="font-mono text-xs text-muted-foreground">{project.id}</span>
        <span className="mt-2 text-xs text-muted-foreground sm:mt-12 sm:block">{project.type.split(' · ')[0]}</span>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{project.type}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent">{project.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{item}</span>)}</div>
        <ProjectLinks project={project} />
      </div>
      <div className="relative hidden h-28 w-36 items-end justify-end overflow-hidden rounded-sm bg-muted p-3 sm:flex">
        {image ? <img src={image} alt={`${project.title} preview`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <span className="relative font-mono text-[10px] text-muted-foreground">No image</span>}
        {image && <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />}
        {image && <span className="relative font-mono text-[10px] text-background">preview</span>}
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  const pageSize = 10
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize))
  const [page, setPage] = useState(1)
  const visibleProjects = projects.slice((page - 1) * pageSize, page * pageSize)
  const pageItems = pageCount <= 5 ? Array.from({ length: pageCount }, (_, index) => index + 1) : [1, 'ellipsis', pageCount - 1, pageCount]

  return (
    <main className="min-h-screen">
      <header className="pt-enter mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight">
          <TbCircleDashedLetterK size={45} className="text-accent" /></Link>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft size={15} /> Back home</Link>
      </header>

      <section className="pt-enter pt-enter-delay-1 mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="max-w-3xl">
          <p className="mb-7 text-sm text-muted-foreground">Projects</p>
          <h1 className="text-balance text-6xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-8xl">Things I&apos;ve <span className="text-accent">made.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-7 text-muted-foreground">A collection of small projects, experiments, and things I&apos;ve learned from building.</p>
        </div>
      </section>

      <section className="pt-enter pt-enter-delay-2 mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-40">
        <div className="mb-2 flex items-center justify-between border-b border-border pb-4">
          <p className="font-mono text-xs text-muted-foreground">ALL PROJECTS</p>
          <span className="font-mono text-xs text-muted-foreground">{projects.length.toString().padStart(2, '0')} total</span>
        </div>
        {visibleProjects.map((project) => <ProjectCard key={`${project.id}-${project.title}`} project={project} />)}
        {pageCount > 1 && <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Projects pagination"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-full border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{pageItems.map((item, index) => item === 'ellipsis' ? <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground" aria-hidden="true">...</span> : <button type="button" key={item} onClick={() => setPage(Number(item))} aria-current={page === item ? 'page' : undefined} className={`h-9 w-9 rounded-full text-sm transition-colors ${page === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>{item}</button>)}<button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="rounded-full border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40">Next</button></nav>}
      </section>
    </main>
  )
}
