'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function RobotCard({ type, label, title, body }: { type: string; label: string; title: string; body: string }) {
  return (
    <article className="robotCard" data-reveal>
      <div className={`robotVisual robotVisual-${type}`} aria-hidden="true">
        <div className="rack r1" /><div className="rack r2" /><div className="rack r3" />
        {type === 'amr' && <div className="amr"><div className="amrTop" /><div className="amrWheel w1" /><div className="amrWheel w2" /><div className="amrLight" /></div>}
        {type === 'arm' && <div className="robotArm"><div className="armBase" /><div className="joint j1" /><div className="joint j2" /><div className="arm1" /><div className="arm2" /><div className="gripper" /></div>}
        {type === 'human' && <><div className="human"><div className="head" /><div className="body" /><div className="leg l1" /><div className="leg l2" /><div className="arm a1" /><div className="arm a2" /></div><div className="cobotMini"><div className="cb" /><div className="cj c1" /><div className="cj c2" /></div></>}
      </div>
      <div className="robotCopy"><span>{label}</span><h3>{title}</h3><p>{body}</p></div>
    </article>
  );
}

export default function WarehouseRobotics() {
  const section = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = section.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to('.warehouseRobotGrid', { yPercent: -4, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1.4 } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="warehouseAutomationSection">
      <div className="container">
        <div className="sectionTop" data-reveal>
          <div className="sectionLabel">WAREHOUSE SOLUTIONS / AUTOMATION</div>
          <h2 className="sectionTitle">PEOPLE + <em>MACHINES.</em></h2>
        </div>
        <div className="warehouseIntro" data-reveal>
          <p>Design your warehouse around faster movement, better visibility and automation-ready workflows. The visual system below shows the kinds of robotic and human-machine zones that can sit inside a modern logistics operation.</p>
          <div className="automationBadge"><span>01</span> AUTOMATION-READY</div>
        </div>
        <div className="warehouseRobotGrid">
          <RobotCard type="amr" label="AMR / MOVEMENT" title="Autonomous mobile movement" body="Small robotic carriers move bins or totes between storage and workstations, reducing non-value-added walking inside the facility." />
          <RobotCard type="arm" label="ROBOTIC PICKING" title="Assisted picking cells" body="Robotic arms can support repetitive pick, place and sort tasks alongside operators, with clear handoff points and safety zones." />
          <RobotCard type="human" label="HUMAN + ROBOT" title="Collaborative workstations" body="Humans stay focused on decisions, checks and exception handling while machines handle predictable material movement." />
        </div>
      </div>
    </section>
  );
}
