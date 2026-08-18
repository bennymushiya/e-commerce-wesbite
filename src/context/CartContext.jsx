import { useState } from "react";
import { useContext, createContext } from "react";
import { getProductById } from "../data/products";

 export let CartContext = createContext(null);

export default function CartProvider({children}) {
    //MARK: - PROPERTIES
    let [cartItems, setCartItems] = useState([]); // {id: 2, quantity: 7}

    function addToCart(productId) {
        let existsing = cartItems.find((item) => item.id === productId)
        if (existsing) {
        let currentQuantity = existsing.quantity
        let updatedCartItems = cartItems.map((item) => item.id === productId ? {id: productId, quantity: currentQuantity + 1} : item)
        setCartItems(updatedCartItems);   // FIXED: now passes the updated array
        } else {
        setCartItems([...cartItems, {id: productId, quantity: 1}]);
        }
    }

    function getCartItemsWithProducts() {
        return cartItems.map(item => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product);
    }

    function removeFromCart(productId) {
        setCartItems(cartItems.filter(item => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId)
            return;
        }
        setCartItems(cartItems.map((item) => item.id === productId ? {...item, quantity} : item));
    }

    function getCartTotal() {
        let total = cartItems.reduce((total, item) => {
        let product = getProductById(item.id)
        return total + (product ? product.price * item.quantity : 0)
                }, 0)
        return total;
    }

    function clearCart() {
        setCartItems([])
    }

    //MARK: - BODY
    return <CartContext.Provider value={{ cartItems, addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart }}>{children}</CartContext.Provider>;
}


//MARK: - CUSTOM HOOK TO EASILY USE AUTH CONTEXT

// every hook has to start with the name use
export function useCart() {
    let context = useContext(CartContext);

    return context;
}
