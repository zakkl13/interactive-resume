import '@/styles/tailwind.css'
import {useEffect, useState} from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    const [render, setRender] = useState(false);
    useEffect(() => setRender(true), []);
    return render ? <div className="font-mono"><Component {...pageProps} /><Analytics /></div> : null;
}
