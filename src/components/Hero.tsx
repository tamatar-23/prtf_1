import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  InstagramLogo,
  Keyboard,
  LinkedinLogo,
  SpotifyLogo,
} from '@phosphor-icons/react';
import { personal } from '@/lib/data';

const profileLinks = [
  {
    label: 'GitHub',
    href: personal.github,
    icon: <GithubLogo size={15} weight="regular" />,
  },
  {
    label: 'LinkedIn',
    href: personal.linkedin,
    icon: <LinkedinLogo size={15} weight="regular" />,
  },
  {
    label: 'Resume',
    href: personal.resumeUrl,
    icon: <FileText size={15} weight="regular" />,
  },
  {
    label: 'Instagram',
    href: personal.instagram,
    icon: <InstagramLogo size={15} weight="regular" />,
  },
  {
    label: 'Monkeytype',
    href: personal.monkeytype,
    icon: <Keyboard size={15} weight="regular" />,
  },
  {
    label: 'Spotify',
    href: personal.spotify,
    icon: <SpotifyLogo size={15} weight="regular" />,
  },
];

export const Hero: React.FC = () => {
  const reduce = useReducedMotion();

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      id="hero"
      className="flex min-h-[calc(100dvh-4rem)] items-center border-b border-border bg-bg py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div {...motionProps} className="max-w-4xl">
          <p className="mb-4 text-lg font-medium tracking-tight text-text-muted md:text-xl">
            {personal.name}
          </p>

          <h1 className="mb-6 text-balance text-4xl font-medium tracking-tight leading-[1.06] text-text sm:text-5xl lg:text-[3.5rem]">
            {personal.headline}
          </h1>

          <p className="mb-10 max-w-[56ch] text-base leading-relaxed text-text-muted sm:text-lg">
            {personal.bio}
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-text bg-text px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              <EnvelopeSimple size={16} weight="regular" />
              <span>Get in touch</span>
            </a>

            <a
              href="#works"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-border bg-bg-elevated px-5 py-2.5 text-sm font-medium text-text transition-colors duration-150 hover:bg-bg-warm active:scale-[0.98]"
            >
              <span>View works</span>
              <ArrowDownRight size={15} weight="regular" />
            </a>
          </div>

          {/* Quiet inline profile & off-screen icon links */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-text-muted">
            {profileLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-text"
              >
                <span className="text-text-muted transition-colors duration-150 group-hover:text-text">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <ArrowUpRight
                  size={12}
                  weight="regular"
                  className="opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
