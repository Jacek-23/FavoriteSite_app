setInterval(() => {
    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let date = document.getElementById("date");

    let hh = document.getElementById("hh");
    let mm = document.getElementById("mm");
    let ss = document.getElementById("ss");

    let hr_dot = document.querySelector(".hr_dot");
    let min_dot = document.querySelector(".min_dot");
    let sec_dot = document.querySelector(".sec_dot");

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let d = new Date().toLocaleDateString();

    /*convert 24hr clock to 12hr clock
    if(h>12) {
        h = h - 12;
    }*/

    //add zero before single digit number
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
            
    hours.innerHTML = h + "<br><span>Godziny</span>";
    minutes.innerHTML = m + "<br><span>Minuty</span>";
    seconds.innerHTML = s + "<br><span>Sekundy</span>";
    date.innerHTML = d + "<br><span>Data</span>";

    hh.style.strokeDashoffset = 440 - (440 * h)/24;
    mm.style.strokeDashoffset = 440 - (440 * m)/60;
    ss.style.strokeDashoffset = 440 - (440 * s)/60;

    hr_dot.style.transform = `rotate(${h * 15}deg)`;
    //360/12 = 30
    min_dot.style.transform = `rotate(${m * 6}deg)`;
    //360/60 = 6
    sec_dot.style.transform = `rotate(${s * 6}deg)`;


});

// RandomJoke
const randomJokeGenerator = {
    apiUrl:"https://api.chucknorris.io/jokes/random",
    jokesArr: [],// dadanie żartów do tablicy
    jokeSpan: document.getElementById("joke"),

    init: function() {
        console.log("App start");
        this.getNextJoke();
        this.addListeners();
    },

    getNextJoke: async function() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
    
        this.jokesArr.push(data);//wrzucenie do tablicy na przyszłość
        this.updateUIWithJoke(data);
    },

    updateUIWithJoke: function(data) {
        const jokeStr = data.value;
        console.log(jokeStr);
        this.jokeSpan.innerHTML = `"${jokeStr}"`;
    },

    addListeners: function() {
        document.getElementById("next-joke");
            addEventListener("click", (e) => {
                console.log("click");
                this.getNextJoke();
                
            },
            addEventListener("keyup", (e) => {
                if(e.code == "Space") {
                    this.getNextJoke();  
                }
            })
        )
    },
};
randomJokeGenerator.init();

//RandomMeme
const randomMeme = {
    contentPreload: document.getElementById("content-preload"),
    content: document.getElementById("content"),
    text: document.getElementById("text"),

    init: function() {
        console.log("app started!");
        this.getContent();

        document.addEventListener("keyup", (e) => {
            if(e.code == "Space") {
                this.getContent();  
            }
        });
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

//Cats
window.onload = function() {
    getContent();

    document.addEventListener("keyup", function(e) {
        if(e.code == "Space") {
            getContent()
        }
    });
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

//CurrencyTable
startApp();

    async function startApp() {
        const apiUrl="http://api.nbp.pl/api/exchangerates/tables/a?format=json";
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log(data);

        processData(data[0]);
    }

    function processData(data) {
        console.log(data);
        
        const code = data.effectiveDate;
        const table = data.table // tabela A
        const tableNun = data.no; 
        const ratesArr = data.rates;

        const dataTableDiv = document.getElementById("data-table");
        document.getElementById("date").innerHTML = tableNun;

        ratesArr.forEach(function (el) {
            console.log(el);
            const code = el.code; // USD
            const currency = el.currency; //dolar amerykański
            const price = el.mid; // 3.23

            addRateContent(code, currency, price, dataTableDiv);
        });
    }

    function addRateContent(code, currency, price, dataTableDiv) {
        const el = document.createElement("div");
        el.classList.add("rate");

        el.innerHTML =`
            <div> ${code} </div>
            <div> ${currency} </div>
            <div> ${price} zł </div>
        `
        dataTableDiv.append(el);

    }