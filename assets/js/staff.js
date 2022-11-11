//url contains applink share through app script deployment

const url = "https://script.google.com/macros/s/AKfycbwIDnqEJGg5_c_68b4lVWTyEewRCN_Zo03KAEmXK3xNB1RAnScQJO8tcoaocvK-oZ07/exec"
const loading = document.getElementById("loader");
const sheet = "staff";
const newURL = url+'?data='+sheet;
loadData();

function loadData() {
    fetch(newURL).then((rep) => rep.json()).then((data) => {
        const listData = data.data;
        loading.remove();
        mapThroughData(listData)
    })
}

function mapThroughData(data) {
    data.map(item => {
        if(item.role == "Instructor"){ 
            createContent(item, "instructors_list")
        }
        else{
            createContent(item, "assistants_list")
        }
    })
}

function createContent(item, container) {
    let parentDiv = document.getElementById(container);
    let stafferDiv = document.createElement("div");
    stafferDiv.classList.add("staffer");

    const divContainer = 
    `<img class="staffer-image" src="/assets/images/staff/${item.image ? item.image : "placeholder.jpeg"}" alt="user-image">
    <div>
        <h3 class="staffer-name">
            ${item.name}
        </h3>
        ${item.email !== "" || item.email !== "n" ? `<p><a href="mailto:${item.email}">${item.email}</a></p>` : ""}
        ${item.appointment == "n" ? "" : item.appointment == "y" && item.appointment_link !== "" ? `<p><a href="${item.appointment_link}" class="btn btn-outline">Book TA appointment</a></p>` : ""}
    </div>`

    stafferDiv.innerHTML = divContainer;
    parentDiv.appendChild(stafferDiv);
}
