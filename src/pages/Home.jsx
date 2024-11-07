import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';
import { fetchChampions } from '../services/api';

function Home() {
    const [characters, setCharacters] = useState([]);
    const [displayedCharacters, setDisplayedCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const version = '13.20.1';
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const loadChampions = async () => {
            try {
                let data;
                if (process.env.NODE_ENV === 'production') {
                    const API_URL = `/api/fetchChampions`;
                    const response = await fetch(API_URL, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const responseData = await response.json();
                    data = Object.values(responseData.data);
                } else {
                    data = await fetchChampions();
                }

                setCharacters(data);
                setDisplayedCharacters(data.slice(0, ITEMS_PER_PAGE));
            } catch (error) {
                console.error('Failed to fetch champion detail:', error);
            }
        };
        loadChampions();
    }, []);

    const loadMoreCharacters = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextIndex = displayedCharacters.length;
        const newCharacters = characters.slice(
            nextIndex,
            nextIndex + ITEMS_PER_PAGE
        );

        if (newCharacters.length > 0) {
            setDisplayedCharacters((prev) => [...prev, ...newCharacters]);
        } else {
            setHasMore(false);
        }

        setLoading(false);
    }, [loading, characters, displayedCharacters, hasMore]);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            const isBottom = window.innerHeight + scrollTop >= document.documentElement.offsetHeight - 10;

            if (isBottom && !loading) {
                loadMoreCharacters();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [loadMoreCharacters, loading]);

    useEffect(() => {
        setDisplayedCharacters(
            characters
                .filter((champion) =>
                    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, ITEMS_PER_PAGE)
        );
    }, [searchTerm, characters]);

    const handleSearch = (term) => {
        setSearchTerm(term);
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
