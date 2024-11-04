import React from 'react';

function CharacterCard({character, version}) {
    console.log(character);
    const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${character.id}.png`;

    return (
        <div className='character-card'>
            <img src={imageUrl} alt={character.name} className='character-image' />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
        </div>
    )
}

export default CharacterCard;