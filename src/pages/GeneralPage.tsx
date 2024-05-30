import React, { useState } from 'react'
import axios from 'axios'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { Accordion, AccordionItem } from '../components/Accordeon'
import { animateInView, inLeftMoving, inDownMoving, miniInDownMoving, pulseAnimation } from '../animations'
import { Link, useNavigate } from 'react-router-dom'
import ContainerBox from '../components/ContainerBox'



export function GeneralPage() {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    const { scrollYProgress } = useViewportScroll();
    const x = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 0]);

    const accordionItems: AccordionItem[] = [
      { title: 'Как оплачивать покупки вашей картой?', content: 'Как любой обычной картой, просто вводите в нужные поля данные купленной вами карты и оплачиваете. Если на сайте нужно подтверждение по коду – код придет вам в Telegram' },
      { title: 'Куда придет код покупки? Или изменения баланса?', content: 'Все коды приходят вам в бот Telegram, никаких номеров, емейлов мы от вас не получаем' },
      { title: 'Можно ли пополнить карту/снять наличные?', content: 'Нет. Все карты уже идут с определенным балансом, пополнить карту или снять наличные нельзя' },
      { title: 'Сколько карт я могу купить?', content: 'Сколько угодно, если карты есть в наличии – вы можете их купить' },
    ]

    const circleStyle = {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'rgb(175 79 231)',
    };
    
    const cardStyle = {
        maxWidth: '348px',
        right: '6rem',
        transform: 'translate3d(-46px, 0px, 0px)'
    }

    const navigate = useNavigate();

    const handleLocShop = () => {
      navigate('/catalog');
    };
    const isMobile = window.innerWidth <= 768;
    const imageUrl = './assets/img/saas-3/hero/gen.png';


    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        boxSize: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
            className='section h-auto sm:h-[700px] flex justify-center py-3 bg-[#f7faff] bg-top-44 sm:bg-right bg-[length:100%] sm:bg-[length:62%] bg-no-repeat'
            style={{ backgroundImage: `url(${imageUrl})` }}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
        >
            <div 
                className='container flex flex-col w-[100%] rounded-[20px] p-5 sm:p-10 pt-20 pb-10 sm:py-0 sm:flex-row items-start sm:items-center relative'
            >
                <div className='w-[100%] sm:w-[40%]'>
                    <motion.h1
                        className='sm:w-[100%] w-[100%] mt-4 font-exo text-3xl font-semibold uppercase sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead-dark'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        Аренда складских боксов в Лыткарино
                    </motion.h1>
                    <motion.p 
                        className='w-[100%] sm:w-[100%] text-lead-dark tracking-[1px] font-exo text-xl sm:text-xl font-extralight leading-normal mt-4 mb-11'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.7 }}
                    >
                        Предлагаем складские боксы для надежного хранения ваших вещей!
                    </motion.p>
                    <motion.div 
                        className='flex flex-row justify-between sm:-mr-12 sm:-mb-20 mt-60 sm:mt-0'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.9 }}
                    >

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg shadow-my-shad-lg p-8 w-full">
                        <div className="mb-6">
                          <h2 className="text-xl font-exo font-medium mb-3 sm:mb-4 text-lead-dark">Выберите размер бокса:</h2>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-6 space-y-3 sm:space-y-0">
                            <div className='flex flex-row space-x-6'>
                                <label className='font-exo font-light text-lead-dark'>
                                  <input type="radio" name="boxSize" value="Бокс 40ft" className="mr-3 text-lead-dark" onChange={handleChange}/>
                                  Бокс 40ft
                                </label>
                                <label className='font-exo font-light text-lead-dark'>
                                  <input type="radio" name="boxSize" value="Бокс 20ft" className="mr-3 text-lead-dark" onChange={handleChange}/>
                                  Бокс 20ft
                                </label>
                            </div>
                            <div className='flex flex-row space-x-6'>
                                <label className='font-exo font-light text-lead-dark'>
                                  <input type="radio" name="boxSize" value="10ft" className="mr-3 text-lead-dark" onChange={handleChange}/>
                                  Бокс 10ft
                                </label>
                                <label className='font-exo font-light text-lead-dark'>
                                  <input type="radio" name="boxSize" value="5ft" className="mr-3 text-lead-dark" onChange={handleChange}/>
                                  Бокс 5ft
                                </label>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-3'>
                            <div className='flex flex-row space-x-3 w-full sm:w-2/3'>
                            <div className="mb-3 sm:mb-6">
                                <label htmlFor="name" className="block text-lg font-exo font-light mb-1">Имя:</label>
                                <input type="text" id="name" name="name" className="w-full border-gray-200 rounded-xl px-3 py-4" placeholder='Ваше имя' onChange={handleChange} />
                            </div>
                            <div className="mb-3 sm:mb-6">
                                <label htmlFor="phone" className="block text-lg font-exo font-light mb-1">Телефон:</label>
                                <input type="text" id="phone" name="phone" className="w-full border-gray-200 rounded-xl px-3 py-4" placeholder='Ваш телефон' onChange={handleChange} />
                            </div>
                            </div>
                            <button className='w-full sm:w-1/3 rounded-xl py-4 px-4 mt-1 border-[0.5px] border-btnsec flex flex-row items-center justify-center bg-bluegen text-lead font-exo tracking-[0.5] text-base' type="submit">Арендовать</button>
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
            <div className='container flex flex-col gap-6 sm:gap-4 rounded-[20px] px-5 sm:p-10 py-10 sm:py-0 sm:flex-row items-start sm:items-center sm:justify-between relative'>
                <motion.div 
                    className='w-[100%] sm:w-[30%] h-[200px] justify-between bg-bluegen rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad'
                    variants={miniInDownMoving}
                    transition={{ duration: 0.5 }}
                >
                    <h2
                        className='w-[80%] font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead text-left'
                    >
                        Аренда бокса онлайн
                    </h2>
                    <p 
                        className='wfull sm:w-full text-lead tracking-[1px] font-exo text-lg sm:text-lg font-extralight leading-normal text-left mt-4'
                    >
                        Подробнее
                    </p>
                    <div className='w-[160px] h-[160px] bg-white opacity-10 absolute -top-10 -left-4 rounded-full'></div>
                </motion.div>

                <motion.div 
                    className='w-[100%] sm:w-[30%] h-[200px] justify-between rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad relative'
                    variants={miniInDownMoving}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='w-[80%] font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                        Охраняемая территория
                    </h2>
                    <div className='w-full flex flex-row justify-end'>
                        <img src='./assets/svg/secure.svg' className='align-right absolute bottom-[1rem] right-[1.2rem] w-[80px] sm:w-[100px]'></img>
                    </div>
                </motion.div>

                <motion.div 
                    className='w-[100%] sm:w-[40%] h-[200px] justify-between rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad relative'
                    variants={miniInDownMoving}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='w-[80%] font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                        Большое количество под любые нужды
                    </h2>
                    <div className='w-full flex flex-row justify-end'>
                        <img src='./assets/svg/box3.svg' className='align-right absolute bottom-[1rem] right-[1.2rem] w-[80px] sm:w-[100px]'></img>
                    </div>
                </motion.div>

            </div>
        </motion.div>

        {/*Секция третья*/}
        <motion.div 
            className='section px-3 flex flex-col items-center justify-center py-12'
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
            id='catalog'
        >
            <div className='container gap-8 flex flex-col relative sect-line bg-left bg-no-repeat bg-contain'>
                <motion.h2
                    className='sm:w-[100%] w-[100%] font-exo text-3xl font-semibold sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead-dark text-center my-6 sm:my-10'
                    variants={miniInDownMoving}
                    transition={{ duration: 0.5 }}
                >
                    Каталог боксов
                </motion.h2>
                
                <div className='flex flex-col gap-8 rounded-[20px] px-5 sm:p-10 py-10 sm:py-0 sm:flex-row items-start sm:items-center sm:justify-between'>
                    <motion.div 
                        className='w-[100%] sm:w-1/2 justify-between bg-white rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad z-10'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='w-full sm:w-[80%] font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                            Складской бокс 40ft
                        </h2>
                        <div className='flex flex-col sm:flex-row gap-2 mt-5'>
                            <div className='flex flex-col gap-1 py-2 px-2 rounded-md bg-neutral'>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Размеры:</p>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>Длина 12м X Ширина 2.4м Х Высота 2,7м</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Площадь:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>30м²</p>
                                </div>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Объем:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>76м³</p>
                                </div>
                            </div>
                        </div>
                        <img src='./assets/img/saas-3/cont20ft.png' className='-my-16'></img>
                        <a href='#cont' className='wfull sm:w-full text-lead-dark opacity-40 tracking-[1px] font-exo text-lg sm:text-xl font-normal leading-normal text-left mt-6'>
                            Подробнее
                        </a>
                    </motion.div>

                    <div className='flex flex-col justify-between gap-6 sm:w-1/2'>
                        <motion.div 
                            className='w-full h-auto sm:h-[540px] justify-start bg-white rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad z-10 relative overflow-hidden'
                            variants={miniInDownMoving}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className='w-full sm:w-[80%] font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                                Складской бокс 20ft
                            </h2>
                            <div className='flex flex-col sm:flex-row gap-2 mt-20 sm:mt-5 z-10'>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Размеры:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>Д 6м х Ш 2,4м x В 2,3м</p>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                        <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Площадь:</p>
                                        <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>15м²</p>
                                    </div>
                                    <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                        <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Объем:</p>
                                        <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>34м³</p>
                                    </div>
                                </div>
                            </div>
                            <img src='./assets/img/saas-3/cont10ft.png' className='sm:w-[440px] w-[220px] absolute top-0 right-0'></img>
                        </motion.div>

                        <a href='#cont' className='xs:hidden px-6 py-4 bg-bluegen text-lead rounded-xl font-exo text-lg flex flex-row items-center justify-center gap-4 transition-transform transform group'>Узнать подробнее<img src='./assets/svg/arrow.svg' className='transition-transform transform duration-300 group-hover:translate-x-3'/></a>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-8 rounded-[20px] px-5 sm:p-10 py-10 sm:py-0 sm:flex-row items-start sm:items-center sm:justify-between'>
                    <motion.div 
                        className='w-full h-[240px] justify-between bg-white rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad z-0 sm:z-0 relative overflow-hidden'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='w-full font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                            Бокс 10ft
                        </h2>
                        <div className='flex flex-col gap-3 items-start'>
                            <div className='flex flex-col gap-1 py-2 px-2 rounded-md bg-neutral'>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Размеры:</p>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>Длина 3м X Ширина 2.4м Х Высота 2,6м</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Площадь:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>7.5м²</p>
                                </div>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Объем:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>19м³</p>
                                </div>
                            </div>
                        </div>
                        <img src='./assets/svg/box3.svg' className='align-right absolute bottom-[1rem] right-[1.2rem] w-[60px] sm:w-[80px]'></img>
                    </motion.div>
                    <motion.div 
                        className='w-full h-[240px] justify-between bg-white rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad relative overflow-hidden'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='w-full font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                            Бокс 5ft
                        </h2>
                        <div className='flex flex-col gap-3 items-start z-10 sm:z-0'>
                            <div className='flex flex-col gap-1 py-2 px-2 rounded-md bg-neutral'>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Размеры:</p>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>Длина 2.4м X Ширина 1.9м Х Высота 2,6м</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Площадь:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>5м²</p>
                                </div>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Объем:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>12м³</p>
                                </div>
                            </div>
                        </div>
                        <img src='./assets/svg/box3.svg' className='align-right absolute bottom-[1rem] right-[1.2rem] w-[60px] sm:w-[80px]'></img>
                    </motion.div>
                    <motion.div 
                        className='w-full h-[240px] justify-between bg-white rounded-xl p-6 flex flex-col items-start shadow-md shadow-my-shad relative overflow-hidden'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='w-full font-mont font-medium text-2xl sm:text-2/5xl leading-snug text-lead-dark text-left'>
                            Бокс 3ft
                        </h2>
                        <div className='flex flex-col gap-3 items-start z-10 sm:z-0'>
                            <div className='flex flex-col gap-1 py-2 px-2 rounded-md bg-neutral'>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Размеры:</p>
                                <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>Длина 2.4м X Ширина 1.5м Х Высота 2,6м</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Площадь:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>3.5м²</p>
                                </div>
                                <div className='flex flex-col gap-1 py-2 px-4 rounded-md bg-neutral'>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-sm'>Объем:</p>
                                    <p className='font-exo text-lead-dark opacity-70 font-light text-[13px] sm:text-sm'>10м³</p>
                                </div>
                            </div>
                        </div>
                        <img src='./assets/svg/box3.svg' className='align-right absolute bottom-[1rem] right-[1.2rem] w-[60px] sm:w-[80px]'></img>
                    </motion.div>
                </div>
                <a href='#cont' className='sx:hidden px-6 py-4 bg-bluegen text-lead rounded-xl font-exo text-lg flex flex-row items-center justify-center gap-4 transition-transform transform group'>Узнать подробнее<img src='./assets/svg/arrow.svg' className='transition-transform transform duration-300 group-hover:translate-x-3'/></a>
            </div>

            <div id='rent' className='container flex flex-col items-center relative mt-20 p-5 sm:p-10'>
                <h2 className='font-exo text-lead-dark font-semibold text-3xl sm:text-4/5xl leading-[1.3em] mt-0 sm:mt-10 text-center'>Как арендовать бокс?</h2>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className='w-[100%] sm:w-auto'
                >
                    <div className='steps py-5 mt-4'>
                        <motion.div 
                            variants={inDownMoving} 
                            className='step-item py-3 relative'
                            transition={{ duration: 0.8 }}
                        >
                            <span className='step-item-num font-exo text-3xl font-semibold m-auto sm:m-0'>1</span>
                            <p className='text-lead-dark-dark tracking-[1px] font-exo text-base w-full sm:text-xl font-light leading-normal absolute left-[75px] sm:left-[130px] top-[100px] sm:top-[16px] sm:w-[400px] w-[260px] sm:text-left text-center xs:left-1/2 xs:transform xs:-translate-x-1/2'>После ознакомления с боксами и их характеристиками, оставьте заявку на сайте с выбором конкретного контейнера или без, или свяжитесь с нами удобным способом</p>
                        </motion.div>
                        <motion.div 
                            variants={inDownMoving} 
                            className='step-item xs:py-40 xs:mt-2 py-20 relative'
                            transition={{ duration: 1.4 }}
                        >
                            <span className='step-item-num font-exo text-3xl font-semibold m-auto sm:m-0'>2</span>
                            <p className='text-left sm:text-right text-lead-dark-dark tracking-[1px] font-exo text-base w-full sm:text-xl font-light leading-normal absolute left-step2 sm:right-[130px] top-[250px] sm:top-[66px] sm:w-[400px] w-[260px] sm:text-left text-center xs:left-1/2 xs:transform xs:-translate-x-1/2'>Мы проконсультируем вас, заключим договор аренды на указанное количество месяцев и вы произведете оплату</p>
                        </motion.div>
                        <motion.div 
                            variants={inDownMoving} 
                            className='step-item py-3 relative'
                            transition={{ duration: 2 }}
                        >
                            <span className='step-item-num font-exo text-3xl font-semibold m-auto sm:m-0'>3</span>
                            <p className='text-lead-dark-dark tracking-[1px] font-exo text-base w-full sm:text-xl font-light leading-normal absolute left-[75px] sm:left-[130px] top-[100px] sm:top-[30px] sm:w-[400px] w-[260px] sm:text-left text-center xs:left-1/2 xs:transform xs:-translate-x-1/2'>Далее вы можете пользоваться боксами в своих целях</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

        </motion.div>

        <motion.div 
            className='section h-auto sm:h-[700px] flex justify-center py-3 bg-bluegen bg-right-bottom bg-[length:56%] xs:bg-[length:80%] bg-no-repeat'
            style={{ backgroundImage: `url(./assets/img/saas-3/second.png)` }}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={animateInView}
            transition={{ duration: 0.8 }}
        >
            <div 
                className='container flex flex-col w-[100%] rounded-[20px] p-5 sm:p-10 py-10 sm:py-0 sm:flex-row items-start sm:items-center relative'
            >
                <div className='w-[100%] sm:w-[70%] flex flex-col justify-center'>
                    <motion.h1
                        className='sm:w-[100%] w-[100%] font-exo text-3xl font-semibold sm:text-4/5xl leading-[2.4rem] sm:leading-[1.3em] text-lead'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.5 }}
                    >
                        Для чего арендуют складские боксы?
                    </motion.h1>
                    <motion.p 
                        className='w-[100%] sm:w-[80%] text-lead tracking-[1px] font-exo text-lg sm:text-xl font-extralight leading-normal mt-4'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.7 }}
                    >
                        Мы предлагаем боксы для использования в бизнес целях, а так же для физ. лиц под бытовые задачи!
                    </motion.p>

                    <div className='flex flex-row gap-4 w-full my-11'>
                        <div className='flex flex-col w-1/2 sm:w-1/3'>
                            <p className='font-exo text-2xl text-white mb-3'>Для бизнеса</p>
                            <div className='flex flex-row mb-1 items-center'>
                                <img src='./assets/svg/item.svg' width={20}/><p className='font-exo text-base sm:text-xl ps-2 text-lead font-extralight'>Хранение товаров</p>
                            </div>
                            <div className='flex flex-row mb-1 items-center'>
                                <img src='./assets/svg/item.svg' width={20}/><p className='font-exo text-base sm:text-xl ps-2 text-lead font-extralight'>Сезонное хранение</p>
                            </div>
                            <div className='flex flex-row mb-1 items-center'>
                                <img src='./assets/svg/item.svg' width={20}/><p className='font-exo text-base sm:text-xl ps-2 text-lead font-extralight'>Хранение вещей и мебели</p>
                            </div>
                        </div>
                        <div className='flex flex-col w-1/2 sm:w-1/3'>
                            <p className='font-exo text-2xl text-white mb-3'>Для дома</p>
                            <div className='flex flex-row mb-1 items-center'>
                                <img src='./assets/svg/item.svg' width={20}/><p className='font-exo text-base sm:text-xl ps-2 text-lead font-extralight'>Хранение шин</p>
                            </div>
                            <div className='flex flex-row mb-1 items-center'>
                                <img src='./assets/svg/item.svg' width={20}/><p className='font-exo text-base sm:text-xl ps-2 text-lead font-extralight'>Сезонное хранение</p>
                            </div>
                            <div className='flex flex-row mb-1 items-center'>
                                <img src='./assets/svg/item.svg' width={20}/><p className='font-exo text-base sm:text-xl ps-2 text-lead font-extralight'>Хранение мото транспорта</p>
                            </div>
                        </div>
                    </div>

                    <motion.p 
                        className='w-[100%] sm:w-[80%] text-lead tracking-[1px] font-exo text-xl sm:text-2xl leading-normal mb-4'
                        variants={miniInDownMoving} 
                        transition={{ duration: 0.7 }}
                    >
                        Заполните форму, если Вам нужна консультация специалиста!
                    </motion.p>
                    {/* <p className='w-[80%] font-exo text-2xl font text-white mb-4'>Заполните форму, если Вам нужна консультация специалиста</p> */}
                    <motion.div
                        className='flex flex-row justify-between'
                        variants={miniInDownMoving}
                        transition={{ duration: 0.9 }}
                    >
                    
                    <form onSubmit={handleSubmitconsult}  className="w-full sm:w-2/3">
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

        {/* Секция аренда */}
        <div 
            className='section px-3 flex justify-center bg-center bg-cover py-20'
        >
            <div 
                className='container flex flex-col items-center px-3 sm:px-10'
                id='cont'
            >
                <h2 className='font-exo text-lead-dark font-semibold text-3xl sm:text-4/5xl'>Онлайн аренда бокса</h2>
                <p className='text-lead-dark-600 tracking-[1px] sm:w-[90%] sm:text-center font-exo text-lg font-extralight leading-normal mt-6 mb-11'>Выберите интересующий Вас бокс</p>
                <ContainerBox />

                <div className='container w-full flex flex-col items-center relative mt-20 sm:p-0 sm:pt-10'>
                    <h4 className='w-full font-exo text-lead-dark font-semibold text-left text-3xl sm:text-2xl mt-10 mb-2'>Аренда складского помещения в Лыткарино</h4>
                    <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal mt-6 mb-11'>
                        Наша компания предоставляет в аренду складские боксы. Наши складские боксы отличаются от традиционных решений тем, что для их использования не требуется открывать никаких счетов. Вы можете арендовать боксы определенного размера и использовать их для хранения различных товаров и материалов. Кроме того, мы предлагаем гибкие условия аренды и возможность адаптировать пространство под ваши индивидуальные потребности. Наши складские боксы обеспечивают надежную и безопасную защиту вашего имущества, позволяя вам хранить ваши вещи в удобном и доступном месте.
                    </p>
                    <h4 className='w-full font-exo text-lead-dark font-semibold text-left text-3xl sm:text-2xl mt-2 mb-2'>Что можно хранить в боксах?</h4>
                    <p className='text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal mt-6 mb-6'>
                        Кроме того, мы предлагаем гибкие условия аренды и возможность адаптировать пространство под ваши индивидуальные потребности. 
                    </p>
                            <ul className='list-disc text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal ml-2'>
                                <Link to='/shiny' className='mb-2'><span className='font-semibold'>Хранение шин</span>- Место хранения шин зачастую является непростой задачей для многих владельцев авто, именно под такую цель можно арендовать боксы в SkladBox.</Link>
                                <li className='mb-2'><span className='font-semibold'>Хранение товаров</span>- В боксах возможно хранине товаров определенной спецификации. Для уточнения информации свяжитесьс нами удобным способом.</li>
                                <li className='mb-2'><span className='font-semibold'>Хранение мото транспорта</span>- Так же боксы могут заменить гараж для хранения мотоцикла или другого мото транспорта.</li>
                            </ul> 
                </div>
            </div>
        </div>
        
        {/* Секция 5 faq */}
        {/* <div 
            id='faq'
            className='section px-5 flex justify-center bg-center bg-cover pt-14'
        >
            <div className='container flex flex-col items-center'>
                <h2 className='font-exo text-lead-dark font-semibold text-3xl sm:text-4xl mb-10'>Ответы на популярные вопросы</h2>
                <div className='w-[100%] flex justify-center py-5'>
                    
                    <Accordion 
                        items={accordionItems} 
                    />

                </div>
                
            </div>
        </div> */}

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