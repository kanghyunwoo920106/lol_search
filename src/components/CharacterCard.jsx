// src/components/CharacterCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CharacterCard({ character, version }) {
    const navigate = useNavigate();
    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${character.id}.png`;

    const handleClick = () => {
        navigate(`/champion/${character.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="character-card cursor-pointer transition-transform transform hover:scale-105 border border-gray-300 rounded-lg overflow-hidden shadow-md"
        >
            <div className="relative w-full h-56">
                <img
                    src={imageUrl}
                    alt={character.name}
                    className="object-contain w-full h-full"
                />
            </div>
            <h2 className="mt-2 text-xl font-bold text-center">
                {character.name}
            </h2>
            <p className="text-gray-500 text-center">{character.description}</p>
        </div>
    );
}

export default CharacterCard;
