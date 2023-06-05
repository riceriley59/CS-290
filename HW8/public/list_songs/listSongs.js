/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//Once the dom content is loaded fetch all the songs from our
//DB and then insert each song as a row into our table
document.addEventListener('DOMContentLoaded', async () => {
    try{
        //fetch all songs from database and turn them into json objects
        const response = await fetch("/api/songs");
        const songs = await response.json();

        //if there is songs in our DB
        if(songs.length > 0){
            //get the table body
            let tbody = document.querySelector("#tbody");

            //go through every song and then add them into our table body
            for(let song of songs){
                //create a new row
                let newRow = tbody.insertRow(-1);

                //create a new id cell and populate it with the id
                let id = newRow.insertCell(-1);
                id.appendChild(document.createTextNode(song._id))

                //create a new title cell and populate it with the title
                let title = newRow.insertCell(-1);
                title.appendChild(document.createTextNode(song.title));

                //create a new artist cell and populate it with the artist name
                let artist = newRow.insertCell(-1);
                artist.appendChild(document.createTextNode(song.artist));

                //create a new releaseDate cell and populate it with the release date
                //by first casting the song's date to a Date object and then format it
                let released = newRow.insertCell(-1);
                let date = new Date(song.releaseDate)
                let datestr = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
                released.appendChild(document.createTextNode(datestr));

                //create a new popularity cell and populate it with the popularity
                let popularity = newRow.insertCell(-1);
                popularity.appendChild(document.createTextNode(song.popularity));

                //create a new genre cell and populate it with the genres
                let genre = newRow.insertCell(-1);
                genre.appendChild(document.createTextNode(song.genre));
            }

            //once the table has been built then remove the hidden attribute from the table
            document.querySelector("#songTable").removeAttribute("hidden");
        }else{
            //otherwise keep elements hidden and change header to say that there are no songs in the
            //database
            document.querySelector("#header").innerHTML = "List Songs - No Songs in the Database";
        }
    }catch{
        //if theres an error throw a new error
        throw new Error("Error fetching all songs from database");
    }
});