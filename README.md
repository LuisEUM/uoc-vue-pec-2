# TV Show Manager

This project is a Vue.js application for managing TV shows. It includes components for displaying and managing TV show information.

## Exercises and Solutions

### Exercise 1: Create `ProductCard` Component

- **Props Required:**

  - `title`: String
  - `price`: Number
  - `inStock`: Boolean

- **Data:**

  - `quantity`: Number, initial value: 0
  - `shipping`: Array with predefined values
  - `selectedShipping`: Object, initial value: empty object

- **Template:**
  - Displays title and price.

The component correctly defines the props and data as specified.

### Exercise 2: Add `increaseQuantity` Method

- **Method:** `increaseQuantity` increments `quantity` by 1 if `shipping` has values.
- **Button:** "Add to cart" calls this method.

The method and button are implemented as required.

### Exercise 3: Show "Out of stock" Message

- **Condition:** Display `<small>Out of stock</small>` if `inStock` is false.

The template uses `v-if` to conditionally display the message.

### Exercise 4: Disable "Add to cart" Button

- **Condition:** Button is disabled if `shipping` is empty or `inStock` is false.

The button uses `:disabled` with the correct condition.

### Exercise 5: Free Shipping Message

- **Message:** Show how many more items are needed for free shipping.

The component uses a computed property to calculate and display this message.

## Next Steps

1. **Component Design:** Ensure the design matches the provided image.
2. **Additional Components:** Begin creating other components like `ShowCard`, `CardBoard`, `FilterBar`, and `CardForm`.
