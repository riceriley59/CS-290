/*
Riley Rice
6-4-2023
CS 290 Section# 001
*/

//once all the DOM content is loaded add an event listener
//to the songform for everytime it submits 
document.addEventListener("DOMContentLoaded", () => {
    //when the form is submitted call this asynchronous function
    document.querySelector("#songForm").addEventListener("submit", async (e) => {
        //pass the event in call the preventDefault method so we can implement
        //custom funcitonality
        e.preventDefault();
        
        //create a song object from the form content
        const song = {
            title: document.querySelector("#title").value,
            artist: document.querySelector("#artist").value,
            releaseDate: document.querySelector("#released").value,
            popularity: document.querySelector("#popularity").value,
            genre: []
        };

        //if there is a genre in the new song then split the genres at the comma
        //to get all the genres then go through each word and convert it to lowercase
        //and remove any leading spaces
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

        //then make a post request to our api passing the json
        //string version of our song object, to add the song we just made
        const response = await fetch("/api/songs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(song)
        });

        //if the response was good
        if(response.ok){
            //turn the results into a json object
            const results = await response.json();

            //display the added song's ID
            document.querySelector("#error").innerHTML = "Added song with ID " + results._id;

            //reset the form's inputs
            document.querySelector("#songForm").reset();
        }else{
            //otherwise display the song couldn't be added
            document.querySelector("#error").innerHTML = "Cannot add song.";
        }
    });
});