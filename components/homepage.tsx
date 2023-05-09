import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { HomeData } from '../data/homeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Qotd from './qotd';

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

    const renderLink = (icon: IconDefinition, text: string, link: string, external: boolean = true) => {
        return (
            <li>
                <FontAwesomeIcon icon={icon} />
                {external ?
                    <a
                        className="text-2xl text-blue-600 ml-1"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {text}
                    </a> :
                    <Link
                        href={link}
                        className="text-2xl text-blue-600 ml-1"
                    >
                        {text}
                    </Link>
                }

            </li>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {/* Title and animation */}
            <h1 className={`text-4xl md:text-6xl font-bold dark:text-white text-black text-center mb-8 ${animatedTitle.length < fullTitle.length ? "blinking-cursor" : ""}`}>{animatedTitle}</h1>
            <Qotd />

            <div className="bg-white dark:bg-black  rounded-lg p-8 w-full md:w-3/4 mb-4">
                <h2 className="text-4xl font-semibold mb-4">Quick Links</h2>
                <ul className="flex-col flex md:flex-row md:items-center place-content-evenly">
                    {renderLink(faFile, "Resume", data.resume, false)}
                    {renderLink(faLinkedin, "LinkedIn", data.linkedin)}
                    {renderLink(faGithub, "GitHub", data.github)}
                    {renderLink(faTwitter, "Twitter", data.twitter)}
                </ul>
            </div>

            {/* About section */}
            <div className="bg-white dark:bg-black rounded-lg p-8 w-full md:w-3/4 mb-10 col-span-2">
                <h2 className="text-4xl font-semibold mb-4">About</h2>
                <div className="md:flex md:items-center mb-2 border-b pb-2">
                    <Image key="profilePhoto" className="mr-4" alt="profile pic" width={200} height={200} src={data.profilePhoto}></Image>
                    <p className="text-lg leading-relaxed">{data.about}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1">
                    {data.photos.map((photo, index) => (
                        <Image key={index} src={photo} alt={`Photo ${index + 1}`} width={200} height={200} />
                    ))}
                </div>
            </div>

        </div>





    );
};

export default HomePage;