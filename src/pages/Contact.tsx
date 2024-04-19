import { motion } from "framer-motion";
import { animateInView, miniInDownMoving } from "../animations";
import { useState } from "react";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        telegram: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: "YOUR_CHAT_ID",
                        text: `New message from ${formData.name} (${formData.telegram}): ${formData.message}`,
                    }),
                }
            );

            if (response.ok) {
                alert("Собщение успешно отправлено");
            } else {
                alert("Ошибка при отправке сообщения");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <motion.div 
                className='section h-[660px] sm:h-[600px] h-full px-5 flex justify-center bg-center bg-cover py-3'
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={animateInView}
                transition={{ duration: 0.8 }}
            >
                <div 
                    className='container w-[100%] flex flex-col py-10 sm:py-10 px-3 sm:flex-row items-start sm:items-center sm:justify-between relative'
                >
                    <div className='w-[100%] sm:w-[48%] sm:pt-0 pt-3 mb-6 sm:mb-0 sm:mt-14 mt-6 sm:order-1 order-2'>
                        <form onSubmit={handleSubmit} className="max-w-[100%] mx-auto">
                            <div className="mb-4">
                                <label htmlFor="name" className="text-lead-dark tracking-[1px] font-exo text-base sm:text-xl font-normal leading-normal">
                                    Ваше имя:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telegram" className="text-lead-dark tracking-[1px] font-exo text-base sm:text-xl font-normal leading-normal">
                                    Ваш Telegram:
                                </label>
                                <input
                                    type="text"
                                    id="telegram"
                                    name="telegram"
                                    value={formData.telegram}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="text-lead-dark tracking-[1px] font-exo text-base sm:text-xl font-normal leading-normal">
                                    Сообщение:
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleTextareaChange}
                                    required
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-[8px] py-4 px-10 text-lg tracking-[0.5px] bg-grad text-white font-exo mt-4"
                            >
                                Отправить
                            </button>
                        </form>
                    </div>
                    <div className='w-[100%] sm:w-[46%] sm:mt-0 mt-14 flex flex-col items-start order-1 sm:order-2'>
                        <motion.h2
                            className='font-exo text-2/5xl sm:text-4/5xl leading-snug text-black text-center sm:text-left'
                            variants={miniInDownMoving}
                            transition={{ duration: 0.5 }}
                        >
                            Наши контакты
                        </motion.h2>
                        <motion.p 
                            className='w-[86%] sm:w-[100%] text-lead-dark tracking-[1px] font-exo text-xl sm:text-lg font-extralight leading-normal text-left sm:text-left mt-4 mb-11'
                            variants={miniInDownMoving}
                            transition={{ duration: 0.7 }}
                        >
                            Свяжитесь с нами любым удобным способом
                        </motion.p>

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
                </div>
            </motion.div>
        </>
    )
}
