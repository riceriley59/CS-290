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
                delButton.innerHTML = "Delete";

                delButton.addEventListener('click', async () => {
                    let row = delButton.parentElement.parentElement;
                    let songToDelete = row.childNodes[0].innerHTML;

                    try{
                        let response = await fetch(`/api/songs/${songToDelete}`, {
                            method: "DELETE"
                        });

                        if(response.ok){
                            
                        }
                    }catch(err){
                        throw new Error("Error deleting document");
                    }
                });
            }

            document.querySelector("#songTable").removeAttribute("hidden");
        }else{
            document.querySelector('#header').innerHTML = "Delete Songs - No songs in Database";
        }

    }catch(err){
        throw new Error(err);
    }
});