const form = document.querySelector('.data-form')
const submitBtn = document.querySelector('.submit-btn');


var itemID = document.getElementById('item-id');
var itemName = document.getElementById('item-name');
var itemPrice = document.getElementById('item-price');


const regExp = /d{3}/;
const regExp2 = /(^[0-9]*){3,}(,*)([0-9,$]*){3}/;

var tableWrap = document.querySelector('.table-wrap');
var dataTable = document.querySelector('.data-table');
var tableHeader = document.querySelector('.data-table-header-group');
var dataTableHeading = document.getElementsByClassName('data-table-heading')
var tableBody = document.querySelector('.data-table-body-group');

var select = document.querySelector('.input-select')


var modal = document.getElementById("form-modal");

var popUpText = document.querySelector(".pop-up-note");

popUpText.textContent = "";
popUpText.style.display = 'none';

// submitBtn.style.backgroundColor = 'purple';
// submitBtn.disabled = true;
form.addEventListener('submit', submitAction);


// clear localStorage on refresh

window.onbeforeunload = function (evt) {
    localStorage.clear();
}



function submitAction(evt) {
    evt.preventDefault();

    if (itemID.value !== '' && itemName.value !== '' && itemPrice.value !== '') {
        storeData(evt);


    }

    modal.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.classList.remove('purple-btn')
}



function storeData(evt) {
    let itemsStore = JSON.parse(localStorage.getItem('itemsStore')) || [];

    let existingData = itemsStore.length && JSON.parse(localStorage.getItem('itemsStore')).some(data => data.id == itemID.value);

    if (!existingData) {
        itemsStore.push({
            id: itemID.value,
            itemname: itemName.value,
            itemprice: itemPrice.value
        });

        localStorage.setItem('itemsStore', JSON.stringify(itemsStore));

        // console.log(localStorage.getItem('itemsStore'));
        // validateForm();

        appendData();

        form.reset(); //reset form once data is stored

    } else {
        // alert("O");
        popUpText.innerHTML = "Oh no! Duplicated ID found. <br> Enter another ID to store your data";
        popUpText.style.display = "block";
        popUpText.style.color = 'red';
    }
    evt.preventDefault();

}

// Adding Data to display on table by fetching from store 
// in localStorage

function appendData() {
    // console.log(localStorage.getItem('itemsStore'));

    select.addEventListener('change', selectVal);

    function selectVal() {
        var option = select.options[select.selectedIndex].value;
        return option;
    }

    if (localStorage.getItem('itemsStore')) {

        tableBody.innerHTML = "";


        JSON.parse(localStorage.getItem('itemsStore')).forEach(data => {

            tableBody.innerHTML += `
                        <tr class="data-table-row">                
                            <td class="data-table-cell">${data.id}</td>
                            <td class="data-table-cell">${data.itemname}</td>
                            <td class="data-table-cell">${selectVal() + data.itemprice}</td>
                        </tr>
             `;

        });
    }
}

appendData();



const fields = document.querySelectorAll('input')
for (let i = 0; i < fields.length; i++) {
    i = 2;
    fields[i].addEventListener('input', validateForm);
};


function validateForm(e) {
    if (checkID && checkName && checkPrice) {
        // submitBtn.style.backgroundColor = 'green';
        submitBtn.disabled = false;
        submitBtn.classList.add('purple-btn');
        // submitBtn.classList.add('submit-btn');\




    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('purple-btn')
        // submitBtn.style.backgroundColor = 'blue';

    };

}


function checkID() {
    if (itemID.value !== "") {


        if (regExp.test(itemID.value) == true) {
            return true;
        };
    }

    return false;
}


function checkName() {
    if (itemName.value !== "") {
        return true;
    }
    return false;
}


function checkPrice() {
    if (itemPrice.value !== "") {


        if (regExp2.test(itemPrice.value) == true) {
            return true;

        };

    }


    return false;
}


const priceInfo = document.getElementById('price-desc');
itemPrice.addEventListener('focus', function (e) {
    priceInfo.style.display = 'block';
})