// src/components/CharacterList.js
import React from 'react';
import CharacterCard from './CharacterCard';

function CharacterList({ characters, version }) {
    return (
        <div className="character-list space-y-4">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="w-full sm:w-80 md:w-64 lg:w-56 xl:w-72 mx-auto"
                >
                    <CharacterCard character={character} version={version} />
                </div>
            ))}
        </div>
    );
}

export default CharacterList;
