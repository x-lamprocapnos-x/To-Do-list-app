//add a new item to the list
let li = $('<li></li>');
function newListItem(){
   
    let inputValue = $('#input').val();
    li.append(inputValue);

    if (inputValue === ''){
        alert('You must input a value!');
    } else {
        $('List').append(li);
    }
}
//cross off an item from the list
function crossOut(){
    li.toggleClass('strike');
}
    li.on('dblclick', function crossOut(){
        li.toggleClass('strike');
    });
//add a delete list item button
    let crossOutButton = $('<crossOutButton></crossOutButton>');
    crossOutButton.append(document.createTextNode('X'));
    li.append(crossOutButton);

    crossOutButton.on('click', deleteListItem);
    function deleteListItem(){
        li.addClass('delete');
    }
//made list sortable
    $('List').sortable();
