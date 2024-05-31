import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShopCart } from '../context/Catalog-context';
import { ShopCart } from './ShopCart';
import { motion } from 'framer-motion';
import axios from 'axios';

export function Navigation() {
    const location = useLocation();
    const coloredRoutes = ['/catalog', '/contact', '/about', '/cart', '/checkout'];
    const isColoredRoute = coloredRoutes.includes(location.pathname);
    const [isSticky, setSticky] = useState(false);
    const { openCart, closeCart, isOpen, cartQuantity } = useShopCart()
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitconsult = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await axios.post(
            `https://api.telegram.org/bot7182804623:AAHiFno7H-vwCR3iUiaoG0olmoLOAQ-wBZg/sendMessage`,
            {
              chat_id: '-1002054199690',
              text: `*Обратный звонок:*\nИмя: ${formData.name}\nТелефон: ${formData.phone}`,
              parse_mode: 'Markdown',
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


    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
      const handleScroll = () => {
        const offset = window.scrollY;
        setSticky(offset > 0);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const headerStyle = {
        backgroundColor: isSticky || isColoredRoute ? '#fff' : '#fff',

    };
    
    function modal(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <nav 
            className='h-[80px] flex flex-row justify-center items-center text-black header shadow-md shadow-my-shad'
            style={headerStyle}
        >
            <div 
                className='container flex flex-row justify-between items-center px-5 sm:px-10 py-6 mt-1'
            >
                <Link to="/" className='flex flex-row items-center'>
                    <img src="./assets/svg/logo.svg" className='w-[180px] pl:w-[130px]'/>
                </Link>

                {/* <ul className='sm:flex hidden'>
                    <Link to="/" className='mx-2 text-lead-dark'>Главная</Link>
                    <Link to="/catalog" className='mx-2 text-lead-dark'>Создать карту</Link>
                    <Link to="/about" className='mx-2 text-lead-dark'>О нас</Link>
                    <Link to="/contact" className='mx-2 text-lead-dark'>Контакты</Link>
                </ul> */}

                <div className='flex flex-row'>

                    <div className='hidden pl:hidden sm:flex flex-row items-center sm:mx-0 mx-3'>
                        <img src="./assets/svg/loc.svg" width={28} />
                        <p className='w-[70%] text-base font-exo leading-snug font-light text-lead-dark tracking-[0.4px] ms-3'>МО, г.Лыткарино, промзона Тураево стр.22</p>
                    </div>

                    <div className='hidden sm:flex flex-row pr-7 pl:pr-4'>
                        <img src="./assets/svg/tel.svg" width={25}/>
                        <a href='tel:+7 (965)-384-53-85' className='flex flex-col items-end ms-2'>
                            <p className='text-base font-exo font-normal text-lead-dark tracking-[0.8px]'>+7 (965)-384-53-85</p>
                            <p className='text-xs font-exo font-extralight text-lead-dark tracking-[0.4px]'>Позвонить по телефону</p>
                        </a>
                    </div>

                    <div className='hidden sm:flex flex-row items-center pl:mx-6 pl:ml-3 sm:mx-12 mx-3'>
                        <button
                            className='rounded-[8px] py-3 px-6 pl:px-3 pl:py-2 border-[1px] border-bluegen hover:bg-bluegen hover:text-lead flex flex-row items-center text-lead text-lead-dark font-exo tracking-[0.5px] text-base'
                            onClick={() => toggleModal()}
                        >
                            Заказать звонок
                        </button>
                    </div>

                    {modalOpen && (
                    <div 
                        className="modal-container"
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            toggleModal();
                          }
                        }}
                    >
                        <div className="modal-content">
                            <h2 className='w-full font-mont font-medium text-2xl sm:text-2/5xl text-center leading-snug text-lead text-left mb-4'>
                                Заполните форму
                            </h2>
                            <form onSubmit={handleSubmitconsult}  className="w-full">
                                <div className='flex flex-col justify-between gap-2 pb-20 sm:pb-0'>
                                    <div className='flex sm:flex-row gap-4 w-full'>
                                        <div className="mb-6 w-full">
                                            <input type="text" id="name" name="name" className="w-full border-none rounded-xl px-3 py-5 bg-[#ffffff3b] text-white placeholder-[#ffffffbf]" placeholder='Ваше имя' onChange={handleChange}/>
                                        </div>
                                        <div className="mb-6 w-full">
                                            <input type="text" id="phone" name="phone" className="w-full border-none rounded-xl px-3 py-5 bg-[#ffffff3b] text-white placeholder-[#ffffffbf]" placeholder='Ваш телефон' onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <button className=' rounded-xl py-5 px-4 mt-1 sm:mt-0 bg-white text-bluegen font-exo font-medium tracking-[0.4] text-lg' type='submit'>Заказать звонок</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}

                    <div 
                        className={`relative flex ${isMenuOpen ? 'hidden' : ''}`}
                        onClick={toggleMenu}
                    >
                        <button className="burger-menu__button">
                            <div className="burger-menu__icon icon-menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="burger-menu__title pl:ml-[12px]">Меню</span>
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div 
                            className="fixed bg-bordo/50 top-0 right-0 left-0 bottom-0"
                            onClick={toggleMenu}
                        >
                            <motion.div 
                                className="absolute ml-2 bg-white shadow-md w-[80%] sm:w-[300px] h-[100vh] right-0 top-0 p-8"
                                transition={{ duration: 0.5 }}
                                initial={{ x: 100 }}
                                animate={{ x: 0 }}
                                exit={{ x: -100 }}
                            >
                              <span className='absolute text-white top-3 z-10 right-5 cursor-pointer'>
                                  <div className="w-6 h-6 relative">
                                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-bluegen rotate-45"></div>
                                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-bluegen rotate-45"></div>
                                  </div>
                              </span>
                              <ul className='flex flex-col'>
                                  <span className='text-lg tracking-[0.6px] text-lead-dark font-medium my-3'>МЕНЮ</span>
                                  <a href="/shiny" className='text-lg tracking-[0.6px] text-lead font-normal my-3 bg-bluegen p-2 rounded-lg'>Хранение шин</a>
                                  <a href="/#catalog" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3'>Каталог боксов</a>
                                  <a href="/#cont" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3'>Аренда</a>
                                  <a href="/#contact" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3'>Контакты</a>
                              </ul>

                              <div className='flex flex-row my-6'>
                                  <img src="./assets/svg/tel.svg" width={22}/>
                                  <a href='tel:+7 (965)-384-53-85' className='flex flex-col items-end ms-2'>
                                      <p className='text-base font-exo font-normal text-lead-dark tracking-[0.8px]'>+7 (965)-384-53-85</p>
                                      <p className='text-xs font-exo font-extralight text-lead-dark tracking-[0.4px]'>Позвонить по телефону</p>
                                  </a>
                              </div>
                            </motion.div>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    )
}