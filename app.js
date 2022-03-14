// Listen For Submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
  // Hide Results
  document.querySelector('#results').style.display = 'none';

  // Show Loader
  document.querySelector('#loading').style.display = 'block';

  // Show Results After 3 Sec
  setTimeout(calcResults, 2500);

  e.preventDefault();
});

function calcResults() {
  // UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  // Change Nums To Dec
  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments
  const x = Math.pow(1 + calcInterest, calcPayments);

  const monthly = (principal * x * calcInterest) / (x - 1);

  // Check If Monthly Number Is Finite
  if (isFinite(monthly)) {
    // Gives 2 Dec Points
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = (monthly * calcPayments - principal).toFixed(2);

    // Show Results
    document.querySelector('#results').style.display = 'block';

    // Hide Loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    showErr('Please Check Your Numbers!');
  }
}

// Show Error
function showErr(error) {
  // Hide Results
  document.querySelector('#results').style.display = 'none';

  // Hide Loader
  document.querySelector('#loading').style.display = 'none';

  // Create Div
  const errorDiv = document.createElement('div');
  // Add Class
  errorDiv.className = 'alert alert-danger';
  // Create Text Node
  errorDiv.appendChild(document.createTextNode(error));
  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Insert Error Before Heading
  card.insertBefore(errorDiv, heading);

  // Clear Error After 3 Sec
  setTimeout(function clearErr() {
    document.querySelector('.alert').remove();
  }, 3000);
}
