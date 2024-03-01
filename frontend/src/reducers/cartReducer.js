import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      //added cart items being stored in item in the first place
      const item = action.payload;

      //check if product being added to cartItem is already in cart
      //Using product here as a reference to product id
      //isItemExist stores the product id reference already present in cart
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      //Condition if isItemExist is true then show the item already in cart
      //if false then show the item being added
      //If isItemExist is true then return and replace all those present items in cart map them in cartItems array
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
