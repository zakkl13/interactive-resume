import '@/styles/tailwind.css'
import {useEffect, useState} from 'react';
import { Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }) {
    const [render, setRender] = useState(false);
    useEffect(() => setRender(true), []);
    return render ? <div className="font-mono"><Component {...pageProps} /><Analytics /></div> : null;
}
