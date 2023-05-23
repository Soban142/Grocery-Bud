var submitBtn = document.querySelector('.submit-button')
var editBtn = document.querySelector('.edit-button')
var inputField = document.querySelector('.input-field')
var itemContainer = document.querySelector('.item-container')
var updates = document.querySelector('.updation')
var clearBtn = document.querySelector('.clearBtn')
console.log(clearBtn)
// var editBtn = document.querySelectorAll('.editBtn')

editBtn.style.display = 'none'

let editedUID = null

let itemList = JSON.parse(localStorage.getItem('ToDoList')) || []


function noticeBar(noticeText) {
        console.log(noticeText)
        updates.innerHTML = noticeText
        updates.classList.remove('update-visibility')
        setTimeout(() =>{
            // updates.style.visibility = 'hidden'
            updates.classList.add('update-visibility')
        }, 2000)
        
        // `${noticeText} is added to the list.`
        // updates.classList.remove('update-visibility')
}



function editFunction (uId) {
    
    editedUId = uId
    
    submitBtn.style.display = 'none'
    editBtn.style.display = 'inline-block'


    // editBtn.addEventListener('click', editHandler)
    editBtn.addEventListener('click', function () {
        editHandler(editedUId);
      });
    
    const itemsArray = Array.from(itemContainer.childNodes);
    
    let filteredItem = itemsArray.filter((items) => items.id === editedUId);
    console.log(filteredItem);
    inputField.value = filteredItem[0].querySelector('p').innerText;
}

function editHandler(editedUId) {

    var itemToBeEdited = itemList.findIndex((findItem) => findItem.includes(editedUId));
    console.log(itemToBeEdited, 'indexNum of the item to be edit');
    
    itemList.splice(itemToBeEdited, 1, `<div class="item" id="${editedUId}">
    <p>${inputField.value}</p>
    <div>
        <button class="deleteBtn functionBtns" onClick="deleteFunction('${editedUId}')">    
            <i class="fa-solid fa-trash"></i>
        </button>
        <button class="editBtn functionBtns" onClick="editFunction('${editedUId}')">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
    </div>
</div> `);
    console.log(itemList);  

    itemContainer.innerHTML = itemList.join("");

    editBtn.style.display = 'none'
    submitBtn.style.display = 'inline-block'

    localStorage.setItem('ToDoList', JSON.stringify(itemList))

    noticeBar('Value has changed')
    
    setTimeout(() => {
        inputField.value = ""
    }, 1000)

    
}


function deleteFunction (uId) {
      console.log(uId)
    //   var itemToBeDeleted = itemList.findIndex(findItem)
    //   function findItem(itemList) {
    //         itemList.includes(uId)
    //   }
      var itemToBeDeleted = itemList.findIndex((findItem) => findItem.includes(uId));
      console.log(itemToBeDeleted, 'indexNum of the item to be deleted')

      itemList.splice(itemToBeDeleted, 1)
      console.log(itemList)
      itemContainer.innerHTML = itemList.join("")
      
      localStorage.setItem('ToDoList', JSON.stringify(itemList))

      noticeBar('Item Removed')
}




function submission() {

    if (inputField.value === "" || inputField.value === " ") {
        noticeBar(`Please Enter Any Value`)
        return
    }

        let uniqueId= new Date().getTime()
        
    
        let items = `<div class="item" id="${uniqueId}">
            <p>${inputField.value}</p>
        <div>
            <button class="deleteBtn functionBtns" onClick="deleteFunction('${uniqueId}')">    
                <i class="fa-solid fa-trash"></i>
            </button>
            <button class="editBtn functionBtns" onClick="editFunction('${uniqueId}')">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
    </div> `
        itemList.push(items)
        itemContainer.innerHTML = itemList.join("")

        
        
        noticeBar(`${inputField.value} is added to the list`)

        inputField.value = '';

        localStorage.setItem('ToDoList', JSON.stringify(itemList))

        clearBtn.classList.remove('hidden')
        
}



function clearItems() {
    itemList = []
    itemContainer.innerHTML = itemList.join('')

    noticeBar('All items are cleared')

    setTimeout(() => {
        clearBtn.classList.add('hidden')
    },3000)
}

clearBtn.addEventListener('click', clearItems)
submitBtn.addEventListener('click', submission)





// var deleteBtn = document.querySelectorAll('.deleteBtn')


// for(let i = 0; i < deleteBtn.length; i++){
//     deleteBtn[i].addEventListener('click', () => {
//         console.log(deleteBtn[i])
//         for(let j = 0; j < itemList.length; j++){
//             if(i === j){
//                 itemList.splice(j, 1)
//                 itemContainer.innerHTML = itemList.join("")
//                 console.log(itemList.splice(j, 1))
//             }
//         }
//     })
// }


// var deleteBtn = document.querySelectorAll('.deleteBtn');

// for (let i = 0; i < deleteBtn.length; i++) {
//   deleteBtn[i].addEventListener('click', createDeleteHandler(i));
// }

// function createDeleteHandler(index) {
//   return function () {
//     console.log(deleteBtn[index]);
//     for (let j = 0; j < itemList.length; j++) {
//       if (index === j) {
//         itemList.splice(j, 1);
//         itemContainer.innerHTML = itemList.join("");
//         console.log(itemList.splice(j, 1));
//       }
//     }
//   };
// }



