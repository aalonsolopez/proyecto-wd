window.onload = function () {
    document
      .getElementById("records-table")
      .insertAdjacentElement("beforeend", tableFetch());
  };

  function tableFetch() {
    var tableBody = document.createElement("tbody");
    fetch("http://wd.etsisi.upm.es:10000/records")
      .then((response) => response.json())
      .then((data) => {
        let i = 1;
        data.map((record) => {
          var row = document.createElement("tr");
          row.setAttribute("scope", "row");
          row.insertAdjacentHTML("beforeend", `<th>${i++}</th>`);
          row.insertAdjacentHTML("beforeend", `<td>${record.username}</td>`);
          row.insertAdjacentHTML("beforeend", `<td>${record.punctuation}</td>`);
          row.insertAdjacentHTML("beforeend", `<td>${record.ufos}</td>`);
          row.insertAdjacentHTML("beforeend", `<td>${record.disposedTime}</td>`);
          row.insertAdjacentHTML("beforeend", `<td>${convertDate(record.recordDate)}</td>`);
          tableBody.appendChild(row);
        });
      });

    return tableBody;
  }

  function convertDate(date) {
    var date = new Date(date);
    return date.toLocaleString();
  }