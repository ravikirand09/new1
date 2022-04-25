document.getElementById("expForm").addEventListener("submit", addExpense);


const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense(e) {
  e.preventDefault();

  // get type, friend, name, date, currency and amount
  let type = document.getElementById("type").value;
  let friend = document.getElementById("friend").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let currency = document.getElementById("currency").value;
  let amount = document.getElementById("amount").value;

  if (type != "Select" && name.length > 0 && date != 0 && amount > 0) {
    const expense = {
      type,
      friend,
      name,
      date,
      currency,
      amount,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1
    };

    expenses.push(expense);
    
    // localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  document.getElementById("expForm").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");

  expenseTable.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].name}</td>
                <td>${expenses[i].friend}</td>
                <td>${expenses[i].date}</td>
                <td>${expenses[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                    Delete</td>
                <td><a class="editButton" onclick="editExpense(${expenses[i].id})">
                    Edit</td>
            </tr>
        `;
  }
};

const deleteExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      expenses.splice(i, 1);
    }
  }

  // localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
};

showExpenses();
