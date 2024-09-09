const items = [
    { name: 'Arduino Uno SMD', price: 380, image: 'images/arduino_uno_smd.jpeg' },
    { name: 'Arduino Uno DIP', price: 550, image: 'images/arduino_uno_dip.jpeg' },
    { name: 'Arduino Nano', price: 330, image: 'images/arduino_nano.jpeg' },
    { name: 'Arduino Mega', price: 1300, image: 'images/arduino_mega.jpeg' },
    { name: 'Raspberry Pi 4 4GB', price: 6000, image: 'images/raspberry_pi_4.jpeg' },
    { name: 'STM32F103 Module', price: 370, image: 'images/stm32f103.jpeg' },
    { name: 'Ultrasonic', price: 100, image: 'images/ultrasonic.jpeg' },
    { name: 'DHT 11', price: 120, image: 'images/dht11.jpeg' },
    { name: 'DHT 22', price: 350, image: 'images/dht22.jpeg' },
    { name: 'LDR module', price: 70, image: 'images/ldr_module.jpeg' },
    { name: 'PIR sensor', price: 90, image: 'images/pir_sensor.jpeg' },
    { name: 'MQ2 sensor', price: 150, image: 'images/mq2_sensor.jpeg' },
    { name: 'MPU6050', price: 250, image: 'images/mpu6050.jpeg' },
    { name: 'SG90 servo motor', price: 130, image: 'images/sg90_servo_motor.jpeg' },
    { name: 'DC toy motor', price: 30, image: 'images/dc_toy_motor.jpeg' },
    { name: '5V stepper motor', price: 160, image: 'images/5v_stepper_motor.jpeg' },
    { name: 'Solenoid valve', price: 180, image: 'images/solenoid_valve.jpeg' },
    { name: '16x2 LCD', price: 150, image: 'images/16x2_lcd.jpeg' },
    { name: '20x4 LCD', price: 450, image: 'images/20x4_lcd.jpeg' },
    { name: '0.96 inch LCD', price: 320, image: 'images/0.96_inch_lcd.jpeg' },
    { name: 'LT542 LCD', price: 15, image: 'images/lt542_lcd.jpeg' },
    { name: '5mm LED', price: 1, image: 'images/5mm_led.jpeg' },
    { name: 'HC05 Module', price: 250, image: 'images/hc05_module.jpeg' },
    { name: 'ESP8266-01', price: 160, image: 'images/esp8266-01.jpeg' },
    { name: 'ESP32 Node MCU', price: 370, image: 'images/esp32_node_mcu.jpeg' },
    { name: 'SIM800L', price: 350, image: 'images/sim800l.jpeg' },
    { name: 'RC522 Module', price: 150, image: 'images/rc522_module.jpeg' },
    { name: '9V battery', price: 20, image: 'images/9v_battery.jpeg' },
    { name: 'Battery cap', price: 5, image: 'images/battery_cap.jpeg' },
    { name: '7805', price: 10, image: 'images/7805.jpeg' },
    { name: 'LM317', price: 10, image: 'images/lm317.jpeg' },
    { name: 'Toggle switch', price: 15, image: 'images/toggle_switch.jpeg' },
    { name: 'Sugercube relay 5V', price: 30, image: 'images/sugercube_relay_5v.jpeg' },
    { name: 'Sugercube relay 12V', price: 30, image: 'images/sugercube_relay_12v.jpeg' },
    { name: '1/4W Resistor', price: 1, image: 'images/1-4w_resistor.jpeg' },
    { name: 'Diode', price: 1, image: 'images/diode.jpeg' },
    { name: 'Jumper wire 1strip', price: 80, image: 'images/jumper_wire_1strip.jpeg' },
    { name: 'Bread board', price: 70, image: 'images/bread_board.jpeg' },
    { name: '40x1 male header', price: 10, image: 'images/40x1_male_header.jpeg' },
    { name: 'USB Cable', price: 60, image: 'images/usb_cable.jpeg' },
    { name: 'Alligator clip small', price: 10, image: 'images/alligator_clip_small.jpeg' },
    { name: '25W soldron iron', price: 380, image: 'images/25w_soldron_iron.jpeg' },
    { name: 'Lead 50gm', price: 70, image: 'images/lead_50gm.jpeg' },
    { name: 'Flux', price: 15, image: 'images/flux.jpeg' },
    { name: 'MAS830L Multimeter', price: 800, image: 'images/mas830l_multimeter.jpeg' },
    { name: 'Wire stripper', price: 100, image: 'images/wire_stripper.jpeg' },
    { name: 'Tweezer', price: 120, image: 'images/tweezer.jpeg' },
    { name: 'LM358 IC', price: 10, image: 'images/lm358_ic.jpeg' },
    { name: '555 IC', price: 10, image: 'images/555_ic.jpeg' },
    { name: '74HC595 IC', price: 15, image: 'images/74hc595_ic.jpeg' },
];

let cart = {};

window.onload = function() {
    loadCatalog();
    resetCartOnLoad(); 
    updateCartDisplay();
};

// Load catalog items dynamically
function loadCatalog() {
    const catalog = document.getElementById('catalog');
    catalog.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <div class="quantity-control">
                <button onclick="updateCart('${item.name}', -1, ${item.price})">-</button>
                <input type="text" id="${item.name}-quantity" value="${cart[item.name]?.quantity || 0}" readonly />
                <button onclick="updateCart('${item.name}', 1, ${item.price})">+</button>
            </div>
        `;
        catalog.appendChild(itemElement);
    });
}

// Reset cart on every page load
function resetCartOnLoad() {
    cart = {}; 
    updateCartDisplay(); 
}

// Update cart items and handle item removal
function updateCart(name, change, price) {
    if (!cart[name]) {
        cart[name] = { quantity: 0, price: price };
    }
    cart[name].quantity += change;
    if (cart[name].quantity <= 0) {
        delete cart[name];
    }
    document.getElementById(`${name}-quantity`).value = cart[name]?.quantity || 0;
    updateCartDisplay();
    showToast(`${name} updated in cart.`);
}

// Function to remove an item from the cart and reset its quantity display
function removeFromCart(name) {
    delete cart[name];  // Remove item from cart
    document.getElementById(`${name}-quantity`).value = 0;  // Reset quantity input to 0 on the page
    updateCartDisplay();  // Update cart display to reflect the removal
    showToast(`${name} removed from cart.`);
}


// Update cart display and handle total price and item count
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let totalItems = 0;
    let totalPrice = 0;
    cartItemsContainer.innerHTML = '';

    for (let [name, { quantity, price }] of Object.entries(cart)) {
        totalItems += quantity;
        totalPrice += quantity * price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${name} x ${quantity}</span>
            <span>₹${price * quantity}</span>
            <button class="cart-item-remove" onclick="removeFromCart('${name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    }

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;
}

// Toggle cart sidebar visibility
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}

// Display toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

// Search items functionality
function searchItems() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const items = document.getElementsByClassName('item');
    Array.from(items).forEach(item => {
        const itemName = item.getElementsByTagName('h3')[0].innerText.toLowerCase();
        item.style.display = itemName.includes(input) ? '' : 'none';
    });
}

// Open confirmation modal with order summary
function openConfirmationModal() {
    if (Object.keys(cart).length === 0) {
        showToast('Your cart is empty.');
        return;
    }
    const modal = document.getElementById('confirmationModal');
    const orderSummary = document.getElementById('orderSummary');
    let summaryHTML = '';
    let total = 0;
    for (let [name, { quantity, price }] of Object.entries(cart)) {
        summaryHTML += `<p>${name} x ${quantity} = ₹${quantity * price}</p>`;
        total += quantity * price;
    }
    summaryHTML += `<hr><p><strong>Total: ₹${total}</strong></p>`;
    orderSummary.innerHTML = summaryHTML;
    modal.style.display = 'block';
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

function redirectToWhatsApp() {
    let phoneNumber = '7892195611';  // Replace with your actual phone number
    let message = '*Cart Summary:*\n\n';  // Add a title and extra newlines for spacing

    if (Object.keys(cart).length === 0) {
        showToast('Your cart is empty.');
        return;
    }

    // Loop through the cart items and append them to the message
    for (let [name, { quantity, price }] of Object.entries(cart)) {
        message += `*Item:* ${name}\n*Quantity:* ${quantity}\n*Price:* ₹${price * quantity}\n\n`;  // Use \n for newlines
    }

    // Calculate and append the total price with bold formatting
    let totalAmount = Object.values(cart).reduce((total, { quantity, price }) => total + (quantity * price), 0);
    message += `--------------------\n*Total Price:* ₹${totalAmount}\n--------------------\n`;

    // Construct the WhatsApp URL with the properly formatted message
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open the WhatsApp link in a new tab/window
    window.open(whatsappURL, '_blank');
}

function redirectWhatsApp() {
    let phoneNumber = '7892195611';  // Replace with your actual phone number
    let message = 'Cart Details:\n';

    message += `\nHi I want to make inquiry for additional components`;

    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}
