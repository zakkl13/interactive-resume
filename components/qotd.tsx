import React, { useEffect, useState } from 'react';
import { QuoteOfTheDayResponse, Quote } from './model';

const Qotd: React.FC = () => {
    const [qotd, setQotd] = useState<Quote>({
        contents: "",
        author: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const output = await fetch("/api/qotd", { method: "GET" })
            .then(res => res.json())
            .then(jsn => {
                const qotdParsed: QuoteOfTheDayResponse = jsn;
                setQotd(qotdParsed.quote);
                setLoading(false);
            });
    }

    useEffect(() => {
        console.log("Fetching");
        fetchData();
    }, [])


    return (
        <div className="flex flex-col items-center mb-4 w-3/4 text-center">
            <div className="flex flex-col">
                <p className="text-xl">Quote of the Day</p>
                <p className="text-xs"> (powered by <a href="https://github.com/zakkl13/interactive-resume/blob/main/pages/api/qotd.ts" target="_blank">AI</a>)</p>
            </div>
            {loading ? 
                <div className="loading"></div> :
                <p><span className="italic">{qotd.contents}</span> - {qotd.author}</p>
            }

        </div>
    );
}

export default Qotd;