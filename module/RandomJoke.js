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