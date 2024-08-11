// Add a new item to the list
function newListItem() {
    let li = $('<li></li>');
    let inputValue = $('#input').val();
    li.append(inputValue);

    document.getElementById("input").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            newListItem();
        }
    });

    if (inputValue === '') {
        alert('You must input a value!');
    } else {
        $('#list').append(li);
        saveList(); // Save list to local storage
    }

    // Cross out an item from the list
    function crossOut() {
        li.toggleClass('strike');
        saveList(); // Save list to local storage
    }
    li.on('dblclick', function crossOut() {
        li.toggleClass('strike');
        saveList(); // Save list to local storage
    });

    // Add a delete list item button
    let crossOutButton = $('<button class="crossOutButton">X</button>');
    li.append(crossOutButton);

    crossOutButton.on('click', deleteListItem);
    function deleteListItem() {
        li.addClass('delete');
        li.remove(); // Remove the item from the list
        saveList(); // Save list to local storage
    }

    // Make list sortable
    $('#list').sortable();
}

// Save the current list to local storage
function saveList() {
    let listArray = [];
    $('#list li').each(function () {
        let item = {
            text: $(this).text(),
            class: $(this).attr('class')
        };
        listArray.push(item);
    });
    localStorage.setItem('todoList', JSON.stringify(listArray));
}

// Load the list from local storage
function loadList() {
    let listArray = JSON.parse(localStorage.getItem('todoList') || '[]');
    listArray.forEach(function (item) {
        let li = $('<li></li>');
        li.text(item.text);
        if (item.class) {
            li.addClass(item.class);
        }
        $('#list').append(li);

        // Add delete button to loaded items
        let crossOutButton = $('<button class="crossOutButton">X</button>');
        li.append(crossOutButton);
        crossOutButton.on('click', function () {
            li.addClass('delete');
            li.remove();
            saveList(); // Save list to local storage
        });

        // Toggle class on double click
        li.on('dblclick', function () {
            li.toggleClass('strike');
            saveList(); // Save list to local storage
        });
    });

    // Make list sortable
    $('#list').sortable();
}

// Load the list when the page is loaded
$(document).ready(function () {
    loadList();

    // Add new item on button click
    $('#addButton').on('click', newListItem);

    // Add new item on Enter key
    $('#input').on('keyup', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            newListItem();
        }
    });
});