/* Api for the base url */
APIURL = "https://www.finnkino.fi/xml/Schedule/"

/* Get the date info */
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

/* Make the headline display the date */
document.getElementById("headline").innerText = "Finnkinon leffatarjonta " + day + "." + month + "." + year;

let theatreID;

/* Match the cinemanames to theatreID's */
function showResults() {
    switch (document.getElementById("cinemaList").value) {
       case "Pääkaupunkiseutu":
          theatreID = 1014;
          break;
       case "Espoo":
          theatreID = 1012;
          break;
       case "Espoo: OMENA":
          theatreID = 1039;
          break;
       case "Espoo: SELLO":
          theatreID = 1038;
          break;
       case "Helsinki":
          theatreID = 1002;
          break;
       case "Helsinki: ITIS":
          theatreID = 1045;
          break;
       case "Helsinki: KINOPALATSI":
          theatreID = 1031;
          break; 
       case "Helsinki: MAXIM":
          theatreID = 1032;
          break;
       case "Helsinki: TENNISPALATSI":
          theatreID = 1033;
          break;
       case "Vantaa: FLAMINGO":
          theatreID = 1013;
          break;
       case "Jyväskylä: FANTASIA":
          theatreID = 1015;
          break;
       case "Kuopio: SCALA":
          theatreID = 1016;
          break;
       case "Lahti: KUVAPALATSI":
          theatreID = 1017;
          break;
       case "Lappeenranta: STRAND":
          theatreID = 1041;
          break;     
       case "Oulu: PLAZA":
          theatreID = 1018;
          break; 
       case "Pori: PROMENADI":
          theatreID = 1019;
          break;
       case "Tampere":
          theatreID = 1021;
          break; 
       case "Tampere: CINE ATLAS":
          theatreID = 1034;
          break;    
       case "Tampere: PLEVNA":
          theatreID = 1035;
          break; 
       case "Turku ja Raisio":
          theatreID = 1047;
          break;
       case "Turku: KINOPALATSI":
          theatreID = 1022;     
          break;
       case "Raisio: LUXE MYLLY":
          theatreID = 1046;
          break;
        
    }
    /* Make the page scroll to the top when selecting a new cinema */
    scrollToTop();
    loadXmlData();
}

function loadXmlData() {
    /* Make the xml request to the url of the API */
       const url = APIURL + "?area=" + theatreID + "&dt=" + day + "." + month + "." + year;
       const request = new XMLHttpRequest();
       request.onload = function() {
        /* Sort the data when it is received */
          sortXML(this);
       }
       request.open("GET", url);
       request.send();
 }

 function sortXML(xml) {
    
    /* Sort the data to only show elements under "Show" and create the start of a table into which, you fill the appropriate Data */
    const Data = xml.responseXML;
    const x = Data.getElementsByTagName("Show");
    let table = "<table>";

    /* Make an alert if there are no movie showings on that day for a given cinema */
    if (x.length == 0) {
       alert("Ei näytöksiä tänään. Valitse toinen alue tai teatteri.");
    } else {
       for (let i=0; i < x.length; i++) {
        /* If there are no available image for a movie, replace it with  "Image not found" text */
          let moviePic;
             if (x[i].getElementsByTagName("EventMediumImagePortrait").length == 0) {
                moviePic = "<br>Image<br>not<br>found<br>";
             } else {
                moviePic = "<img id='moviePic' src='" + x[i].getElementsByTagName("EventMediumImagePortrait")[0].childNodes[0].nodeValue + "'></img>";
             }
             /* Fill the table rows with a picture, title, duration and location of the movie */
             table += "<tr><td id='picture'><a href='" + x[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue + "' target='_blank'><br><br><br>" + moviePic + "</td></tr>" 
             + "<tr><td id='title'><a href='" + x[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue + "' target='_blank'>" + x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue + "</a></td></tr>"
             + "<tr><td id='startTime'>" + "Alkaa: " + (x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue).slice(11,16) + "</td> </tr>" 
             + "<tr><td id='duration'> Kesto: " + duration(x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue) + "</td></tr>"  
             + "<tr><td id='auditorium'>" + x[i].getElementsByTagName("TheatreAndAuditorium")[0].childNodes[0].nodeValue + "</td></tr>";
       }
       table += "</table>";
       /* Input the table into the "results" div */
       document.getElementById("results").innerHTML = table;
    }
 }
    /* Make the function for converting the duration of the movie from minuntes to hours and minutes */
 function duration(time) {
    let minutes = time % 60;
    let hours = (time - minutes) / 60;
    return hours + " h " + minutes + " min";
 }
    /* Make the function for the button and picking a new cinema from the list for scrolling to the top */
 document.getElementById("topBtn").addEventListener("click", scrollToTop);
    function scrollToTop() {
        document.getElementById("results").scrollTop = 0;

 }
