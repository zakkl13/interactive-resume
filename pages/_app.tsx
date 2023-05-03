import '@/styles/tailwind.css'
import {useEffect, useState} from 'react';
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    const [render, setRender] = useState(false);
    useEffect(() => setRender(true), []);
    return render ? <Component {...pageProps} /> : null;
}
