import React from "react";
import { useShopCart } from "../context/Catalog-context";
import { CheckoutItem } from "../components/CheckoutItem";
import { useNavigate } from "react-router-dom";
import { animateInView } from "../animations";
import { motion } from "framer-motion";


export function Cart() {
    const { cartItems } = useShopCart();
    const navigate = useNavigate();
    const handleLocCheckout = () => {
        navigate('/checkout');
    };

    return (
        <motion.div 
            className='section flex justify-center bg-center bg-cover py-20 px-3 sm:px-5'
            initial="hidden"
            whileInView="visible"
            variants={animateInView}
            transition={{ duration: 0.8 }}
            viewport={{once: true}}
        >
            <div className="container flex flex-col items-end mt-10">

                <div className="w-[100%] shadow-xl shadow-stone-300 border-1 border-slate-100 rounded-[20px] p-6 text-black-600 tracking-[0.8px] font-exo text-xl font-medium leading-tight">
                    <span className='text-black-600 tracking-[0.8px] font-exo text-4xl font-medium leading-tight py-6'>Корзина</span>
                    <p className="text-lead-dark tracking-[1px] font-exo text-base font-light leading-normal my-5">В вашей корзине {cartItems.length} товар(ов) </p>
                    {cartItems.map(item => (
                        <CheckoutItem key={item.id} {...item} />
                    ))}
                    <div className="flex flex-col  border-lead-dark mt-5">
                        <div className="flex flex-row justify-between w-[100%] py-5">
                            <span className="font-exo text-xl sm:text-2xl">Общая стоимость:</span>
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
                    </div>
                </div>
                <button 
                    className="rounded-[8px] py-4 px-10 text-lg tracking-[0.5px] bg-grad text-white font-exo mt-4"
                    onClick={handleLocCheckout}
                >
                    Подтвердить заказ
                </button>
            </div>
        </motion.div>
    )
}