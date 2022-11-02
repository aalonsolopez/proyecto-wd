window.onload = function() {
    renderTable();
}

function convertDate(date) {
    var date = new Date(date);
    return date.toLocaleString();
}

function renderTable() {
    var table = document.getElementById("records-table");
    var tableBody = document.createElement('tbody');

    table.appendChild(tableBody);

    fetch('http://wd.etsisi.upm.es:10000/records')
        .then((response) => {
            response.json()
        })
        .then((data) => {
            let recordPossition = 1;
            data.forEach((record) => {
                var row = document.createElement('tr');
                row.setAttribute('scope', 'row');
                row.appendChild('th').setAttribute('scope', 'row').innerText = recordPossition++;
                row.appendChild('td').innerText = record.username;
                row.appendChild('td').innerText = record.punctuation;
                row.appendChild('td').innerText = record.ufos;
                row.appendChild('td').innerText = record.disposedTime;
                row.appendChild('td').innerText = convertDate(record.recordDate);
                tableBody.insertAdjacentElement('beforeend', row);
            })
        })
        .catch((error) => {
            console.log(error);
        })
}