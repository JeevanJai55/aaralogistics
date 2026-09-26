'use client';

import { useEffect, useState } from 'react';

const links = [
  ['About', '/#about'],
  ['Solutions', '/#solutions'],
  ['Warehouse', '/services/warehouse-solutions'],
  ['Why AARA', '/#why-aara'],
  ['Coverage', '/#network'],
  ['Contact', '/#contact'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'navScrolled' : ''}`}>
      <div className="navInner">
        <a href="/#top" className="brand" onClick={() => setOpen(false)}><span className="brandMark" /> AARA <span>LOGISTICS</span></a>
        <nav className="navLinks">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="navActions">
          <a className="navCta" href="/#contact">Get a quote <span>↗</span></a>
          <button className={`menuButton ${open ? 'isOpen' : ''}`} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>
            <span /><span />
          </button>
        </div>
      </div>
      <div className={`mobileMenu ${open ? 'open' : ''}`}>
        {links.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}</a>)}
        <a className="mobileMenuCta" href="/#contact" onClick={() => setOpen(false)}>Request a quote ↗</a>
      </div>
    </header>
  );
}
