let container = document.createElement("div");
container.classList.add("container");

let heading = document.createElement("div");
heading.innerHTML = "Table Data";
heading.classList.add("heading", "bg-warning", "text-dark", "bg-opacity-25");

let table = document.createElement("table");
table.classList.add("table", "table-bordered", "border-dark");

let thead = document.createElement("thead");
thead.classList.add("bg-primary", "text-white");

let trHead = document.createElement("tr");
let trHead1 = document.createElement("td");
trHead1.innerHTML = "Id";
trHead1.classList.add("fw-bold", "fs-3");
trHead.append(trHead1);

let tdHead2 = document.createElement("td");
tdHead2.innerHTML = "Name";
tdHead2.classList.add("fw-bold", "fs-3");
trHead.append(tdHead2);

let tdHead3 = document.createElement("td");
tdHead3.innerHTML = "Email";
tdHead3.classList.add("fw-bold", "fs-3");
trHead.append(tdHead3);

let tbody = document.createElement("tbody");
tbody.setAttribute("id", "table-body");
tbody.classList.add("fs-5", "bg-success", "text-dark", "bg-opacity-25");

let span = document.createElement("span");
span.innerHTML = "";

let pag = document.createElement("div");
pag.setAttribute("id", "pagination-wrapper");
pag.classList.add("pag-container");
thead.append(trHead);
table.append(thead);
table.append(tbody);

container.append(heading);
container.append(table);
container.append(span);

document.body.append(container);
document.body.append(pag);

fetch(
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  {
    mathod: "GET",
  }
)
  .then((data) => data.json())
  .then((response) => {
    console.log(response);
    let state = {
      queryset: response,
      page: 1,
      rows: 8,
      window: 5,
    };
    populateData();

    function pagination(queryset, page, rows) {
      let trimStart = (page - 1) * rows;
      let trimEnd = trimStart + rows;
      let trimedData = queryset.slice(trimStart, trimEnd);
      let pages = Math.ceil(response.length / rows);
      return {
        queryset: trimedData,
        pages: pages,
      };
    }

    function pageButtons(pages) {
      let wrapper = document.getElementById("pagination-wrapper");
      wrapper.innerHTML = "";
      let maxLeft = state.page - Math.floor(state.window / 2);
      let maxRight = state.page + Math.floor(state.window / 2);

      if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
      }

      if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);
        maxRight = pages;
        if (maxLeft < 1) {
          maxLeft = 1;
        }
      }

      for (let page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML =
          wrapper.innerHTML + `<button value=${page} >${page}</button>`;
      }

      if (state.page !== 1) {
        wrapper.innerHTML =
          `<button class="first">&#171; First</button>` + wrapper.innerHTML;
      }
      if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="last">Last &#187;</button>`;
      }

      let dynamic = document.getElementById("pagination-wrapper");
      dynamic = addEventListener("click", function (e) {
        document.getElementById("table-body").innerHTML = "";
        state.page = Number(e.target.value);
        populateData();
      });
    }

    function populateData() {
      let data = pagination(state.queryset, state.page, state.rows);
      let array = data.queryset;
      for (let i = 0; i < array.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        td1.innerHTML = array[i].id;
        td2.innerHTML = array[i].name;
        td3.innerHTML = array[i].email;
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tbody.append(tr);
      }
      pageButtons(data.pages);
    }
  })
  .catch((er) => console.error(er));
