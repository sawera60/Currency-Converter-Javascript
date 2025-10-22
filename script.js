const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const exchangeRate = document.getElementById("exchange-rate");
const getExchangeRate = document.getElementById("get-rate");
const amountInput = document.getElementById("amount");

const countryList = {
  USD: "US",
  PKR: "PK",
  EUR: "EU",
  INR: "IN",
  CAD: "CA",
  GBP: "GB",
  AUD: "AU",
  CNY: "CN",
  JPY: "JP",
};

// 🪣 Populate dropdowns
for (let currency in countryList) {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = option2.value = currency;  //inserting the value and text in options that we dynamically creted 
  option1.text = option2.text = currency;

  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
}

// Default selections
fromCurrency.value = "USD";
toCurrency.value = "PKR";

function updateFlag(selectId, imgId) {
  const select = document.getElementById(selectId);
  const img = document.getElementById(imgId);
  const currencyCode = select.value;
  const countryCode = countryList[currencyCode];
  img.src = `https://flagsapi.com/${countryCode}/flat/32.png`;
}

// Update flags when dropdowns change
fromCurrency.addEventListener("change", () => updateFlag("from-currency", "from-flag"));
toCurrency.addEventListener("change", () => updateFlag("to-currency", "to-flag"));

// Fetch exchange rate
async function getCurrencyRate() {
  const api_url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_lAfJZMxfT22tmN0s9IELAUaYWmVod2XYhbkqHZ8v&base_currency=${fromCurrency.value}`;

  const response = await fetch(api_url);
  const data = await response.json();

  const rate = data.data[toCurrency.value];
  const amount = amountInput.value || 1; 

  exchangeRate.innerText = `${amount} ${fromCurrency.value} = ${(amount * rate).toFixed(2)} ${toCurrency.value}`;
}

// Click to get exchange rate
getExchangeRate.addEventListener("click", getCurrencyRate);
