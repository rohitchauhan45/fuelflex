import { ADD_TO_CART, BUY_NOW, REMOVE_ONE, REMOVE_ALL,QUANTITY } from "../type";

const initialState = [];

const cartReducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_TO_CART:
              const existingItem = state.find((item) => item.id === action.payload.id);
              if (existingItem) {
                return state.map((item) =>
                  item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + action.payload.quantity }
                    : item
                );
              } else {
                return [...state, action.payload];
              }

        case BUY_NOW:
            return []; // Clear cart on purchase

            case REMOVE_ONE:
              return state.filter((item) => String(item.id) !== String(action.payload));
            
        case REMOVE_ALL:
            return []; // Clear all items

            case QUANTITY:
                return { ...state }; 
        default:
            return state;
    }
};

export default cartReducer;
