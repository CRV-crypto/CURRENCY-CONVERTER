let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");

// START BUTTON FUNCTION
function startApp() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("loadingScreen").style.display = "flex";

    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("appScreen").style.display = "flex";
        loadCurrencies();
    }, 1500);
}

// LOAD ALL CURRENCIES
async function loadCurrencies() {
    let res = await fetch("https://open.er-api.com/v6/latest/USD");
    let data = await res.json();

    let currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        fromCurrency.add(new Option(currency, currency));
        toCurrency.add(new Option(currency, currency));
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}

// CONVERT
async function convert() {
    let amount = document.getElementById("amount").value;
    let from = fromCurrency.value;
    let to = toCurrency.value;

    if (!amount) {
        alert("Enter amount");
        return;
    }

    document.getElementById("result").innerText = "Converting... ⏳";

    let res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    let data = await res.json();

    let rate = data.rates[to];
    let result = amount * rate;

    document.getElementById("result").innerText =
        `💰 ${amount} ${from} = ${result.toFixed(2)} ${to}`;
}

// SWAP
function swap() {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark");
}
