
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
  NZD: "NZ", // New Zealand Dollar
  CHF: "CH", // Swiss Franc
  SGD: "SG", // Singapore Dollar
  HKD: "HK", // Hong Kong Dollar
  KRW: "KR", // South Korean Won
  ZAR: "ZA", // South African Rand
  BRL: "BR", // Brazilian Real
  RUB: "RU", // Russian Ruble
  SEK: "SE", // Swedish Krona
  NOK: "NO", // Norwegian Krone
  MXN: "MX", // Mexican Peso
  AED: "AE", // UAE Dirham
  SAR: "SA", // Saudi Riyal
  TRY: "TR", // Turkish Lira
};

// Add currencies to dropdowns dynamically
for (let currency in countryList) {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = option2.value = currency;
  option1.text = option2.text = currency;

  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
}

// Default selections
fromCurrency.value = "USD";
toCurrency.value = "PKR";

// Update flags function
function updateFlag(selectId, imgId) {
  const select = document.getElementById(selectId);
  const img = document.getElementById(imgId);
  const currencyCode = select.value;
  const countryCode = countryList[currencyCode];
  img.src = `https://flagsapi.com/${countryCode}/flat/32.png`;
}

fromCurrency.addEventListener("change", () => updateFlag("from-currency", "from-flag"));
toCurrency.addEventListener("change", () => updateFlag("to-currency", "to-flag"));

// --- Fetch Exchange Rate
async function getCurrencyRate() {
  const api_key = "d76f53a2e20e3e3698a2d187";
  const api_url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurrency.value}`;

  try {
    const response = await fetch(api_url);
    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("API request failed");
    }

    const rate = data.conversion_rates[toCurrency.value];
    const amount = amountInput.value || 1;

    exchangeRate.innerText = `${amount} ${fromCurrency.value} = ${(amount * rate).toFixed(2)} ${toCurrency.value}`;
  } catch (error) {
    exchangeRate.innerText = "Error fetching exchange rate!";
    console.error("Error:", error);
  }
}

getExchangeRate.addEventListener("click", getCurrencyRate);

