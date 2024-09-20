import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  purchasedItems: localStorage.getItem("purchasedItems")
    ? JSON.parse(localStorage.getItem("purchasedItems"))
    : [], // Load from local storage or set empty array
};

export const cartSlice = createSlice({
  name: "purchasedItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, noItem, itemSize } = action.payload;

      const isClothesOrShoes =
        item.category === "Clothes" || item.category === "Shoes";

      // Find the item in the cart by ID and size if applicable
      const existingItemIndex = state.purchasedItems.findIndex((cartItem) => {
        if (cartItem.id === item.id) {
          if (isClothesOrShoes) {
            // Check sizes for clothes or shoes
            switch (itemSize) {
              case "S":
                return cartItem.itemSize === "S" && cartItem.noItem > 0;
              case "M":
                return cartItem.itemSize === "M" && cartItem.noItem > 0;
              case "L":
                return cartItem.itemSize === "L" && cartItem.noItem > 0;
              default:
                return false;
            }
          }
          return true; // If not clothes or shoes, just check by ID
        }
        return false;
      });

      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        state.purchasedItems[existingItemIndex].noItem += noItem;
      } else {
        // Check stock for clothes/shoes sizes before adding a new item
        if (isClothesOrShoes) {
          let canAdd = false;
          switch (itemSize) {
            case "S":
              canAdd = item.stock.smallSize >= noItem;
              break;
            case "M":
              canAdd = item.stock.mediumSize >= noItem;
              break;
            case "L":
              canAdd = item.stock.largeSize >= noItem;
              break;
            default:
              canAdd = false;
          }

          if (!canAdd) {
            console.log("Insufficient stock for the selected size.");
            return; // Prevent adding the item if stock is insufficient
          }
        }

        const newItem = { ...item, noItem, itemSize };
        state.purchasedItems.push(newItem);
        console.log("Item added to cart:", newItem);
      }

      // Save updated cart to local storage
      localStorage.setItem(
        "purchasedItems",
        JSON.stringify(current(state.purchasedItems))
      );
      console.log("The cart looks like this:", current(state.purchasedItems));
    },

    updateIncrement: (state, action) => {
      const { item, noItem, itemSize } = action.payload;

      const isClothesOrShoes =
        item.category === "Clothes" || item.category === "Shoes";

      // Find the item in the cart by ID and size if applicable
      const existingItemIndex = state.purchasedItems.findIndex((cartItem) => {
        if (cartItem.id === item.id) {
          if (isClothesOrShoes) {
            // Check sizes for clothes or shoes
            switch (itemSize) {
              case "S":
                return cartItem.itemSize === "S" && cartItem.noItem > 0;
              case "M":
                return cartItem.itemSize === "M" && cartItem.noItem > 0;
              case "L":
                return cartItem.itemSize === "L" && cartItem.noItem > 0;
              default:
                return false;
            }
          }
          return true; // If not clothes or shoes, just check by ID
        }
        return false;
      });
      if (existingItemIndex !== -1) {
        // If the item exists in the cart, increment its quantity
        console.log(noItem);
        state.purchasedItems[existingItemIndex].noItem += noItem;
        localStorage.setItem(
          "purchasedItems",
          JSON.stringify(current(state.purchasedItems))
        );
      }
    },

    updateDecrement: (state, action) => {
      const { item, noItem, itemSize } = action.payload;
    
      const isClothesOrShoes =
        item.category === "Clothes" || item.category === "Shoes";

      const existingItemIndex = state.purchasedItems.findIndex((cartItem) => {
        if (cartItem.id === item.id) {
          if (isClothesOrShoes) {
            // Check sizes for clothes or shoes
            switch (itemSize) {
              case "S":
                return cartItem.itemSize === "S" && cartItem.noItem > 0;
              case "M":
                return cartItem.itemSize === "M" && cartItem.noItem > 0;
              case "L":
                return cartItem.itemSize === "L" && cartItem.noItem > 0;
              default:
                return false;
            }
          }
          return true; // If not clothes or shoes, just check by ID
        }
        return false;
      });

      if (existingItemIndex !== -1) {
        // If the item exists, decrement its quantity
        state.purchasedItems[existingItemIndex].noItem -= noItem;

        // If the quantity is greater than 0, update local storage
        if (state.purchasedItems[existingItemIndex].noItem > 0) {
          localStorage.setItem(
            "purchasedItems",
            JSON.stringify(current(state.purchasedItems))
          );
        } else {
          // If quantity is 0 or less, remove the item from the cart
          state.purchasedItems.splice(existingItemIndex, 1);
          localStorage.setItem(
            "purchasedItems",
            JSON.stringify(current(state.purchasedItems))
          );
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateIncrement, updateDecrement } =
  cartSlice.actions;

export default cartSlice.reducer;
