// START ADD ITEM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem (e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert ('Please Add an Item');
        return;
    }
    console.log('success');

    //create list item(1)
     const li = document.createElement('li');
    //  CREATE A TEXT
     li.appendChild(document.createTextNode(newItem));

    
    //  classes of button(2)
    const button = createButton('remove-item btn-link text-red');
     li.appendChild(button)
     
// TO ADD TO THE WEBSITE AN ITEM
    itemList.appendChild(li);

    // AFTER ADDED A ITEM THE INPUT BOX IS CLEAR
    itemInput.value = '';
}

//    outside item fucntion of button(3)
     function createButton(classes) {
        const button = document.createElement('button');
        button.className = classes;

        // an icon to aatach
        const icon = createIcon('fa-solid fa-xmark')
        // combination button and icon
        button.appendChild(icon);
        return button;
     }
 
     //icon create an icon(4)
     function createIcon(classes) {
        const icon = document.createElement('i');
        icon.className = classes;
        return icon;
     }

//event Listeners button
itemForm.addEventListener('submit', addItem);

// ADD ITEM END