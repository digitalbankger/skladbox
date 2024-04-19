import { motion } from "framer-motion";
import { animateInView, miniInDownMoving } from "../animations";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AboutPage() {

    return (
        <>
            <motion.div 
                className='section sm:h-[660px] sm:h-full px-5 flex justify-center bg-center bg-cover py-3'
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={animateInView}
                transition={{ duration: 0.8 }}
            >
                <div 
                    className='container w-[100%] flex flex-col py-10 sm:py-14 px-3 items-start sm:items-center sm:justify-between relative'
                >
                    <motion.h1
                        className='font-exo text-2/5xl sm:text-4/5xl leading-snug text-black text-center sm:text-left my-10'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        О компании CardSell
                    </motion.h1>
                    <div className="flex flex-col sm:flex-row justify-between w-full">
                        <div className='w-[100%] sm:w-[46%] sm:mt-0 mt-14 flex flex-col items-start order-1 sm:order-2'>
                            <motion.p 
                                className='w-[86%] sm:w-[100%] text-lead-dark tracking-[1px] font-exo text-xl sm:text-lg font-extralight leading-normal text-left sm:text-left mt-4 mb-11'
                                variants={miniInDownMoving}
                                transition={{ duration: 0.7 }}
                            >
                                CardSell.ru — надежная и креативная компания в России, реализующая возможность использования банковских электронных карт на всей территории СНГ. Наша команда профессионалов с многолетним опытом работы в крупных FMCG-компаниях и различных рекламных агентствах предлагает готовый B2B/B2C-пакет решений по предоставлению карт для разовых оплат интернет сервисов.
                            </motion.p>
                        </div>

                        <div className='w-[100%] sm:w-[46%] sm:mt-0 mt-14 flex flex-col items-start order-1 sm:order-2'>
                            <motion.p 
                                className='w-[86%] sm:w-[100%] text-lead-dark tracking-[1px] font-exo text-xl sm:text-lg font-extralight leading-normal text-left sm:text-left mt-4 mb-11'
                                variants={miniInDownMoving}
                                transition={{ duration: 0.7 }}
                            >
                                Мы всегда стараемся сделать жизнь россиян проще и привычнее, даже в условиях жестких ограничений. Со всеми нашими реквизитами вы можете ознакоимться ниже. <br></br><br></br>Мы абсолютно открыты и готовы ответить на любой вопрос касающийся наших услуг<br></br><br></br><Link to="/contact" className='mx-2 text-lead-dark font-medium'>К контактам</Link>.
                            </motion.p>
                        </div>
                    </div>
                    <motion.h2
                        className='font-exo text-2/5xl sm:text-3xl leading-snug text-black text-center sm:text-left my-10'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        Реквизиты компании
                    </motion.h2>
                    
                    <div className="flex flex-col sm:flex-row gap-0 sm:gap-10 mb-4">
                        <div className='flex flex-row mb-6 sm:mb-0'>
                            <img src="./assets/svg/phone-cont.svg" width={24}/>
                            <div className='flex flex-col items-start ms-4'>
                                <p className='text-lg font-exo font-normal text-lead-dark tracking-[0.8px]'>+7 (903) 777-19-98</p>
                                <p className='text-sm font-exo font-extralight text-lead-dark tracking-[0.4px]'>Позвонить по телефону</p>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <img src="./assets/svg/telega-cont.svg" width={24}/>
                            <div className='flex flex-col items-start ms-4'>
                                <p className='text-lg font-exo font-normal text-lead-dark tracking-[0.8px]'>@cardsell</p>
                                <p className='text-sm font-exo font-extralight text-lead-dark tracking-[0.4px]'>Написать в телеграм</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
