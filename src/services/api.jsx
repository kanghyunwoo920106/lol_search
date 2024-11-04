export const fetchCharacters = async (searchTerm) => {
    try {
      const response = await fetch(`https://example-api.com/lol/characters?search=${searchTerm}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching characters:", error);
      return [];
    }
  };

export const fetchChampions = async () => {
    const version = "13.20.1"; // 패치 버전
    const language = "ko_KR";   // 언어 설정
  
    try {
      const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
      const data = await response.json();
      return Object.values(data.data); // 챔피언 목록을 배열 형태로 반환
    } catch (error) {
      console.error("Error fetching champion data:", error);
      return [];
    }
  };

  // src/services/api.js
export const fetchChampionDetails = async (championId) => {
  const version = "13.20.1";
  const language = "ko_KR";

  try {
    const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${championId}.json`);
    const data = await response.json();
    return data.data[championId]; // 특정 챔피언 상세 정보 반환
  } catch (error) {
    console.error("Error fetching champion details:", error);
    return null;
  }
};