const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const amountInput = document.getElementById("amount");

const currencyList = ["USD", "EUR", "INR", "GBP", "AUD", "CAD", "JPY"];

currencyList.forEach(currency => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromCurrency.add(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toCurrency.add(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }
const rates = {
  USD: { INR: 85.64, EUR: 0.92 },
  INR: { USD: 0.012, EUR: 0.011 },
  // ... Add more as needed
};

  const apiKey = "https://api.exchangerate-api.com/v4/latest/" + from;

  fetch(apiKey)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      result.textContent = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(error => {
      console.error("Error fetching exchange rate:", error);
      result.textContent = "Error fetching exchange rate.";
    });
});
