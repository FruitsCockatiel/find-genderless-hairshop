document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location");
    
    if (!location) {
        document.getElementById("resultText").innerText = "잘못된 접근입니다.";
        return;
    }

    document.getElementById("resultText").innerText = `"${location}" 지역에서 미용실을 검색 중..."`;

    const apiUrl = `http://localhost:3000/search?query=${encodeURIComponent(location + " 미용실")}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const shops = data.items;
            if (!shops || shops.length === 0) {
                document.getElementById("resultText").innerText = "검색된 미용실이 없습니다.";
                return;
            }

            const filteredShops = shops.filter(shop => {
                return !shop.title.includes("남성") && !shop.title.includes("여성") && !shop.title.includes("이발");
            });

            const resultList = document.getElementById("resultList");
            resultList.innerHTML = "";

            if (filteredShops.length === 0) {
                document.getElementById("resultText").innerText = "남녀 구분 없는 미용실을 찾지 못했습니다.";
                return;
            }

            filteredShops.forEach(shop => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${shop.link}" target="_blank">${shop.title}</a> - ${shop.address}`;
                resultList.appendChild(listItem);
            });

            document.getElementById("resultText").innerText = `"${location}" 지역에서 남녀 구분 없는 미용실 ${filteredShops.length}곳을 찾았습니다.`;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("resultText").innerText = "데이터를 불러오는 중 오류가 발생했습니다.";
        });
});
