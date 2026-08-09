window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

document.addEventListener("DOMContentLoaded", function() {

    let cart = [];

    let addButton = document.querySelector("#addButton");
    let instrumentSelect = document.querySelector("#instrumentSelect");
    let itemQty = document.querySelector("#itemQty");

    let cartTableBody = document.querySelector("#cartTableBody");
    let totalCost = document.querySelector("#totalCost");
    let itemCountBadge = document.querySelector("#itemCountBadge");

    let orderForm = document.querySelector("#orderForm");
    let errorMsg = document.querySelector("#errorMsg");

    let backToTopButton = document.querySelector("#backToTop") || document.querySelector(".top-btn");


    function getPrice(name) {
        if (name === "Fender Guitar") return 1200;
        if (name === "Yamaha Piano") return 3500;
        if (name === "Selmer Saxophone") return 1800;
        if (name === "Drum Kit") return 2100;
        return 0;
    }


    function addToCart() {
        if (!instrumentSelect || !itemQty) return;

        let name = instrumentSelect.value;
        let quantity = parseInt(itemQty.value) || 1;

        if (name === "") {
            alert("Please choose an instrument.");
            return;
        }

        let found = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].quantity += quantity;
                found = true;
                break;
            }
        }

        if (!found) {
            cart.push({
                name: name,
                price: getPrice(name),
                quantity: quantity
            });
        }

        instrumentSelect.value = "";
        itemQty.value = 1;

        showCart();
    }


    function removeFromCart(index) {
        cart.splice(index, 1);
        showCart();
    }


    function showCart() {
        if (!cartTableBody) return;
        cartTableBody.innerHTML = "";

        if (cart.length === 0) {
            cartTableBody.innerHTML =
                "<tr>" +
                "<td colspan='4' class='text-secondary text-center py-3'>" +
                "No instruments added yet. Select items above!" +
                "</td>" +
                "</tr>";

            if (totalCost) totalCost.textContent = "$0.00";
            if (itemCountBadge) itemCountBadge.textContent = "0 items";
        } else {
            let total = 0;
            let count = 0;

            for (let i = 0; i < cart.length; i++) {
                let item = cart[i];
                let subtotal = item.price * item.quantity;

                total += subtotal;
                count += item.quantity;

                let row = document.createElement("tr");

                let nameCell = document.createElement("td");
                nameCell.className = "fw-bold text-warning";
                nameCell.textContent = item.name;

                let quantityCell = document.createElement("td");
                quantityCell.className = "text-center";
                quantityCell.textContent = item.quantity;

                let subtotalCell = document.createElement("td");
                subtotalCell.className = "text-end";
                subtotalCell.textContent = "$" + subtotal.toFixed(2);

                let actionCell = document.createElement("td");
                actionCell.className = "text-center";

                let removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.className = "btn btn-outline-danger btn-sm py-0 px-2";
                removeButton.textContent = "Remove";

                removeButton.addEventListener("click", function() {
                    removeFromCart(i);
                });

                actionCell.appendChild(removeButton);
                row.appendChild(nameCell);
                row.appendChild(quantityCell);
                row.appendChild(subtotalCell);
                row.appendChild(actionCell);

                cartTableBody.appendChild(row);
            }

            if (totalCost) totalCost.textContent = "$" + total.toFixed(2);
            if (itemCountBadge) {
                itemCountBadge.textContent = count === 1 ? "1 item" : count + " items";
            }
        }
    }

    if (addButton) {
        addButton.addEventListener("click", function() {
            addToCart();
        });
    }

if (orderForm) {
    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let postalCode = document.querySelector("#postalCode");

        errorMsg.style.display = "none";

        if (!name.value.match(/^[A-Za-z ]+$/)) {
            errorMsg.textContent = "Name can only contain letters and spaces. Example: John Doe";
            errorMsg.style.display = "block";
            return;
        }
        if (!email.value.includes("@")) {
            errorMsg.textContent = "Please enter a valid email address. Example: JohnDoe@gmail.com";
            errorMsg.style.display = "block";
            return;
        }

        if (!postalCode.value.match(/^[0-9]+$/)) {
            errorMsg.textContent = "Postal code can only contain numbers. Example: 213312";
            errorMsg.style.display = "block";
            return;
        }

        if (!orderForm.checkValidity()) {
            errorMsg.textContent = "Please fill in all required fields.";
            errorMsg.style.display = "block";
            return;
        }

        if (cart.length === 0) {
            errorMsg.textContent = "Please add at least 1 instrument to your order.";
            errorMsg.style.display = "block";
            return;
        }

        alert("Order placed successfully! Thank you for buying from Music Vault.");

        orderForm.reset();
        cart = [];
        showCart();
    });
}


    if (backToTopButton) {
        backToTopButton.addEventListener("click", function() {
            window.scrollToTop();
        });
    }


    showCart();

});