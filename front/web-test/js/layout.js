function loadData() {
    printLayout();
    showAll()
}


function printLayout() {
    document.getElementById('layout').innerHTML = `
<div class="row" id="notification">

</div>
    <div class="row mt-3" id="top">
            
    </div>
    <div class="row mt-3">
        <div class="col-12" id="content"></div>
    </div>`;
}


