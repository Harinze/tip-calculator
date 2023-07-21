// Get references to the required elements
const billInput = document.querySelector('input[name="bill"]');
const tipPercentButtons = document.querySelectorAll('.tip-percent');
const customTipInput = document.querySelector('input[name="custom"]');
const peopleInput = document.querySelector('input[name="people"]');
const tipAmountPerPerson = document.querySelector('#tip-amount');
const totalAmountPerPerson = document.querySelector('#total-amount');
const resetButton = document.querySelector('button[type="reset"]');



// Helper function to calculate the tip amount per person
function calculateTipAmountPerPerson(totalBill, tipPercent, numberOfPeople) {
  return (totalBill * (tipPercent / 100)) / numberOfPeople;
}

// Helper function to calculate the total amount per person (including tip)
function calculateTotalAmountPerPerson(totalBill, tipPercent, numberOfPeople) {
  const tipAmount = (totalBill * (tipPercent / 100));
  return (totalBill + tipAmount) / numberOfPeople;
}

// Function to handle the bill calculation
function calculateBill() {
  const billAmount = parseFloat(billInput.value) || 0;
  const customTipPercent = parseFloat(customTipInput.value) || 0;
  const numberOfPeople = parseInt(peopleInput.value) || 0;


  if (numberOfPeople <= 0) {
    document.querySelector('.error-message').textContent = "Can’t be less than or equal zero";
    return;
  } else {
    document.querySelector('.error-message').textContent = ""; // Clear error message if valid value is entered
  }

  let tipPercent = 0;

  // Check if a custom tip percentage is provided, otherwise use the selected button value
  if (!isNaN(customTipPercent) && customTipPercent > 0) {
    tipPercent = customTipPercent;
  } else {
    const selectedButton = document.querySelector('.tip-percent.active');
    if (selectedButton) {
      tipPercent = parseFloat(selectedButton.value);
    }
  }
  const tipAmount = calculateTipAmountPerPerson(billAmount, tipPercent, numberOfPeople);
  const totalAmount = calculateTotalAmountPerPerson(billAmount, tipPercent, numberOfPeople);

  // Update the summary section with the calculated values
  tipAmountPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountPerPerson.textContent = `$${totalAmount.toFixed(2)}`;
}

// Add event listeners to the tip percent buttons and the custom input field
tipPercentButtons.forEach(button => {
  button.addEventListener('click', () => {
    tipPercentButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    calculateBill();
  });
});

customTipInput.addEventListener('input', () => {
  tipPercentButtons.forEach(btn => btn.classList.remove('active'));
  calculateBill();
});

// Add event listener to the number of people input field
peopleInput.addEventListener('input', calculateBill);

// Add event listener to the reset button
resetButton.addEventListener('click', () => {
  billInput.value = '';
  tipPercentButtons[0].click(); // Reset tip percent to the default (5%)
  peopleInput.value = '';
  calculateBill();
});
