import { useEffect, useState } from 'react';
import portrait from './assets/hira.jpg.jpg';
import { aboutData, projectsData, experienceData, researchData, certificationsData, volunteeringData } from './data/portfolioData';

const navigation = [
  ['about', 'ABOUT ME'],
  ['projects', 'PROJECTS'],
  ['experience', 'EXPERIENCE'],
  ['education', 'EDUCATION'],
  ['research', 'RESEARCH'],
  ['contact', 'CONTACT']
];

function Arrow() {
  return <span aria-hidden="true"> &gt;&gt;</span>;
}

function RetroButton({ href, children, external = false, className = '' }) {
  return <a
    className={'retro-button ' + className}
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    {children}
  </a>;
}

function Window({ id, title, children, className = '' }) {
  return <section id={id} className={'retro-window reveal ' + className}>
    <div className="window-titlebar">
      <span className="window-title">{title}</span>
      <span className="window-controls" aria-hidden="true">
        <i>_</i><i>□</i><i>×</i>
      </span>
    </div>
    <div className="window-body">{children}</div>
  </section>;
}

function ProjectCard({ project, index }) {
  return <article className="project-card">
    <div className="project-title-row">
      <span className="file-icon" aria-hidden="true">▣</span>
      <h3>{project.title}</h3>
      <span className="project-number">#{String(index + 1).padStart(2, '0')}</span>
    </div>
    <p className="project-meta">{project.meta}</p>
    <p className="project-description">{project.body}</p>
    <div className="project-tags">
      {(project.tags || []).map(tag => <span key={tag}>{tag}</span>)}
    </div>
    {project.link && <a className="classic-link project-link" href={project.link} target="_blank" rel="noopener noreferrer">
      [ OPEN LIVE PROJECT ]
    </a>}
  </article>;
}

function ExperienceEntry({ entry, index }) {
  return <article className="experience-entry">
    <div className="experience-date-cell">
      <span className="entry-index">0{index + 1}</span>
      <span className="status-dot" aria-hidden="true" />
    </div>
    <div className="experience-content">
      <p className="experience-meta">{entry.meta}</p>
      <h3>{entry.title}</h3>
      <p>{entry.body}</p>
      {entry.highlights && <ul className="experience-highlights">
        {entry.highlights.map((item, i) => <li key={i}>{item}</li>)}
      </ul>}
      {entry.toolGroups && <div className="toolbox">
        <div className="toolbox-title">MY TOOLBOX.EXE</div>
        {entry.toolGroups.map(group => <div className="tool-row" key={group.label}>
          <strong>{group.label}</strong>
          <div>{group.items.map(item => <span key={item}>{item}</span>)}</div>
        </div>)}
      </div>}
    </div>
  </article>;
}

export default function App() {
  const [active, setActive] = useState('about');

  const projects = projectsData.entries;
  const professionalExperience = experienceData.entries.filter(entry => !entry.title.toLowerCase().includes('computer science'));
  const education = experienceData.entries.filter(entry => entry.title.toLowerCase().includes('computer science'));

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && navigation.some(([id]) => id === entry.target.id)) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px' });

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
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>

    <header className="browser-shell" id="top">
      <div className="browser-titlebar">
        <span className="browser-title">Hira Sajid's Home Page - Microsoft Internet Explorer</span>
        <span className="browser-controls" aria-hidden="true"><i>_</i><i>□</i><i>×</i></span>
      </div>

      <div className="browser-toolbar" aria-hidden="true">
        <span>Back</span><span>Forward</span><span>Stop</span><span>Refresh</span><span>Home</span>
        <span className="toolbar-spacer" />
        <span>Favorites</span><span>History</span><span>Mail</span>
      </div>

      <div className="address-row">
        <label htmlFor="fake-address">Address</label>
        <input id="fake-address" value="http://www.hirasajid.dev/home.html" readOnly aria-label="Current page address" />
        <span className="go-box" aria-hidden="true">Go</span>
      </div>

      <div className="portal-header">
        <a className="portal-logo" href="#top" aria-label="Hira dot net home">
          <span className="logo-main">HIRA</span><span className="logo-net">.NET</span>
          <small>personal homepage</small>
        </a>
        <div className="portal-copy">
          <strong>Welcome to my corner of the World Wide Web!</strong>
          <span>software + ai + things made by hand</span>
        </div>
        <div className="portal-badge">
          <span>BEST VIEWED IN</span>
          <strong>YOUR FAVORITE<br />BROWSER</strong>
        </div>
      </div>

      <nav className="retro-nav" aria-label="Main navigation">
        {navigation.map(([id, label]) => <a
          key={id}
          className={active === id ? 'active' : ''}
          href={'#' + id}
        >{label}</a>)}
      </nav>

      <div className="ticker" aria-label="Site updates">
        <span className="ticker-label">LATEST:</span>
        <div className="ticker-viewport">
          <div className="ticker-track" aria-hidden="true">
            <span>★ Welcome to Hira's homepage! ★ Currently building AI workflows, RAG systems and weirdly useful software ★ This site is proudly powered by React, nostalgia and questionable gradients ★ </span>
            <span>★ Welcome to Hira's homepage! ★ Currently building AI workflows, RAG systems and weirdly useful software ★ This site is proudly powered by React, nostalgia and questionable gradients ★ </span>
          </div>
        </div>
      </div>
    </header>

    <main id="main" className="page-frame">
      <section className="hero-grid reveal" aria-labelledby="hero-title">
        <div className="welcome-panel">
          <div className="welcome-kicker">~*~ WELCOME, INTERNET TRAVELER ~*~</div>
          <h1 id="hero-title">Hi, I'm <span>Hira Sajid</span>.</h1>
          <p className="hero-lead">Software engineer, computer science graduate, and a maker at heart.</p>
          <p>I build AI-powered systems, full-stack apps, automation workflows, and whatever else seems interesting enough to keep me up at night.</p>
          <div className="hero-buttons">
            <RetroButton href="#projects">VIEW MY PROJECTS <Arrow /></RetroButton>
            <RetroButton href="https://github.com/hsajid-cs" external className="secondary">GITHUB PROFILE</RetroButton>
          </div>
          <div className="hero-note">
            <span className="blink-dot" aria-hidden="true" />
            <strong>STATUS:</strong> online and probably debugging something
          </div>
        </div>

        <aside className="profile-card" aria-label="Hira Sajid profile card">
          <div className="profile-title">★ WEBMASTER PROFILE ★</div>
          <div className="profile-photo-wrap">
            <img src={portrait} alt="Hira Sajid" />
          </div>
          <table>
            <tbody>
              <tr><th>Name</th><td>Hira Sajid</td></tr>
              <tr><th>Location</th><td>Islamabad, Pakistan</td></tr>
              <tr><th>Occupation</th><td>Software Engineer</td></tr>
              <tr><th>Interests</th><td>AI, code, crafts</td></tr>
              <tr><th>Vibe</th><td>logic + magic</td></tr>
            </tbody>
          </table>
          <div className="profile-stamps" aria-hidden="true">
            <span>HTML<br />LOVER</span>
            <span>100%<br />HUMAN</span>
            <span>MADE<br />WITH ♡</span>
          </div>
        </aside>
      </section>

      <div className="content-columns">
        <div className="primary-column">
          <Window id="about" title="about_me.html - Hira Sajid">
            <div className="section-heading">
              <span className="section-gif" aria-hidden="true">✦</span>
              <div>
                <p className="eyebrow">01 // ABOUT ME</p>
                <h2>Who is Hira?</h2>
              </div>
            </div>
            <div className="about-copy">
              <p>{aboutData.entries[0]?.body}</p>
              <p>{aboutData.entries[1]?.body}</p>
            </div>
            <div className="interest-box">
              <strong>THINGS I LIKE:</strong>
              <span>creative coding</span>
              <span>arts & crafts</span>
              <span>machine learning</span>
              <span>making useful things</span>
              <span>tiny UI details</span>
            </div>
          </Window>

          <Window id="projects" title="projects_folder - 7 object(s)" className="projects-window">
            <div className="section-heading">
              <span className="section-gif" aria-hidden="true">▦</span>
              <div>
                <p className="eyebrow">02 // SELECTED WORK</p>
                <h2>Stuff I've built</h2>
              </div>
            </div>
            <div className="folder-path">C:\HIRA\PORTFOLIO\PROJECTS\</div>
            <div className="projects-grid">
              {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
            </div>
          </Window>

          <Window id="experience" title="career_history.txt - Notepad">
            <div className="section-heading">
              <span className="section-gif" aria-hidden="true">⌨</span>
              <div>
                <p className="eyebrow">03 // EXPERIENCE</p>
                <h2>Work history</h2>
              </div>
            </div>
            <div className="experience-list">
              {professionalExperience.map((entry, index) => <ExperienceEntry key={entry.title + index} entry={entry} index={index} />)}
            </div>
          </Window>

          <Window id="education" title="education.doc - Microsoft Word">
            <div className="section-heading">
              <span className="section-gif" aria-hidden="true">✎</span>
              <div>
                <p className="eyebrow">04 // EDUCATION</p>
                <h2>School stuff</h2>
              </div>
            </div>
            {education.map((entry, index) => <article className="education-card" key={index}>
              <div className="diploma-seal" aria-hidden="true">★</div>
              <div>
                <p className="education-meta">{entry.meta}</p>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </div>
            </article>)}
          </Window>

          <Window id="research" title="research_notes_vFINAL_final2.txt">
            <div className="section-heading">
              <span className="section-gif" aria-hidden="true">?</span>
              <div>
                <p className="eyebrow">05 // RESEARCH</p>
                <h2>Things I keep thinking about</h2>
              </div>
            </div>
            {researchData.entries.map((entry, index) => <article className="research-card" key={index}>
              <div className="research-number">NOTE_0{index + 1}</div>
              <div>
                <h3>{entry.title}</h3>
                <p className="research-meta">{entry.meta}</p>
                <p>{entry.body}</p>
              </div>
            </article>)}
          </Window>

          <Window id="contact" title="send_message.exe">
            <div className="contact-panel">
              <div className="mail-icon" aria-hidden="true">✉</div>
              <div>
                <p className="eyebrow">06 // CONTACT</p>
                <h2>Want to build something?</h2>
                <p>If you have a project, a question, or just want to say hi, you can find me on GitHub.</p>
                <RetroButton href="https://github.com/hsajid-cs" external>OPEN GITHUB <Arrow /></RetroButton>
              </div>
            </div>
          </Window>
        </div>

        <aside className="sidebar" aria-label="Extra information">
          <div className="sidebar-box reveal">
            <div className="sidebar-title">QUICK LINKS</div>
            <div className="sidebar-body link-list">
              {navigation.map(([id, label]) => <a href={'#' + id} key={id}>» {label.toLowerCase()}</a>)}
              <a href="https://github.com/hsajid-cs" target="_blank" rel="noopener noreferrer">» github.com/hsajid-cs</a>
            </div>
          </div>

          <div className="sidebar-box reveal">
            <div className="sidebar-title">CURRENTLY.EXE</div>
            <div className="sidebar-body">
              <p><strong>working:</strong><br />Jr. Software Engineer @ Quest</p>
              <p><strong>building:</strong><br />AI workflows, RAG, APIs</p>
              <p><strong>learning:</strong><br />whatever the next ticket requires</p>
            </div>
          </div>

          <div className="sidebar-box reveal">
            <div className="sidebar-title">COMMUNITY</div>
            <div className="sidebar-body compact-list">
              {volunteeringData.entries.map((entry, i) => <div key={i}>
                <strong>{entry.title}</strong>
                <span>{entry.meta}</span>
              </div>)}
            </div>
          </div>

          <div className="sidebar-box reveal">
            <div className="sidebar-title">CERTIFICATES</div>
            <div className="sidebar-body compact-list">
              {certificationsData.entries.map((entry, i) => <div key={i}>
                <strong>{entry.title}</strong>
                <span>{entry.meta}</span>
              </div>)}
            </div>
          </div>

          <div className="sidebar-box retro-fun reveal">
            <div className="sidebar-title">SITE INFO</div>
            <div className="sidebar-body">
              <div className="counter-label">FAKE VISITOR COUNTER</div>
              <div className="visitor-counter" aria-label="Decorative fake visitor counter">0 0 1 4 2 7</div>
              <p className="tiny-copy">Last updated: whenever I pushed this version.</p>
              <div className="under-construction" aria-hidden="true">⚠ UNDER CONSTRUCTION ⚠</div>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <footer className="site-footer">
      <div>
        <strong>HIRA.NET</strong> © 2026 Hira Sajid
      </div>
      <div className="footer-links">
        <a href="#top">[ TOP ]</a>
        <a href="#projects">[ PROJECTS ]</a>
        <a href="https://github.com/hsajid-cs" target="_blank" rel="noopener noreferrer">[ GITHUB ]</a>
      </div>
      <div className="footer-note">Made with React. Looks best at 800x600, emotionally.</div>
    </footer>
  </div>;
}
