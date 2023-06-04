document.addEventListener('DOMContentLoaded', async () => {
    let tbody = document.querySelector("#tbody");

    try{
        let response = await fetch('/api/songs');
        let songs = await response.json();

        if(songs.length > 0){
            for(let song of songs){
                let newRow = tbody.insertRow(-1);

                let title = newRow.insertCell(-1);
                title.appendChild(document.createTextNode(song.title));

                let artist = newRow.insertCell(-1);
                artist.appendChild(document.createTextNode(song.artist));

                let buttonCell = newRow.insertCell(-1);
                let delButton = document.createElement("BUTTON");
                buttonCell.appendChild(delButton);

                delButton.classList.add('button');
                delButton.innerHTML = "Select";

                delButton.addEventListener('click', async () => {
                    let row = delButton.parentElement.parentElement;
                    let songToUpdate = row.childNodes[0].innerHTML;

                    const response = await fetch(`/api/songs/${songToUpdate}`);
                    const song = await response.json();
                        
                    document.querySelector("#id").value = song._id;
                    document.querySelector("#title").value = song.title;
                    document.querySelector("#artist").value = song.artist;
                    document.querySelector("#released").value = 
                        song.releaseDate.substring(0, 10);
                    document.querySelector("#popularity").value = song.popularity;
                    document.querySelector("#genre").value = song.genre;
                    
                });
            }

            document.querySelector("#songTable").removeAttribute("hidden");
            document.querySelector("#set").removeAttribute("hidden");
        }else{
            document.querySelector('#header').innerHTML = "Update Songs - No songs in Database";
        }

    }catch(err){
        throw new Error(err);
    }

    document.querySelector('#songForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const song = {
            _id: document.querySelector("#id").value,
            title: document.querySelector("#title").value,
            artist: document.querySelector("#artist").value,
            releaseDate: document.querySelector("#released").value,
            popularity: document.querySelector("#popularity").value,
            genre: document.querySelector("#genre").value ? 
                document.querySelector("#genre").value.split(",") : []
        };
        
        let response = await fetch("/api/songs/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(song)
        });

        if(response.ok){
            const results = await response.json();
            document.querySelector("#error").innerHTML = `Updated Song with ID: ${results._id}`;

            document.querySelector("#songForm").reset();
        }
    });
});