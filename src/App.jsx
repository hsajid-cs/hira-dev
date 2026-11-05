import { useEffect, useState } from 'react';
import portrait from './assets/hira.jpg.jpg';
import { aboutData, projectsData, experienceData, researchData, certificationsData, volunteeringData } from './data/portfolioData';

const navigation = [
  ['about', 'About'], ['projects', 'Projects'], ['experience', 'Experience'],
  ['education', 'Education'], ['research', 'Research'], ['contact', 'Contact']
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function SectionTitle({ number, eyebrow, title, note }) {
  return <div className="section-heading reveal">
    <div className="section-kicker"><span>{number} / {eyebrow}</span><span className="section-line" /></div>
    <div className="section-title-row"><h2>{title}<span className="title-dot">.</span></h2>{note && <p>{note}</p>}</div>
  </div>;
}

function Starburst({ className = '' }) {
  return <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
    <path d="M80 5 91 57 127 20 105 68 157 60 109 82 151 111 101 98 112 152 83 107 54 151 61 100 10 119 55 85 4 65 57 65 35 15 72 57Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="80" cy="81" r="14" fill="currentColor"/><circle cx="80" cy="81" r="5" fill="#faf7ef"/>
  </svg>;
}

function ProjectCard({ project, index }) {
  return <article className="project-card reveal" style={{ '--card-index': index }}>
    <div className="project-top"><span className="project-index">PROJECT / {String(index + 1).padStart(2, '0')}</span><span className="project-sparkle" aria-hidden="true">✳</span></div>
    <div className="project-body"><p className="project-meta">{project.meta}</p><h3>{project.title}</h3><p className="project-description">{project.body}</p></div>
    <div className="project-bottom"><div className="tags">{(project.tags || []).map(tag => <span key={tag}>{tag}</span>)}</div>{project.link && <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={'Visit ' + project.title}>Visit project <Arrow diagonal /></a>}</div>
  </article>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('about');
  const projects = projectsData.entries;
  const professionalExperience = experienceData.entries.filter(entry => !entry.title.toLowerCase().includes('computer science'));
  const education = experienceData.entries.filter(entry => entry.title.toLowerCase().includes('computer science'));

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-22% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function closeMenu() { setMenuOpen(false); }

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Hira Sajid, back to top"><span className="brand-symbol">✳</span> hira<span className="brand-dot">.</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close ×' : 'Menu ☰'}</button>
      <nav id="primary-nav" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {navigation.map(([id, label]) => <a key={id} className={active === id ? 'nav-active' : ''} href={'#' + id} onClick={closeMenu}>{label}</a>)}
      </nav>
      <a className="header-cta" href="https://github.com/hsajid-cs">GitHub <Arrow diagonal /></a>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="little-dot" /> HELLO, I'M HIRA SAJID <span className="tiny-flower">✿</span></div>
          <h1 id="hero-title">A little bit <em>logic,</em><br />a little bit <span className="hand-underline">magic.</span></h1>
          <p className="hero-description">Software engineer, computer science graduate, and a maker at heart. I love building things that make sense, and making them feel human.</p>
          <div className="hero-actions"><a className="pill-button primary-button" href="#projects">See my work <Arrow /></a><a className="text-button" href="#about">Get to know me <Arrow diagonal /></a></div>
          <div className="hero-footnote"><span>BASED IN ISLAMABAD, PAKISTAN</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
        <div className="hero-art" aria-label="Decorative collage of a code window and stationery">
          <div className="art-grid" aria-hidden="true" />
          <div className="art-orbit art-orbit-one" aria-hidden="true" /><div className="art-orbit art-orbit-two" aria-hidden="true" />
          <div className="art-tape tape-one" aria-hidden="true" />
          <div className="art-photo"><img src={portrait} alt="Hira Sajid" /><span className="photo-caption">hi, that's me! ♡</span></div>
          <div className="art-code" aria-hidden="true"><div className="window-dots"><i/><i/><i/></div><span className="code-pink">const</span> hira = {'{'}<br />&nbsp; curiosity: <span className="code-green">true</span>,<br />&nbsp; coffee: <span className="code-green">'always'</span>,<br />&nbsp; creates: <span className="code-green">'things'</span><br />{'}'};</div>
          <Starburst className="hero-starburst" />
          <div className="art-sticker" aria-hidden="true">made with<br /><strong>♡ + &lt;/&gt;</strong></div>
          <span className="art-scribble" aria-hidden="true">✧</span>
        </div>
      </section>

      <div className="marquee-band" aria-label="Code, create, repeat"><div className="marquee-track" aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i}>CODE <b>✳</b> CREATE <b>✳</b> REPEAT <b>✳</b> STAY CURIOUS <b>✳</b> </span>)}</div></div>

      <section id="about" className="content-section about-section">
        <SectionTitle number="01" eyebrow="THE PERSON" title="Beyond the screen" note="Because there's more to a person than their tech stack." />
        <div className="about-layout"><div className="about-quote reveal"><span className="quote-mark">“</span><p>Somewhere between clean code and a craft table is where you'll find me.</p><span className="doodle-asterisk" aria-hidden="true">✳</span></div><div className="about-text reveal">
          <p>{aboutData.entries[0]?.body}</p>
          <p>{aboutData.entries[1]?.body}</p>
          <div className="about-interests"><span>THINGS I ENJOY</span><div><span>Creative coding</span><span>Arts & crafts</span><span>Machine learning</span><span>Making things</span></div></div>
        </div></div>
      </section>

      <section id="projects" className="content-section projects-section">
        <SectionTitle number="02" eyebrow="THE WORK" title="Things I've built" note="A mix of experiments, practical solutions, and ideas brought to life." />
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
      </section>

      <section id="experience" className="content-section experience-section">
        <SectionTitle number="03" eyebrow="THE PATH" title="Where I've worked" note="The work, teams, and lessons along the way." />
        <div className="timeline">{professionalExperience.map((entry, index) => <article className="timeline-item reveal" key={entry.title + index}><div className="timeline-number">{String(index + 1).padStart(2, '0')}</div><div className="timeline-content"><p className="timeline-meta">{entry.meta}</p><h3>{entry.title}</h3><p>{entry.body}</p></div><span className="timeline-mark" aria-hidden="true">✳</span></article>)}</div>
      </section>

      <section id="education" className="content-section education-section">
        <SectionTitle number="04" eyebrow="THE FOUNDATION" title="Education" />
        <div className="education-panel reveal"><div className="education-icon" aria-hidden="true">✎</div><div><span className="panel-eyebrow">ACADEMIC BACKGROUND</span>{education.map((entry, index) => <div key={index}><h3>{entry.title}</h3><p className="education-meta">{entry.meta}</p><p>{entry.body}</p></div>)}</div><span className="education-flower" aria-hidden="true">✿</span></div>
      </section>

      <section id="research" className="content-section research-section">
        <SectionTitle number="05" eyebrow="THE QUESTIONS" title="Currently curious about" note="Research, learning, and the ideas I keep coming back to." />
        <div className="research-layout"><div className="research-intro reveal"><span className="mini-label">RESEARCH NOTES / ✳</span><h3>Always asking <em>what if?</em></h3><p>My favorite projects start with a question worth exploring.</p></div><div className="research-list">{researchData.entries.map((entry, i) => <article className="research-item reveal" key={i}><span>0{i + 1}</span><div><h3>{entry.title}</h3><p className="research-meta">{entry.meta}</p><p>{entry.body}</p></div></article>)}</div></div>
      </section>

      <section id="extras" className="content-section extras-section">
        <div className="extras-column reveal"><h2>Outside of work <span>✿</span></h2><p className="extras-label">COMMUNITY & INVOLVEMENT</p>{volunteeringData.entries.map((entry, i) => <div className="small-entry" key={i}><strong>{entry.title}</strong><span>{entry.meta}</span></div>)}</div>
        <div className="extras-column reveal"><h2>Things I've learned <span>✳</span></h2><p className="extras-label">COURSES & CERTIFICATIONS</p>{certificationsData.entries.map((entry, i) => <div className="small-entry" key={i}><strong>{entry.title}</strong><span>{entry.meta}</span></div>)}</div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner reveal"><span className="contact-kicker">06 / YOUR TURN</span><Starburst className="contact-star" /><h2>Have an idea?<br /><em>Let's make it real.</em></h2><p>Whether it's a project, a question, or a simple hello, my inbox is open.</p><a className="contact-button" href="https://github.com/hsajid-cs">Find me on GitHub <Arrow diagonal /></a></div>
      </section>
    </main>
    <footer className="site-footer"><a className="footer-brand" href="#top">hira<span>.</span> ✳</a><span>Made with code, care & a little creativity.</span><a href="https://github.com/hsajid-cs" target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /></a><a href="#top">Back to top ↑</a></footer>
  </div>;
}
