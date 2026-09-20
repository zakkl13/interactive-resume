import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';


export default function App({ Component, pageProps, router }) {
    const usesWebFonts = router.pathname.startsWith('/writing') || router.pathname === '/resume';
    return <>
        {usesWebFonts && <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {/* Fonts are intentionally scoped to writing/resume; the homepage uses system fonts. */}
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700;800&family=JetBrains+Mono:wght@500&display=swap" />
        </Head>}
        <div className="font-mono"><Component {...pageProps} /><Analytics /></div>
    </>;
}
