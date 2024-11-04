import React from 'react';
import { Link } from 'react-router-dom';

function CharacterCard({character, version}) {
    console.log(character);
    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${character.id}.png`;

    return (
        <div className='character-card'>
            <Link to={`/champion/${character.key}`}>
                <img src={imageUrl} alt={character.name} className='character-image' />
                <h2>{character.name}</h2>
                <p>{character.description}</p>
            </Link>
        </div>
    )
}

export default CharacterCard;