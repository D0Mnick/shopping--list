// START ADD ITEM
// DECLARATION
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button')
let isEditMode = false;



function displayItems() {
    const itemFromStorage = getItemFromStorage();
    itemFromStorage.forEach((item) => addItemToDom(item))
    checkUI()
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    // Validate Input
    if (newItem === '') {
        alert ('Please Add an Item');
        return;
    }

    //check for edit mode
    if (isEditMode) {
     const itemToEdit = itemList.querySelector('.edit-mode');

     removeItemFromStorage(itemToEdit.textContent);
     itemToEdit.classList.remove('edit-mode');
     itemToEdit.remove();
     isEditMode = false;
    //  if item is exist
    }else {
        if(checkIfItemExists(newItem)){
            alert('that item already exist')
            return;
        }
    }

    console.log('success');
    // create item DOM element
    addItemToDom(newItem)
    // add item to local Storage
    addItemToStorage(newItem)
    // clear list items
    checkUI();
    // AFTER ADDED A ITEM THE INPUT BOX IS CLEAR
    itemInput.value = '';
}

// ADD TO THE DOM ITEM
function addItemToDom(item) {
    //create list item(1)
    const li = document.createElement('li');
    //  CREATE A TEXT
     li.appendChild(document.createTextNode(item));
    //  classes of button(2)
    const button = createButton('remove-item btn-link text-red');
     li.appendChild(button)
// TO ADD TO THE WEBSITE AN ITEM
//add li to the DOM
    itemList.appendChild(li);
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
    //  ADD TO LOCAL STORAGE
     function addItemToStorage(item) {
        // initializing the variable
        let itemFromStorage = getItemFromStorage();
        //add to new item to array
        itemFromStorage.push(item);
        //convert to jsonString and set to local Storage
        //converting to string to back end to localstorage
        localStorage.setItem('items', JSON.stringify(itemFromStorage));
    }

    function getItemFromStorage() {
        // initializing the variable
        let itemFromStorage;
        // checking item storage if no item .
        //ITEMS IS KEY
        if (localStorage.getItem('items') === null) {
            // this item is item array
            itemFromStorage = [];
        }else {
            itemFromStorage = JSON.parse(localStorage.getItem('items'));
        }
        return itemFromStorage;
    }

   //  REMOVE ITEM START
    function onClickItem(e) {
         // get the button classlist
         if (e.target.parentElement.classList.contains('remove-item')){
            removeItem(e.target.parentElement.parentElement);
         }else {
            // edit text
            setItemToEdit(e.target)
         }
    }

    // we cant add multiple items
       function checkIfItemExists(item) {
        const itemFromStorage = getItemFromStorage();
        return itemFromStorage.includes(item);

        // if (itemFromStorage.includes(item)) {
        //   return true;
        // }else {
        //     return false;
        // }
       }

    // edit 
    function setItemToEdit(item) {
        isEditMode = true;

        // click li to stay gray
        itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
        // get the class design
        item.classList.add('edit-mode');
        // change the button to update item
        formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
        // change color background color
        formBtn.style.backgroundColor = '#228B22';
        // add to text to input form
        itemInput.value = item.textContent;

    }
    //parent element is a button
    function removeItem(item) {
        if (confirm('Are you sure?')) {
         //Remove item From DOM
         item.remove();
         
         //Remove Item From Storage
         removeItemFromStorage(item.textContent);  
    //  clear list items
            checkUI()
        }
     }
     
     function removeItemFromStorage(item) {
    let itemFromStorage = getItemFromStorage();

       //Filter out item to be removed
       itemFromStorage = itemFromStorage.filter((i) => i !== item);

       //Re-set to localStorage
       localStorage.setItem('items', JSON.stringify(itemFromStorage));
     }
    
    //  REMOVE ITEM END

    
    // CLEAR iTEMS START
    function clearItems () {
       while (itemList.firstChild) {
       itemList.removeChild(itemList.firstChild)
  }
   //   clear list items+
        localStorage.removeItem('items');
  checkUI()
    }
    // CLEAR iTEMS END
    // filter item or search items START
    function filterItems (e) {
        // access to list items
        const items = itemList.querySelectorAll('li');
        // if you search a text directly small letters
        const text = e.target.value.toLowerCase();

        items.forEach((item) => {
            // firstChild of li textnode
            const itemName = item.firstChild.textContent.toLowerCase();
            // search for a letter
            // matches the letter is true if not is -1
            if (itemName.indexOf(text) != -1) {
               item.style.display = 'flex';
            }else {
                item.style.display = 'none';
            }
        })
    }
    // filter item or search items END


    //none display a filter and a button -start
    //CLEAR UI STATE
    function checkUI() {
// clear input item automatic
    const items = itemList.querySelectorAll('li');
       itemInput.value = '';
  // dont set in global scope items
        if (items.length === 0) {
            clearBtn.style.display = 'none';
            itemFilter.style.display = 'none';
        }else {
            clearBtn.style.display = 'block';
            itemFilter.style.display = 'block';
        }
        // to back the normal button after edit
        formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
        formBtn.style.backgroundColor = '#333';

        isEditMode = false;

    }
     //none display a filter and a button -end

  //when the page load we put in in the function
    function init() {
            //event Listeners button
    itemForm.addEventListener('submit', onAddItemSubmit);
    // ADD ITEM END
    // REMOVE ITEM
    itemList.addEventListener('click', onClickItem);
    // clear all 
    clearBtn.addEventListener('click', clearItems);
    // search items
    itemFilter.addEventListener('input', filterItems);
    // when the page load 
    document.addEventListener('DOMContentLoaded', displayItems)
    checkUI ();
    }
    init();

