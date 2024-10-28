// Sample Data for Products, Customers, Orders, and Categories
let storeData = {
    products: [
        { productId: 1, name: "Coca-Cola", categoryId: 1, price: 200, stock: 100 },
        { productId: 2, name: "Potato Chips", categoryId: 2, price: 150, stock: 50 }
    ],
    customers: [
        { customerId: 1, name: "Jessica Mwangi", phone: "0734567890", email: "jessica@example.com" }
    ],
    orders: [
        { orderId: 1, customerId: 1, productId: 1, quantity: 2, totalPrice: 400, status: "Pending" }
    ],
    categories: [
        { categoryId: 1, name: "Beverages" },
        { categoryId: 2, name: "Snacks" },
        { categoryId: 3, name: "Food Stuff"},
        { categoryId: 4, name: "Electronics"}
    ]
 
};

// Utilities for working with forms
function resetForm(formId) {
    document.getElementById(formId).reset();
}

// ------------------- Products Functions -------------------

// Function to populate the product table
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

// Function to get the category name based on the category ID
function getCategoryName(categoryId) {
    const category = storeData.categories.find(cat => cat.categoryId === categoryId);
    return category ? category.name : "Unknown";
}

// Function to populate category dropdown options
function populateCategoryDropdown() {
    const categorySelect = document.getElementById("addProductCategoryId");
    categorySelect.innerHTML = '<option value="" disabled selected>Select Category</option>';
    storeData.categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.categoryId;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Event listener for the Add Product button
document.getElementById("addProductBtn").addEventListener("click", () => {
    document.getElementById("addProductForm").style.display = "block";
    populateCategoryDropdown(); // Populate categories each time the form is shown
});

// Event listener to handle adding a new product
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

// Edit product function
function editProduct(productId) {
    const product = storeData.products.find(p => p.productId === productId);
    document.getElementById("addProductForm").style.display = "block";
    document.getElementById("addProductName").value = product.name;
    document.getElementById("addProductCategoryId").value = product.categoryId;
    document.getElementById("addProductPrice").value = product.price;
    document.getElementById("addProductStock").value = product.stock;
}

// Delete product function
function deleteProduct(productId) {
    storeData.products = storeData.products.filter(p => p.productId !== productId);
    populateProductTable();
}

// Product search function
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

document.addEventListener("DOMContentLoaded", () => {
    let storeData = {
        products: [
            { productId: 1, name: "Coca-Cola", categoryId: 1, price: 200, stock: 100 },
            { productId: 2, name: "Potato Chips", categoryId: 2, price: 150, stock: 50 }
        ],
        customers: [
            { customerId: 1, name: "Jessica Mwangi", phone: "0734567890", email: "jessica@example.com" }
        ],
        orders: [
            { orderId: 1, customerId: 1, productId: 1, quantity: 2, totalPrice: 400, status: "Pending" }
        ],
        categories: [
            { categoryId: 1, name: "Beverages" },
            { categoryId: 2, name: "Snacks" }
        ]
    };
});

    function populateOrderTable(orders = storeData.orders) {
        const orderTableBody = document.querySelector("#orderTable tbody");
        orderTableBody.innerHTML = ""; 

        orders.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${getCustomerName(order.customerId)}</td>
                <td>${getProductName(order.productId)}</td>
                <td>${order.quantity}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="deleteOrder(${order.orderId})">Delete</button>
                </td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    function getProductName(productId) {
        const product = storeData.products.find(prod => prod.productId === productId);
        return product ? product.name : "Unknown Product";
    }

    function getCustomerName(customerId) {
        const customer = storeData.customers.find(cust => cust.customerId === customerId);
        return customer ? customer.name : "Unknown Customer";
    }

    function calculateTotalPrice() {
        const productId = parseInt(document.getElementById("addOrderProductId").value);
        const quantity = parseInt(document.getElementById("addOrderQuantity").value);
        const product = storeData.products.find(p => p.productId === productId);
        return product ? (product.price * quantity) : 0;
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
            totalPrice: calculateTotalPrice(), 
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