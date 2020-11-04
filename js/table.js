
function showTable() {
    let table = document.getElementById('tableDiv');
    table.style.width = 400;
    table.style.height = 400;
}

function hideTable() {
    let table = document.getElementById('tableDiv');
    table.style.width = 0;
    table.style.height = 0;
}

function clearTable() {
    document.getElementById('tbody').innerHTML = '';
}

function addRow(col1, col2, col3) {
    let tbody = document.getElementById('tbody');
    let row = tbody.insertRow(tbody.length - 1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.style.textAlign = 'center';
    cell2.style.textAlign = 'center';
    cell3.style.textAlign = 'center';
    cell1.innerHTML = col1;
    cell2.innerHTML = col2;
    cell3.innerHTML = col3;
    return true;
}
