document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#songForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const song = {
            title: document.querySelector("#title").value,
            artist: document.querySelector("#artist").value,
            releaseDate: document.querySelector("#released").value,
            popularity: document.querySelector("#popularity").value,
            genre: []
        };

        if(document.querySelector('#genre').value){
            let words = document.querySelector("#genre").value.split(',');

            for(let i = 0; i < words.length; i++){
                words[i] = words[i].toLowerCase();
                if(words[i].charAt(0) == " "){
                    words[i] = words[i].substring(1);
                }
            }

            song.genre = words;
        }

        const response = await fetch("/api/songs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });

        if(response.ok){
            const results = await response.json();
            document.querySelector("#error").innerHTML = "Added song with ID " + results._id;

            document.querySelector("#songForm").reset();
        }else{
            document.querySelector("#error").innerHTML = "Cannot add song.";
        }
    });
});