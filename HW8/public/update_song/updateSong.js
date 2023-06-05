/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//This is the function that will handle updating songs and will be called in the
//beginning when the dom content is loaded and whenever a song is sucessfully updated
const handleUpdate = async () => {
    //get tbody so we can build the table
    let tbody = document.querySelector("#tbody");

    try{
        //fetch all songs from the DB and convert them into json
        let response = await fetch('/api/songs');
        let songs = await response.json();

        //clear the table in case there is a table left over previously
        tbody.innerHTML = "";

        //if there are songs in the DB
        if(songs.length > 0){
            //for each song in the DB create a new row with it's info
            for(let song of songs){
                //create a new row
                let newRow = tbody.insertRow(-1);

                //create a new title cell and populate with songs title
                let title = newRow.insertCell(-1);
                title.appendChild(document.createTextNode(song.title));

                //create a new artist cell and populate with songs artist
                let artist = newRow.insertCell(-1);
                artist.appendChild(document.createTextNode(song.artist));

                //create a new button cell and populate with a button
                let buttonCell = newRow.insertCell(-1);
                let delButton = document.createElement("BUTTON");
                buttonCell.appendChild(delButton);

                //add button class so it's styled like other buttons
                //and then make it say select
                delButton.classList.add('button');
                delButton.innerHTML = "Select";

                //add a click event listener to the button
                delButton.addEventListener('click', async () => {
                    //get parent so we can get the name of the songs to update
                    let row = delButton.parentElement.parentElement;
                    let songToUpdate = row.childNodes[0].innerHTML;

                    //get the songs from the DB and convert to JSON
                    const response = await fetch(`/api/songs/${songToUpdate}`);
                    const song = await response.json();
                    
                    //fill form data with song info
                    document.querySelector("#id").value = song._id;
                    document.querySelector("#title").value = song.title;
                    document.querySelector("#artist").value = song.artist;
                    document.querySelector("#released").value = 
                        song.releaseDate.substring(0, 10);
                    document.querySelector("#popularity").value = song.popularity;
                    document.querySelector("#genre").value = song.genre;
                    
                });
            }

            //once table has been built show form and table
            document.querySelector("#songTable").removeAttribute("hidden");
            document.querySelector("#set").removeAttribute("hidden");
        }else{
            //otherwise display to the user that there are no songs in the DB
            document.querySelector('#header').innerHTML = "Update Songs - No songs in Database";
        }

    }catch(err){
        //if there is an error fetching from API then throw an error
        throw new Error(err);
    }

    //add submit event listener to songform
    document.querySelector('#songForm').addEventListener('submit', async (e) => {
        //prevent default actions
        e.preventDefault();
        
        //create a song object based off of values from the form
        const song = {
            _id: document.querySelector("#id").value,
            title: document.querySelector("#title").value,
            artist: document.querySelector("#artist").value,
            releaseDate: document.querySelector("#released").value,
            popularity: document.querySelector("#popularity").value,
            genre: []
        };
        
        //if there is genre then remove spaces and put it to lowercase
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

        //make a put request to the API and pass the new song object 
        //to the API so it can be updated
        let response = await fetch("/api/songs/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(song)
        });

        //if the update is successful
        if(response.ok){
            //convert results to json and display the ID of the updated song
            const results = await response.json();
            document.querySelector("#error").innerHTML = `Updated Song with ID: ${results._id}`;

            //reset form
            document.querySelector("#songForm").reset();

            //call handleupdate again in order to update table
            handleUpdate();
        }
    });
}

//once dom content is loaded build table by calling handleUpdate
document.addEventListener('DOMContentLoaded', () => {
    handleUpdate();
});