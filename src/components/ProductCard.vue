<template>
  <div class="product-card">
    <h2>{{ title }}</h2>
    <p>Price: ${{ price }}</p>
    <small v-if="!inStock" class="out-of-stock">Out of stock</small>
    <button 
      @click="increaseQuantity" 
      :disabled="!inStock || shipping.length === 0"
    >
      Add to cart
    </button>
    <p v-if="showFreeShippingMessage" class="shipping-message">
      Buy {{ remainingItems }} more items to have free shipping!
    </p>
    <div class="quantity" v-if="quantity > 0">
      <p>Items in cart: {{ quantity }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    inStock: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      quantity: 0,
      shipping: [
        {
          id: 1,
          cost: 3.95,
          days: 3,
          country: "Germany",
          freeShippingItems: 10
        },
        {
          id: 2,
          cost: 0.50,
          days: 15,
          country: "China",
          freeShippingItems: 5
        }
      ],
      selectedShipping: {}
    };
  },
  computed: {
    remainingItems() {
      if (!this.selectedShipping.freeShippingItems) return 0;
      const remaining = this.selectedShipping.freeShippingItems - this.quantity;
      return remaining > 0 ? remaining : 0;
    },
    showFreeShippingMessage() {
      return this.quantity > 0 && 
             Object.keys(this.selectedShipping).length > 0 && 
             this.remainingItems > 0;
    }
  },
  methods: {
    increaseQuantity() {
      if (this.shipping.length > 0) {
        this.quantity += 1;
        
        // Si no hay un shipping seleccionado, seleccionar el primero
        if (Object.keys(this.selectedShipping).length === 0) {
          this.selectedShipping = this.shipping[0];
        }
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.out-of-stock {
  color: red;
  display: block;
  margin: 5px 0;
}

.shipping-message {
  color: blue;
  font-size: 0.9em;
  margin: 10px 0;
}

.quantity {
  margin-top: 15px;
  font-weight: bold;
}
</style> 