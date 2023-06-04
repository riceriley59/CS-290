document.addEventListener('DOMContentLoaded', async () => {
    try{
        const response = await fetch("/api/songs");
        const songs = await response.json();

        if(songs.length > 0){
            let tbody = document.querySelector("#tbody");
            for(let song of songs){
                let newRow = tbody.insertRow(-1);

                let id = newRow.insertCell(-1);
                id.appendChild(document.createTextNode(song._id))

                let title = newRow.insertCell(-1);
                title.appendChild(document.createTextNode(song.title));

                let artist = newRow.insertCell(-1);
                artist.appendChild(document.createTextNode(song.artist));

                let released = newRow.insertCell(-1);
                let date = new Date(song.releaseDate)
                let datestr = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
                released.appendChild(document.createTextNode(datestr));

                let popularity = newRow.insertCell(-1);
                popularity.appendChild(document.createTextNode(song.popularity));

                let genre = newRow.insertCell(-1);
                genre.appendChild(document.createTextNode(song.genre));
            }

            document.querySelector("#songForm").removeAttribute("hidden");
        }else{
            document.querySelector("#header").innerHTML = "List Songs - No Songs in the Database";
        }
    }catch{
        throw new Error("Error fetching all songs from database");
    }
});