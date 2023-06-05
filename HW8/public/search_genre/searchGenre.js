/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//once dom content is loaded we get all the genres in the db and fill the select
//tag with those genre options. Then we add an event listener to the search button
document.addEventListener('DOMContentLoaded', async () => {
    //get select tag
    let select = document.querySelector('#genre-options');

    try {
        //get all distinct genres in database then conver that to 
        //JSON and store in options
        let response = await fetch('/api/songs/genres');
        let options = await response.json();

        //if there are genres
        if(options.length > 0){
            //go through every genre in the database and add it to our drop
            //down list for the genres
            for(let i = 0; i < options.length; i++){
                let genreOption = new Option(options[i], options[i]);
                select.add(genreOption, undefined);
            }

            //then once we have put every genre in the drop down remove the hidden attribute
            //and show it to the user.
            document.querySelector("#genre-search").removeAttribute("hidden");
        }else{
            //if there isn't any songs then display that to user
            document.querySelector("#header").innerHTML = "Search Genre - No Songs in the Database";
        }

    //if there is an error
    }catch(err){
        //log the error
        console.log(err);
    }

    //add click event listener to the search button so it will fetch all the songs
    //with the selected genre and display it to the user in a table under the search
    document.querySelector('#search').addEventListener('click', async () => {
        //get table body
        let tbody = document.querySelector("#tbody");

        //clear the tables body in case there are previous rows from another search
        tbody.innerHTML = "";

        //get the selected genre from the drop-down list
        let select = document.querySelector('#genre-options');
        let query = select.options[select.selectedIndex].text;

        //then fetch the songs with the selected genre from the database and 
        //convert it to json and store in the songs variable
        let response = await fetch(`/api/songs/genres/${query}`);
        let songs = await response.json();

        //go through each of the songs we got from the database and insert it into
        //the table with all its information
        for(let song of songs){
            //create a new row
            let newRow = tbody.insertRow(-1);

            //create a new id cell and populate it with the song id
            let id = newRow.insertCell(-1);
            id.appendChild(document.createTextNode(song._id))

            //create a new title cell and populate it with the song title
            let title = newRow.insertCell(-1);
            title.appendChild(document.createTextNode(song.title));

            //create a new artist cell and populate it with the song artist
            let artist = newRow.insertCell(-1);
            artist.appendChild(document.createTextNode(song.artist));

            //create a new releaseDate cell and populate it with the songs release
            //date, and then also format it by turning it into a date object
            let released = newRow.insertCell(-1);
            let date = new Date(song.releaseDate)
            let datestr = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
            released.appendChild(document.createTextNode(datestr));

            //create a new popularity cell and populate it with the songs popularity
            let popularity = newRow.insertCell(-1);
            popularity.appendChild(document.createTextNode(song.popularity));

            //create a new genre cell and populate it with the songs genre
            let genre = newRow.insertCell(-1);
            genre.appendChild(document.createTextNode(song.genre));
        }

        //once the table has been built remove the hidden attribute and display
        //the table to the user
        document.querySelector('#songTable').removeAttribute('hidden');
    });
});