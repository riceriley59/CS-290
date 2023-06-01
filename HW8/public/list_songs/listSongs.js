document.addEventListener('DOMContentLoaded', async () => {
    try{
        const response = await fetch("/api/songs");
        const songs = await response.json();

        let table = document.getElementById("songTable");
        
    }catch{
        throw new Error("Error fetching all songs from database");
    }
});