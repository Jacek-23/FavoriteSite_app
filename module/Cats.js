//Cats
window.onload = function() {
    getContent();

    this.buttom = document.getElementById("next-cat");
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

    /*document.addEventListener("keyup", function(e) {
        if(e.code == "Space") {
            getContent()
        }
    });*/
}    

async function getContent() {
    const apiUrl = "https://some-random-api.ml/animal/cat";
    //console.log(apiUrl);

    const data = await fetch(apiUrl);
    const dataJson = await data.json();

    procesData(dataJson)
}

function procesData(data) {
    console.log(data);
    const imgSrc = data.image;
    const fact = data.fact;

    updateDOM(imgSrc, fact);
}

function updateDOM(imgSrc, fact) {
    const img = document.getElementById("content-img");
    const factDiv = document.getElementById("fact");
    //console.log(updateDOM);

    img.src = imgSrc;
    factDiv.innerHTML = fact;
}