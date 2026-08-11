'use client'

import { ArrowUpRight, Code2, Download, ExternalLink, Mail } from 'lucide-react'
import { TbCircleDashedLetterK, TbApi, TbCode, TbFileUnknown } from "react-icons/tb";
import { FaCss3Alt, FaGitAlt, FaHtml5, FaLaravel, FaNodeJs, FaPhp, FaReact, FaWeebly, FaGithub, FaFacebook } from 'react-icons/fa'
import { SiDocker, SiExpress, SiFigma, SiGitlab, SiGithub, SiGraphql, SiJavascript, SiMongodb, SiMysql, SiNextdotjs, SiPostgresql, SiSqlite, SiTailwindcss, SiTypescript, SiWix, SiWordpress } from 'react-icons/si'
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { DiVisualstudio } from "react-icons/di";
import { useState, ComponentType } from 'react'
import projects from '@/data/projects.json'

type Project = (typeof projects)[number]

type Skill = { name: string; icon: ComponentType<{ size?: number; color?: string }>; color: string }

const skills: Record<'Frontend' | 'Backend' | 'CMS & NO-CODE' | 'Tools', Skill[]> = {
  Frontend: [
    { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  ],

  Backend: [
    { name: 'PHP', icon: FaPhp, color: '#777BB4' },
    { name: 'Laravel', icon: FaLaravel, color: '#FF2D20' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: 'currentColor' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
    { name: 'REST API', icon: TbApi, color: '#6366F1' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  ],

  'CMS & NO-CODE': [
    { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
    { name: 'Weebly', icon: FaWeebly, color: '#2B6CB0' },
    { name: 'Wix', icon: SiWix, color: '#0C0C0C' },
  ],

  Tools: [
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: 'currentColor' },
    { name: 'GitLab', icon: SiGitlab, color: '#FC6D26' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'VS Code', icon: DiVisualstudio, color: '#007ACC' },
    { name: 'Antigravity IDE', icon: TbCode, color: '#8B5CF6' },
    { name: 'Cursor', icon: TbCode, color: 'currentColor' },
    { name: 'Microsoft Teams', icon: BiLogoMicrosoftTeams, color: '#6264A7' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'Google Workspace', icon: TbFileUnknown, color: '#4285F4' },
  ],
}

const skillCategories = Object.keys(skills) as Array<keyof typeof skills>

function SkillGroup({ title, items }: { title: string; items: Skill[] }) {
  return <div><h3 className="sr-only">{title}</h3><div className="flex flex-wrap gap-2">{items.map(({ name, icon: Icon, color }) => <span key={name} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"><Icon size={16} color={color} aria-hidden="true" />{name}</span>)}</div></div>
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background" aria-label={`View ${project.title} on GitHub`}>
          <Code2 size={14} /> GitHub <ArrowUpRight size={13} />
        </a>
      )}
      {project.websiteUrl && (
        <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background" aria-label={`Visit ${project.title} website`}>
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
    <article className="group rounded-sm border border-border/70 bg-card p-3 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_oklch(0.18_0.02_70/0.08)]">
      <div className="relative flex aspect-[1.15] items-end overflow-hidden rounded-sm bg-muted p-6">
        {image ? <img src={image} alt={`${project.title} preview`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="absolute inset-0 flex items-center justify-center"><span className="font-mono text-xs text-muted-foreground">No project image</span></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
        <div className="relative flex w-full items-center justify-between text-background"><span className="font-mono text-xs">{project.id}</span><span className="font-mono text-[10px] opacity-80">project</span></div>
      </div>
      <div className="px-3 pb-3 pt-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">{project.type}</p>
        <div className="flex items-start justify-between gap-3"><h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3><ArrowUpRight className="mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} /></div>
        <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{item}</span>)}</div>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<keyof typeof skills>('Frontend')
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="pt-enter mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight">
          <TbCircleDashedLetterK size={45} className="text-accent" /></a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
          <a className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="#work">Projects</a>
          <a className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="#about">About</a>
          <a className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full" href="#contact">Contact</a>
        </nav>
        <button className={`pt-menu-button rounded-full border border-border p-2 md:hidden ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span aria-hidden="true" className="pt-menu-icon"><span /><span /><span /></span>
        </button>
        <a href="#contact" className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 md:flex">Let&apos;s talk <ArrowUpRight size={15} /></a>
      </header>
      <nav className={`pt-mobile-nav mx-6 flex flex-col gap-4 border-b border-border pb-5 text-sm md:hidden ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}><a href="#work" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Projects <ArrowUpRight size={14} /></a><a href="#about" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>About <ArrowUpRight size={14} /></a><a href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Contact <ArrowUpRight size={14} /></a></nav>

      <section id="top" className="pt-enter pt-enter-delay-1 mx-auto grid max-w-7xl gap-16 px-6 pb-28 pt-13 md:pt-24 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:pb-40 lg:pt-32">
        <div className="flex flex-col justify-end">
          <p className="mb-8 text-sm text-muted-foreground">Hello, I&apos;m Kenlie.</p>
          <h1 className="max-w-4xl text-balance text-6xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-7xl lg:text-[7.5rem]">Making things <span className="text-accent">possible.</span></h1></div>
        <div className="flex flex-col justify-end gap-8 lg:pb-2">
          <div className="max-w-sm border-l-2 border-accent pl-5 text-lg leading-7 text-muted-foreground">
            <p>I&apos;m Kenlie, a full-stack developer with a strong interest in backend development. I enjoy understanding how systems work under the surface and building reliable APIs, responsive websites, and practical software. I'm continuously learning across frontend, backend, and database technologies, with a focus on writing clean, maintainable solutions that solve real problems.</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a className="group inline-flex items-center gap-2 font-medium" href="#work">Explore my projects <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            <a className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground" href="/resume.pdf"><Download size={15} /> Résumé</a>
          </div>
        </div>
      </section>

      <section id="work" className="pt-enter pt-enter-delay-2 mx-auto max-w-7xl scroll-mt-6 px-6 lg:px-10">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">PROJECTS</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">A few things I&apos;ve made.</h2>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">{projects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        <div className="mt-10 flex justify-center">
          <a href="/projects" className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background">Show all projects <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-6 py-32 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-48">
        <p className="font-mono text-xs text-muted-foreground">ABOUT ME</p>
        <div>
          <p className="max-w-3xl text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">I like making useful things and learning how they work.</p>
          <div className="mt-12 grid max-w-3xl gap-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
            <p>I spend most of my time working with JavaScript, PHP, APIs, databases, and the small details that make software easier to use.</p>
            <p>These projects are a record of what I&apos;m learning. I enjoy keeping things simple, asking questions, and improving one step at a time.</p>
          </div>
          <div className="mt-16">
            <p className="font-mono text-xs text-muted-foreground">TECHNICAL SKILLS</p>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Technical skill categories">{skillCategories.map((category) => <button key={category} type="button" role="tab" aria-selected={selectedSkillCategory === category} onClick={() => setSelectedSkillCategory(category)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${selectedSkillCategory === category ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}>{category}</button>)}</div>
            <div className="mt-6" role="tabpanel" aria-label={`${selectedSkillCategory} skills`}><SkillGroup title={selectedSkillCategory} items={skills[selectedSkillCategory]} />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-32">
          <p className="font-mono text-xs text-primary-foreground/60">GET IN TOUCH</p>
          <div>
            <h2 className="max-w-2xl text-5xl font-semibold leading-[.98] tracking-[-0.06em] sm:text-7xl">Have a problem worth solving?</h2>
            <a href="mailto:hello@kjugarap.top" className="mt-10 inline-flex items-center gap-3 border-b border-primary-foreground/50 pb-2 text-lg transition-colors hover:border-accent hover:text-accent">hello@kjugarap.top <ArrowUpRight size={20} /></a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>© 2026 <a href="" className="border-b border-transparent hover:border-accent hover:text-accent">Kenlie Jugarap</a>. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#top" className="hover:text-foreground">Back to top ↑</a>
          <a href="https://web.facebook.com/kenliej/" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook size={17} /></a>
          <a href="https://github.com/kenliej/" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a>
          <a href="mailto:hello@kjugarap.top" aria-label="Email"><Mail size={17} /></a>
        </div>
      </footer>
    </main>
  )
}
