// FONCTIONS UTILES



// INITIALISATION DE LA PAGE HTML A PARTIR D'ICI

var xhr = new XMLHttpRequest();

function request(url){
 console.log(url)
 //xhr.open('GET', url, true);
 //xhr.send(null); //A décommenter pour lancer la musique
}

firebase.initializeApp({
  apiKey: 'AIzaSyBEBk4Jimmjz-3VMuhi5pVeDKNrdIr7WIc',
  authDomain: 'test-41ffd.firebaseapp.com',
  projectId: 'test-41ffd'
});

var db = firebase.firestore();

var array = [];

db.collection("musics").get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        array.push(doc.data().name)
    });
}).then( () => {

    // construire la page html ici avec array

    var prefix = "https://us-central1-test-41ffd.cloudfunctions.net/hello?name="

    var dynamic = document.getElementById("dynamic")

    var styles = ["btn-primary","btn-success","btn-info","btn-warning","btn-danger"]

    var s = 0;

    for(var i=0; i<array.length; i++){

        var newButton = document.createElement("a")

        newButton.setAttribute( "onClick", "request('"+prefix+array[i]+"');" )

        newButton.innerHTML = array[i].split(".")[0]

        newButton.classList.add("btn") //
        newButton.classList.add(styles[s])
        newButton.classList.add("ribbon")
        newButton.classList.add("button")

        newButton.style.marginBottom = "20px"

        dynamic.appendChild(newButton)

        s++
        if(s>4){
          s=0
        }

      }

    //BOUTON STOP

    var stop = document.createElement("a")

    stop.setAttribute( "onClick", "request('"+prefix+"stop');" );

    stop.innerHTML = "STOP"

    stop.classList.add("btn")
    stop.classList.add(styles[s])
    stop.classList.add("ribbon")
    stop.classList.add("button")

    dynamic.appendChild(stop);

});