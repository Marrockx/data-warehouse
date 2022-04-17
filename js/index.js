let requestButtons = document.querySelectorAll('.action-btn')

requestButtons.forEach(btn => {
    btn.addEventListener('click', goToForm);
});


function goToForm() {
    location.href = ("../pages/data_table");
}



