import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'AARA Logistics — Time Is Money, We Deliver It',
  description: 'AARA Logistics — FTL, LTL, warehousing, 3PL management, value-added services and shipment visibility across India.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
