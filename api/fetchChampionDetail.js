// api/fetchChampionDetail.js
export default async function handler(req, res) {
    const { championId } = req.query; // Query로 넘어온 챔피언 ID
    const API_URL = `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/champion/${championId}.json`;
    const API_KEY = 'RGAPI-48068de1-8b45-40ef-a63f-3f79896be1fb'

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Riot-Token': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch champion data: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data); // 성공적으로 응답을 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch champion detail" });
    }
}