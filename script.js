// START ADD ITEM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter')


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
//add li to the DOM
    itemList.appendChild(li);

    // clear list items
    checkUI();
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

    //  REMOVE ITEM START
    //parent element is a button
    function removeItem(e) {
        // get the button classlist
     if (e.target.parentElement.classList.contains('remove-item')) {
        // CONFIRMATION TO DELETE OR NOT
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
//  clear list items
            checkUI()
        }
     }
      
    }
    //  REMOVE ITEM 
    
    // CLEAR iTEMS START
function clearItems () {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
//   clear list items
  checkUI()
}
    // CLEAR iTEMS END



    //none display a filter and a button -start
    //CLEAR UI STATE
    function checkUI() {
        // dont set in global scope items
    const items = itemList.querySelectorAll('li');

        if (items.length === 0) {
            clearBtn.style.display = 'none';
            itemFilter.style.display = 'none';
        }else {
            clearBtn.style.display = 'block';
            itemFilter.style.display = 'block';
        }

    }
     //none display a filter and a button -end

//event Listeners button
itemForm.addEventListener('submit', addItem);
// ADD ITEM END
// REMOVE ITEM
itemList.addEventListener('click', removeItem);

// clear all 
clearBtn.addEventListener('click', clearItems);

checkUI ();