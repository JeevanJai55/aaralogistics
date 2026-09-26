'use client';

import { FormEvent, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
import ScrollController from '@/components/ScrollController';
import VideoShowcase from '@/components/VideoShowcase';

const LogisticsScene = dynamic(() => import('@/components/LogisticsScene'), { ssr: false });

const solutions = [
  { no: '01', label: 'FIRST MILE', title: 'Origin control.', body: 'Pickup, supplier coordination and clean handoffs before freight enters the network.', href: '/services/first-mile' },
  { no: '02', label: 'MIDDLE MILE', title: 'Node-to-node.', body: 'Linehaul, consolidation and hub movement on dependable lanes.', href: '/services/middle-mile' },
  { no: '03', label: 'LAST MILE', title: 'Doorstep precision.', body: 'Hub dispatch, route planning and delivery visibility through the final leg.', href: '/services/last-mile' },
  { no: '04', label: 'QUICK COMMERCE', title: 'Closer to demand.', body: 'Dark-store and fast fulfillment workflows for dense urban markets.', href: '/services/quick-commerce' },
  { no: '05', label: 'WAREHOUSE SOLUTIONS', title: 'Store. Stage. Move.', body: 'Modern storage, inventory visibility and automation-ready operations.', href: '/services/warehouse-solutions' },
];

const cities = ['Bangalore','Hyderabad','Chennai','Coimbatore','Pune','Kolkata','Mumbai','Delhi','Ahmedabad','Jaipur','Kochi','Pan-India'];

const why = [
  ['01','Reliability','Consistent on-time performance with 99.5% delivery reliability. Your business depends on it.'],
  ['02','Scalability','Built to grow with you. From single shipments to enterprise-scale operations.'],
  ['03','Cost Efficiency','Optimized routes and operations mean better rates without compromising quality.'],
  ['04','Technology','Real-time tracking, automated reporting, and data-driven logistics solutions.'],
  ['05','Professional Team','Experienced logistics professionals dedicated to your supply chain success.'],
  ['06','Compliance','Full regulatory compliance, insurance coverage, and industry certifications.'],
];

export default function HomePage() {
  const [sceneProgress, setSceneProgress] = useState(.12);
  const [sent, setSent] = useState(false);
  const updateProgress = useCallback((v: number) => setSceneProgress(v), []);
  function submitQuote(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); }

  return (
    <>
      <ScrollController onProgress={updateProgress} />
      <Nav />
      <div className="noise" />
      <main id="top">
        <section id="hero" className="heroSection">
          <div className="heroGrid" />
          <div id="hero-overlay" className="heroOverlay" />
          <div className="heroVisual" id="hero-visual"><LogisticsScene progress={sceneProgress} /></div>
          <div className="heroVignette" />
          <div className="heroWrap">
            <div className="eyebrow"><span>FIRST MILE / MIDDLE MILE / LAST MILE / QUICK COMMERCE</span><span>SOUTH INDIA · PAN-INDIA COVERAGE</span></div>
            <div id="hero-copy" className="heroCopyBlock">
              <p className="kicker">01 / AARA LOGISTICS</p>
              <h1 className="heroTitle"><span id="hero-word-1">TIME</span><span id="hero-word-2" className="outline">IS</span><span id="hero-word-3">MONEY.</span></h1>
              <div className="heroSubtitle">WE DELIVER IT.</div>
              <div className="heroBottom"><p>Freight, fulfillment and warehouse support connected across the first, middle and last mile — with practical planning, transparent tracking and dependable execution.</p><a className="heroAction" href="#solutions">Explore solutions <span>↘</span></a></div>
            </div>
          </div>
          <div className="heroRail"><span>FM</span><i /><span>MM</span><i /><span>LM</span><i /><span>QC</span></div>
        </section>

        <section id="about" className="darkSection aboutSection">
          <div className="container">
            <div className="sectionTop" data-reveal><div className="sectionLabel">02 / ABOUT AARA</div><div className="sectionLabel">TIME IS MONEY, WE DELIVER IT.</div></div>
            <div className="aboutGrid" data-reveal>
              <div><p className="displayLead">Logistics built for <em>movement.</em> From dedicated linehaul operations to warehousing and 3PL, AARA Logistics helps businesses keep cargo moving with visibility at every step.</p><div className="manifesto" data-line><div><b>01</b><span>Reliable movement</span></div><div><b>02</b><span>Transparent visibility</span></div><div><b>03</b><span>End-to-end support</span></div></div></div>
              <div className="aboutCopy">AARA Logistics supports transport and warehouse operations with flexible shipment options, storage management and value-added handling. Our network is designed around real operational needs, from pickup and consolidation to final delivery.</div>
            </div>
          </div>
        </section>

        <section id="solutions" className="paperSection serviceSection">
          <div className="container">
            <div className="sectionTop" data-reveal><div className="sectionLabel">03 / OUR SOLUTIONS</div><h2 className="sectionTitle">FOUR MILES. <em>ONE FLOW.</em></h2></div>
            <p className="solutionsIntro" data-reveal>Explore the operating layer that fits your movement. Each category has its own dedicated page so the home page stays focused on the AARA story.</p>
            <div className="solutionCardGrid">
              {solutions.map((s, idx) => <a href={s.href} className="solutionCard" key={s.no} data-reveal style={{transitionDelay:`${idx*60}ms`}}><span className="solutionNo">{s.no}</span><span className="solutionLabel">{s.label}</span><h3>{s.title}</h3><p>{s.body}</p><span className="serviceArrow">↗</span><span className="solutionGlow" /></a>)}
            </div>
          </div>
        </section>

        <VideoShowcase />

        <section className="proofSection">
          <div className="container"><div className="sectionTop proofTop" data-reveal><div className="sectionLabel">06 / AARA BY THE NUMBERS</div><div className="sectionLabel">BUILT FOR BUSINESS MOVEMENT</div></div><div className="proofGrid">
            <div className="proofStat" data-reveal><strong>100+</strong><span>Happy Clients</span></div><div className="proofStat" data-reveal><strong>500K+</strong><span>Shipments Delivered</span></div><div className="proofStat" data-reveal><strong>99.5%</strong><span>On-Time Delivery</span></div><div className="proofStat" data-reveal><strong>24/7</strong><span>Customer Support</span></div>
          </div></div>
        </section>

        <section id="why-aara" className="whySection paperSection"><div className="container"><div className="sectionTop" data-reveal><div className="sectionLabel">07 / WHY CHOOSE AARA?</div><h2 className="sectionTitle">BUILT TO <em>MOVE YOUR BUSINESS.</em></h2></div><div className="whyGrid">{why.map(([no,title,body]) => <article key={no} data-reveal><span className="whyNo">{no}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

        <section id="network" className="networkSection"><div className="networkSticky" id="route-section"><div className="networkCanvas" id="route-panel"><LogisticsScene progress={Math.min(1, sceneProgress + .07)} mode="network" /></div><div className="networkCopy container"><div className="sectionLabel" data-reveal>08 / SERVICE COVERAGE</div><div className="networkHeadline" data-reveal><span>FROM SOUTH INDIA</span><em>TO PAN-INDIA.</em></div><p data-reveal>AARA Logistics covers key industrial and commercial markets across India, with a strong operating footprint in Bangalore, Hyderabad, Chennai and Coimbatore.</p><div className="coverageCloud" data-reveal>{cities.map(city => <span key={city}>{city}</span>)}</div></div></div></section>

        <section id="contact" className="contactSection"><div className="container"><div className="sectionTop" data-reveal><div className="sectionLabel">09 / GET IN TOUCH</div><div className="sectionLabel">AARA LOGISTICS</div></div><div className="contactGrid" data-reveal><div><h2>LET'S<br />MOVE.</h2><div className="contactTag">TIME IS MONEY, WE DELIVER IT.</div><div className="contactDetails"><a href="mailto:support@aaralogistics.com"><span>Email</span><strong>support@aaralogistics.com</strong></a><a href="tel:+919663377290"><span>Phone</span><strong>+91 9663377290</strong></a><div><span>Address</span><strong>Bangalore 560072<br />Karnataka, India</strong></div><div><span>Business Hours</span><strong>Monday - Saturday<br />9:00 AM - 6:00 PM</strong></div></div></div><div className="formWrap"><p>Share your pickup, destination and shipment requirements. We’ll use the details to understand the movement you need.</p><form onSubmit={submitQuote}><input aria-label="Name" placeholder="YOUR NAME" required /><input type="email" aria-label="Email" placeholder="EMAIL ADDRESS" required /><input aria-label="Phone" placeholder="PHONE NUMBER" /><select aria-label="Service" defaultValue=""><option value="" disabled>SELECT SOLUTION</option>{solutions.map(s => <option key={s.href}>{s.label}</option>)}</select><textarea aria-label="Shipment details" placeholder="ORIGIN / DESTINATION / SHIPMENT DETAILS" /><button type="submit" disabled={sent}>{sent ? 'REQUEST RECEIVED ✓' : 'REQUEST A QUOTE ↗'}</button></form></div></div></div></section>
      </main>
      <footer className="footer"><div className="container footerInner"><span>© 2026 AARA LOGISTICS</span><span>BANGALORE · KARNATAKA · INDIA</span><a href="mailto:support@aaralogistics.com">SUPPORT@AARALOGISTICS.COM</a></div></footer>
    </>
  );
}
