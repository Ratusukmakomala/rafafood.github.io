document.addEventListener('DOMContentLoaded', () => {
    // Define an array to store the cart items
    const cart = [];
  
    // Function to handle "Tambah Pesanan" button click
    const handleAddToCart = (item) => {
      // Check if the item is already in the cart
      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  
      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.quantity++;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        cart.push({ ...item, quantity: 1 });
      }
  
      // Update the cart view
      updateCart();
    };
  
    // Function to update the cart view
    const updateCart = () => {
      // Select the cart container
      const cartContainer = document.querySelector('#cart');
  
      // Clear the current cart content
      cartContainer.innerHTML = '';
  
      // Loop through the cart items and create HTML elements for each item
      cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
  
        cartItem.innerHTML = `
          <div class="cart-title">${item.name}</div>
          <div class="cart-quantity">
            <button class="cart-quantity__btn">-</button>
            <span class="cart-quantity__value">${item.quantity}</span>
            <button class="cart-quantity__btn">+</button>
          </div>
          <div class="cart-quantity__price">Rp <span class="cart-quantity__price--value">${item.price * item.quantity}</span></div>
          <button class="cart-remove__icon">Remove</button>
        `;
  
        // Attach event listener for quantity changes
        const quantityButtons = cartItem.querySelectorAll('.cart-quantity__btn');
        quantityButtons.forEach((button) => {
          button.addEventListener('click', () => {
            handleQuantityChange(item, button.innerText);
          });
        });
  
        // Attach event listener for item removal
        const removeButton = cartItem.querySelector('.cart-remove__icon');
        removeButton.addEventListener('click', () => {
          removeFromCart(item);
        });
  
        // Append the cart item to the cart container
        cartContainer.appendChild(cartItem);
      });
  
      // Calculate and display the total cost
      const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalCostElement = document.querySelector('#totalCost');
      totalCostElement.textContent = `Total Cost: Rp ${totalCost}`;
    };
  
    // Function to handle quantity changes
    const handleQuantityChange = (item, change) => {
      if (change === '+' && item.quantity < 10) {
        item.quantity++;
      } else if (change === '-' && item.quantity > 1) {
        item.quantity--;
      }
  
      updateCart();
    };
  
    // Function to remove an item from the cart
    const removeFromCart = (item) => {
      const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
  
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
      }
    };
  
    // Define an array of sample menu items (you can replace this with your data)
    const menuItems = [
      {
        name: 'BAKED POTATO WEDGES NO KETCHUP',
        description: 'Irisan kentang krispy dengan saus',
        price: 22000,
      },
      {
        name: 'CHIKEN PEPPER',
        description: 'Steak daging ayam yang empuk diolah dengan tambahan pepper',
        price: 53000,
      },
      {
        name: 'CORDON BLEU',
        description: 'Fillet dada ayam digulung dengan irisan daging asap dan keju leleh',
        price: 100000,
      },
      {
        name: 'SWEET SPICY CHICKEN',
        description: 'Sayap ayam goreng dengan bumbu khas Korea bercita rasa pedas',
        price: 25000,
      },
    ];
  
    // Create HTML elements for menu items
    const menuContainer = document.querySelector('.menu__items');
    menuItems.forEach((item) => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('item');
      menuItem.innerHTML = `
        <div class="item__content">
          <div class="item__image-box">
            <img class="item__image" src="assets/img/gallery/bakedpotato.jpeg" alt="${item.name}">
          </div>
          <div class="item__text">
            <h4 class="item__title">${item.name}</h4>
            <p class="item__description">${item.description}</p>
            <h3 class="item_price">Rp <span class="item_price-value">${item.price}</span></h3>
            <a href="#" class="item__cart add-cart-btn btn btn-primary">Tambah Pesanan</a>
          </div>
        </div>
      `;
  
      // Attach event listener for "Tambah Pesanan" button click
      const addToCartButton = menuItem.querySelector('.add-cart-btn');
      addToCartButton.addEventListener('click', () => {
        handleAddToCart(item);
      });
  
      // Append the menu item to the menu container
      menuContainer.appendChild(menuItem);
    });
  
    // Initial update of the cart
    updateCart();
  });
