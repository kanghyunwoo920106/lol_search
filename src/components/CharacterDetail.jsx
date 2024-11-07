import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChampionDetails } from '../services/api';

const CharacterDetail = () => {
    const { championId } = useParams();
    const [champion, setChampion] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const fetchChampionDetail = async () => {
            try {
                let data;
                if (process.env.NODE_ENV === 'production') {
                    const API_URL = `/api/fetchChampionDetail?championId=${championId}`;
                    const response = await fetch(API_URL, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const responseData = await response.json();
                    data = responseData.data[championId];
                } else {
                    data = await fetchChampionDetails(championId);
                }

                setChampion(data);
            } catch (error) {
                console.error('Failed to fetch champion detail:', error);
            }
        };

        fetchChampionDetail();
    }, [championId]);

    if (!champion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="card-container">
                <div className="card">
                    <div className="card-front">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            {champion.name}
                        </h1>
                        <p className="text-center text-gray-400 italic mb-4">
                            {champion.title}
                        </p>
                        <div className="flex justify-center mb-4">
                            {!isImageLoaded && (
                                <div className="w-48 h-48 flex items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${champion.id}.png`}
                                alt={champion.name}
                                className={`w-48 h-48 rounded-full shadow-md border-4 border-gray-700 ${
                                    isImageLoaded ? 'block' : 'hidden'
                                }`}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </div>
                    </div>
                    <div className="card-back">
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {champion.blurb}
                        </p>
                        <div className="text-center">
                            <button className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none">
                                More Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
