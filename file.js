// defining state means the values or data which are going to change

// isproject mai sab se phele state banayai jo ek object hai uske ander array hai having object element 

// state banane ke hum log render kerte hai kuch sample state element ke liye

// phir humne updateState kiya hai jismai hunne your balance, income value and expense value ko update kiya 

// then we deal with how the transaction is added to history

// at last we deal how we delete an transaction form the history by adding the unique id to obejct

var state = {
    balance: 1000,
    income: 1200,
    expense: 1000,
    transactions: [
        // {
        //     id : uniqueId(),
        //     name: 'salary',
        //     amount: 5000,
        //     type: 'income'
        // },
        // {
        //     id : uniqueId(),
        //     name: 'Buy grocery',
        //     amount: 500,
        //     type: 'expense'
        // },
        // {
        //     id : uniqueId(),
        //     name: 'Buy guitar',
        //     amount: 300,
        //     type: 'expense'
        // }
    ]
}

// now after defing the state object we are going to rendere the state object

var balanceEl = document.querySelector("#balance");
var incomeEl = document.querySelector("#income");
var expenseEl = document.querySelector("#expense");
var transactionsEl = document.querySelector("#transaction");
var incomeBtnEl = document.querySelector("#incomeBtn");
var expenseBtnEl = document.querySelector("#expenseBtn");
var nameInputEl = document.querySelector("#name");
var amountInputEl = document.querySelector("#amount");

function init(){
   updateState();
   initiListeners();

}

function uniqueId(){
    return Math.random() *1000000;

}

function initiListeners(){
    incomeBtnEl.addEventListener("click", onAddIncomeclick);
    expenseBtnEl.addEventListener("click", onAddExpenseClick);
}



function onAddIncomeclick(){
    addTransaction(nameInputEl.value,amountInputEl.value, "income");
}

function addTransaction (name, amount, type){
    if( name!== "" && amount!== ""){
        var transaction = {
            id : uniqueId(),
            name: nameInputEl.value,
            amount: parseInt(amountInputEl.value),
            type: type
    
        };
    state.transactions.push(transaction);
    updateState();
    }
    else{ 
        alert('please enter the valid data');
    }
    nameInputEl.value = "";
    amountInputEl.value = "";
}

function onAddExpenseClick(){
    addTransaction(nameInputEl.value, amountInputEl.value, "expense");
}

function onDeleteClick(event){
    var id = parseInt(event.target.getAttribute("data-id"));
    var deleteIndex;
    for(var i=0;i<state.transactions.length;i++){
        if(state.transactions[i].id === id){
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex,1);

    updateState();
}





function updateState(){
    var balance = 0,
            income = 0,
            expense = 0,
            item;
    for(var i=0; i<state.transactions.length; i++){
        item = state.transactions[i];

        if(item.type === 'income'){
            income+= item.amount;
        }
        else if(item.type === "expense"){
            expense+= item.amount;
        }
    }
    balance = income-expense;

    state.balance = balance;
    state.income= income;
    state.expense = expense;

    render();

}


function render(){
    balanceEl.innerHTML = `&#8377;${state.balance}`;
    incomeEl.innerHTML = `&#8377;${state.income}`;
    expenseEl.innerHTML = `&#8377;${state.expense}`;


    var transactionEl, containerEl, amountEl, item, btn;
    transactionsEl.innerHTML = "";
    for(var i=0; i<state.transactions.length; i++){
        item = state.transactions[i];
        var transactionEl = document.createElement("li");  transactionEl.append(item.name);
        transactionsEl.appendChild(transactionEl);
    

    containerEl = document.createElement("div");
    amountEl = document.createElement("span");
    if(item.type ==="income"){
        amountEl.classList.add("income-amt");
    }
    else if(item.type==="expense"){
         amountEl.classList.add("expense-amt");
    }
    amountEl.innerHTML = `&#8377; ${item.amount}`;
    
    containerEl.appendChild(amountEl);
    transactionEl.append(containerEl);
    
    btn =document.createElement("button");
    btn.setAttribute('data-id', item.id);
    // setAttribute(name,value)
    btn.innerHTML = "X";

    btn.addEventListener("click", onDeleteClick);
    containerEl.appendChild(btn);
    transactionEl.appendChild(containerEl);
   }
}


init();

