import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShopCart } from '../context/Catalog-context';
import { ShopCart } from './ShopCart';
import { motion } from 'framer-motion';

export function Navigation() {
    const location = useLocation();
    const coloredRoutes = ['/catalog', '/contact', '/about', '/cart', '/checkout'];
    const isColoredRoute = coloredRoutes.includes(location.pathname);
    const [isSticky, setSticky] = useState(false);
    const { openCart, closeCart, isOpen, cartQuantity } = useShopCart()
    const [isMenuOpen, setMenuOpen] = useState(false);

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
                    <img src="./assets/svg/logo.svg" width={180}/>
                </Link>

                {/* <ul className='sm:flex hidden'>
                    <Link to="/" className='mx-2 text-lead-dark'>Главная</Link>
                    <Link to="/catalog" className='mx-2 text-lead-dark'>Создать карту</Link>
                    <Link to="/about" className='mx-2 text-lead-dark'>О нас</Link>
                    <Link to="/contact" className='mx-2 text-lead-dark'>Контакты</Link>
                </ul> */}

                <div className='flex flex-row'>

                    <div className='hidden sm:flex flex-row items-center sm:mx-0 mx-3'>
                        <img src="./assets/svg/loc.svg" width={28} />
                        <p className='w-[70%] text-base font-exo leading-snug font-light text-lead-dark tracking-[0.4px] ms-3'>МО, г.Лыткарино, промзона Тураево стр.22</p>
                    </div>

                    <div className='hidden sm:flex flex-row pr-7'>
                        <img src="./assets/svg/tel.svg" width={25}/>
                        <div className='flex flex-col items-end ms-2'>
                            <p className='text-base font-exo font-normal text-lead-dark tracking-[0.8px]'>+7 (897)-010-26-28</p>
                            <p className='text-xs font-exo font-extralight text-lead-dark tracking-[0.4px]'>Позвонить по телефону</p>
                        </div>
                    </div>

                    <div className='hidden sm:flex flex-row items-center sm:mx-12 mx-3'>
                        <button
                            className='rounded-[8px] py-3 px-6 border-[1px] border-bluegen hover:bg-bluegen hover:text-lead flex flex-row items-center text-lead text-lead-dark font-exo tracking-[0.5px] text-base'
                            onClick={() => modal()}
                        >
                            Заказать звонок
                        </button>
                    </div>

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
                            <span className="burger-menu__title">Меню</span>
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div 
                            className="fixed bg-bordo/50 top-0 right-0 left-0 bottom-0"
                            onClick={toggleMenu}
                        >
                            <motion.div 
                                className="absolute ml-2 bg-white shadow-md w-2/3 sm:w-[300px] h-[100vh] right-0 top-0 p-8"
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
                                  <Link to="/" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3 transition-transform transform hover:translate-x2'>Главная</Link>
                                  <Link to="/catalog" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3'>Каталог карт</Link>
                                  <Link to="/oferta" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3'>Оферта</Link>
                                  <Link to="/contact" className='text-lg tracking-[0.6px] text-lead-dark font-light my-3'>Контакты</Link>
                              </ul>
                              <div className='flex flex-row items-center my-6'>
                                  <img src="./assets/svg/telegram.svg" width={22} />
                                  <p className='text-base font-exo font-normal text-lead-dark tracking-[0.8px] ms-2'>Telegram</p>
                              </div>

                              <div className='flex flex-row my-6'>
                                  <img src="./assets/svg/tel.svg" width={22}/>
                                  <div className='flex flex-col items-end ms-2'>
                                      <p className='text-base font-exo font-normal text-lead-dark tracking-[0.8px]'>+7 (903) 777-19-98</p>
                                      <p className='text-xs font-exo font-extralight text-lead-dark tracking-[0.4px]'>Позвонить по телефону</p>
                                  </div>
                              </div>
                            </motion.div>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    )
}