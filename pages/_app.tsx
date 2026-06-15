import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }) {
    return <div className="font-mono"><Component {...pageProps} /><Analytics /></div>;
}
