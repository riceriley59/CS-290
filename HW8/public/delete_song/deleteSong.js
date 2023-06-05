/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//this is the function that will handle deleting songs and will be called
//in the beginning when the dom content is loaded and whenever a song is successfully 
//deleted
const handleDelete = async () => {
    //get table body so that rows can be added
    let tbody = document.querySelector("#tbody");

    try{
        //fetch all songs from the DB and then convert them to json
        //and store in songs variable
        let response = await fetch('/api/songs');
        let songs = await response.json();

        //clear the body in case there was a table previously
        tbody.innerHTML = "";

        //if there are songs in the DB
        if(songs.length > 0){
            //go through each song in the DB and create a new row with info
            for(let song of songs){
                //create a row for the song
                let newRow = tbody.insertRow(-1);

                //create a new title cell and populate with songs title
                let title = newRow.insertCell(-1);
                title.appendChild(document.createTextNode(song.title));

                //create a new artist cell and populate with songs artist
                let artist = newRow.insertCell(-1);
                artist.appendChild(document.createTextNode(song.artist));

                //create a new button cell and put a button in the cell
                let buttonCell = newRow.insertCell(-1);
                let delButton = document.createElement("BUTTON");
                buttonCell.appendChild(delButton);

                //add a button class to the delete button so it's 
                //styled like the other buttons and make it say delete
                delButton.classList.add('button');
                delButton.innerHTML = "Delete";

                //add a click event listener to the button which will delete the item 
                //in the del buttons row
                delButton.addEventListener('click', async () => {
                    //get the row so we can get the title and artist
                    //for the song we want to delete
                    let row = delButton.parentElement.parentElement;
                    let songToDelete = row.childNodes[0].innerHTML;
                    let songArtist = row.childNodes[1].innerHTML;

                    try{
                        //send an API request to delete the song with the specified title
                        let response = await fetch(`/api/songs/delete/${songToDelete}`, {
                            method: "DELETE"
                        });

                        //if the song is deleted
                        if(response.ok){
                            //call the function recursively so it build's a new table
                            //without the song we deleted
                            handleDelete();

                            //then display the song we deleted
                            document.querySelector("#error").innerHTML = `Deleted ${songToDelete} by ${songArtist}`;
                        }
                    }catch(err){
                        //if there is an error log it in the console
                        console.log(err);
                    }
                });
            }

            //once the table has been built remove the hidden attribute from the table
            document.querySelector("#songTable").removeAttribute("hidden");
        }else{
            //otherwise tell user no songs in the DB
            document.querySelector('#header').innerHTML = "Delete Songs - No songs in Database";
        }

    }catch(err){
        //if there is an error fetching from API then throw an error
        throw new Error(err);
    }
}

//call the handle delete function once the dom content is loaded
//in order to set up the table and buttons
document.addEventListener('DOMContentLoaded', () => {
    handleDelete();
});