import React, { useState, useEffect } from "react";
import { useShopCart } from "../context/Catalog-context";
import { inRightMovingNoOp } from '../animations';
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "./CartItem";
import { useNavigate } from 'react-router-dom'

interface CartProps {
  onClose: () => void;
}

export function ShopCart({ onClose }: CartProps) {
  const { cartQuantity, cartItems } = useShopCart();

  const navigate = useNavigate();
  const handleLocCart = () => {
    onClose()
    navigate('/cart');
  };

  return (
    <>
        <div
            className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
            onClick={() => onClose()}
        />
        <motion.div
            className='fixed overflow-y-scroll w-[350px] sm:w-[500px] h-screen bg-white p-5 right-0 top-0'            transition={{ duration: 0.5 }}
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
        >
        {cartQuantity <= 0 ? (
            <div className='flex flex-col items-center'>
                <span className='text-black-600 tracking-[0.8px] font-exo text-2xl font-medium leading-tight pt-6'>Ваша корзина пуста</span>
            </div>
        ) : (
            <div className='flex flex-col justify-between h-[100%]'>
                <div className="text-black-600 tracking-[0.8px] font-exo text-xl font-medium leading-tight">
                    <span className='text-black-600 tracking-[0.8px] font-exo text-2xl font-medium leading-tight py-6'>Корзина</span>

                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>


                <div className="flex flex-col border-t-1 border-lead-dark ">
                    <div className="flex flex-row justify-between w-[100%] py-5">
                        <span className="font-exo text-xl sm:text-2xl">Итого:</span>
                        <span className="font-exo text-xl sm:text-2xl">
                            {cartItems.reduce((total, product) => {
                                const item = cartItems.find(i => i.id === product.id);

                                if (item) {
                                    return total + ((item.price || 0) * product.quantity);
                                } else {
                                    return total;
                                }
                            }, 0)} руб.
                        </span>
                    </div>
                    <button 
                        className="rounded-[8px] py-4 px-10 text-lg tracking-[0.5px] bg-grad text-white font-exo mt-4"
                        onClick={handleLocCart}
                    >
                        Оформить заказ
                    </button>
                </div>
            </div>
        )}
        </motion.div>
    </>
  );
}
