'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import Nav from '@/components/Nav';
import ScrollController from '@/components/ScrollController';
import WarehouseRobotics from '@/components/WarehouseRobotics';

const LogisticsScene = dynamic(() => import('@/components/LogisticsScene'), { ssr: false });

type Solution = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  lanes: readonly string[];
  stats: readonly (readonly [string, string])[];
  steps: readonly { n: string; title: string; body: string }[];
  features: readonly string[];
};

export default function SolutionPage({ solution }: { solution: Solution }) {
  const [progress, setProgress] = useState(.1);
  const onProgress = useCallback((v: number) => setProgress(v), []);

  return (
    <>
      <ScrollController onProgress={onProgress} />
      <Nav />
      <div className="noise" />
      <main className="solutionPage">
        <section className="solutionHero">
          <div className="solutionVisual"><LogisticsScene progress={progress} mode="network" /></div>
          <div className="solutionVignette" />
          <div className="container solutionHeroInner">
            <div className="solutionMeta"><span>{solution.index} / AARA SOLUTIONS</span><span>{solution.eyebrow}</span></div>
            <h1>{solution.title}</h1>
            <p>{solution.lead}</p>
            <div className="solutionHeroActions"><a className="heroAction" href="/#contact">Talk to AARA <span>↗</span></a><a className="textLink" href="/#solutions">View all solutions ↘</a></div>
          </div>
          <div className="solutionRoute"><span>ORIGIN</span><i /><span>{solution.slug === 'first-mile' ? 'HUB' : solution.slug === 'last-mile' ? 'DOOR' : solution.slug === 'quick-commerce' ? 'CUSTOMER' : 'NODE'}</span></div>
        </section>

        <section className="solutionIntro paperSection">
          <div className="container solutionIntroGrid">
            <div><div className="sectionLabel">WHAT WE SOLVE</div><h2>{solution.description}</h2></div>
            <div><p className="largeBody">AARA combines operational control, transparent handoffs and practical technology so every mile is treated as one connected flow.</p><div className="laneCloud">{solution.lanes.map((lane) => <span key={lane}>{lane}</span>)}</div></div>
          </div>
        </section>

        <section className="solutionSteps darkSection">
          <div className="container">
            <div className="sectionTop"><div className="sectionLabel">HOW IT WORKS</div><div className="sectionLabel">{solution.eyebrow}</div></div>
            <div className="solutionStepsGrid">
              {solution.steps.map((step) => <article key={step.n} data-reveal><span>{step.n}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="solutionStats paperSection">
          <div className="container">
            <div className="sectionLabel">OPERATING FOCUS</div>
            <div className="solutionStatsGrid">{solution.stats.map(([value, label]) => <div key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>)}</div>
          </div>
        </section>

        <section className="solutionFeatureSection">
          <div className="container">
            <div className="sectionTop"><div className="sectionLabel">AARA DIFFERENCE</div><div className="sectionLabel">BUILT AROUND CONTROL</div></div>
            <div className="featurePanels">
              {solution.features.map((feature, idx) => <article key={feature} data-reveal><span>0{idx + 1}</span><h3>{feature}</h3><p>Clear process ownership, measurable handoffs and responsive support make the service easier to operate at scale.</p></article>)}
            </div>
          </div>
        </section>

        {solution.slug === 'warehouse-solutions' && <WarehouseRobotics />}

        <section className="solutionCta">
          <div className="container solutionCtaInner"><span className="sectionLabel">READY WHEN YOU ARE</span><h2>MOVE THE <em>NEXT STEP.</em></h2><a className="darkButton" href="/#contact">Start a conversation ↗</a></div>
        </section>
      </main>
      <footer className="footer"><div className="container footerInner"><span>© 2026 AARA LOGISTICS</span><span>BANGALORE · KARNATAKA · INDIA</span><a href="mailto:support@aaralogistics.com">SUPPORT@AARALOGISTICS.COM</a></div></footer>
    </>
  );
}
