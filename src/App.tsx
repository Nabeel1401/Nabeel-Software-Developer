import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Database,
  Layers,
  Terminal,
  X,
} from 'lucide-react';

import { notes, profile, projects } from './data';

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const VIDEO_SOURCE =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

const ROLES = [
  'Full-stack developer',
  'Creative problem solver',
  'Curious builder',
];

const PROJECT_REPOSITORIES: Record<string, string> = {
  rentease: 'https://github.com/Nabeel1401/rentease',
  nft: 'https://github.com/Nabeel1401/Nft-App',
};

const PROJECT_ORDER = ['rentease', 'nft', 'bench', 'anticipa'];

const orderedProjects = [...projects].sort((first, second) => {
  const firstIndex = PROJECT_ORDER.indexOf(first.id);
  const secondIndex = PROJECT_ORDER.indexOf(second.id);

  return (
    (firstIndex === -1 ? PROJECT_ORDER.length : firstIndex) -
    (secondIndex === -1 ? PROJECT_ORDER.length : secondIndex)
  );
});

const TOOLKIT_COLUMNS = [
  ['React', 'Python', 'MongoDB'],
  ['TypeScript', 'Docker', 'Rust'],
];

type Project = (typeof projects)[number];

type ModalContent = {
  title: string;
  body: string;
  theme?: string;
  tags?: string[];
  github?: string;
};

type SectionHeaderProps = {
  label: string;
  title: string;
  italic: string;
  description: string;
  action?: ReactNode;
};

/* -------------------------------------------------------------------------- */
/* Background video                                                           */
/* -------------------------------------------------------------------------- */

function BackgroundVideo({ footer = false }: { footer?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;

    if (!video || reducedMotion) {
      return;
    }

    let hls: Hls | undefined;

    if (Hls.isSupported()) {
      hls = new Hls();

      hls.loadSource(VIDEO_SOURCE);
      hls.attachMedia(video);
    } else if (
      video.canPlayType('application/vnd.apple.mpegurl')
    ) {
      video.src = VIDEO_SOURCE;
    }

    return () => {
      hls?.destroy();
    };
  }, [reducedMotion]);

  return (
    <div
      className={`video-layer ${footer ? 'footer-video' : ''}`}
      aria-hidden="true"
    >
      <div className="video-fallback" />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
      />

      <div className="video-shade" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable section header                                                    */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  label,
  title,
  italic,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: '-70px',
      }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <p className="eyebrow">
          <span />
          {label}
        </p>

        <h2>
          {title} <i>{italic}</i>
        </h2>

        <p className="section-description">
          {description}
        </p>
      </div>

      {action}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Project artwork                                                            */
/* -------------------------------------------------------------------------- */

function ProjectVisual({ theme }: { theme: string }) {
  return (
    <div
      className={`project-visual ${theme}`}
      aria-hidden="true"
    >
      {theme === 'property' && <RentEaseVisual />}
      {theme === 'nft' && <NftVisual />}
      {theme === 'api' && <ApiVisual />}
      {theme === 'analytics' && <AnalyticsVisual />}
    </div>
  );
}

function RentEaseVisual() {
  return (
    <>
      <div className="mock-window">
        <div className="mock-nav">
          <b>
            rent<span>ease.</span>
          </b>

          <small>
            Discover &nbsp; Properties &nbsp; About
          </small>

          <span className="mini-pill">
            Get started ↗
          </span>
        </div>

        <div className="property-copy">
          <small>A PLACE TO BELONG</small>

          <h3>
            Find a space.
            <br />
            <em>Make it yours.</em>
          </h3>

          <p>
            A new chapter starts with the right home.
          </p>

          <div className="search-mock">
            Paris, France

            <span>Find a home ↗</span>
          </div>
        </div>

        <div className="building">
          <div />
          <div />
          <div />
        </div>

        <div className="property-bottom">
          <span>
            Thoughtful spaces. Better living.
          </span>

          <b>↗</b>
        </div>
      </div>

      <span className="visual-caption">
        DISCOVERY, DESIGNED AROUND YOU.
      </span>
    </>
  );
}

function NftVisual() {
  return (
    <>
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <div className="nft-type">
        <span>COLLECTION / 001</span>

        <h3>
          Beyond
          <br />
          <i>the ordinary.</i>
        </h3>
      </div>

      <div className="nft-bottom">
        <span>
          Digital ownership.
          <br />
          Human connection.
        </span>

        <span className="round-arrow">↗</span>
      </div>
    </>
  );
}

function ApiVisual() {
  return (
    <div className="terminal">
      <div className="terminal-top">
        <span>● ● ●</span>
        <span>bench / services</span>
        <Terminal size={14} />
      </div>

      <div className="terminal-body">
        <small>DEVELOPER WORKSPACE</small>

        <h3>
          Small services.
          <br />
          <i>Connected ideas.</i>
        </h3>

        <div className="code-line">
          <span>01</span>
          <b>GET</b>
          /api/services
          <em>200 OK</em>
        </div>

        <div className="code-line">
          <span>02</span>
          <b>POST</b>
          /api/workloads
          <em>201 CREATED</em>
        </div>

        <div className="service-grid">
          <div>
            <Code2 />
            Frontend
            <small>React</small>
          </div>

          <div>
            <Layers />
            API
            <small>FastAPI</small>
          </div>

          <div>
            <Database />
            Services
            <small>Docker</small>
          </div>
        </div>

        <p className="terminal-prompt">
          ❯ <span>Ready to build</span>
          <b className="cursor">_</b>
        </p>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className="analytics-window">
      <div className="mock-nav">
        <b>
          anticipa<span> / ai</span>
        </b>

        <span className="mini-pill">
          Overview ↗
        </span>
      </div>

      <div className="analytics-title">
        <small>PEOPLE INTELLIGENCE</small>

        <h3>
          Understand the
          <br />
          <i>story behind the data.</i>
        </h3>
      </div>

      <div className="chart">
        <div className="chart-grid" />

        <svg viewBox="0 0 500 140">
          <defs>
            <linearGradient
              id="analytics-fill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0"
                stopColor="#91b3d3"
                stopOpacity=".4"
              />

              <stop
                offset="1"
                stopColor="#91b3d3"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <path
            d="
              M0 120
              C50 120 40 60 100 80
              S160 100 200 50
              S260 90 300 45
              S370 65 400 25
              S460 45 500 10
              L500 140
              L0 140Z
            "
            fill="url(#analytics-fill)"
          />

          <path
            d="
              M0 120
              C50 120 40 60 100 80
              S160 100 200 50
              S260 90 300 45
              S370 65 400 25
              S460 45 500 10
            "
            fill="none"
            stroke="#a4c4df"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="analytics-foot">
        <span>Predictive modelling</span>
        <span>Explainable insights ↗</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Toolkit artwork                                                            */
/* -------------------------------------------------------------------------- */

function ToolkitVisual({ tool }: { tool: string }) {
  switch (tool) {
    case 'React':
      return <div className="atom">⚛</div>;

    case 'Python':
      return (
        <span className="python-glyph">
          Py<span>_</span>
        </span>
      );

    case 'MongoDB':
      return <div className="leaf" />;

    case 'TypeScript':
      return <span className="ts-glyph">TS</span>;

    case 'Docker':
      return (
        <div className="docker-glyph">
          ▦
          <span>〰</span>
        </div>
      );

    case 'Rust':
      return <div className="rust-glyph">R</div>;

    default:
      return <Code2 size={64} />;
  }
}

/* -------------------------------------------------------------------------- */
/* Modal                                                                      */
/* -------------------------------------------------------------------------- */

function DetailModal({
  content,
  onClose,
}: {
  content: ModalContent;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex="0"]',
        );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="close-button"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>

        {content.theme && (
          <ProjectVisual theme={content.theme} />
        )}

        <div className="modal-copy">
          <p className="eyebrow">A CLOSER LOOK</p>

          <h2 id="modal-title">
            {content.title}
          </h2>

          <p>{content.body}</p>

          {content.tags && content.tags.length > 0 && (
            <div className="tags">
              {content.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <a
            className="text-link"
            href={content.github || profile.github}
            target="_blank"
            rel="noreferrer"
          >
            {content.github
              ? 'View project on GitHub'
              : 'My GitHub'}

            <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main application                                                           */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [modal, setModal] = useState<ModalContent | null>(null);
  const closeModal = useCallback(() => {
  setModal(null);
}, []);

  const rootRef = useRef<HTMLDivElement>(null);
  const explorationsRef = useRef<HTMLElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  /* Rotating hero role ----------------------------------------------------- */

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setRoleIndex((current) => (
        (current + 1) % ROLES.length
      ));
    }, 2200);

    return () => {
      window.clearInterval(interval);
    };
  }, [reducedMotion]);

  /* Navbar state and active section ---------------------------------------- */

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 100);
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
      },
    );

    const sections =
      rootRef.current?.querySelectorAll<HTMLElement>(
        'section[id], footer[id]',
      );

    sections?.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  /* Lock scrolling while a dialog is open ---------------------------------- */

  useEffect(() => {
    if (!modal) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modal]);

  /* GSAP entrance, marquee, and parallax ------------------------------------ */

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from('.name-reveal', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.blur-in', {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
      });

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 40,
          repeat: -1,
          ease: 'none',
        });
      }

      if (
        explorationsRef.current &&
        pinnedContentRef.current
      ) {
        ScrollTrigger.create({
          trigger: explorationsRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedContentRef.current,
          pinSpacing: false,
        });

        const columns =
          gsap.utils.toArray<HTMLElement>(
            '.explore-column',
          );

        columns.forEach((column, index) => {
          gsap.fromTo(
            column,
            {
              y: index === 0 ? 50 : 220,
            },
            {
              y: index === 0 ? -650 : -350,
              ease: 'none',
              scrollTrigger: {
                trigger: explorationsRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        });
      }
    }, rootRef);

    return () => {
      context.revert();
    };
  }, [reducedMotion]);

  /* Event handlers --------------------------------------------------------- */

  function openProject(project: Project) {
    const title =
      project.id === 'nft'
        ? 'NFT App'
        : project.title;

    const customGithub =
      'github' in project &&
      typeof project.github === 'string'
        ? project.github
        : undefined;

    setModal({
      title,
      body: `${project.description} ${project.detail}`,
      theme: project.theme,
      tags: project.stack,
      github:
        PROJECT_REPOSITORIES[project.id] ||
        customGithub,
    });
  }

  function openResume() {
    setModal({
      title: 'Developer. Builder. Always learning.',
      body:
        'Final-year Cybersecurity & Cloud Computing student ' +
        'at ESILV, with a BTech in Information Technology. ' +
        'Seeking a 6-month software development internship ' +
        'from February 2027. My toolkit spans React, ' +
        'TypeScript, Node.js, Python, SQL, MongoDB, and Docker. ' +
        'A downloadable CV will be added in the next update.',
      tags: [
        'ESILV · Paris',
        'BTech · Information Technology',
        'Full-stack development',
      ],
    });
  }

  function openToolkit(tool: string) {
    setModal({
      title: tool,
      body:
        'Part of my development toolkit. This playground ' +
        'is a visual space for future experiments, ' +
        'prototypes, and smaller projects.',
      tags: ['TOOLKIT / EXPLORATIONS'],
    });
  }

  const contactHref = profile.email
    ? `mailto:${profile.email}`
    : profile.linkedin;

  /* Page ------------------------------------------------------------------- */

  return (
    <div ref={rootRef}>
      <a href="#work" className="skip-link">
        Skip to selected work
      </a>

      {/* Navigation */}

      <nav
        className={`navbar ${
          isScrolled ? 'is-scrolled' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="nav-pill">
          <a
            href="#home"
            className="logo"
            aria-label="Nabeel Ahmad home"
          >
            <span>NA</span>
          </a>

          <div className="nav-divider" />

          <a
            href="#home"
            className={
              activeSection === 'home'
                ? 'active'
                : ''
            }
            aria-current={
              activeSection === 'home'
                ? 'location'
                : undefined
            }
          >
            Home
          </a>

          <a
            href="#work"
            className={
              activeSection === 'work'
                ? 'active'
                : ''
            }
            aria-current={
              activeSection === 'work'
                ? 'location'
                : undefined
            }
          >
            Work
          </a>

          <button
            type="button"
            onClick={openResume}
          >
            Resume
          </button>

          <div className="nav-divider" />

          <a
            href="#contact"
            className="nav-contact"
          >
            Say hi
            <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}

        <section
          id="home"
          className="hero"
        >
          <BackgroundVideo />

          <div className="hero-topline">
            <span>SOFTWARE DEVELOPER</span>
            <span>BASED IN FRANCE ↗</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow blur-in">
              PORTFOLIO — COLLECTION ’26
            </p>

            <h1 className="name-reveal">
              Nabeel <i>Ahmad.</i>
            </h1>

            <p className="role-line blur-in">
              A{' '}

              <span
                key={roleIndex}
                className="role-word"
              >
                {ROLES[roleIndex]}
              </span>

              {' '}in Paris.
            </p>

            <p className="hero-description blur-in">
              Turning complex ideas into thoughtful interfaces

              <br className="hidden sm:block" />

              {' '}and software that brings them to life.
            </p>

            <div className="hero-actions blur-in">
              <a
                className="button primary"
                href="#work"
              >
                See works
                <ChevronDown size={16} />
              </a>

              <a
                className="button"
                href="#contact"
              >
                Reach out
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <span>
              INTERFACES · APIs · EXPERIENCES
            </span>

            <a
              href="#work"
              className="scroll-indicator"
            >
              <span>SCROLL TO EXPLORE</span>

              <div>
                <b />
              </div>
            </a>

            <span>
              OPEN TO WHAT’S NEXT
              <b className="status-dot" />
            </span>
          </div>

          <div className="hero-fade" />
        </section>

        {/* Selected projects */}

        <section
          id="work"
          className="section-wrap work"
        >
          <SectionHeader
            label="A SELECTION OF WHAT I BUILD"
            title="Featured"
            italic="projects."
            description={
              'From the first idea to the final interaction. ' +
              'Built with care, end to end.'
            }
            action={
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                Explore GitHub
                <ArrowUpRight size={16} />
              </a>
            }
          />

          <div className="project-grid">
            {orderedProjects.map((project, index) => {
              const title =
                project.id === 'nft'
                  ? 'NFT App'
                  : project.title;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  className={`project-card card-${index}`}
                  initial={{
                    opacity: 0,
                    y: reducedMotion ? 0 : 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-50px',
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.7,
                    delay: (index % 2) * 0.1,
                  }}
                  onClick={() => openProject(project)}
                  aria-label={`View ${title} project details`}
                >
                  <div className="project-image">
                    <ProjectVisual theme={project.theme} />

                    <div className="halftone" />

                    <div className="project-hover">
                      <span>
                        View — <i>{title}</i>
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="project-meta">
                    <div>
                      <p>{project.category}</p>
                      <h3>{title}</h3>
                    </div>

                    <span className="project-number">
                      /{String(index + 1).padStart(2, '0')}
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <p className="visual-note">
            Project previews are illustrative interface studies.
            Open a card for project context.
          </p>
        </section>

        {/* Developer notes */}

        <section className="section-wrap journal">
          <SectionHeader
            label="BEHIND THE BUILD"
            title="Recent"
            italic="thoughts."
            description={
              'A little about how I think, learn, ' +
              'and approach development.'
            }
          />

          <div className="journal-list">
            {notes.map((note, index) => {
              const icons = [
                <Code2 key="code" />,
                <Terminal key="terminal" />,
                <Layers key="layers" />,
                <Database key="database" />,
              ];

              return (
                <motion.button
                  key={note.title}
                  type="button"
                  className="journal-row"
                  initial={{
                    opacity: 0,
                    y: reducedMotion ? 0 : 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.5,
                  }}
                  onClick={() => {
                    setModal({
                      title: note.title,
                      body: note.body,
                      tags: [note.tag],
                    });
                  }}
                >
                  <span
                    className={`journal-thumb thumb-${index}`}
                    aria-hidden="true"
                  >
                    {icons[index % icons.length]}
                  </span>

                  <div>
                    <small>
                      {note.tag}
                      <span> / DEVELOPER NOTES</span>
                    </small>

                    <h3>{note.title}</h3>
                  </div>

                  <span className="journal-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span
                    className="journal-arrow"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Parallax toolkit */}

        <section
          ref={explorationsRef}
          className="explorations"
        >
          <div
            ref={pinnedContentRef}
            className="explore-center"
          >
            <p className="eyebrow">
              THE SPACE BETWEEN IDEAS
            </p>

            <h2>
              Always <i>exploring.</i>
            </h2>

            <p>
              New tools. Different perspectives.
              <br />
              The next thing worth building.
            </p>

            <a
              className="button"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              Into the playground
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="explore-columns">
            {TOOLKIT_COLUMNS.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="explore-column"
              >
                {column.map((tool, toolIndex) => (
                  <button
                    key={tool}
                    type="button"
                    className={
                      `explore-card tile-${
                        columnIndex * 3 + toolIndex
                      }`
                    }
                    onClick={() => openToolkit(tool)}
                    aria-label={`Explore ${tool}`}
                  >
                    <div
                      className="tile-art"
                      aria-hidden="true"
                    >
                      <ToolkitVisual tool={tool} />
                    </div>

                    <span>
                      {tool}
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Developer focus */}

        <section
          id="about"
          className="section-wrap stats"
        >
          <div>
            <span className="stat-value">
              Full<i>stack.</i>
            </span>

            <p>FRONTEND TO BACKEND</p>
          </div>

          <div>
            <span className="stat-value">
              Code <i>+ care.</i>
            </span>

            <p>A THOUGHTFUL APPROACH</p>
          </div>

          <div>
            <span className="stat-value">
              What’s <i>next?</i>
            </span>

            <p>
              6-MONTH INTERNSHIP · FEB 2027
            </p>
          </div>
        </section>
      </main>

      {/* Contact and footer */}

      <footer id="contact">
        <BackgroundVideo footer />

        <div className="footer-inner">
          <p className="eyebrow">
            HAVE SOMETHING IN MIND?
          </p>

          <div className="marquee-viewport">
            <div
              ref={marqueeRef}
              className="marquee"
              aria-hidden="true"
            >
              {Array.from({ length: 10 }, (_, index) => (
                <span key={index}>
                  BUILDING THE <i>FUTURE</i>
                  <b>✳</b>
                  {' '}
                </span>
              ))}
            </div>
          </div>

          <div className="contact-content">
            <h2>
              Great things start
              <br />
              with a <i>conversation.</i>
            </h2>

            <a
              className="button contact-button"
              href={contactHref}
              target={
                profile.email ? undefined : '_blank'
              }
              rel="noreferrer"
            >
              {profile.email
                ? 'Say hello by email'
                : 'Let’s connect'}

              <ArrowUpRight size={20} />
            </a>

            <p>{profile.availability}</p>
          </div>

          <div className="footer-bar">
            <a
              className="footer-name"
              href="#home"
            >
              Nabeel Ahmad

              <span>
                © {new Date().getFullYear()}
              </span>
            </a>

            <div className="social-links">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>

            <span className="available">
              <b className="status-dot" />
              Open to opportunities
            </span>
          </div>
        </div>
      </footer>

      {/* Project and information dialogs */}

      <AnimatePresence>
        {modal && (
          <DetailModal
            content={modal}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}