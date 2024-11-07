// src/pages/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';
import { fetchChampions } from '../services/api';

function Home() {
    const [characters, setCharacters] = useState([]); // Store all champions (for initial data load)
    const [displayedCharacters, setDisplayedCharacters] = useState([]); // Store currently displayed champions (for infinite scroll)
    const [searchTerm, setSearchTerm] = useState(''); // For searching champions
    const [loading, setLoading] = useState(false); // To track if more data is being loaded
    const [hasMore, setHasMore] = useState(true); // To track if more champions are available to load

    const version = '13.20.1';
    const ITEMS_PER_PAGE = 10; // Number of items to load at once

    // Fetch all champions (initial load)
    useEffect(() => {
        const loadChampions = async () => {
            try {
                let data;
                if (process.env.NODE_ENV === 'production') {
                    // Vercel에서는 서버리스 함수 호출
                    const API_URL = `/api/fetchChampions`;
                    const response = await fetch(API_URL, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const responseData = await response;
                    // data를 배열로 변환

                    data = responseData.data;
                } else {
                    // 로컬에서는 services/api.js의 함수 호출
                    data = await fetchChampions();
                }

                setCharacters(data); // 모든 챔피언 데이터를 저장
                setDisplayedCharacters(data.slice(0, ITEMS_PER_PAGE)); // 첫 번째 페이지의 데이터만 화면에 표시
            } catch (error) {
                console.error('Failed to fetch champion detail:', error);
            }
        };
        loadChampions();
    }, []);

    // Infinite scroll handler
    const loadMoreCharacters = useCallback(() => {
        if (loading || !hasMore) return; // Prevent loading if already loading or no more data

        setLoading(true);
        const nextIndex = displayedCharacters.length;
        const newCharacters = characters.slice(
            nextIndex,
            nextIndex + ITEMS_PER_PAGE
        );

        if (newCharacters.length > 0) {
            setDisplayedCharacters((prev) => [...prev, ...newCharacters]); // 기존 데이터에 새로운 데이터 추가
        } else {
            setHasMore(false); // 더 이상 불러올 데이터가 없으면 종료
        }

        setLoading(false);
    }, [loading, characters, displayedCharacters, hasMore]);

    // Listen to scroll events
    useEffect(() => {
        const onScroll = () => {
            const bottom =
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight;
            if (bottom) {
                loadMoreCharacters(); // 스크롤이 맨 아래에 도달하면 더 많은 챔피언을 불러옴
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [loadMoreCharacters]);

    // Update search term
    useEffect(() => {
        setDisplayedCharacters(
            characters
                .filter((champion) =>
                    champion.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
                .slice(0, ITEMS_PER_PAGE) // 검색어가 입력될 때마다 필터링 후 첫 페이지만 표시
        );
    }, [searchTerm, characters]);

    const handleSearch = (term) => {
        setSearchTerm(term); // 검색어 업데이트
    };

    return (
        <div className="home">
            <SearchBar onSearch={handleSearch} />
            <CharacterList characters={displayedCharacters} version={version} />
            {loading && (
                <div className="text-center py-4">
                    Loading more champions...
                </div>
            )}
            {!hasMore && (
                <div className="text-center py-4">
                    No more champions to load.
                </div>
            )}
        </div>
    );
}

export default Home;
