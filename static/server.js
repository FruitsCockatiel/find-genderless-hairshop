require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // 모든 도메인에서 API 사용 가능
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.get("/search", async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: "쿼리 문자열이 필요합니다." });
    }

    try {
        const response = await axios.get(`https://openapi.naver.com/v1/search/local.json`, {
            headers: {
                "X-Naver-Client-Id": CLIENT_ID,
                "X-Naver-Client-Secret": CLIENT_SECRET,
            },
            params: { query, display: 10 },
        });

        res.json(response.data);
    } catch (error) {
        console.error("네이버 API 요청 실패:", error);
        res.status(500).json({ error: "API 요청 중 오류 발생" });
    }
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
