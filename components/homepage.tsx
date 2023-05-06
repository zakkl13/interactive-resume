import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HomeData } from '../data/homeData';

interface HomePageProps {
    data: HomeData;
}


const HomePage: React.FC<HomePageProps> = ({ data }) => {
    const [animatedTitle, setAnimatedTitle] = useState('');
    const fullTitle = data.intro;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedTitle(fullTitle.slice(0, animatedTitle.length + 1));
        }, 125);
        return () => clearTimeout(timeout);
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-yellow-200 to-yellow-500">
            {/* Title and animation */}
            <h1 className={`text-6xl font-bold text-black text-center mb-12 ${animatedTitle.length < fullTitle.length ? "blinking-cursor" : ""}`}>{animatedTitle}</h1>

            <div className="bg-white rounded-lg p-8 w-full md:w-3/4 mb-4">
                    <h2 className="text-4xl font-semibold mb-4">Quick Links</h2>
                    <ul className="md:flex md:items-center place-content-evenly space-y-2">
                        <li>
                            <Link className="text-2xl text-blue-600" href={data.resume}>
                                Resume
                            </Link>
                        </li>
                        <li>
                            <a
                                className="text-2xl text-blue-600"
                                href={data.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-2xl text-blue-600"
                                href={data.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-2xl text-blue-600"
                                href={data.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                        </li>
                    </ul>
                </div>

                {/* About section */}
                <div className="bg-white rounded-lg p-8 w-full md:w-3/4 mb-10 col-span-2">
                    <h2 className="text-4xl font-semibold mb-4">About</h2>
                    <div className="md:flex md:items-center mb-2">
                        <Image key="profilePhoto" className="mr-4" alt="profile pic" width={200} height={200} src={data.profilePhoto}></Image>
                        <p className="text-lg leading-relaxed">{data.about}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1">
                        {data.photos.map((photo, index) => (
                            <Image key={index} src={photo} alt={`Hobby ${index + 1}`} width={200} height={200} />
                        ))}
                    </div>
                </div>

                {/* Professional section */}
            </div>





    );
};

export default HomePage;