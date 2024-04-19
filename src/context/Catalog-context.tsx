import React, { ReactNode, createContext, useContext, useState } from "react";
import { ShopCart } from "../components/ShopCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ShopCartProviderProps {
    children: ReactNode
}

interface ICartItem {
    id: number
    quantity: number
    name: string
    price: number
    img: string
}

interface IShopCartContext {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number,  name: string, price: number, img: string) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: ICartItem[]
}

export const ShopCartContext = createContext<IShopCartContext>({
    getItemQuantity: (id: number) => 0,
    increaseCartQuantity: (id: number) => {},
    decreaseCartQuantity: (id: number) => {},
    removeFromCart: (id: number) => {},
    isOpen: false,
    openCart: () => {},
    closeCart: () => {},
    cartQuantity: 0,
    cartItems: []
})

export function useShopCart() {
    return useContext(ShopCartContext)
}

export function ShopCartProvider({ children }: ShopCartProviderProps) {
    const [isOpen, setCartState] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>('shop-cart', [])
    
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setCartState(true)
    const closeCart = () => setCartState(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number, name: string, price: number, img: string) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                // Если товар отсутствует в корзине, добавляем его с количеством 1
                return [...currItems, { id, quantity: 1, name, price, img }]
            } else {
                // Если товар уже присутствует в корзине, увеличиваем его количество на 1
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1 ) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
 
    return (
        <ShopCartContext.Provider 
            value={{ 
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity,
                removeFromCart,
                isOpen,
                openCart, 
                closeCart,
                cartItems,
                cartQuantity
            }}>
            {children}
        </ShopCartContext.Provider>
    )
}