import React from "react";
import { useShopCart } from "../context/Catalog-context";
import { useLocation } from "react-router-dom";

interface CartItemProps {
    id: number;
    quantity: number;
}

export function CheckoutItem({ id, quantity }: CartItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems } = useShopCart();
    const item = cartItems.find(i => i.id === id);
    const location = useLocation();

    if (item == null) return null;

    const btnClasses = ['py-1 px-3 border font-exo text-lead-dark rounded-[6px] bg-transparent'];

    return (
        <>
        {location.pathname === '/cart' && (<div className="flex flex-col sm:flex-col justify-between items-start mt-3 pb-5 border-b-1 border-lead-dark last:border-b-0">
            <div className="flex flex-row justify-between w-[100%] mb-3">
                <img 
                    src={item.img}
                    className="mr-3 sm:mr-5 w-[130px] sm:w-[160px]"
                />
                <div className="flex flex-col justify-between py-3 w-[100%]">
                    <div className='flex flex-col sm:flex-row justify-between items-top w-[100%]'>
                        <div className='text-black-600 tracking-[0.8px] font-exo text-lg font-medium leading-tight mb-1'>
                            {item.name}
                        </div>

                        <div className="flex flex-row justify-start mb-1">
                            <div className='text-lead-dark tracking-[1px] font-exo text-sm sm:text-base font-medium leading-normal mt-2 sm:mt-0 mb-2'>
                                {item.price !== undefined ? item.price * quantity : 0} руб.
                            </div>
                        </div>
                    </div>
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
                        className='py-1 sm:py-2 px-4 bg-red-500 text-white text-base rounded-[6px]'
                        onClick={() => removeFromCart(item.id)}
                    >
                        Удалить
                    </button>
                </div>
        </div>
        )}


        {location.pathname === '/checkout' && (<div className="flex flex-row justify-between items-start mt-3 pb-5 border-b-1 border-lead-dark last:border-b-0">

            <img 
                src={item.img} 
                className="mr-5 w-[140px] sm:w-[160px]"
            />

            <div className="flex flex-col justify-between py-3 w-[100%]">
                <div className='flex flex-row justify-between items-center w-[100%]'>
                    
                    <div className='text-black-600 tracking-[0.8px] font-exo text-base font-medium leading-tight mb-1'>
                        {item.name}
                    </div>

                </div>

                <div className='flex flex-row justify-between items-center w-[100%]'>
                    <div className='flex items-center justify-between'>
                        <span className='text-lead-dark tracking-[0.6px] font-exo text-base font-light leading-normal'>
                            {quantity} шт
                        </span>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    );
}
