import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionPage from '@/components/SolutionPage';

const solutions = {
  'first-mile': {
    slug: 'first-mile', index: '01', eyebrow: 'FIRST MILE', title: 'START STRONG.',
    lead: 'Origin pickup, supplier coordination and clean shipment handoffs — the first mile sets the pace for everything after it.',
    description: 'A controlled handoff from origin to the transport network.',
    lanes: ['Supplier pickup', 'Origin consolidation', 'Pickup scheduling', 'Scan & handoff', 'Dock coordination'],
    stats: [['01', 'Pickup control'], ['02', 'Origin visibility'], ['24/7', 'Shipment status'], ['PAN', 'Network ready']],
    steps: [
      { n:'01', title:'Plan the pickup', body:'Align pickup windows, origin details and shipment requirements before the vehicle arrives.' },
      { n:'02', title:'Collect & verify', body:'Move freight from supplier or origin point with practical checks and clear handoff records.' },
      { n:'03', title:'Prepare the next mile', body:'Consolidate, stage and hand off cargo so the middle-mile movement starts without friction.' },
      { n:'04', title:'Keep it visible', body:'Share status across the flow so customers and operations teams know what is moving.' },
    ],
    features: ['Origin control', 'Flexible pickup windows', 'Shipment handoff visibility', 'Consolidation support'],
  },
  'middle-mile': {
    slug: 'middle-mile', index: '02', eyebrow: 'MIDDLE MILE', title: 'CONNECT THE NODES.',
    lead: 'Linehaul, consolidation and hub-to-hub movement designed to keep long-distance freight flowing on dependable lanes.',
    description: 'A dependable bridge between origin hubs, distribution points and last-mile networks.',
    lanes: ['Linehaul', 'FTL', 'LTL', 'Hub-to-hub', 'Cross-dock'],
    stats: [['FTL', 'Dedicated movement'], ['LTL', 'Consolidated loads'], ['24/7', 'Status visibility'], ['4+', 'South India lanes']],
    steps: [
      { n:'01', title:'Consolidate', body:'Group the right loads and prepare them for efficient hub-to-hub movement.' },
      { n:'02', title:'Load & linehaul', body:'Use appropriate truck capacity and routing across the planned middle-mile lane.' },
      { n:'03', title:'Hub handoff', body:'Coordinate unloading, cross-dock and onward allocation at the destination node.' },
      { n:'04', title:'Release to last mile', body:'Keep the last-mile team aligned on arrival, volume and delivery priorities.' },
    ],
    features: ['Premium linehaul lanes', 'FTL / LTL flexibility', 'Hub coordination', 'Consolidation discipline'],
  },
  'last-mile': {
    slug: 'last-mile', index: '03', eyebrow: 'LAST MILE', title: 'FINISH WITH PRECISION.',
    lead: 'Local dispatch, delivery execution and customer visibility — the last mile turns a transport plan into a delivered experience.',
    description: 'Move from hub to doorstep with clearer dispatch control and delivery visibility.',
    lanes: ['Hub dispatch', 'Route planning', 'Delivery execution', 'Proof of delivery', 'Exception support'],
    stats: [['99.5%', 'On-time delivery'], ['24/7', 'Support'], ['12+', 'Service cities'], ['PAN', 'Coverage']],
    steps: [
      { n:'01', title:'Receive & sort', body:'Prepare inbound shipments at the destination hub for the right delivery sequence.' },
      { n:'02', title:'Route & dispatch', body:'Assign movement based on destination, timing and operational priorities.' },
      { n:'03', title:'Deliver', body:'Execute the final movement with responsive support for delivery exceptions.' },
      { n:'04', title:'Close the loop', body:'Capture delivery status and feed the outcome back into the shipment record.' },
    ],
    features: ['Dispatch control', 'Delivery visibility', 'Exception handling', 'Customer support'],
  },
  'quick-commerce': {
    slug: 'quick-commerce', index: '04', eyebrow: 'QUICK COMMERCE', title: 'SPEED, CLOSE TO DEMAND.',
    lead: 'Fast urban fulfillment supported by micro-fulfillment thinking, dark-store workflows and tightly coordinated last-mile dispatch.',
    description: 'Bring inventory, picking and dispatch closer to the customer journey.',
    lanes: ['Dark stores', 'Micro-fulfillment', 'Fast picking', 'Rider dispatch', 'Urban delivery'],
    stats: [['15+', 'Urban-ready hubs'], ['360°', 'Operational visibility'], ['24/7', 'Monitoring'], ['Q-C', 'Fast dispatch focus']],
    steps: [
      { n:'01', title:'Position inventory', body:'Keep fast-moving inventory closer to demand centers so travel time is reduced.' },
      { n:'02', title:'Pick quickly', body:'Organize compact storage and picking workflows around order velocity.' },
      { n:'03', title:'Stage the order', body:'Move completed orders into a clear rider or delivery dispatch sequence.' },
      { n:'04', title:'Deliver fast', body:'Connect the fulfillment point to local routes with responsive exception support.' },
    ],
    features: ['Dark-store workflows', 'Micro-fulfillment logic', 'Fast picking zones', 'Urban dispatch'],
  },
  'warehouse-solutions': {
    slug: 'warehouse-solutions', index: '05', eyebrow: 'WAREHOUSE SOLUTIONS', title: 'STORE. STAGE. MOVE.',
    lead: 'Modern warehouse operations with efficient storage management, visibility and automation-ready workflows.',
    description: 'Build the warehouse around inventory accuracy, operational flow and scalable movement.',
    lanes: ['Storage', 'Inventory management', 'Climate control', '24/7 monitoring', 'Automation-ready'],
    stats: [['24/7', 'Monitoring'], ['360°', 'Operational view'], ['WMS', 'Workflow ready'], ['END', 'To-end support']],
    steps: [
      { n:'01', title:'Receive', body:'Plan inbound slots, receiving and handoff processes with clear inventory records.' },
      { n:'02', title:'Store', body:'Use efficient storage locations and handling rules suited to the inventory profile.' },
      { n:'03', title:'Stage & pick', body:'Prepare outbound inventory with clear picking, packing and staging zones.' },
      { n:'04', title:'Dispatch', body:'Connect warehouse output to linehaul, last-mile and quick-commerce flows.' },
    ],
    features: ['Storage management', 'Inventory visibility', 'Value-added handling', 'Automation-ready design'],
  }
} as const;

export function generateStaticParams() {
  return Object.keys(solutions).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions[slug as keyof typeof solutions];
  if (!solution) return {};
  return { title: `${solution.title} — AARA Logistics`, description: solution.lead };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions[slug as keyof typeof solutions];
  if (!solution) notFound();
  return <SolutionPage solution={solution} />;
}
