import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles.css';
import { motion } from 'framer-motion';
import { animateInView, miniInDownMoving } from '../animations';

interface Container {
  id: number,
  size: 'big' | 'medium20' |'medium10' | 'small',
  name: '40ft' | '20ft' |'10ft' | '5ft',
  square: string,
  volume: string,
  length: string,
  height: string,
  width: string,
  price: string
}

const fakeContainers: Container[] = [
  { id: 1, size: 'big', name: '40ft', square: '30м²', volume: '76м³', length: '12м', height: '2.4', width: '2.7', price: '20 000₽/м' },
  { id: 2, size: 'medium20', name: '20ft', square: '15м²', volume: '34м³', length: '6м', height: '2.4м', width: '2.3м', price: '9 000₽/м' },
  { id: 3, size: 'medium10', name: '10ft', square: '7.5м²', volume: '19м³', length: '3м', height: '2.4м', width: '2.6м', price: '5 000₽/м' },
  { id: 4, size: 'small', name: '5ft', square: '1.5м²', volume: '2.8м³', length: '1.5м', height: '1.5м', width: '1.5м', price: '3 500₽/м' },
];


function ContainerBox() {

  const [hoveredContainer, setHoveredContainer] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [formData, setFormData] = useState({
    rentPeriod: '1',
    name: '',
    phone: '',
  });

  const [successMessageVisible, setSuccessMessageVisible] = useState<boolean>(false);

  const handleMouseEnter = (id: number) => {
    setHoveredContainer(id);
  };

  const handleMouseLeave = () => {
    setHoveredContainer(null);
  };

  const handleContainerClick = (container: Container) => {
    setSelectedContainer(container);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContainer(null);
    setSuccessMessageVisible(false);

  };

  const sendTelegramMessage = async () => {
    try {
      await axios.post(
        `https://api.telegram.org/bot7182804623:AAHiFno7H-vwCR3iUiaoG0olmoLOAQ-wBZg/sendMessage`,
        {
          chat_id: '-1002054199690',
          text: `*Контейнер: ${selectedContainer?.name}*\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСрок аренды: ${formData.rentPeriod} месяц(а/ев)`,
          parse_mode: 'Markdown',
        }
      );

      console.log('Message sent successfully');
      setSuccessMessageVisible(true);
      // Добавьте здесь логику для обработки успешной отправки сообщения
    } catch (error) {
      console.error('Error sending message:', error);
      // Добавьте здесь логику для обработки ошибки отправки сообщения
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendTelegramMessage();
    // Добавьте здесь логику для обработки отправки формы
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeSuccessMessage = () => {
    setSuccessMessageVisible(false);
  };


  return (
    <div className="containers-section flex flex-col sm:flex-row items-center justify-start sm:justify-between gap-30 w-full my-5">
      {fakeContainers.map(container => (
        <motion.div 
          key={container.id} 
          className={`flex items-end containers cursor-pointer columns-${container.size} blue-${container.size}`} 
          onClick={() => handleContainerClick(container)}
          whileHover={{ translateY: -8 }} 
        >
          <div className='flex items-center justify-center font-medium -mb-16 font-exo uppercase text-normal tracking-[0.4px] text-lead-dark bg-[#e5ebf5] rounded-[8px] px-2 py-4 w-full'>
            Бокс <span className='text-bluegen ml-2 font-medium'>{container.name}</span>
          </div>
        </motion.div>
      ))}

      {/* Модальное окно */}
      {modalOpen && selectedContainer && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-[99999] overflow-y-scroll"
        >
          <motion.div 
            className="bg-white p-8 rounded-lg w-90% sm:w-2/3 absolute xs:top-0 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
            variants={miniInDownMoving}
            transition={{ duration: 0.5 }}
          >
            <div className='flex flex-col sm:flex-row justify-between items-start'>
              <h3 className='font-exo text-3xl sm:text-2xl text-lead-dark font-semibold mb-4'>Складской бокс {selectedContainer.name}</h3>
              <p className='text-base sm:text-lg font-semibold text-lead-dark py-2 px-4 rounded-lg bg-green-100 xs:my-4'>
                <span className='text-xl font-exo text-lead-dark font-medium'>Цена: </span>
                <span className='text-xl sm:text-2xl text-lead-dark ml-2 font-medium'>{selectedContainer.price}</span>
              </p>
            </div>

            <div className='flex flex-col sm:flex-row'>
              <div className='flex flex-col justify-between w-full sm:w-1/2'>                
                <div className='flex flex-row gap-10 my-1 sm:my-4'>
                  <p className='text-xl font-exo text-dark-lead font-medium'>Площадь: <span className='text-bluegen ml-2 font-medium'>{selectedContainer.square}</span></p><p className='text-xl font-exo text-dark-lead font-medium'>Объем: <span className='text-bluegen ml-2 font-medium'>{selectedContainer.volume}</span></p>
                </div>

                <div className='flex flex-col gap-1 my-2'>
                  <div className='flex flex-row justify-between gap-1 my-2'>
                    <p className='text-md font-exo text-dark-lead font-medium'>Длина: <span className='text-bluegen ml-1 mr-2 font-medium'>{selectedContainer.length}</span></p>
                    <p className='text-md font-exo text-dark-lead font-medium'>Ширина: <span className='text-bluegen ml-1 mr-2 font-medium'>{selectedContainer.width}</span></p>
                    <p className='text-md font-exo text-dark-lead font-medium'>Высота: <span className='text-bluegen ml-1 mr-2 font-medium'>{selectedContainer.height}</span></p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#ebeff7] rounded-xl mt-4 p-5 w-full">
                  <div className="mb-6">
                    <h2 className="text-xl font-exo text-lead-dark font-medium mb-4">Выберите срок аренды:</h2>
                    <div className="flex items-center space-x-6">
                      <select id="rentPeriod" name="rentPeriod" className="mr-3 w-full border-gray-200 rounded-xl px-3 py-4" value={formData.rentPeriod} onChange={handleChange}>
                        <option value="1">1 месяц</option>
                        <option value="3">3 месяца</option>
                        <option value="6">6 месяцев</option>
                        <option value="12">12 месяцев</option>
                      </select>
                    </div>
                  </div>
                  <div className='flex flex-row justify-between items-center gap-3'>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-lg font-exo font-light mb-1">Имя:</label>
                      <input type="text" id="name" name="name" className="w-full border-gray-200 rounded-xl px-3 py-4" placeholder='Ваше имя' onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-lg font-exo font-light mb-1">Телефон:</label>
                      <input type="text" id="phone" name="phone" className="w-full border-gray-200 rounded-xl px-3 py-4" placeholder='Ваш телефон' onChange={handleChange} />
                    </div>
                  </div>
                  <button className='w-full rounded-xl py-4 px-4 mt-1 border-none flex flex-row items-center justify-center bg-bluegen text-lead font-exo tracking-[0.5] text-base' type="submit">Арендовать</button>
                  
                  {successMessageVisible && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">Ваша заявка успешно отправлена!</div>
                  )}
                </form>
              </div>

              <div className='w-full sm:w-1/2 flex items-end'>
                <img src="./assets/img/saas-3/second.png" alt="" />
              </div>
            </div>
            <div className='flex w-full justify-end'>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={closeModal}>Закрыть</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ContainerBox;
