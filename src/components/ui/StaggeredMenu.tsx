import React, { useCallback, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Sun, Moon } from './Icons';
import { useTheme } from '@/hooks/use-theme';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  resumeUrl?: string;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const BrandLogo = () => {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group select-none pointer-events-auto cursor-pointer focus:outline-none" 
      aria-label="Scroll to top"
    >
      <span className="inline-block text-2xl group-hover:scale-115 group-hover:rotate-[8deg] transition-all duration-300 ease-out active:scale-95">
        🍅
      </span>
    </button>
  );
};

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#F7F6F3', '#EAEAEA'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = false,
  className,
  logoUrl = '',
  menuButtonColor = '#0A0E27',
  openMenuButtonColor = '#0A0E27',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
  resumeUrl,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Scroll Lock when Menu is Open
  React.useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    setTextLines([currentLabel, targetLabel]);
    gsap.set(inner, { yPercent: 0 });
    textCycleAnimRef.current = gsap.to(inner, { 
      yPercent: -50, 
      duration: 0.3, 
      ease: 'power3.out' 
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) { 
      onMenuOpen?.(); 
    } else { 
      onMenuClose?.(); 
    }
    animateText(target);
  }, [animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false; 
      setOpen(false);
      onMenuClose?.(); 
      animateText(false);
    }
  }, [animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && toggleBtnRef.current && !toggleBtnRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div className={`sm-scope z-40 ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none' : 'w-full h-full'}`}>
      <div 
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-40'} 
        data-position={position} 
        data-open={open || undefined}
      >
        {/* Simplified prelayer background */}
        <div ref={preLayersRef} className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]" aria-hidden="true">
          <div className="absolute inset-0 bg-border/40 backdrop-blur-sm" />
        </div>

        <header className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-[2em] bg-transparent pointer-events-none z-20" aria-label="Main navigation header">
          <BrandLogo />

          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={(e) => toggleTheme(e)} 
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface text-text hover:bg-border transition-colors duration-300" 
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              ref={toggleBtnRef} 
              className={`sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible transition-colors duration-300 text-text`} 
              aria-label={open ? 'Close menu' : 'Open menu'} 
              aria-expanded={open} 
              aria-controls="staggered-menu-panel" 
              onClick={toggleMenu} 
              type="button"
            >
              <span ref={textWrapRef} className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]" aria-hidden="true">
                <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                  {textLines.map((l, i) => <span className="sm-toggle-line block h-[1em] leading-none" key={i}>{l}</span>)}
                </span>
              </span>
              <span className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center" aria-hidden="true">
                <span className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2" />
                <span className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2" />
              </span>
            </button>
          </div>
        </header>

        <aside 
          id="staggered-menu-panel" 
          ref={panelRef} 
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-bg-elevated dark:bg-bg-elevated flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto" 
          style={{ WebkitBackdropFilter: 'blur(12px)' }} 
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2" role="list">
              {items && items.length ? items.map((it, idx) => (
                <li className="sm-panel-itemWrap relative" key={it.label + idx}>
                  <a 
                    className="sm-panel-item text-text-muted hover:text-text relative cursor-pointer tracking-[-0.01em] transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]" 
                    href={it.link} 
                    aria-label={it.ariaLabel} 
                    onClick={closeMenu}
                  >
                    <span 
                      className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform"
                      style={{ transitionDelay: `${idx * 40}ms` }}
                    >
                      {it.label}
                    </span>
                  </a>
                </li>
              )) : (
                <li className="sm-panel-itemWrap relative" aria-hidden="true">
                  <span className="sm-panel-item text-text-muted relative cursor-pointer tracking-[-0.01em] transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">No items</span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-xs font-mono-tech uppercase tracking-wider text-text-muted">
                  Socials
                </h3>
                <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a 
                        href={s.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="sm-socials-link text-text-muted hover:text-text text-[0.95rem] font-medium no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                        style={{ transitionDelay: `${(items.length + i) * 40}ms` }}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                  {resumeUrl && (
                    <li className="sm-socials-item">
                      <a 
                        href={resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="sm-socials-link text-text-muted hover:text-text text-[0.95rem] font-medium no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                        style={{ transitionDelay: `${(items.length + socialItems.length) * 40}ms` }}
                      >
                        Resume
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
        .sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em; background: transparent; pointer-events: none; z-index: 20; }
        .sm-scope .staggered-menu-header > * { pointer-events: auto; }
        .sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
        .sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; font-weight: 500; line-height: 1; overflow: visible; }
        .sm-scope .sm-toggle:focus-visible { outline: 2px solid var(--color-text); outline-offset: 4px; border-radius: 4px; }
        .sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
        .sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
        .sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
        
        .sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; }
        .sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%) rotate(0deg); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .sm-scope .sm-icon-line-v { transform: translate(-50%, -50%) rotate(90deg); }
        .sm-scope [data-open] .sm-icon-line { transform: translate(-50%, -50%) rotate(45deg); }
        .sm-scope [data-open] .sm-icon-line-v { transform: translate(-50%, -50%) rotate(-45deg); }

        .sm-scope .sm-panel-itemWrap { position: relative; line-height: 1.35; padding-bottom: 0.25em; }
        
        .sm-scope .staggered-menu-panel { 
          position: absolute; 
          top: 0; 
          right: 0; 
          width: clamp(380px, 55vw, 680px); 
          height: 100%; 
          backdrop-filter: blur(12px); 
          -webkit-backdrop-filter: blur(12px); 
          display: flex; 
          flex-direction: column; 
          padding: 6em 2em 2em 2em; 
          overflow-y: auto; 
          z-index: 10; 
          transform: translateX(100%); 
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); 
          border-left: 1px solid var(--color-border);
        }
        .sm-scope [data-position='left'] .staggered-menu-panel { 
          right: auto; 
          left: 0; 
          transform: translateX(-100%); 
          border-left: none;
          border-right: 1px solid var(--color-border);
        }
        .sm-scope [data-open] .staggered-menu-panel { transform: translateX(0); }

        .sm-scope .sm-prelayers { 
          position: absolute; 
          top: 0; 
          right: 0; 
          bottom: 0; 
          width: clamp(380px, 55vw, 680px); 
          pointer-events: none; 
          z-index: 5; 
          transform: translateX(100%); 
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; transform: translateX(-100%); }
        .sm-scope [data-open] .sm-prelayers { transform: translateX(0); }

        .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
        .sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--color-text-muted); }
        .sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
        
        .sm-scope .sm-socials-list .sm-socials-link { 
          opacity: 0; 
          transform: translateY(12px);
          transition: color 0.3s ease, opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .sm-scope [data-open] .sm-socials-link { 
          opacity: 1; 
          transform: translateY(0); 
        }
        
        .sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
        .sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
        .sm-scope .sm-socials-list .sm-socials-link:hover, .sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
        .sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--color-text); outline-offset: 3px; }
        .sm-scope .sm-socials-link { font-size: 0.95rem; font-weight: 500; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; }
        
        .sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .sm-scope .sm-panel-item { position: relative; font-family: 'Instrument Serif', Georgia, serif; font-weight: normal; font-style: italic; font-size: clamp(1.75rem, 3.2vw, 3rem); cursor: pointer; line-height: 1.35; color: var(--color-text-muted); letter-spacing: -0.01em; text-transform: capitalize; transition: color 0.25s; display: inline-block; text-decoration: none; padding-bottom: 0.25em; padding-right: 1.4em; }
        
        .sm-scope .sm-panel-itemLabel { 
          display: inline-block; 
          will-change: transform, opacity; 
          transform-origin: 50% 100%; 
          opacity: 0;
          transform: translateY(16px) rotate(1deg);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sm-scope [data-open] .sm-panel-itemLabel { 
          opacity: 1; 
          transform: translateY(0) rotate(0); 
        }

        .sm-scope .sm-panel-item:hover { color: var(--color-text); }
        
        @media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
        @media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; padding-top: 5em; border-left: none; border-right: none; } .sm-scope .sm-panel-item { font-size: 2.25rem; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
