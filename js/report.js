let transactions = [];
let chart;

function loadData() {
  const savedTransactions = localStorage.getItem('transactions');
  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
    renderTransactions();
    renderChart();
  }
}

function renderTransactions() {
  const table = document.getElementById('transaction-table');
  table.innerHTML = '';

  transactions.forEach(t => {
    const row = table.insertRow();
    row.innerHTML = `
                    <td class="p-2">${t.type}</td>
                    <td class="p-2">${t.date}</td>
                    <td class="p-2">${t.description}</td>
                    <td class="p-2 text-right ${t.type === 'Income' ? 'text-green-500' : 'text-red-500'}">${t.type === 'Income' ? '' : '- '}Rp. ${Math.abs(t.amount)}</td>
                `;
  });
}

function renderChart() {
  const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
  const incomeData = transactions.filter(t => t.type === 'Income').map(t => t.amount);
  const expenseData = transactions.filter(t => t.type === 'Expense').map(t => Math.abs(t.amount));
  const labels = transactions.map(t => t.date);

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1
                    }, {
        label: 'Expense',
        data: expenseData,
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.1
                    }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function downloadReport() {
  const { jsPDF } = window.jspdf;

  // Create a new jsPDF instance
  const doc = new jsPDF('p', 'mm', 'a4');

  // Get the report content
  const reportContent = document.createElement('div');
  reportContent.innerHTML = `
                <h1>IE Tracker Report</h1>
                
                <h2>Transaction History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.map(t => `
                            <tr>
                                <td>${t.type}</td>
                                <td>${t.date}</td>
                                <td>${t.description}</td>
                                <td style="color: ${t.type === 'Income' ? 'green' : 'red'}">
                                    ${t.type === 'Income' ? '' : '- '}Rp. ${Math.abs(t.amount)}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

  // Add the transaction table to the PDF
  doc.html(reportContent, {
    callback: function(doc) {
      // Add a new page for the chart
      doc.addPage();

      // Get the chart as an image
      const chartImage = document.getElementById('incomeExpenseChart').toDataURL('image/png');

      // Add the chart image to the PDF
      doc.addImage(chartImage, 'PNG', 10, 10, 190, 100);

      // Save the PDF
      doc.save('ie-tracker-report.pdf');
    },
    x: 10,
    y: 10,
    width: 190,
    windowWidth: 650
  });
}

document.getElementById('download-report').addEventListener('click', downloadReport);

// Load data when the page loads
loadData();