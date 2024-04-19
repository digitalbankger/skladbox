import React, { useState } from 'react'
import { IProduct } from '../models'
import { useShopCart } from '../context/Catalog-context'
import { motion } from 'framer-motion'

interface ProductProps {
    product: IProduct
}

export function ShopItem({product}: ProductProps) {
    const btnClasses = ['flex flex-row items-center gap-3 justify-center py-2 px-4 border font-exo text-white rounded-[8px] bg-grad']

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShopCart()
    const quantity = getItemQuantity(product.id)

    return (
        <div className='bg-light rounded-[10px] py-4 px-2 flex flex-col items-center my-3'>
            <img 
                src={product.img} 
                className='mb-4 w-[94%] sm:w-[70%]'
            />
            <div className='product-body w-[94%] sm:w-[70%] flex flex-col px-3'>
                <div className='flex sm:flex-row flex-col justify-between items-start'>
                    <div className='text-black-600 tracking-[0.8px] font-exo text-lg sm:text-xl font-medium leading-tight mb-3'>
                        {product.name}
                    </div>
                    <div className='text-lead-dark tracking-[1px] font-exo text-lg sm:text-xl font-medium leading-normal mb-3'>
                        {product.price} руб
                    </div>
                </div>
                <div>
                </div>
                <div className='my-5 text-lead-dark tracking-[0.6px] font-exo text-base sm:text-lg font-light leading-normal'>
                    <p>{product.description}</p>
                </div>
                {quantity === 0 ?(
                    <motion.button 
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className={btnClasses.join(' ')}
                        onClick = {() => increaseCartQuantity(product.id, product.name, product.price, product.img)}
                    >
                        <img 
                            src='./assets/svg/shop-cart.svg' 
                            width={20} 
                        /> Добавить в корзину
                    </motion.button>
                ) : (
                    <div className='flex flex-row justify-between items-center'>
                        <button 
                            className='py-2 px-4 bg-red-500 text-white font-exo text-base sm:text-base rounded-[8px]'
                            onClick={() => removeFromCart(product.id)}
                        >
                            Удалить
                        </button>

                        <div className='flex items-center justify-between'>
                            <button 
                                className={btnClasses.join(' ')}
                                onClick = {() => decreaseCartQuantity(product.id)}
                            >
                                -
                            </button>

                            <span className='text-lead-dark tracking-[0.6px] font-exo text-base sm:text-lg font-light leading-normal mx-2'>{quantity} шт</span>

                            <button
                                className={btnClasses.join(' ')}
                                onClick = {() => increaseCartQuantity(product.id, product.name, product.price, product.img)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}