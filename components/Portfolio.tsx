"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, BookOpen, Braces, Code2, Database, ExternalLink,
  Github, Globe2, GraduationCap, Layers3, Mail, MapPin, Menu, Phone, Sparkles,
  Terminal, X, Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const nav = [
  ["Início", "home"], ["Sobre", "sobre"], ["Skills", "skills"], ["Formação", "formacao"],
  ["Cursos", "cursos"], ["Projetos", "projetos"], ["Contato", "contato"],
];

const roles = ["Desenvolvedor Web", "Desenvolvedor Front-end", "Desenvolvedor Full Stack", "Desenvolvedor de Software"];

const skills = [
  { name: "React", value: 90 }, { name: "HTML", value: 95 }, { name: "CSS", value: 90 },
  { name: "JavaScript", value: 90 }, { name: "TypeScript", value: 85 }, { name: "Tailwind", value: 95 },
  { name: "Java", value: 80 }, { name: "PHP", value: 75 }, { name: "MySQL", value: 85 },
];

const skillCloud = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Java", "PHP", "MySQL", "Git", "GitHub", "APIs", "Banco de Dados", "POO", "Código limpo", "Metodologias Ágeis"];

const courses = [
  ["Lógica", "Fundamentos de programação"], ["HTML", "Estruturas para a web"],
  ["PHP", "Desenvolvimento back-end"], ["MySQL", "Banco de dados relacional"],
  ["Orientação a Objetos", "Arquitetura de software"], ["Java SE", "Aplicações Java"],
  ["Java Web", "Sistemas para a web"], ["Photoshop", "Design e edição"],
  ["Ferramentas Digitais", "Ensina TI · 84 horas"],
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: .75, ease: [0.22, 1, 0.36, 1] } },
};

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="orb orb-a" /><div className="orb orb-b" />
      <div className="noise absolute inset-0 opacity-[.025]" />
      {[12, 28, 46, 68, 84].map((left, i) => <span key={left} className="particle" style={{ left: `${left}%`, animationDelay: `${i * -1.7}s` }} />)}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all lg:px-8 ${scrolled ? "glass rounded-2xl max-w-[1180px] py-3" : ""}`}>
        <a href="#home" className="font-mono text-sm font-bold tracking-[-.03em]"><span className="text-neon">&lt;</span> GC <span className="text-neon">/&gt;</span></a>
        <div className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, id]) => <a className="nav-link" key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <a href="mailto:bielcavalcanti13@gmail.com" className="hidden items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-xs font-semibold text-neon sm:flex">Vamos conversar <ArrowUpRight size={14} /></a>
        <button aria-label="Abrir menu" className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <div className="glass mx-5 mt-2 rounded-2xl p-4 lg:hidden">{nav.map(([label,id]) => <a onClick={() => setOpen(false)} className="block border-b border-white/5 py-3 text-sm" key={id} href={`#${id}`}>{label}</a>)}</div>}
    </header>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[.2em] text-neon"><span className="h-px w-7 bg-neon" />{children}</div>;
}

function SectionTitle({ kicker, title, copy }: { kicker: string, title: React.ReactNode, copy?: string }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} className="mb-12 max-w-3xl">
    <Kicker>{kicker}</Kicker>
    <h2 className="title">{title}</h2>
    {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-white/55">{copy}</p>}
  </motion.div>;
}

function MagneticCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-.5, .5], [4, -4]), { stiffness: 200, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-4, 4]), { stiffness: 200, damping: 24 });
  return <motion.div style={{ rotateX, rotateY, transformPerspective: 800 }} onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left)/r.width-.5); y.set((e.clientY-r.top)/r.height-.5);
  }} onMouseLeave={() => { x.set(0); y.set(0); }} className={`card ${className}`}>{children}</motion.div>;
}

function Hero() {
  const [role, setRole] = useState(0);
  useEffect(() => { const t = setInterval(() => setRole(v => (v + 1) % roles.length), 2400); return () => clearInterval(t); }, []);
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-white/60"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75"/><span className="relative h-2 w-2 rounded-full bg-neon"/></span>Disponível para novas oportunidades</div>
          <p className="mb-4 font-mono text-sm text-neon">Olá, eu sou</p>
          <h1 className="hero-title">Gabriel<br/><span className="gradient-text">Cavalcanti.</span></h1>
          <div className="mt-6 flex min-h-8 items-center gap-3 text-lg text-white/55 md:text-xl"><span className="text-neon">→</span><motion.span key={role} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{roles[role]}</motion.span></div>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/50">Estudante de Ciência da Computação que transforma ideias em experiências digitais rápidas, intuitivas e memoráveis.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contato" className="button-primary">Entrar em contato <ArrowDownRight size={17}/></a>
            <a href="#projetos" className="button-secondary">Ver projetos <ArrowDownRight size={17}/></a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: 1 }} className="relative mx-auto aspect-square w-full max-w-[470px]">
          <div className="profile-ring absolute inset-[8%] rounded-full"/>
          <div className="absolute inset-[15%] flex items-center justify-center rounded-full border border-white/10 bg-[#0b0e0d]/90 shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,136,.18),transparent_55%)]"/>
            <span className="relative font-mono text-[clamp(5rem,12vw,9rem)] font-bold tracking-[-.12em] text-white">G<span className="text-neon">C</span></span>
          </div>
          <div className="float-card absolute left-0 top-[18%]"><Code2 size={16} className="text-neon"/> clean_code()</div>
          <div className="float-card absolute bottom-[18%] right-0"><Sparkles size={16} className="text-neon"/> criativo</div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[.25em] text-white/25 md:flex">scroll <span className="h-10 w-px bg-gradient-to-b from-neon to-transparent"/></div>
    </section>
  );
}

function About() {
  return <section id="sobre" className="section">
    <SectionTitle kicker="01 / Sobre" title={<>Construindo o futuro, <span className="text-white/30">uma linha por vez.</span></>} />
    <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}><MagneticCard className="min-h-[320px] p-7 md:p-10">
        <Braces className="mb-16 text-neon" size={34}/>
        <p className="max-w-2xl text-xl font-medium leading-8 text-white/85 md:text-2xl md:leading-9">Meu objetivo é adquirir experiência no campo da Ciência da Computação, aprofundar conhecimentos e desenvolver soluções modernas para empresas e pessoas.</p>
        <p className="mt-6 max-w-2xl leading-7 text-white/45">Gosto de criar aplicações modernas, interfaces intuitivas e sistemas completos — combinando técnica, curiosidade e atenção obsessiva aos detalhes.</p>
      </MagneticCard></motion.div>
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:.15}} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <MagneticCard className="flex items-end justify-between p-7"><div><MapPin className="mb-8 text-neon"/><span className="text-sm text-white/40">Baseado em</span><p className="mt-1 text-xl font-semibold">Brasília, DF</p></div><span className="text-4xl text-white/10">BR</span></MagneticCard>
        <MagneticCard className="flex items-end justify-between p-7"><div><Zap className="mb-8 text-neon"/><span className="text-sm text-white/40">Foco atual</span><p className="mt-1 text-xl font-semibold">Full Stack</p></div><span className="h-3 w-3 animate-pulse rounded-full bg-neon shadow-[0_0_20px_#00ff88]"/></MagneticCard>
      </motion.div>
    </div>
  </section>;
}

function Skills() {
  return <section id="skills" className="section">
    <SectionTitle kicker="02 / Competências" title={<>Stack que transforma <span className="text-white/30">ideias em produto.</span></>} copy="Tecnologias e fundamentos que uso para criar experiências digitais consistentes, escaláveis e agradáveis."/>
    <motion.div variants={{show:{transition:{staggerChildren:.05}}}} initial="hidden" whileInView="show" viewport={{once:true}} className="mb-6 flex flex-wrap gap-2.5">
      {skillCloud.map((s,i)=><motion.div variants={reveal} key={s} className="skill-pill"><span className="font-mono text-[10px] text-neon">{String(i+1).padStart(2,"0")}</span>{s}</motion.div>)}
    </motion.div>
    <div className="card p-6 md:p-9">
      <div className="mb-8 flex items-center justify-between"><h3 className="text-lg font-semibold">Nível de proficiência</h3><span className="font-mono text-xs text-white/30">constantly_growing = true</span></div>
      <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {skills.map((s)=><SkillBar key={s.name} {...s}/>)}
      </div>
    </div>
  </section>;
}

function SkillBar({name,value}:{name:string,value:number}) {
  const ref=useRef(null); const visible=useInView(ref,{once:true,amount:.5});
  return <div ref={ref}><div className="mb-2 flex justify-between text-sm"><span>{name}</span><span className="font-mono text-xs text-neon">{value}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]"><motion.div initial={{width:0}} animate={visible?{width:`${value}%`}:{}} transition={{duration:1.2,ease:[.22,1,.36,1]}} className="h-full rounded-full bg-gradient-to-r from-[#00a95b] to-neon shadow-[0_0_12px_rgba(0,255,136,.6)]"/></div></div>;
}

function Education() {
  return <section id="formacao" className="section">
    <SectionTitle kicker="03 / Formação" title={<>Conhecimento em <span className="text-white/30">movimento.</span></>} />
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} className="card relative overflow-hidden p-7 md:p-10">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neon via-neon/30 to-transparent"/>
      <div className="grid gap-8 md:grid-cols-[180px_1fr_auto] md:items-center">
        <div><span className="font-mono text-sm text-neon">2025 — 2029</span><p className="mt-2 text-xs uppercase tracking-widest text-white/30">Em andamento</p></div>
        <div><p className="mb-2 text-xs uppercase tracking-[.18em] text-white/35">Bacharelado</p><h3 className="text-2xl font-semibold md:text-3xl">Ciência da Computação</h3><p className="mt-3 text-white/50">Universidade UDF · 2º período</p></div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neon/20 bg-neon/10"><GraduationCap className="text-neon"/></div>
      </div>
    </motion.div>
    <div className="mt-5 grid gap-5 md:grid-cols-2">
      {[["Inglês","Intermediário · em curso"],["Alemão","Básico · em curso"]].map(([lang,level],i)=><motion.div key={lang} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:i*.1}}><MagneticCard className="flex items-center justify-between p-6"><div className="flex items-center gap-4"><Globe2 className="text-neon"/><div><h4 className="font-semibold">{lang}</h4><p className="mt-1 text-sm text-white/40">{level}</p></div></div><span className="font-mono text-xs text-white/20">0{i+1}</span></MagneticCard></motion.div>)}
    </div>
  </section>;
}

function Courses() {
  return <section id="cursos" className="section">
    <SectionTitle kicker="04 / Cursos" title={<>Aprendizado que <span className="text-white/30">não para.</span></>} />
    <motion.div variants={{show:{transition:{staggerChildren:.06}}}} initial="hidden" whileInView="show" viewport={{once:true}} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map(([title,desc],i)=><motion.div variants={reveal} key={title}><MagneticCard className="group min-h-48 p-6"><div className="mb-12 flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[.05] text-neon transition-colors group-hover:bg-neon group-hover:text-black"><BookOpen size={19}/></span><span className="font-mono text-[10px] text-white/20">{String(i+1).padStart(2,"0")}</span></div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-white/40">{desc}</p></MagneticCard></motion.div>)}
    </motion.div>
  </section>;
}

function Stats() {
  return <section className="section pt-8"><div className="grid overflow-hidden rounded-3xl border border-white/[.08] bg-white/[.025] sm:grid-cols-2 lg:grid-cols-4">
    {[["10+","Projetos"],["15+","Tecnologias"],["100%","Dedicação"],["24h","Aprendizado"]].map(([n,l],i)=><motion.div key={l} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} transition={{delay:i*.08}} className="border-b border-white/[.07] p-8 last:border-0 sm:border-r lg:border-b-0"><p className="font-mono text-4xl font-bold tracking-tight text-neon">{n}</p><p className="mt-3 text-sm text-white/40">{l}</p></motion.div>)}
  </div></section>;
}

function Projects() {
  return <section id="projetos" className="section">
    <SectionTitle kicker="05 / Projetos" title={<>O que estou <span className="text-white/30">construindo.</span></>} copy="Uma seleção de projetos estará disponível em breve. Enquanto isso, acompanhe minha evolução pelo GitHub."/>
    <motion.a href="https://github.com/cloudroot13" target="_blank" rel="noreferrer" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} className="project-card group">
      <div className="relative z-10 max-w-xl">
        <span className="mb-8 inline-flex rounded-full border border-neon/20 bg-neon/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neon">Em evolução contínua</span>
        <h3 className="text-3xl font-semibold md:text-5xl">Próximo projeto<br/>em breve.</h3>
        <p className="mt-5 leading-7 text-white/45">Repositórios, experimentos e aplicações completas sendo preparados para esta vitrine.</p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neon">Explorar GitHub <ArrowUpRight size={16}/></span>
      </div>
      <div className="relative z-10 mt-12 flex h-32 items-center justify-center rounded-2xl border border-white/[.07] bg-black/30 lg:mt-0 lg:h-64 lg:w-[42%]"><Github size={74} strokeWidth={1} className="text-white/15 transition-all duration-500 group-hover:scale-110 group-hover:text-neon/50"/></div>
    </motion.a>
  </section>;
}

function Contact() {
  return <section id="contato" className="section pb-14">
    <div className="contact-panel">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}>
        <Kicker>06 / Contato</Kicker>
        <h2 className="text-4xl font-semibold tracking-[-.05em] md:text-6xl">Tem uma ideia?<br/><span className="text-neon">Vamos construir.</span></h2>
        <p className="mt-6 max-w-lg text-white/50">Estou aberto a oportunidades, colaborações e boas conversas sobre tecnologia.</p>
      </motion.div>
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} className="mt-10 grid gap-3 lg:mt-0">
        <a href="mailto:bielcavalcanti13@gmail.com" className="contact-link"><Mail/><span><small>Email</small>bielcavalcanti13@gmail.com</span><ArrowUpRight/></a>
        <a href="tel:+5561986045533" className="contact-link"><Phone/><span><small>Telefone</small>(61) 98604-5533</span><ArrowUpRight/></a>
        <a href="https://github.com/cloudroot13" target="_blank" rel="noreferrer" className="contact-link"><Github/><span><small>GitHub</small>@cloudroot13</span><ArrowUpRight/></a>
      </motion.div>
    </div>
  </section>;
}

export default function Portfolio() {
  return <><Background/><Navbar/><main><Hero/><About/><Skills/><Education/><Courses/><Stats/><Projects/><Contact/></main>
  <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/[.07] px-5 py-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} Gabriel Cavalcanti Amaral</span><span>Desenvolvido com React, TypeScript & Tailwind CSS.</span></footer></>;
}
