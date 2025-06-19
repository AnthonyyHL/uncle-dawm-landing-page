const Images = {
    home_img: "right-image",
    bathroom_img: "bathroom-ceramics",
    kitchen_img: "kitchen-ceramics",
    tiles_img: "tiles",
    stones_img: "natural-stones"
}

async function getApiKey() {
    return import.meta.env.VITE_PEXELS_API_KEY;
}

async function getImage(topic, index = 0) {
    const apiKey = await getApiKey();

    try {
        const request = await fetch(`https://api.pexels.com/v1/search?query=${topic}`, {
            headers: {
                Authorization: apiKey
            }
        });

        const response = await request.json();
        const imageURL = response["photos"][index]["src"]["large"];
        return imageURL;
    } catch (error) {
        console.error('Error: ', error);
    }
}

(async () => {
    const home_img = document.querySelector(`#${Images.home_img} img`);
    home_img.src = await getImage("home interior")

    const bathroom_img = document.querySelector(`#${Images.bathroom_img} img`);
    bathroom_img.src = await getImage("bathroom ceramics")
    
    const kitchen_img = document.querySelector(`#${Images.kitchen_img} img`);
    kitchen_img.src = await getImage("kitchen")

    const tiles_img = document.querySelector(`#${Images.tiles_img} img`);
    tiles_img.src = await getImage("tiles")
    
    const stones_img = document.querySelector(`#${Images.stones_img} img`);
    stones_img.src = await getImage("marmol ceramic floor", 3)
})();