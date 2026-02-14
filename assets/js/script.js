// script.js for Portfolio Functionality

// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    document.getElementById('datetime').innerText = formattedDate;
}

// Function to show a portfolio item
function showPortfolioItem(itemId) {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        item.style.display = 'none';
    });
    document.getElementById(itemId).style.display = 'block';
}

// Event listener for window load to display date and time
document.addEventListener('DOMContentLoaded', () => {
    displayDateTime();
});

// Example of how to use showPortfolioItem
// You would call showPortfolioItem('item1'); when needed.
