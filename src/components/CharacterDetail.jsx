import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChampionDetails } from '../services/api';

const CharacterDetail = () => {
    const { championId } = useParams();
    const [champion, setChampion] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate(); // navigate 훅을 사용하여 페이지 이동

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

    const handleCardClick = () => {
        setIsFlipped(!isFlipped); // 클릭 시 카드 회전 상태 토글
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    if (!champion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <div className="absolute top-4 left-4">
                {/* 뒤로가기 버튼 (화살표 아이콘 사용) */}
                <i onClick={handleGoBack} className="fas fa-arrow-left mr-2 text-3xl"></i> {/* 화살표 아이콘 */}
            </div>
            <div className="card-container">
                <div
                    className={`card ${isFlipped ? 'flipped' : ''}`}
                    onClick={handleCardClick}
                >
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
                        <div className="text-center">
                            <button className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none">
                                CLICK!
                            </button>
                        </div>
                    </div>
                    <div className="card-back">
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {champion.blurb}
                        </p>
                        <div className="text-center">
                            <button className="px-4 py-2 mt-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none">
                                CLICK!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
