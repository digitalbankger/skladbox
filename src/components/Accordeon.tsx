import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { inDownMoving } from '../animations';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="accordion w-full sm:w-2/3 flex flex-col justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{once: true}}
    >
      {items.map((item, index) => (
        <motion.div 
          key={index} 
          className="accordion-item mb-5"
          variants={inDownMoving}
          transition={{duration: 0.8}}
        >
            <div 
                className="accordion-header cursor-pointer flex flex-row justify-between sm:py-6 py-4 sm:px-8 px-5 rounded-[8px] transition duration-300 ease-in-out shadow-md shadow-my-shad hover:shadow-my-shad-lg " onClick={() => toggleAccordion(index)}
            >
                <h3 className='text-slate-700 tracking-[0.4px] font-exo sm:text-xl text-lg font-medium sm:leading-normal leading-snug'>{item.title}</h3>
                <motion.div
                    className="toggle-icon"
                    animate={{
                        scale: openIndex === index ? [1, 1.2] : [1.2, 1],
                        rotate: openIndex === index ? [0, 180] : [180, 0,],
                        borderRadius: openIndex === index ? ["20%", "20%", "50%", "50%", "20%"] : ["20%", "20%", "50%", "50%", "20%"]
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <img src="./assets/svg/arrow-acord.svg" width={12}/>
                </motion.div>
            </div>
          
            {openIndex === index && <div
                className="accordion-content text-lead-dark tracking-[0.8px] py-6 px-8 font-exo sm:text-lg text-base font-light leading-normal"
            >
                {item.content}
            </div>}
        </motion.div>
      ))}
    </motion.div>
  );
}
