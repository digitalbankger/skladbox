import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { Accordion, AccordionItem } from '../components/Accordeon'
import { animateInView, inLeftMoving, inDownMoving, miniInDownMoving, pulseAnimation } from '../animations'
import { Link, useNavigate } from 'react-router-dom'
import ContainerBox from '../components/ContainerBox'
import WheelForm from '../components/WheelForm'



export function ShinyPage() {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        boxSize: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 675 && width <= 1024) {
                setImageUrl('./assets/img/saas-3/gen-shin-pl.jpg');
            } else if (width < 675) {
                setImageUrl('./assets/img/saas-3/gen-shiny-mob.webp');
            } else {
                setImageUrl('./assets/img/saas-3/gen-shiny.webp');
            }
        };

        window.addEventListener('resize', handleResize);

        // Set initial image URL
        handleResize();

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await axios.post(
          `https://api.telegram.org/bot7182804623:AAHiFno7H-vwCR3iUiaoG0olmoLOAQ-wBZg/sendMessage`,
          {
            chat_id: '-1002054199690',
            text: `Имя: ${formData.name}\nТелефон: ${formData.phone}\nРазмер бокса: ${formData.boxSize}`,
          }
        );
        console.log('Message sent successfully');
        setModalMessage('Заявка успешно отправлена!');
        setModalOpen(true);
      } catch (error) {
        console.error('Error sending message:', error);
        setModalMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
        setModalOpen(true);
      }
    };

    const handleSubmitconsult = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await axios.post(
            `https://api.telegram.org/bot7182804623:AAHiFno7H-vwCR3iUiaoG0olmoLOAQ-wBZg/sendMessage`,
            {
              chat_id: '-1002054199690',
              text: `Консультация:\nИмя: ${formData.name}\nТелефон: ${formData.phone}`,
            }
          );
          console.log('Message sent successfully');
          setModalMessage('Заявка успешно отправлена!');
          setModalOpen(true);
        } catch (error) {
          console.error('Error sending message:', error);
          setModalMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
          setModalOpen(true);
        }
      };

    const closeModal = () => {
      setModalOpen(false);
    };
    
    return (
        <>
        <motion.div 
            className='section h-auto sm:h-[700px] pl:h-[600px] flex justify-center py-3 bg-[#fafcff] bg-top-44 sm:bg-right pl:bg-left bg-[length:100%] sm:bg-[length:62%] bg-no-repeat'
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
        >
            <div 
                className='container flex flex-col w-[100%] rounded-[30px] p-5 sm:p-10 mt-20 pt-20 pb-10 sm:py-10 sm:pt-0 sm:flex-row items-start sm:items-center relative pl:bg-right bg-no-repeat bg-cover'
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className='w-[100%] sm:w-[40%] pl:w-[100%]'>
                    <motion.h1
                        className='sm:w-[100%] pl:w-[80%] w-[100%] font-exo text-[1.7rem] font-semibold uppercase sm:text-4/5xl pl:text-3xl leading-[2.4rem] sm:leading-[1.3em] text-lead'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        Услуги безопасного хранения авто шин
                    </motion.h1>
                    <motion.p 
                        className='w-[100%] sm:w-[90%] text-lead tracking-[1px] font-exo text-[14px] pl:text-[16px] sm:text-xl font-extralight leading-normal mt-4 mb-11'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.7 }}
                    >
                        ✓ Соблюдение температурного режима<br></br>✓ Наличие вентиляции
                    </motion.p>
                    <motion.div 
                        className='flex flex-row justify-between mt-10 sm:mt-0'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.9 }}
                    >

                    <form onSubmit={handleSubmit} className="bg-[#ffffff26] rounded-xl shadow-lg shadow-my-shad-lg xs:p-4 p-6 w-full">
                        <div className="mb-6">
                          <h2 className="text-xl font-exo font-medium mb-3 sm:mb-3 text-lead">Получить консультацию:</h2>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-3'>
                            <div className='flex flex-row space-x-3 w-full sm:w-2/3'>
                            <div className="mb-3 sm:mb-6">
                                <label htmlFor="name" className="block text-lg font-exo text-lead mb-1">Имя:</label>
                                <input type="text" id="name" name="name" className="w-full border-gray-200 rounded-xl px-3 py-4" placeholder='Ваше имя' onChange={handleChange} />
                            </div>
                            <div className="mb-3 sm:mb-6">
                                <label htmlFor="phone" className="block text-lg font-exo text-lead mb-1">Телефон:</label>
                                <input type="text" id="phone" name="phone" className="w-full border-gray-200 rounded-xl px-3 py-4" placeholder='Ваш телефон' onChange={handleChange} />
                            </div>
                            </div>
                            <button className='w-full sm:w-1/3 rounded-xl py-4 px-4 mt-1 border-[0.5px] border-none flex flex-row items-center justify-center bg-bluegen text-lead font-exo tracking-[0.5] text-base' type="submit">Отправить</button>
                        </div>
                    </form>

                    {modalOpen && (
                        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-[99999]">
                        <div className="bg-white p-8 rounded-lg">
                            <p className="text-xl font-exo text-lead-dark font-semibold mb-4">{modalMessage}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={closeModal}>Закрыть</button>
                        </div>
                        </div>
                    )}
                    </motion.div>
                </div>
                <div className='w-[100%] sm:w-[60%] sm:pt-0 pt-3'>
                    
                </div>
            </div>
        </motion.div>

        {/*Секция вторая*/}
        <motion.div 
            className='section px-3 flex justify-center py-12'
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
        >
            <div className='container flex flex-col gap-6 sm:gap-4 rounded-[20px] sm:p-10 py-10 sm:py-0 items-start sm:items-center sm:justify-between relative'>
                <h2
                    className='sm:w-[100%] w-[100%] font-exo text-2xl font-semibold sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead-dark text-center sm:text-left my-6 sm:mt-10 mb-5'
                >
                    Расчет стоимости хранения
                </h2>
                
                <WheelForm/>
            </div>
        </motion.div>

        {/*Секция третья*/}
        <motion.div 
            className='section px-3 flex flex-col items-center justify-center py-12 xs:py-4 shiny-line'
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
            id='catalog'
        >
            <div className='container flex flex-col sm:p-10 py-0 sm:py-0 relative bg-left bg-no-repeat bg-contain'>
                <motion.h2
                    className='sm:w-[100%] w-[100%] font-exo text-[1.6rem] font-semibold sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead-dark text-left mt-6 mb-2 sm:mb-6 sm:mt-10 sm:tb-0'
                    variants={miniInDownMoving}
                    transition={{ duration: 0.5 }}
                >
                    Хранение шин в SkladBox
                </motion.h2>
                
                <div className='w-full flex flex-col items-center relative sm:p-0 sm:pt-10'>
                    <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal mt-6 mb-11'>
                        Шины — специфическая товарная категория, требующая соблюдения регламентированных условий в период сезонного хранения. В компании skladbox шины хранятся с соблюдением всех необходимых условий для поддержния изначального состояния. Соблюдение необхдимых условий хранения исключает возможность появления коррозии и деформации.
                    </p>
                    <div className='flex flex-row xs:flex-col justify-between gap-4 mb-6'>
                        <div className='flex flex-row justify-between gap-4'>  
                            <div className='flex flex-row w-1/2 items-center'>
                                <img src='./assets/svg/temp.svg' className='w-[24%] sm:w-[28%] mr-2'></img>
                                <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-normal leading-normal mt-6 mb-6'>
                                    Поддержка оптимальной температуры
                                </p>
                            </div>
                            <div className='flex flex-row w-1/2 items-center'>
                                <img src='./assets/svg/water.svg' className='w-[26%] mr-2'></img>
                                <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-normal leading-normal mt-6 mb-6'>
                                    Влажность на уровне 50-80%
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between gap-4'>
                            <div className='flex flex-row w-1/2 items-center'>
                                <img src='./assets/svg/fun.svg' className='w-[24%] sm:w-[28%] mr-2'></img>
                                <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-normal leading-normal mt-6 mb-6'>
                                    Наличие вентиляции в боксах
                                </p>
                            </div>
                            <div className='flex flex-row w-1/2 items-center'>
                                <img src='./assets/svg/sun.svg' className='w-[24%] sm:w-[28%] mr-2'></img>
                                <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-normal leading-normal mt-6 mb-6'>
                                    Защита от солнечных лучшей
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal mt-6 mb-6'>
                        Сотрудники компании периодически проводят осмотр всех хранящихся покрышек и их своевременное переворачиваение. Это позволяет устранить возможность образования каких-либо деформаций. 
                    </p>

                    <div className='bg-[#f2f5fc] flex flex-col sm:flex-row rounded-xl justify-between items-center xs:items-start p-8 gap-10 mt-5'>
                        <span className="advice__title te">Важно</span>
                        <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal mt-6 xs:mt-0 mb-6'>
                            Резина во время хранения выделяет ядовитый фенол и характерный запах. При нагреве становится мягче, а при охлаждении твердеет. В таких условиях за сезон колесо может фатально изменить форму
                        </p>
                    </div>
                </div>
            </div>

        </motion.div>

        <motion.div 
            className='section h-auto flex justify-center py-3 '
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
        >
            <div 
                className='container bg-bluegen flex flex-col w-[100%] rounded-[20px] p-5 sm:p-10 py-10 sm:py-10 sm:flex-row items-start sm:items-center relative bg-right-bottom bg-[length:68%] xs:bg-[length:100%] bg-no-repeat'
                style={{ backgroundImage: `url(./assets/img/saas-3/second-shiny.png)` }}
            >
                <div className='w-[100%] sm:w-[55%] flex flex-col justify-center'>
                    <motion.h1
                        className='sm:w-[100%] w-[100%] font-exo text-3xl font-semibold sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        Как мы работаем?
                    </motion.h1>
                    <motion.p 
                        className='w-[100%] sm:w-[90%] text-lead tracking-[1px] font-exo text-lg sm:text-xl font-extralight leading-normal mt-4'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.7 }}
                    >
                        Процедура хранения в skladbox максимально простая и удобная
                    </motion.p>

                    <div className='flex flex-col sm:flex-row gap-4 w-full my-11'>
                        <div className='flex felex-row gap-4 w-full sm:w-[66%]'>
                            <div className='flex flex-col w-1/2 sm:w-1/2'>
                                <p className='font-exo text-xl text-white mb-3'>ШАГ 1</p>
                                <p 
                                    className='w-[100%] text-lead tracking-[1px] font-exo text-[13px] sm:text-base font-extralight leading-normal mb-3'
                                >
                                    Приезжаете на территорию хранения skladbox
                                </p>
                            </div>
                            <div className='flex flex-col w-1/2 sm:w-1/2'>
                                <p className='font-exo text-xl text-white mb-3'>ШАГ 2</p>
                                <p 
                                    className='w-[100%] text-lead tracking-[1px] font-exo text-[13px] sm:text-base font-extralight leading-normal mb-3'
                                >
                                    Заключаете договор хранения. Процедура занимает не более 20 мин.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col w-1/2 sm:w-1/3'>
                            <p className='font-exo text-xl text-white mb-3'>ШАГ 3</p>
                            <p 
                                className='w-[100%] text-lead tracking-[1px] font-exo text-[13px] sm:text-base font-extralight leading-normal mb-3'
                            >
                                Маркируем ваши колеса и храним на специальном складе.
                            </p>
                        </div>
                    </div>

                    <motion.p 
                        className='w-[100%] sm:w-[80%] text-lead tracking-[1px] font-exo text-xl sm:text-2xl leading-normal mb-4'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.7 }}
                    >
                        Остались вопросы?
                    </motion.p>
                    <motion.p 
                        className='w-[100%] sm:w-[70%] text-lead tracking-[1px] font-exo text-lg font-extralight leading-normal mb-4'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.7 }}
                    >
                        Заполните форму и с вами свяжется менеджер в течении 15 мин.
                    </motion.p>
                    <motion.div
                        className='flex flex-row justify-between'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.9 }}
                    >
                    
                    <form onSubmit={handleSubmitconsult}  className="w-full sm:w-[80%] xs:mb-5">
                        <div className='flex flex-col justify-between gap-2 pb-20 sm:pb-0'>
                            <div className='flex sm:flex-row gap-4 w-full'>
                                <div className="mb-6 w-full">
                                    <input type="text" id="name" name="name" className="w-full border-none rounded-xl px-3 py-5 bg-[#ffffff3b] text-white placeholder-[#ffffffbf]" placeholder='Ваше имя' onChange={handleChange}/>
                                </div>
                                <div className="mb-6 w-full">
                                    <input type="text" id="phone" name="phone" className="w-full border-none rounded-xl px-3 py-5 bg-[#ffffff3b] text-white placeholder-[#ffffffbf]" placeholder='Ваш телефон' onChange={handleChange}/>
                                </div>
                            </div>
                            <button className=' rounded-xl py-5 px-4 mt-1 sm:mt-0 bg-white text-bluegen font-exo font-medium tracking-[0.4] text-lg' type='submit'>Получить консультацию</button>
                        </div>
                    </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>

        {/* Секция 6 карта */}
        <div 
            id='contact'
            className='section px-3 flex flex-col sm:flex-row justify-center bg-center bg-cover pt-10 relative'
        >
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abf40f8ab007f7266cbc1b1d69141140f23a323b4b5333c202d56ed0ee8d4bd46&amp;source=constructor" width="50%" height="400" style={{ bottom: '0', right: '0'}} className='mapa'></iframe>

            <div 
                className='container flex flex-col items-center px-3 sm:px-10'
            >

                <div className='flex flex-col sm:flex-row items-end w-full xs:mt-5 mt-20'>
                    <div className='w-full sm:w-1/2 sm:h-[390px] flex flex-col gap-4 justify-center pb-8'>
                    <motion.h2
                        className='sm:w-[100%] w-[100%] font-exo text-3xl font-semibold sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead-dark text-left'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        Наши контакты
                    </motion.h2>
                        <div className='flex  flex-col gap-1'>
                            <a href='tel:+7 (965)-384-53-85'>
                                <p className='font-exo text-lead-dark font-extralight text-lg'>Телефон</p>
                                <p className='font-exo text-lead-dark font-medium tracking-[0.4px] sm:text-xl'>+7 (965)-384-53-85</p>
                            </a>
                        </div>
                        <div className='flex  flex-col gap-1'>
                            <a href='mailto:info@skladbox.online'>
                                <p className='font-exo text-lead-dark font-extralight text-lg'>Эл. Почта</p>
                                <p className='font-exo text-lead-dark font-medium tracking-[0.4px] sm:text-xl'>info@skladbox.online</p>
                            </a>
                        </div>
                        <div className='flex  flex-col gap-1'>
                            <p className='font-exo text-lead-dark font-extralight text-lg'>Адрес</p>
                            <p className='font-exo text-lead-dark font-medium tracking-[0.4px] sm:text-xl'>МО, г.Лыткарино, промзона Тураево стр.22</p>
                        </div>
                        <div className='flex  flex-col gap-1'>
                            <p className='font-exo text-lead-dark font-extralight text-lg'>Мессенджеры для связи</p>
                            <div className='flex flex-row gap-2 mt-4'>
                                <a href='mailto:info@skladbox.online'>
                                    <img src="./assets/svg/whatsapp.svg" width="38" />
                                </a>
                                <a href='mailto:info@skladbox.online'>
                                    <img src="./assets/svg/telega.svg" width="38" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}