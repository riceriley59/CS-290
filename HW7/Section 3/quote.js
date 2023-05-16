//Riley Rice
//CS290 Section#: 001
//5-15-2023

window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;
   
      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);	   
   });
});

// TODO: Modify to use Fetch API
function fetchQuotes(topic, count) {
   //use format string to insert topic and count into url string that we will
   //pull from the API
   const url = `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`;
   
   //fetch from that api
   fetch(url)
   .then(response => {
      //if response doesn't return 200 or ok then throw error and show 
      //error code
      if (!response.ok) {
         throw new Error(`HTTP Error! Status Code Thrown: ${response.status}`);
      } 

      //return response converted to JSON
      return response.json();
   })
   .then(data => {
      //if there is an error then output that error by putting inside
      //the quotes section otherwise we're find and we can go through 
      //each quote and insert it
      if (data.error) {
         document.querySelector('#quotes').innerHTML = data.error;
      } else {
         //go through each item in the array returned from the API and format it so it's
         //an HTML list item. and then join all of those together so we have one cohesive
         //HTML list with <li> tags
         const quotes = data.map(quote => `<li>${quote.quote} - ${quote.source}</li>`).join('');
         
         //then change the quotes section to have the list we just created from the array
         //and wrap that with an ordered list tag so that the full list is finished.
         document.querySelector('#quotes').innerHTML = `<ol>${quotes}</ol>`;
     }
   })
   .catch(error => {
      //if there was an error with the API and it throws an error then show the 
      //returned error
      document.querySelector('#quotes').innerHTML = `Fetch error: ${error.message}`;
   });
}
