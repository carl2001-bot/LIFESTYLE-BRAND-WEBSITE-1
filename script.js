// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cart Modal Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const continueShopping = document.querySelector('.continue-shopping');

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

continueShopping.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Quantity Controls in Cart
const qtyBtns = document.querySelectorAll('.qty-btn');

qtyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const qtyElement = btn.parentElement.querySelector('.qty');
        let qty = parseInt(qtyElement.textContent);
        
        if (btn.textContent === '+') {
            qty++;
        } else if (btn.textContent === '-' && qty > 1) {
            qty--;
        }
        
        qtyElement.textContent = qty;
        updateCartTotals();
    });
});

// Update Cart Totals
function updateCartTotals() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.item-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        const qty = parseInt(item.querySelector('.qty').textContent);
        const total = price * qty;
        
        item.querySelector('.item-total').textContent = `TSh ${total.toLocaleString()}`;
        subtotal += total;
    });
    
    document.querySelector('.summary-row:nth-child(1) span:nth-child(2)').textContent = `TSh ${subtotal.toLocaleString()}`;
    document.querySelector('.summary-total span:nth-child(2)').textContent = `TSh ${subtotal.toLocaleString()}`;
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    let totalItems = 0;
    
    document.querySelectorAll('.qty').forEach(qty => {
        totalItems += parseInt(qty.textContent);
    });
    
    cartCount.textContent = totalItems;
}

// Character Count for Message Textarea
const messageTextarea = document.getElementById('message');
const charCount = document.querySelector('.char-count');

messageTextarea.addEventListener('input', () => {
    const count = messageTextarea.value.length;
    charCount.textContent = `${count}/500 characters`;
});

// Add to Cart Buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // In a real application, you would add the product to the cart
        // For this demo, we'll just show an alert
        alert(`${productName} added to cart!`);
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + 1;
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server
    // For this demo, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
    
    // Reset character count
    charCount.textContent = '0/500 characters';
});

// Initialize cart totals on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartTotals();
});
