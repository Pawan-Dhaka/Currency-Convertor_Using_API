console.log("Pawan dhaka is typing...");
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const btn = document.querySelector("button");
const drop = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of drop) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 0) {
        amountVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    let data = await responce.json();
   
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = rate * amountVal;
    let points = finalAmt%1;
    let finalAmtInt = finalAmt - points;
    // console.log(finalAmt);
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmtInt} ${toCurr.value}  `;
})