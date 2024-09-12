let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

// Load data from localStorage
function loadData() {
  const savedTransactions = localStorage.getItem('transactions');
  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
    transactions.forEach(t => {
      if (t.type === 'Income') {
        totalIncome += t.amount;
      } else {
        totalExpense += Math.abs(t.amount);
      }
    });
    updateTotals();
    renderTransactions();
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Format currency to Rp with thousands separator
function formatCurrency(amount) {
  return 'Rp. ' + amount.toLocaleString('id-ID');
}

function updateTotals() {
  document.getElementById('total-income').textContent = formatCurrency(totalIncome);
  document.getElementById('total-expense').textContent = formatCurrency(totalExpense);
  document.getElementById('total-balance').textContent = formatCurrency(totalIncome - totalExpense);
}

function addTransaction(type, date, description, amount) {
  const transaction = { type, date, description, amount: type === 'Income' ? amount : -amount };
  transactions.push(transaction);
  saveData();
  renderTransactions();
}

function renderTransactions() {
  const table = document.getElementById('transaction-table');
  table.innerHTML = '';

  const typeFilter = document.getElementById('type-filter').value;
  const dateFilter = document.getElementById('date-filter').value;
  const sortOrder = document.getElementById('sort-order').value;

  let filteredTransactions = transactions.filter(t =>
    (typeFilter === 'all' || t.type === typeFilter) &&
    (!dateFilter || t.date === dateFilter)
  );

  filteredTransactions.sort((a, b) => {
    return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
  });

  filteredTransactions.forEach(t => {
    const row = table.insertRow();
    row.innerHTML = `
      <td class="p-2">${t.type}</td>
      <td class="p-2">${t.date}</td>
      <td class="p-2">${t.description}</td>
      <td class="p-2 text-right ${t.type === 'Income' ? '' : 'text-red-500'}">
        ${t.type === 'Income' ? '' : '- '}${formatCurrency(Math.abs(t.amount))}
      </td>
    `;
  });
}

document.getElementById('income-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const date = document.getElementById('income-date').value;
  const description = document.getElementById('income-description').value;
  const amount = parseInt(document.getElementById('income-amount').value);

  totalIncome += amount;
  updateTotals();
  addTransaction('Income', date, description, amount);

  this.reset();
});

document.getElementById('expense-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const date = document.getElementById('expense-date').value;
  const description = document.getElementById('expense-description').value;
  const amount = parseInt(document.getElementById('expense-amount').value);

  totalExpense += amount;
  updateTotals();
  addTransaction('Expense', date, description, amount);

  this.reset();
});

document.getElementById('apply-filters').addEventListener('click', renderTransactions);

// Load data when the page loads
loadData();