//url contains applink share through app script deployment
const url = "https://script.google.com/macros/s/AKfycbwIDnqEJGg5_c_68b4lVWTyEewRCN_Zo03KAEmXK3xNB1RAnScQJO8tcoaocvK-oZ07/exec"
const loading = document.getElementById("loader");
loadData();
function loadData() {
    const sheet = "weekly_top_ce101";
    const sheet2 = "overAll_top_std_ce101";
    const newURL = url + '?data=' + sheet;
    const newURL2 = url + '?data=' + sheet2;
    fetch(newURL).then((rep) => rep.json()).then((data) => {
        loading.remove();
        const top_std_of_week = data.data;

        mapThroughData(top_std_of_week, "top_std_of_week")
    })
    fetch(newURL2).then((rep) => rep.json()).then((data) => {
        loading.remove();
        const overall_top_std = data.data;
        // console.log("overall_top_std",overall_top_std)
        mapThroughData(overall_top_std, "overall_top_std")
    })
}

function mapThroughData(data, container) {
    // console.log("data:::", data)

    data.map(item => {
        // console.log("item inside map::",item)
        createContent(item, container)
    })
}

function createContent(item, container) {
    // console.log("item::", item.student_name)
    let parentDiv = document.getElementById(container);
        let fameDiv = document.createElement("div");
        fameDiv.classList.add("staffer");
        let responsiveClass = `${container == "overall_top_std" ? "fame-responsive" : "no-responsive"}`
        // console.log("responsiveClass ::: ", responsiveClass, "for :::", container)
        fameDiv.classList.add(responsiveClass);
        const divContainer = `${container === "top_std_of_week" ? 
        `<img class="staffer-image" src="/assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
        <div>
            <h3 class="staffer-name">
                ${item.student_name}
            </h3>
            ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
            <p>${ item.week ? item.week : "" }</p>
        </div>` 
        :
        `${item.student_name !== "" ? `<div class="fame-std-container">
        <img class="staffer-image" style="width: 100px" src="/assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
        <div class="fame-detailContainer">
            <h3 class="staffer-name">
                ${item.student_name}
            </h3>
            ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
            <p>${ item.position ? item.position : "" }</p>
        </div>
        </div>
        ${item.position !== "" ? `<div class="fame-position-image"><img class="staffer-image fame-badge-image"src="/assets/images/positions/${item.position && item.position+".jpeg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image"></div>` : ""}` : "" }`
    }`
            fameDiv.innerHTML = divContainer;
        parentDiv.appendChild(fameDiv);
}