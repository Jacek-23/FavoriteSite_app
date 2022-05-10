//RandomMeme
const randomMeme = {
    contentPreload: document.getElementById("content-preload"),
    content: document.getElementById("content"),
    text: document.getElementById("text"),

    init: function() {
        console.log("app started!");
        this.getContent();

        this.buttom = document.getElementById("next-meme");
            this.buttom.addEventListener("click", (e) => {
                console.log("click");
                this.getContent();
                        addEventListener("keyup", (e) => {
                    if(e.code == "Space") {
                        this.getContent();  
                    }
                });
            },
        )
    },

    getContent: async function() {
        const apiUrl = "https://some-random-api.ml/meme";
        const respanse = await fetch(apiUrl);
        const data = await respanse.json();

        this.preloadMeme(data);
    },

    preloadMeme: function(data) {
        const imgSrc = data.image;
        const caption = data.caption;

        this.contentPreload.src = imgSrc;
        this.contentPreload.onerror = () => {
            console.log("img load error");
            this.getContent();
        }

        this.contentPreload.onload = () => {
            this.showMeme(data);
        }
        //this.showMeme(data);
    },

    showMeme: function(data) {
        console.log(data);
        const imgSrc = data.image;
        const caption = data.caption;

        this.content.src = imgSrc;
        this.text.innerHTML = caption;
    }
};

randomMeme.init();