const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalPrice: state.totalPrice + action.payload.product.price,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    case "UPDATE_CART":
      const itemExistsUpdate = state.cartItems.find((item) => {
        return item.product.id === action.payload.product.id;
      });

      if (itemExistsUpdate) {
        if (action.payload.count === 0) {
          return {
            ...state,
            cartItems: state.cartItems.filter(
              (item) => item.product.id !== action.payload.product.id
            ),
            totalPrice:
              state.totalPrice -
              itemExistsUpdate.product.price * itemExistsUpdate.quantity,
          };
        } else {
          const oldItem = state.cartItems.find(
            (item) => item.product.id === action.payload.product.id
          );
          const priceDifference =
            action.payload.product.price * action.payload.count -
            oldItem.product.price * oldItem.quantity;

          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.product.id === action.payload.product.id
                ? {
                    product: action.payload.product,
                    quantity: action.payload.count,
                  }
                : item
            ),
            totalPrice: state.totalPrice + priceDifference,
          };
        }
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { product: action.payload.product, quantity: action.payload.count },
          ],
          totalPrice:
            state.totalPrice +
            action.payload.product.price * action.payload.count,
        };
      }

    case "REMOVE_FROM_CART":
      const itemToRemove = state.cartItems.find(
        (item) => item.product.id === action.payload.id
      );
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.product.id !== action.payload.id;
        }),
        totalPrice:
          state.totalPrice - itemToRemove.product.price * itemToRemove.quantity,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
