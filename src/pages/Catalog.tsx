import React, { useState } from "react"
import { products } from "../data/products"
import { ShopItem } from "../components/ShopItem"
import { animateInView } from '../animations'
import { motion } from "framer-motion";

export function Catalog() {
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "desc" ? "asc" : "desc"));
  };

  return (
    <motion.div 
      className='section px-5 flex justify-center bg-center bg-cover py-20'
      initial="hidden"
      whileInView="visible"
      variants={animateInView}
      transition={{ duration: 0.8 }}
      viewport={{once: true}}
    >
      <div className="container flex flex-col item px-3">
        <div className="flex flex-col sm:flex-row justify-between mt-14 mb-6">
            <h2 className="font-exo text-black font-semibold text-3xl sm:text-4xl">Каталог карт</h2>
            <label className="flex items-center my-5 sm:my-0">
                <span className="mr-3 text-lead-dark tracking-[0.6px] font-exo text-base sm:text-lg font-light leading-normal">Сначала дорогие</span>
            
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"               
                        checked={sortOrder === "asc"}
                        onChange={toggleSortOrder} 
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>

                <span className="ml-3 text-lead-dark tracking-[0.6px] font-exo text-base sm:text-lg font-light leading-normal">Сначала дешевые</span>
            </label>
        </div>
        <div className="shop grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedProducts.map(product => (
            <ShopItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}