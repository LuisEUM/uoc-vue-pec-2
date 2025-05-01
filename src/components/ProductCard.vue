<template>
  <div class="product-card">
    <h2>{{ title }}</h2>
    <p>Price: ${{ price }}</p>
    <small v-if="!inStock">Out of stock</small>

    <div class="actions">
      <button
        @click="increaseQuantity"
        :disabled="!inStock || shipping.length === 0"
        class="add-button"
      >
        Add to cart
      </button>

      <p v-if="showFreeShippingMessage" class="shipping-info">
        Buy {{ getRemainingItemsForFreeShipping() }} more items to have free
        shipping!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
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
          freeShippingItems: 10,
        },
        { id: 2, cost: 0.5, days: 15, country: "China", freeShippingItems: 5 },
      ],
      selectedShipping: {},
    };
  },
  methods: {
    increaseQuantity() {
      if (this.shipping.length > 0) {
        this.quantity++;
      }
    },

    // He refactorizado esta función separando sus responsabilidades en métodos más pequeños:
    // 1. Aquí verifico si hay un envío seleccionado
    hasSelectedShipping() {
      return Object.keys(this.selectedShipping).length > 0;
    },

    // 2. Con este método obtengo el mínimo de items para envío gratuito
    getFreeShippingItemThreshold() {
      return this.selectedShipping.freeShippingItems || 0;
    },

    // 3. Aquí calculo cuántos items faltan para tener envío gratis
    getRemainingItemsForFreeShipping() {
      if (!this.hasSelectedShipping()) return 0;

      const threshold = this.getFreeShippingItemThreshold();
      const remaining = threshold - this.quantity;

      return Math.max(0, remaining);
    },

    // 4. Este método decide si debo mostrar el mensaje de envío gratuito
    checkFreeShipping() {
      return (
        this.hasSelectedShipping() &&
        this.getRemainingItemsForFreeShipping() > 0
      );
    },
  },
  computed: {
    showFreeShippingMessage() {
      return this.checkFreeShipping();
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  max-width: 300px;
}

h2 {
  margin-top: 0;
  color: #333;
}

.actions {
  margin-top: 15px;
}

.add-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.add-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.shipping-info {
  font-size: 14px;
  color: #e67e22;
  margin-top: 8px;
}

small {
  color: #e74c3c;
  display: block;
  margin-top: 5px;
}
</style>
