/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Naveed Ahmed Syed
 *      Student ID: 149739237
 *      Date:       <SUBMISSION_DATE>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

// Loader to load the artists as buttons in the menu. (fully dynamic)
//******************************************************************* */
document.addEventListener("DOMContentLoaded", () => {
  function AllArts() {
    const menu = document.getElementById("menu");

    artists.forEach((artist) => {
      const anchor = document.createElement("button");
      anchor.innerHTML = artist.name;
      anchor.id = artist.artistId;
      menu.appendChild(anchor);
      anchor.addEventListener("click", clicked);
    });
  }
  //calling the function here.
  AllArts();
  //***************************************************************** */

  //Functionality of the streaming app when button is pressed. (Fully dynamic)
  /*************************************************************************** */

  //getting the element id, to display the artists info.
  const artistlinks = document.getElementById("selected-artist");

  //Funtion activated when user presses the button.
  function clicked(event) {
    const button = event.target;
    artistlinks.innerHTML = "";

    //loop going through artists.js
    artists.forEach((artist) => {
      //condition to see if the name on the button matches any member of the object in the array.
      if (button.innerHTML === artist.name) {
        const content = document.createElement("h2");
        content.textContent = artist.name + " ( ";
        const name = artist.name;
        artist.urls.forEach((url, index) => {
          const link = document.createElement("a");
          link.href = url.url;
          link.textContent = url.name;
          link.target = "_blank";

          const text = link.textContent;
          console.log(text);
          if (text.includes("Instagram")) {
            const ink = document.createElement("i");
            ink.classList = "fa fa-instagram";
            link.textContent = "";
            ink.style.background =
              "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)";
            ink.style.webkitBackgroundClip = "text";
            ink.style.webkitTextFillColor = "transparent";
            ink.style.padding = "5px";
            link.appendChild(ink);
          } else if (text.includes("youtube")) {
            const ink = document.createElement("i");
            ink.classList = "fa fa-youtube";
            link.textContent = "";
            ink.style.color = "red";
            ink.style.padding = "5px";
            link.appendChild(ink);
          } else {
            const ink = document.createElement("i");
            ink.classList = "fa fa-globe";
            link.textContent = "";
            ink.style.color = "#1EBBEE";
            ink.style.padding = "5px";
            link.appendChild(ink);
          }

          content.appendChild(link);

          if (index < artist.urls.length - 1) {
            let textnode = document.createTextNode(" , ");
            content.appendChild(textnode);
          }
        });

        content.innerHTML += " ) ";
        artistlinks.appendChild(content);

        //****************************************************************************************** */

        //Acessing the space to load the songs based on the selected artists
        const list = document.getElementById("songs");

        //clearing any previous exisitng string values that might be stored in the list.
        // list.innerHTML = "";

        //*************************************************************************** */

        // Clear the previous content before adding new songs
        // cont.innerHTML = "";

        const container = document.getElementById("container");
        container.innerHTML = "";

        songs.forEach((song) => {
          if (song.artistId === artist.artistId && !song.explicit) {
            const card = document.createElement("div");
            card.classList.add("card");
            const image = document.createElement("img");
            const cardContent = document.createElement("div");
            const title = document.createElement("h2");
            const yearRecorded = document.createElement("time");
            const duration = document.createElement("span");

            card.className = "card";
            image.src = song.image;
            card.addEventListener("click", redirect);
            title.textContent = song.title;
            yearRecorded.textContent = "Year Published: " + song.year;

            const br = document.createElement("br");

            const mins = Math.floor(song.duration / 60);
            const second = song.duration % 60;

            duration.textContent = `Duration: ${mins}:${
              second < 10 ? "0" : ""
            }${second}`;
            image.addEventListener("click", () => console.log(song));

            card.appendChild(image);
            cardContent.appendChild(title);
            cardContent.appendChild(yearRecorded);
            cardContent.appendChild(br);
            cardContent.appendChild(br);
            cardContent.appendChild(duration);
            card.appendChild(cardContent);
            container.appendChild(card);

            function redirect() {
              const link = document.createElement("a");
              link.href = song.url;
              link.target = "_blank";
              link.click();
            }
          }
        });
      }
    });
  }
});
