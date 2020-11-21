
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

function addRow(data) {
    console.log(data);
    let row, cell, content;
    let tbody = document.getElementById('tbody');
    for (vid in data) {
        row = tbody.insertRow(tbody.length - 1);
        content = new Array(data[vid]['village_name'], 0, 0);
        for (c = 0; c < 3; c++) {
            cell = row.insertCell(c);
            cell.style.textAlign = 'center';
            cell.innerHTML = content[c];
        }
    }
    // tbody.rows[tbody.rows.length - 1].value = info; // store village id in village name
    return true;
}
