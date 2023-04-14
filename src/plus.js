function addTime() {
    console.log("plus button clicked");

    const input = document.createElement("input");
    input.setAttribute("type", "time");

    const div = document.querySelector(".timeInputs");
    div.appendChild(input);
}

const plus = document.querySelector("#plus");
plus.addEventListener("click", addTime);