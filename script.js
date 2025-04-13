let modal = document.getElementById("myModal");
let openModalBtn = document.getElementById("openModalBtn");
let closeModalSpan = document.getElementsByClassName("close")[0];
let addRowBtn = document.getElementById("addRowBtn");
let saveRowBtn = document.getElementById("saveRowBtn");
let createReportBtn = document.getElementById("createReportBtn");
let currentEditRow = null;

openModalBtn.onclick = function() {
    modal.style.display = "flex";
}

closeModalSpan.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

createReportBtn.onclick = function() {
    let filePath = prompt("Введите путь для сохранения отчёта", "report.csv");
    if (filePath) {
        createReport(filePath);
    }
}

function addRow() {
    let table = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);
    let cell8 = newRow.insertCell(7);
    let cell9 = newRow.insertCell(8);

    cell1.innerHTML = '<input type="checkbox">';
    cell2.innerHTML = document.getElementById("culture").value;
    cell3.innerHTML = document.getElementById("yield").value;
    cell4.innerHTML = document.getElementById("landType").value;
    cell5.innerHTML = document.getElementById("sowingDate").value;
    cell6.innerHTML = document.getElementById("sowing").value;
    cell7.innerHTML = document.getElementById("harvestDate").value;
    cell8.innerHTML = document.getElementById("harvestAmount").value;
    cell9.innerHTML = '<button class="edit" onclick="editRow(this)">✏️</button> <button class="delete" onclick="deleteRow(this)">🗑️</button>';

    modal.style.display = "none";
    clearForm();
}

function clearForm() {
    document.getElementById("culture").value = "";
    document.getElementById("yield").value = "";
    document.getElementById("landType").value = "";
    document.getElementById("sowingDate").value = "";
    document.getElementById("sowing").value = "";
    document.getElementById("harvestDate").value = "";
    document.getElementById("harvestAmount").value = "";
}

function editRow(button) {
    let row = button.parentElement.parentElement;
    currentEditRow = row;

    document.getElementById("culture").value = row.cells[1].innerText;
    document.getElementById("yield").value = row.cells[2].innerText;
    document.getElementById("landType").value = row.cells[3].innerText;
    document.getElementById("sowingDate").value = row.cells[4].innerText;
    document.getElementById("sowing").value = row.cells[5].innerText;
    document.getElementById("harvestDate").value = row.cells[6].innerText;
    document.getElementById("harvestAmount").value = row.cells[7].innerText;

    modal.style.display = "flex";
    addRowBtn.style.display = "none";
    saveRowBtn.style.display = "block";
}

function saveRow() {
    currentEditRow.cells[1].innerText = document.getElementById("culture").value;
    currentEditRow.cells[2].innerText = document.getElementById("yield").value;
    currentEditRow.cells[3].innerText = document.getElementById("landType").value;
    currentEditRow.cells[4].innerText = document.getElementById("sowingDate").value;
    currentEditRow.cells[5].innerText = document.getElementById("sowing").value;
    currentEditRow.cells[6].innerText = document.getElementById("harvestDate").value;
    currentEditRow.cells[7].innerText = document.getElementById("harvestAmount").value;

    modal.style.display = "none";
    addRowBtn.style.display = "block";
    saveRowBtn.style.display = "none";
    clearForm();
    currentEditRow = null;
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}

function toggleSelectAll(checkbox) {
    let checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(function(cb) {
        cb.checked = checkbox.checked;
    });
}

function searchTable() {
    let input = document.getElementById("search");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("data-table");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function createReport(filePath) {
    let table = document.getElementById("data-table");
    let rows = table.rows;
    let csvContent = "";

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.cells;
        let rowContent = [];
        for (let j = 1; j < cells.length - 1; j++) {
            rowContent.push(cells[j].innerText);
        }
        csvContent += rowContent.join(",") + "\n";
    }

    let blob = new Blob([csvContent], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filePath;
    link.click();
}