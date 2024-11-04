// src/components/CharacterList.js
import React from 'react';
import CharacterCard from './CharacterCard';

function CharacterList({ characters, version }) {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} version={version} />
      ))}
    </div>
  );
}

export default CharacterList;