var vill_list;
var vill_data;

function showTable() {
    let table = document.getElementById('tableDiv');
    table.style.width = 500;
    table.style.visibility = 'visible';
    setTimeout(function() {
        table.style.height = '400px';
    }, 300);
}

function hideTable() {
    let table = document.getElementById('tableDiv');
    table.style.height = '10px';
    setTimeout(function() {
        table.style.width = '10px';
        table.style.visibility = 'hidden';
    }, 300);
}

function clearTable(id) {
    document.getElementById(id).innerHTML = '';
}

function showModal() {
    document.getElementById('wall').style.visibility = 'visible';
    document.getElementById('villageModal').style.opacity = '1';
    document.getElementById('villageModal').style.visibility = 'visible';
    document.getElementById('villageExitBtn').onclick = function() {
        document.getElementById('villageModal').style.opacity = '0';
        document.getElementById('villageModal').style.visibility = 'hidden';
        document.getElementById('wall').style.visibility = 'hidden';
    };
}

function showImageModal() {
    document.getElementById('imageModal').style.opacity = '1';
    document.getElementById('imageModal').style.visibility = 'visible';
    document.getElementById('imageExitBtn').onclick = function() {
        document.getElementById('imageModal').style.opacity = '0';
        document.getElementById('imageModal').style.visibility = 'hidden';
        document.getElementById('imageDiv').innerHTML = ''; // Clear Image Div
    };
}

function showOverviewModal() {
    document.getElementById('overviewModal').style.opacity = '1';
    document.getElementById('overviewModal').style.visibility = 'visible';
    document.getElementById('overviewExitBtn').onclick = function() {
        document.getElementById('overviewModal').style.opacity = '0';
        document.getElementById('overviewModal').style.visibility = 'hidden';
        // document.getElementById('overviewDiv').innerHTML = ''; // Clear Overview Div
    };
}

function addRow(id, content) { // content: array
    let cell;
    let tbody = document.getElementById(id);
    let row = tbody.insertRow();
    for (c = 0; c < content.length; c++) {
        cell = row.insertCell(c);
        cell.style.textAlign = 'center';
        cell.innerHTML = content[c];
    }

    return true;
}

function knitTable(data) {
    let tbody = document.getElementById('modalTbody');
    let thead = document.getElementById('modalTheadTr');
    thead.innerHTML = '<th>負責人</th>';
    document.getElementById('villageModalTitle').innerHTML = data[0]['village_name'] + ' 填答內容';
    clearTable('modalTbody');

    for (person in data) {
        addRow('modalTbody', [data[person]['user_name']]);
        tbody.rows[tbody.rows.length - 1].onclick = function(item) { // Add Onclick Event
            clearTable('modalTbody');
            thead.innerHTML = '<th>問卷類別</th>';
            let category = new Array('災前問卷', '災中問卷', '災後問卷', '所有照片');

            for (cat in category) {
                addRow('modalTbody', new Array(category[cat]));
                tbody.rows[tbody.rows.length - 1].onclick = function(item) { // Add Onclick Event
                    let choose = item.target.closest('tr').cells[0].innerHTML;
                    clearTable('modalTbody');

                    switch (choose) {
                        case '災前問卷':
                            thead.innerHTML = '<th>題號</th><th>內容</th><th>答覆</th>';
                            for (no in data[person]['ques']['pre']) {
                                addRow('modalTbody', data[person]['ques']['pre'][no]);
                            }
                            break;
                        case '災中問卷':
                            thead.innerHTML = '<th>題號</th><th>內容</th><th>答覆</th>';
                            for (no in data[person]['ques']['intra']) {
                                addRow('modalTbody', data[person]['ques']['intra'][no]);
                            }
                            break;
                        case '災後問卷':
                            thead.innerHTML = '<th>題號</th><th>內容</th><th>答覆</th>';
                            for (no in data[person]['ques']['post']) {
                                addRow('modalTbody', data[person]['ques']['post'][no]);
                            }
                            break;
                        case '所有照片':
                            let content;
                            thead.innerHTML = '<th>批次</th><th>類型</th><th>時間</th><th>地點</th><th>描述</th>';
                            for (no in data[person]['img']) {
                                content = new Array(
                                    parseInt(no) + 1, data[person]['img'][no]['cat'],
                                    data[person]['img'][no]['time'],
                                    data[person]['img'][no]['location'][0],
                                    data[person]['img'][no]['description']
                                );
                                addRow('modalTbody', content);
                                tbody.rows[tbody.rows.length - 1].onclick = function(item) { // Add Onclick Event
                                    showImageModal();

                                    let batch = item.target.closest('tr').cells[0].innerHTML - 1;

                                    // Show Image
                                    let canvas = document.getElementById('imageDiv');
                                    let div, count = 0, len = data[person]['img'][batch]['img_url'].length;
                                    let subCanvas = new Array(Math.ceil(len / 2));
                                    for (var i = 0; i < Math.ceil(len / 2); i++) {
                                        subCanvas[i] = document.createElement("div");
                                        subCanvas[i].className = 'subCanvas';
                                    }
                                    for (img in data[person]['img'][batch]['img_url']) {
                                        div = document.createElement("a");
                                        div.className = 'img';
                                        div.href = data[person]['img'][batch]['img_url'][img];
                                        div.target = '_blank';
                                        div.style.backgroundImage = 'url("' + data[person]['img'][batch]['img_url'][img] + '")';
                                        subCanvas[Math.floor(count / 2)].appendChild(div);
                                        count += 1;
                                    }
                                    for (i in subCanvas) {
                                        canvas.appendChild(subCanvas[i]);
                                    }
                                }
                            }
                            break;
                    }
                }
            }
        }
    }
}
