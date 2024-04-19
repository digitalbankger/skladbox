import React from "react";
import { useShopCart } from "../context/Catalog-context";

interface CartItemProps {
    id: number
    quantity: number
}

export function CartItem( {id, quantity}: CartItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems } = useShopCart()
    const item = cartItems.find(i => i.id === id);

    if (item == null) return null;

    const btnClasses = ['py-1 px-3 border font-exo text-lead-dark rounded-[6px] bg-transparent'];

    return (
        <div className="flex flex-row justify-between items-start mt-5 pb-5 border-b-1 border-lead-dark last:border-b-0">
            <img
                src={item.img} 
                className="mr-5 w-[110px] sm:w-[200px]"
            />

            <div className="flex flex-col py-0 sm:py-3 w-[100%]">
                <div className='text-black-600 tracking-[0.8px] font-exo text-base font-medium leading-tight mb-1'>
                    {item.name}
                </div>

                <div className="flex flex-row justify-start mb-2">
                    <div className='text-lead-dark tracking-[1px] font-exo text-base font-light leading-normal mb-2 me-3'>
                        {quantity} шт:
                    </div>

                    <div className='text-lead-dark tracking-[1px] font-exo text-base font-light leading-normal mb-2'>
                        {item.price !== undefined ? item.price * quantity : 0} руб.
                    </div>
                </div>

                <div className='flex flex-row justify-between items-center w-[100%]'>
                    <div className='flex items-center justify-between'>
                        <button 
                            className={btnClasses.join(' ')}
                            onClick={() => decreaseCartQuantity(item.id)}
                        >
                            -
                        </button>

                        <span className='text-lead-dark tracking-[0.6px] font-exo text-base font-light leading-normal mx-2'>
                            {quantity} шт
                        </span>

                        <button
                            className={btnClasses.join(' ')}
                            onClick={() => increaseCartQuantity(item.id, item.name, item.price, item.img)}
                        >
                            +
                        </button>
                    </div>

                    <button 
                        className='py-2 px-2 bg-red-500 rounded-[6px]'
                        onClick={() => removeFromCart(item.id)}
                    >
                        <img src="./assets/svg/delete.svg" width={18}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
