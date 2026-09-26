'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollController({ onProgress }: { onProgress: (value: number) => void }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const hero = document.querySelector('#hero');
      if (hero) {
        ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onUpdate: self => onProgress(self.progress) });
        const heroTl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
        heroTl.to('#hero-copy', { y: 190, opacity: .25, ease: 'none' }, 0);
        heroTl.to('#hero-word-1', { xPercent: -12, ease: 'none' }, 0);
        heroTl.to('#hero-word-2', { xPercent: 9, ease: 'none' }, 0);
        heroTl.to('#hero-word-3', { xPercent: -7, ease: 'none' }, 0);
        heroTl.to('#hero-visual', { scale: 1.18, yPercent: 8, ease: 'none' }, 0);
        heroTl.to('#hero-overlay', { opacity: .42, ease: 'none' }, 0);
      }

      const solutionHero = document.querySelector('.solutionHero');
      if (solutionHero) {
        ScrollTrigger.create({
          trigger: solutionHero,
          start: 'top top',
          end: 'bottom top',
          onUpdate: self => onProgress(self.progress),
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' } });
      });

      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      const route = document.querySelector('#route-section');
      if (route && document.querySelector('#route-panel')) {
        gsap.fromTo('#route-panel', { scale: .88, rotateX: 8, opacity: .55 }, { scale: 1, rotateX: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: route, start: 'top 80%', end: 'center 45%', scrub: 1 } });
        ScrollTrigger.create({ trigger: route, start: 'top bottom', end: 'bottom top', onUpdate: self => onProgress(Math.max(0, Math.min(1, self.progress))) });
      }
    });

    return () => ctx.revert();
  }, [onProgress]);

  return null;
}
