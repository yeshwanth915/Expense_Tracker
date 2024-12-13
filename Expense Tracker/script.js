const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // For simplicity, let's assume we're just logging the data for now
        console.log("Name: " + name);
        console.log("Email: " + email);
        console.log("Message: " + message);

        // You can add code here to send the data to a server or perform other actions
    });
});
// Add your JavaScript code here
window.onload = function () {
  // Sample data for transaction history
  var transactions = [
      { transaction: "Transaction 1", amount: 100 },
      { transaction: "Transaction 2", amount: -200 },
      { transaction: "Transaction 3", amount: 300 },
      { transaction: "Transaction 4", amount: -400 },
      { transaction: "Transaction 5", amount: 500 }
  ];

  var tableBody = document.querySelector("#transactionTable tbody");

  // Populate transaction history table
  transactions.forEach(function (transaction) {
      var row = tableBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.textContent = transaction.transaction;
      cell2.textContent = "$" + transaction.amount.toFixed(2);
  });
}
// Function to fetch transaction history from localStorage
function getTransactionHistory() {
  // Retrieve transaction history from localStorage or initialize empty array if not present
  return JSON.parse(localStorage.getItem('transactions')) || [];
}

// Function to save transaction history to localStorage
function saveTransactionHistory(transactions) {
  // Save transaction history to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to add a new transaction
function addTransaction(e) {
  e.preventDefault();

  const text = document.getElementById('text').value;
  const amount = +document.getElementById('amount').value;

  if (text.trim() === '' || isNaN(amount)) {
      alert('Please enter valid text and amount');
      return;
  }

  const transaction = {
      id: generateID(),
      text,
      amount
  };

  const transactions = getTransactionHistory();
  transactions.push(transaction);
  saveTransactionHistory(transactions);

  updateUI(transactions);
}

// Function to generate a unique ID for transactions
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Function to update UI with transaction history
function updateUI(transactions) {
  const balance = document.getElementById('balance');
  const incomeDisplay = document.getElementById('money-plus');
  const expenseDisplay = document.getElementById('money-minus');
  const list = document.getElementById('list');

  // Clear the list before updating
  list.innerHTML = '';

  let total = 0;
  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
      const sign = transaction.amount < 0 ? '-' : '+';
      const item = document.createElement('li');
      item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
      item.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>`;
      list.appendChild(item);

      total += transaction.amount;
      if (transaction.amount < 0) {
          expense += transaction.amount;
      } else {
          income += transaction.amount;
      }
  });

  balance.textContent = `$${total.toFixed(2)}`;
  incomeDisplay.textContent = `+$${income.toFixed(2)}`;
  expenseDisplay.textContent = `-$${Math.abs(expense).toFixed(2)}`;
}

window.onload = function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', addTransaction);

  const transactions = getTransactionHistory();
  updateUI(transactions);
}
/* Login Page */
// Get the form element
const loginForm = document.querySelector('.wrapper-login form');

// Add event listener for form submission
loginForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // You can perform validation here if needed

  // Redirect the user to the home page
  window.location.href = "index.html";
});
