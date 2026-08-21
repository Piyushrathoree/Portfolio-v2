"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Command,
  ExternalLink,
  FileText,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Search,
  Send,
  Sun,
  X,
} from "lucide-react";
import Bun from "@/icons/Bun";
import DockerIcon from "@/icons/DockerIcon";
import GitIcon from "@/icons/GitIcon";
import GoIcon from "@/icons/GoIcon";
import Mongo from "@/icons/Mongo";
import Nextjs from "@/icons/Nextjs";
import NodeIcon from "@/icons/NodeIcon";
import Prisma from "@/icons/Prisma";
import Py from "@/icons/Py";
import ReactIcon from "@/icons/ReactIcon";
import RedisIcon from "@/icons/RedisIcon";
import TailwindIcon from "@/icons/TailwindIcon";
import Ts from "@/icons/Ts";
import VS from "@/icons/VS";
import { PortfolioGithub } from "./PortfolioGithub";

type ToolGroup = "Interface" | "Systems" | "Workflow";
type Tool = { label: string; icon: ReactNode; href: string; group: ToolGroup };

const toolGroups: { key: ToolGroup; title: string; description: string }[] = [
  { key: "Interface", title: "Interface", description: "Product UI & experiences" },
  { key: "Systems", title: "Systems", description: "APIs, data & services" },
  { key: "Workflow", title: "Workflow", description: "Build, ship & iterate" },
];

const tools: Tool[] = [
  { label: "TypeScript", icon: <Ts />, href: "https://www.typescriptlang.org", group: "Interface" },
  { label: "Next.js", icon: <Nextjs />, href: "https://nextjs.org", group: "Interface" },
  { label: "React", icon: <ReactIcon />, href: "https://react.dev", group: "Interface" },
  { label: "Tailwind CSS", icon: <TailwindIcon />, href: "https://tailwindcss.com", group: "Interface" },
  { label: "Node.js", icon: <NodeIcon />, href: "https://nodejs.org", group: "Systems" },
  { label: "Python", icon: <Py />, href: "https://python.org", group: "Systems" },
  { label: "Golang", icon: <GoIcon />, href: "https://go.dev", group: "Systems" },
  { label: "Prisma", icon: <Prisma />, href: "https://prisma.io", group: "Systems" },
  { label: "Redis", icon: <RedisIcon />, href: "https://redis.io", group: "Systems" },
  { label: "MongoDB", icon: <Mongo />, href: "https://mongodb.com", group: "Systems" },
  { label: "Docker", icon: <DockerIcon />, href: "https://docker.com", group: "Workflow" },
  { label: "Git", icon: <GitIcon />, href: "https://git-scm.com", group: "Workflow" },
  { label: "Bun", icon: <Bun />, href: "https://bun.sh", group: "Workflow" },
  { label: "VS Code", icon: <VS />, href: "https://code.visualstudio.com", group: "Workflow" },
];

const experiences = [
  { company: "Studio1HQ", role: "SDE Intern", period: "Present", location: "Remote", mark: "S1", description: "Shipping reliable product experiences and backend systems with a focus on clear interfaces, practical engineering, and speed.", skills: ["TypeScript", "Next.js", "Node.js", "APIs"] },
  { company: "Independent", role: "Full-stack developer", period: "2023 — Present", location: "India", mark: "PR", description: "Turning raw ideas into focused, production-ready tools — from the first design decisions through deployment and iteration.", skills: ["React", "Backend", "Product", "Cloud"] },
  { company: "Open source", role: "Builder & contributor", period: "Always", location: "Worldwide", mark: "<> ", description: "Learning in public, contributing where useful, and creating small pieces of software that make work more enjoyable.", skills: ["Tooling", "Design systems", "Web"] },
];

const projects = [
  { title: "Zenith", kind: "Work product", status: "Live", description: "A distraction-free productivity tool for people who want to stay in flow.", image: "/projects/zenith-showcase.png", href: "https://zenith.piyushh.me/" },
  { title: "Welth", kind: "Work product", status: "Ready", description: "A personal finance workspace for expenses, budgets, and meaningful goals.", image: "/projects/welth-showcase.png", href: "https://welth-ai-finance-app-liard.vercel.app/" },
  { title: "Vexio", kind: "Personal", status: "Live", description: "An AI-powered collaborative editor made for building and sharing together.", image: "/projects/vexio-showcase.png", href: "https://github.com/Piyushrathoree/vexio" },
  { title: "Meetup", kind: "Personal", status: "Ready", description: "A real-time video calling app with recording capabilities built for teams.", image: "/projects/meetup-showcase.png", href: "https://meet-up-three-pi.vercel.app/" },
];

const notes = [
  { title: "What are Microservices?", description: "A practical introduction to breaking large systems into focused, independently deployable services.", href: "/blog/getting_started_with_microservices" },
  { title: "Microservices: Implementation in Node.js", description: "A hands-on walkthrough for composing a service-based backend in Node.js.", href: "/blog/implementing_microservices" },
];

function SectionHeading({ children }: { children: string }) {
  return <div className="portfolio-section-heading"><span>{children}</span><i /></div>;
}

export default function PortfolioHome() {
  const [isDark, setIsDark] = useState(() => typeof window === "undefined" || window.localStorage.getItem("portfolio-theme") !== "light");
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.classList.add("portfolio-active");
    return () => document.body.classList.remove("portfolio-active");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const paletteItems = [
    { label: "Jump to experience", href: "#experience", icon: BriefcaseBusiness },
    { label: "Browse selected work", href: "#projects", icon: FolderKanban },
    { label: "Read notes", href: "#notes", icon: BookOpen },
    { label: isDark ? "Use light appearance" : "Use dark appearance", href: "#theme", icon: isDark ? Sun : Moon },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  const toggleTheme = () => setIsDark((value) => !value);

  return (
    <div className={`portfolio ${isDark ? "portfolio--dark" : "portfolio--light"}`}>
      <div className="portfolio-shell">
        <aside className="portfolio-rail portfolio-rail--left" aria-hidden="true" />
        <main className="portfolio-main">
          <section className="portfolio-hero" aria-labelledby="portfolio-name">
            <div className="portfolio-banner" aria-hidden="true"><div className="portfolio-banner__glow portfolio-banner__glow--one" /><div className="portfolio-banner__glow portfolio-banner__glow--two" /><div className="portfolio-banner__grid" /><span className="portfolio-banner__label">PIYUSH / BUILDING</span><span className="portfolio-banner__coordinates">INDIA&nbsp;&nbsp;·&nbsp;&nbsp;REMOTE</span></div>
            <div className="portfolio-intro">
              <div className="portfolio-avatar"><Image src="/assets/erwin.jpg" alt="Piyush Rathore" fill sizes="96px" priority /></div>
              <div className="portfolio-intro__title-row"><div><h1 id="portfolio-name">Piyush Rathore</h1><p>Engineer · full-stack developer</p></div><button className="portfolio-command-trigger portfolio-metal-button" type="button" onClick={() => setCommandOpen(true)} aria-label="Open command palette"><Command size={15} /><span>K</span></button></div>
              <div className="portfolio-intro__copy"><h2>Building digital products that feel effortless.</h2><p>I build interactive web apps with <strong>TypeScript, Bun, Next.js, Python, and PostgreSQL</strong> — with a soft spot for well-shaped backend systems.</p><p>Currently working as an <strong>SDE Intern at Studio1HQ</strong>, learning in public and contributing to open source.</p></div>
              <div className="portfolio-actions"><a className="portfolio-button portfolio-button--primary" href="https://cal.com/piyush-nkthix/15min" target="_blank" rel="noreferrer"><span>Let&apos;s talk</span><span className="portfolio-button__icon"><Send size={14} /></span></a><a className="portfolio-button" href="mailto:01piyush008@gmail.com"><span className="portfolio-button__icon"><Mail size={14} /></span><span>Email me</span></a></div>
              <p className="portfolio-mini-label">Find me online</p>
              <div className="portfolio-socials"><a className="portfolio-social portfolio-metal-badge" href="https://github.com/Piyushrathoree" target="_blank" rel="noreferrer"><span className="portfolio-social__icon"><Github size={15} /></span><span>GitHub</span><ArrowUpRight size={13} /></a><a className="portfolio-social portfolio-metal-badge" href="https://linkedin.com/in/piyushrathore--" target="_blank" rel="noreferrer"><span className="portfolio-social__icon"><Linkedin size={15} /></span><span>LinkedIn</span><ArrowUpRight size={13} /></a><a className="portfolio-social portfolio-metal-badge" href="https://x.com/__Piyushrathore" target="_blank" rel="noreferrer"><span className="portfolio-social__icon portfolio-social__icon--x">𝕏</span><span>X / Twitter</span><ArrowUpRight size={13} /></a><a className="portfolio-social portfolio-metal-badge" href="https://drive.google.com/file/d/1dPtMM-VTzsMdXtuVnzFqVsrMsL-nnHoi/view?usp=sharing" target="_blank" rel="noreferrer"><span className="portfolio-social__icon"><FileText size={15} /></span><span>Résumé</span><ArrowUpRight size={13} /></a></div>
            </div>
          </section>

          <section className="portfolio-stack" aria-label="Tools and technologies"><div className="portfolio-stack__head"><div><p>Technology stack</p><span>Purposeful tools, not a logo cloud.</span></div><small>{tools.length} core tools</small></div><div className="portfolio-tool-groups">{toolGroups.map((group, index) => <article className="portfolio-tool-group portfolio-metal-card" key={group.key}><div className="portfolio-tool-group__head"><span>0{index + 1}</span><div><h2>{group.title}</h2><p>{group.description}</p></div><small>{tools.filter((tool) => tool.group === group.key).length}</small></div><div className="portfolio-tools">{tools.filter((tool) => tool.group === group.key).map((tool) => <a className="portfolio-tool" title={tool.label} href={tool.href} target="_blank" rel="noreferrer" key={tool.label}><span className="portfolio-tool__icon">{tool.icon}</span><span className="portfolio-tool__copy"><span className="portfolio-tool__name">{tool.label}</span><span className="portfolio-tool__meta">Learn more</span></span><ArrowUpRight className="portfolio-tool__arrow" size={13} /></a>)}</div></article>)}</div></section>

          <section className="portfolio-section" id="experience"><SectionHeading>Experience</SectionHeading><div className="portfolio-experiences">{experiences.map((experience) => <article className="portfolio-experience portfolio-metal-card" key={experience.company}><div className="portfolio-experience__topline"><span className="portfolio-company-mark">{experience.mark}</span><div className="portfolio-experience__title"><h3>{experience.company}</h3><p>{experience.role}</p></div><div className="portfolio-experience__meta"><span>{experience.period}</span><span>{experience.location}</span></div></div><p className="portfolio-experience__description">{experience.description}</p><div className="portfolio-tags">{experience.skills.map((skill) => <span className="portfolio-skill-tag" key={skill}>{skill}</span>)}</div></article>)}</div></section>

          <section className="portfolio-section" id="projects"><div className="portfolio-projects-head"><SectionHeading>Selected work</SectionHeading><p><span>Work products</span> and personal builds</p></div><div className="portfolio-projects">{projects.map((project) => <a className="portfolio-project portfolio-metal-card" href={project.href} target="_blank" rel="noreferrer" key={project.title}><div className="portfolio-project__image"><Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 640px) 8rem, 48vw" /><span className="portfolio-project__sheen" /><span className="portfolio-project__open"><ArrowUpRight size={17} /></span></div><div className="portfolio-project__meta"><span className="portfolio-kind-badge">{project.kind}</span><span className={`portfolio-status portfolio-status--${project.status.toLowerCase()}`}><i />{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><span className="portfolio-project__link">View project <ArrowUpRight size={13} /></span></a>)}</div><div className="portfolio-projects-more"><Link className="portfolio-more-button portfolio-metal-button" href="/projects">View all projects <ExternalLink size={15} /></Link></div></section>

          <section className="portfolio-section" id="notes"><SectionHeading>Notes</SectionHeading><div className="portfolio-notes">{notes.map((note) => <Link className="portfolio-note" href={note.href} key={note.title}><div><h3>{note.title}</h3><p>{note.description}</p></div><span className="portfolio-note__side">Read article <ArrowUpRight size={13} /></span></Link>)}</div></section>

          <PortfolioGithub isDark={isDark} />
          <section className="portfolio-quote"><p>“The details are not the details. They make the design.”</p><div><i /><span>Charles Eames</span><i /></div></section>
          <footer className="portfolio-footer"><div className="portfolio-footer__graphic" aria-hidden="true"><span>PR</span></div><p>Designed and built by <a href="https://github.com/Piyushrathoree" target="_blank" rel="noreferrer">Piyush Rathore</a>.</p><p>© {new Date().getFullYear()} Piyush Rathore. All rights reserved.</p></footer>
        </main>
        <aside className="portfolio-rail portfolio-rail--right" aria-hidden="true" />
      </div>

      <nav className="portfolio-side-nav" aria-label="Portfolio navigation"><a href="#portfolio-name" data-label="Home" aria-label="Home"><Home size={16} /></a><a href="#experience" data-label="Experience" aria-label="Experience"><BriefcaseBusiness size={16} /></a><a href="#projects" data-label="Projects" aria-label="Projects"><FolderKanban size={16} /></a><a href="#notes" data-label="Notes" aria-label="Notes"><FileText size={16} /></a><a href="#github" data-label="GitHub" aria-label="GitHub"><Github size={16} /></a><span /><button id="theme" type="button" onClick={toggleTheme} data-label="Toggle theme" aria-label="Toggle color theme">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button></nav>

      {commandOpen && <div className="portfolio-dialog-backdrop" onMouseDown={() => setCommandOpen(false)} role="presentation"><div className="portfolio-command portfolio-metal-card" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}><div className="portfolio-command__input"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands…" /><button type="button" onClick={() => setCommandOpen(false)}><X size={16} /></button></div><div className="portfolio-command__list"><p>Quick actions</p>{paletteItems.map((item) => { const Icon = item.icon; return <a href={item.href} key={item.label} onClick={(event) => { if (item.href === "#theme") { event.preventDefault(); toggleTheme(); } setCommandOpen(false); }}><Icon size={16} /><span>{item.label}</span><span className="portfolio-command__enter">↵</span></a>; })}{paletteItems.length === 0 && <span className="portfolio-command__empty">Nothing matches that command.</span>}</div><div className="portfolio-command__foot"><span><kbd>⌘</kbd><kbd>K</kbd> to open</span><span><kbd>esc</kbd> to close</span></div></div></div>}
    </div>
  );
}
