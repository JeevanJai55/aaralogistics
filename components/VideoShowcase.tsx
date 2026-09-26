'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.play().catch(() => setPlaying(false));
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };

  return (
    <section className="filmSection">
      <div className="container">
        <div className="sectionTop filmTop" data-reveal>
          <div className="sectionLabel">05 / THE AARA FLOW</div>
          <div className="sectionLabel">ONE MOVEMENT. MULTIPLE MILES.</div>
        </div>
        <div className="filmFrame" data-reveal>
          <div className="filmMeta filmMetaLeft"><span>LINEHAUL · HUB · LAST MILE</span><span>00:19</span></div>
          <video
            ref={videoRef}
            className="aaraFilm"
            src="/media/aara-logistics.mp4"
            poster="/media/aara-logistics-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="filmOverlay">
            <div className="filmTitle">FROM<br /><span>ORIGIN</span><br />TO DOOR.</div>
            <div className="filmRoute"><span>FM</span><i /><span>MM</span><i /><span>LM</span><i /><span>QC</span></div>
            <button className="filmPlay" type="button" onClick={toggle}>{playing ? 'Pause' : 'Play'} <span>↗</span></button>
          </div>
        </div>
        <div className="filmSteps">
          <article data-reveal><span>01</span><b>First Mile</b><p>Pickup, origin coordination and shipment handoff.</p></article>
          <article data-reveal><span>02</span><b>Middle Mile</b><p>Linehaul, consolidation and hub-to-hub movement.</p></article>
          <article data-reveal><span>03</span><b>Last Mile</b><p>Hub dispatch, route planning and delivery execution.</p></article>
          <article data-reveal><span>04</span><b>Quick Commerce</b><p>Dark-store fulfillment and fast urban dispatch.</p></article>
        </div>
      </div>
    </section>
  );
}
