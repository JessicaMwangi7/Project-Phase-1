// Sample Data for Products, Customers, and Orders
let storeData = {
    products: [
        { productId: 1, name: "Coca-Cola", categoryId: 1, price: 1.5, stock: 100 },
        { productId: 2, name: "Potato Chips", categoryId: 2, price: 2, stock: 50 }
    ],
    customers: [
        { customerId: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com" }
    ],
    orders: [
        { orderId: 1, customerId: 1, productId: 1, quantity: 2, totalPrice: 3, status: "Pending" }
    ],
    categories: [
        { categoryId: 1, name: "Beverages" },
        { categoryId: 2, name: "Snacks" }
    ]
};

// Utilities for working with forms
function resetForm(formId) {
    document.getElementById(formId).reset();
}

// ------------------- Products Functions -------------------

function populateProductTable(products = storeData.products) {
    const productTableBody = document.querySelector("#productTable tbody");
    productTableBody.innerHTML = "";
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.categoryId)}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button onclick="editProduct(${product.productId})">Edit</button>
                <button onclick="deleteProduct(${product.productId})">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

function getCategoryName(categoryId) {
    const category = storeData.categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : "Unknown";
}

document.getElementById("addProductBtn").addEventListener("click", () => {
    document.getElementById("addProductForm").style.display = "block";
});

document.getElementById("submitProductBtn").addEventListener("click", () => {
    const newProduct = {
        productId: storeData.products.length + 1,
        name: document.getElementById("addProductName").value,
        categoryId: parseInt(document.getElementById("addProductCategoryId").value),
        price: parseFloat(document.getElementById("addProductPrice").value),
        stock: parseInt(document.getElementById("addProductStock").value)
    };
    storeData.products.push(newProduct);
    populateProductTable();
    resetForm("addProductForm");
});

function editProduct(productId) {
    const product = storeData.products.find(p => p.productId === productId);
    document.getElementById("addProductForm").style.display = "block";
    document.getElementById("addProductName").value = product.name;
    document.getElementById("addProductCategoryId").value = product.categoryId;
    document.getElementById("addProductPrice").value = product.price;
    document.getElementById("addProductStock").value = product.stock;
}

function deleteProduct(productId) {
    storeData.products = storeData.products.filter(p => p.productId !== productId);
    populateProductTable();
}

function searchProduct() {
    const searchInput = document.getElementById("productSearch").value.toLowerCase();
    const filteredProducts = storeData.products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );
    populateProductTable(filteredProducts);
}

// ------------------- Customers Functions -------------------

function populateCustomerTable(customers = storeData.customers) {
    const customerTableBody = document.querySelector("#customerTable tbody");
    customerTableBody.innerHTML = "";
    customers.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.customerId}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email}</td>
            <td>
                <button onclick="editCustomer(${customer.customerId})">Edit</button>
                <button onclick="deleteCustomer(${customer.customerId})">Delete</button>
            </td>
        `;
        customerTableBody.appendChild(row);
    });
}

document.getElementById("addCustomerBtn").addEventListener("click", () => {
    document.getElementById("addCustomerForm").style.display = "block";
});

document.getElementById("submitCustomerBtn").addEventListener("click", () => {
    const newCustomer = {
        customerId: storeData.customers.length + 1,
        name: document.getElementById("addCustomerName").value,
        phone: document.getElementById("addCustomerPhone").value,
        email: document.getElementById("addCustomerEmail").value
    };
    storeData.customers.push(newCustomer);
    populateCustomerTable();
    resetForm("addCustomerForm");
});

function deleteCustomer(customerId) {
    storeData.customers = storeData.customers.filter(c => c.customerId !== customerId);
    populateCustomerTable();
}

// ------------------- Orders Functions -------------------

function populateOrderTable(orders = storeData.orders) {
    const orderTableBody = document.querySelector("#orderTable tbody");
    orderTableBody.innerHTML = "";
    orders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerId}</td>
            <td>${order.productId}</td>
            <td>${order.quantity}</td>
            <td>${order.totalPrice}</td>
            <td>${order.status}</td>
            <td>
                <button onclick="deleteOrder(${order.orderId})">Delete</button>
            </td>
        `;
        orderTableBody.appendChild(row);
    });
}

document.getElementById("addOrderBtn").addEventListener("click", () => {
    document.getElementById("addOrderForm").style.display = "block";
});

document.getElementById("submitOrderBtn").addEventListener("click", () => {
    const newOrder = {
        orderId: storeData.orders.length + 1,
        customerId: parseInt(document.getElementById("addOrderCustomerId").value),
        productId: parseInt(document.getElementById("addOrderProductId").value),
        quantity: parseInt(document.getElementById("addOrderQuantity").value),
        totalPrice: parseFloat(document.getElementById("addOrderTotalPrice").value),
        status: document.getElementById("addOrderStatus").value
    };
    storeData.orders.push(newOrder);
    populateOrderTable();
    resetForm("addOrderForm");
});

function deleteOrder(orderId) {
    storeData.orders = storeData.orders.filter(order => order.orderId !== orderId);
    populateOrderTable();
}

// ------------------- Inventory Summary -------------------

function populateInventorySummary() {
    const inventoryTableBody = document.querySelector("#inventoryTable tbody");
    inventoryTableBody.innerHTML = "";
    storeData.categories.forEach(category => {
        const productsInCategory = storeData.products.filter(p => p.categoryId === category.categoryId);
        const totalStock = productsInCategory.reduce((sum, p) => sum + p.stock, 0);
        const totalValue = productsInCategory.reduce((sum, p) => sum + (p.price * p.stock), 0);
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category.name}</td>
            <td>${productsInCategory.length}</td>
            <td>${totalStock}</td>
            <td>${totalValue.toFixed(2)}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

// ------------------- Initialize Tables on Load -------------------

window.onload = function() {
    populateProductTable();
    populateCustomerTable();
    populateOrderTable();
    populateInventorySummary();
};
