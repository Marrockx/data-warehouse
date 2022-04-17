const form = document.querySelector('.data-form')
const submitBtn = document.querySelector('.submit-btn');
const itemID = document.querySelector('#item-id');
const itemName = document.querySelector('#item-name');
const itemPrice = document.querySelector('#item-price');
const regExp = /d{3}/;
const regExp2 = /(^[0-9]*){3,}(,*)([0-9,$]*){3}/;

const tableWrap = document.querySelector('.table-wrap');
const dataTable = document.querySelector('.data-table');
const tableHeader = document.querySelector('.data-table-header-group');
const dataTableHeading = document.getElementsByClassName('data-table-heading')
const tableBody = document.querySelector('.data-table-body-group');
var select = document.querySelector('.input-select')


var modal = document.getElementById("form-modal");


// submitBtn.style.backgroundColor = 'purple';
// submitBtn.disabled = true;
form.addEventListener('submit', submitAction);



function submitAction(evt) {
    evt.preventDefault();




    validateForm();
    if (itemID.value !== '' && itemName.value !== '' && itemPrice.value !== '') {
        appendRow();
        modal.style.display = "none";


    }
}

function getData() {
    var str = localStorage.getItem("itemData");
    if (str != '') { itemData = JSON.parse(str); }
}

function appendRow() {

    var itemData = new Array();
    // itemData.push(dataTableHeading);
    itemData.push(["iD", "itemName", "itemPrice"])
    console.log(itemData)

    getData();

    select.addEventListener('change', selectVal);

    function selectVal() {
        var option = select.options[select.selectedIndex].value;
        return option;
    }
    itemData.push([itemID.value, itemName.value, selectVal() + (itemPrice.value)]);

    localStorage.setItem("itemData", JSON.stringify(itemData));

    // var colCt = dataTableHeading.length;
    var colCt = itemData[0].length;


    for (var i = 1; i < itemData.length; i++) {
        row = tableBody.insertRow(-1);
        row.classList.add('data-table-row');

        for (var j = 0; j < colCt; j++) {
            var cell = row.insertCell(-1);
            cell.classList.add('data-table-cell')
            cell.innerHTML = itemData[i][j];

            // if (cell)

        }
        // tableBody.innerHTML = "";
        tableBody.appendChild(row);




    }




}

const fields = document.querySelectorAll('input')
for (let field of fields) {
    field.addEventListener('change', validateForm, true);
};



function validateForm() {
    if (checkID && checkName && checkPrice) {
        // submitBtn.style.backgroundColor = 'green';
        submitBtn.disabled = false;
    } else if (!itemID.value && !itemName.value && !itemPrice.value) {
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = 'blue';

    };

}


function checkName() {
    if (3 < itemName.value.length < 20) {
        return true;
    }


    return false;
}

function checkID() {

    if (regExp.test(itemID.value) == true) {
        return true;
    };


    return false;
}


function checkPrice() {

    if (3 < itemPrice.value.length < 12) {
        if (regExp2.test(itemPrice.value) == true) {
            return true;
        };
    }



    return false;
}
// function checkEmpty(prop) {
//     var itName = $(prop).attr("name");
//     $("." + itName + "-validation").html("");
//     $(prop).css("border", "");
//     if ($(prop).val() == "") {
//         $(prop).css("border", "#FF0000 1px solid");
//         $("." + itName + "-validation").html("Required");
//         return false;
//     }
//     return true;
// } 