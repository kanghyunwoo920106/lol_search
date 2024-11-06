// src/components/ChampionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetail = () => {
    const { championId } = useParams();
    const [champion, setChampion] = useState(null);
    const API_KEY = 'RGAPI-48068de1-8b45-40ef-a63f-3f79896be1fb'

    useEffect(() => {
        const fetchChampionDetail = async () => {
            const API_URL = `/api/fetchChampionDetail?championId=${championId}`; // Vercel의 API 엔드포인트로 변경
    
            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Riot-Token': API_KEY
                    }
                });
                const data = await response.json();
                setChampion(data.data[championId]);
            } catch (error) {
                console.error("Failed to fetch champion detail:", error);
            }
        };
    
        fetchChampionDetail();
    }, [championId]);

    if (!champion) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{champion.name}</h1>
            <img src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${champion.id}.png`} alt={champion.name} />
            <p>{champion.blurb}</p>
            {/* 추가적인 챔피언 정보를 여기서 보여줄 수 있습니다. */}
        </div>
    );
};

export default CharacterDetail;