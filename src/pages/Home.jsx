// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';
import { fetchChampions } from '../services/api';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const version = "13.20.1";

  useEffect(() => {
    const loadChampions = async () => {
      const champs = await fetchChampions();
      setCharacters(champs);
      setFilteredCharacters(champs); // 초기 로드 시 전체 챔피언 목록
    };
    loadChampions();
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 필터링된 챔피언 목록 업데이트
    setFilteredCharacters(
      characters.filter((champion) =>
        champion.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, characters]);

  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어 업데이트
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      <CharacterList characters={filteredCharacters} version={version} />
    </div>
  );
}

export default Home;