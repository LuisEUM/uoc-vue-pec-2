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