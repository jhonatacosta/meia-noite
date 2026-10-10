import { Anton, IBM_Plex_Sans, IBM_Plex_Mono, Playfair_Display, Special_Elite, Caveat } from 'next/font/google';
import './globals.css';
import './meianoite.css';

const display = Anton({ weight: '400', subsets: ['latin'], variable: '--f-display' });
const sans = IBM_Plex_Sans({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--f-sans' });
const mono = IBM_Plex_Mono({ weight: ['400', '600'], subsets: ['latin'], variable: '--f-mono' });
const paper = Playfair_Display({ weight: ['700', '900'], subsets: ['latin'], variable: '--f-paper' });
const typed = Special_Elite({ weight: '400', subsets: ['latin'], variable: '--f-typed' });
const hand = Caveat({ weight: ['600'], subsets: ['latin'], variable: '--f-hand' });

export const metadata = {
  title: 'Meia-Noite',
  description: 'Um sequestro, sessenta minutos e dois celulares: jogo de investigação cooperativo.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0c0e11',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable} ${paper.variable} ${typed.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
