showNotes();

// If a user adds a note, add it to the local storage 

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []; //If notes were not present then create an empty array.
    } else {
        notesObj = JSON.parse(notes); //If some notes were present make then in array format.
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
})

// Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []; //If notes were not present then create an empty array.
    } else {
        notesObj = JSON.parse(notes); //If some notes were present make then in array format.
    }

    let html = "";
    notesObj.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `<p>Nothing to show use, <button class="btn btn-primary" style= "cursor: text">Add Note</button> section to add notes.</p> `;
    }
}

// Function to delete note 

function deleteNote(index) {
    // console.log(`Deleting item ${index+1}`);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = []; //If notes were not present then create an empty array.
    } else {
        notesObj = JSON.parse(notes); //If some notes were present make then in array format.
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {

    let inputVal = search.value;
    console.log('Input event Fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })

})