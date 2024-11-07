import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true); // 검색바 표시 여부
  const [lastScrollY, setLastScrollY] = useState(window.scrollY); // 마지막 스크롤 위치

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false); // 아래로 스크롤 시 검색바 숨김
      } else if (window.scrollY < lastScrollY) {
        setIsVisible(true); // 위로 스크롤 시 검색바 표시
      }
      setLastScrollY(window.scrollY); // 현재 스크롤 위치 저장
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`search-bar transition-transform duration-300 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="챔피언 이름을 검색하세요"
        className="w-full"
      />
    </div>
  );
}

export default SearchBar;
