const reducer = (state, action) => {
   if (action.type === 'CLEAR_CART') {
      return { ...state, cart: [] };
   }

   if (action.type === 'REMOVE') {
      return {
         ...state,
         cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
   }

   if (action.type === 'INCREASE') {
      //iterate over that cart before the increase
      let tempCart = state.cart.map((cartItem) => {
         //find the item that has been increased in qty
         if (cartItem.id === action.payload) {
            return { ...cartItem, amount: cartItem.amount + 1 };
         }
         //if cartItem is not the item we are looking for in the cart, return them the way they are
         return cartItem;
      });
      return { ...state, cart: tempCart };
   }

   if (action.type === 'DECREASE') {
      //iterate over that cart before the increase
      let tempCart = state.cart
         .map((cartItem) => {
            //find the item that has been increased in qty
            if (cartItem.id === action.payload) {
               return { ...cartItem, amount: cartItem.amount - 1 };
            }
            //if cartItem is not the item we are looking for in the cart, return them the way they are
            return cartItem;
         })
         .filter((cartItem) => cartItem.amount !== 0); //chain the filter method to remove the item from the cart if its qty is 0
      return { ...state, cart: tempCart };
   }

   if (action.type === 'GET_TOTALS') {
      let { total, amount } = state.cart.reduce(
         (cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            //console.log(price, amount);
            const itemTotal = price * amount;
            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            return cartTotal;
         },
         {
            total: 0,
            amount: 0,
         }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
   }

   if (action.type === 'LOADING') {
      return { ...state, loading: true };
   }

   if (action.type === 'DISPLAY_ITEMS') {
      return { ...state, cart: action.payload, loading: false };
   }

   //handling action type that does not exist
   throw new Error('no matching action type');
};

export default reducer;
