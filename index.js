let transactions = []

function createTransactionContainer(id) {
  const container = document.createElement('div')
  container.classList.add('transaction')
  container.id = `transaction-${id}`
  return container
}

function createTransactionTitle(name) {
  const title = document.createElement('span')
  title.classList.add('transaction-title')
  title.textContent = name
  return title
}

function createTransactionAmount(amount) {
    const span = document.createElement('span')

    const formatter = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    })

    const formattedAmount = formatter.format(amount)

    if (amount > 0) {
        span.textContent = `${formattedAmount} C`
        span.classList.add('transaction-amount', 'credit')
    } else {
        span.textContent = `${formattedAmount} D`
        span.classList.add('transaction-amount', 'debit')
    }
    return span
}

function renderTransaction(transaction) {
    const container = createTransactionContainer(transaction.id)
    const title = createTransactionTitle(transaction.name)
    const amount = createTransactionAmount(transaction.amount)
    const editBtn = createEditTransactionsBtn(transaction)
    const deleteBtn = createDeleteTransactionBtn(transaction.id)

    document.querySelector('#transactions').appendChild(container)
    container.append(title, amount, editBtn, deleteBtn)
}

async function saveTransactions(ev) {
    ev.preventDefault()

    const id = document.querySelector('#id').value
    const name = document.querySelector('#name').value
    const amount = document.querySelector('#amount').value

    // se o id existir, ele faz a edição, senao, cria uma nova transação
    if (id) {
        const response = await fetch(`http://localhost:3000/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                amount: Number(amount)
            })
        })
        const transaction = await response.json()
        const indexToRemove = transactions.findIndex((t) => t.id === transaction.id)
        transactions.splice(indexToRemove, 1, transaction)
        document.querySelector(`transaction-${id}`).remove()
        renderTransaction(transaction)
    } else {
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                amount: Number(amount)
            })
        })

        const transaction = await response.json()
        transactions.push(transaction)
        renderTransaction(transaction)
    }

    ev.target.reset()
    updateBalance()
}

function createEditTransactionsBtn(transaction) {
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.textContent = 'Editar'
    editBtn.addEventListener('click', () => {
        document.querySelector('#id').value = transaction.id
        document.querySelector('#name').value = transaction.name
        document.querySelector('#amount').value = transaction.amount
    })
    return editBtn
}

function createDeleteTransactionBtn(id) {
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = 'Excluir'
    deleteBtn.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/transactions/${id}`, {
            method: 'DELETE'
        })
        deleteBtn.parentElement.remove()
        const indexToRemove = transactions.findIndex((t) => t.id === id)
        transactions.splice(indexToRemove, 1)
        updateBalance()
    })
    return deleteBtn
}

function showHideBalance() {
    const balanceBtn = document.querySelector('#eye')
    const balanceSpan = document.querySelector('#balance')
    balanceBtn.innerHTML = '<i class="bi bi-eye"></i>'
    balanceBtn.addEventListener('click', () => {
        if (balanceBtn.innerHTML == '<i class="bi bi-eye"></i>') {
            balanceSpan.innerText = '******'
            balanceBtn.innerHTML = '<i class="bi bi-eye-slash"></i>'
        } else {
            updateBalance()
            balanceBtn.innerHTML = '<i class="bi bi-eye"></i>'
        }
    })
}

async function fetchTransactions() {
  return await fetch('http://localhost:3000/transactions').then(res => res.json())
}

function updateBalance() {
    const balanceSpan = document.querySelector('#balance')
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    formatter = Intl.NumberFormat('pt-BR', {
        compactDisplay: 'long',
        currency: 'BRL',
        style: 'currency'
    })

    balanceSpan.textContent = formatter.format(balance)
}

async function setup() {
    const results = await fetchTransactions()
    transactions.push(...results)
    transactions.forEach(renderTransaction)
    updateBalance()
}

showHideBalance()
document.addEventListener('DOMContentLoaded', setup)
document.querySelector('form').addEventListener('submit', saveTransactions)