document.addEventListener('DOMContentLoaded', async () => {
    let select = document.querySelector('#genre-options');

    try {
        let response = await fetch('/api/songs/genres');
        let options = await response.json();

        for(let i = 0; i < options.length; i++){
            let genreOption = new Option(options[i], options[i]);
            select.add(genreOption, undefined);
        }

    }catch(err){
        throw new Error("Error fetching genres from database");
    }

    document.querySelector('#search').addEventListener('click', async () => {
        let tbody = document.querySelector("#tbody");

        tbody.innerHTML = "";

        let select = document.querySelector('#genre-options');
        let query = select.options[select.selectedIndex].text;

        let response = await fetch(`/api/songs/genres/${query}`);
        let songs = await response.json();

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

        document.querySelector('#songTable').removeAttribute('hidden');
    });
});