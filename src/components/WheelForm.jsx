import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WheelForm = () => {
  const [wheels, setWheels] = useState([{ type: 'Шины без дисков', diameter: 'R13', quantity: 1, duration: '1 месяц' }]);
  const [totalCost, setTotalCost] = useState(0);
  const [сostPerMonth, setCostPerMonth] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const addWheel = () => {
    setWheels([...wheels, { type: 'Шины без дисков', diameter: 'R13', quantity: 1, duration: '1 месяц' }]);
  };

  const removeWheel = index => {
    if (index !== 0) {
      const updatedWheels = [...wheels];
      updatedWheels.splice(index, 1);
      setWheels(updatedWheels);
    }
  };

  const changeQuantity = (index, value) => {
    const updatedWheels = [...wheels];
    updatedWheels[index].quantity = value;
    setWheels(updatedWheels);
  };

  const calculateTotalCost = () => {
    let cost = 0;
    let totalMonths = 0; // Общее количество месяцев
  
    wheels.forEach(wheel => {
      if (wheel.type === 'Шины без дисков') {
        // Условия для цены в зависимости от диаметра и наличия дисков
        if (wheel.diameter === 'R13' || wheel.diameter === 'R14' || wheel.diameter === 'R15') {
          cost += 300;
        } else if (wheel.diameter === 'R16' || wheel.diameter === 'R17' || wheel.diameter === 'R18' || wheel.diameter === 'R19') {
          cost += 400;
        } else if (wheel.diameter === 'R20') {
          cost += 450;
        }
      } else if (wheel.type === 'Шины с дисками') {
        // Условия для цены в зависимости от диаметра с дисками
        if (wheel.diameter === 'R13' || wheel.diameter === 'R14' || wheel.diameter === 'R15') {
          cost += 300; // +50 за диски
        } else if (wheel.diameter === 'R16' || wheel.diameter === 'R17' || wheel.diameter === 'R18' || wheel.diameter === 'R19') {
          cost += 400; // +50 за диски
        } else if (wheel.diameter === 'R20') {
          cost += 450; // +50 за диски
        }
      }
  
      // Умножаем цену на количество
      cost = parseInt(wheel.quantity) * cost;
  
      // Умножаем цену на выбранный срок хранения
      cost *= parseInt(wheel.duration);
  
      // Добавляем количество месяцев
      totalMonths += parseInt(wheel.duration);
    });
  
    // Рассчитываем сумму в месяц
    const costPerMonth = totalMonths > 0 ? cost / totalMonths : 0;
  
    setTotalCost(cost);
    setCostPerMonth(costPerMonth);
  };  

  useEffect(() => {
    calculateTotalCost();
  }, [wheels]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const wheelsData = wheels.map(wheel => `Тип колеса: ${wheel.type}, Диаметр: ${wheel.diameter}, Количество: ${wheel.quantity}, Срок хранения: ${wheel.duration}`).join('\n');
      await axios.post(
        `https://api.telegram.org/bot7182804623:AAHiFno7H-vwCR3iUiaoG0olmoLOAQ-wBZg/sendMessage`,
        {
          chat_id: '-1002054199690',
          text: `Имя: *${formData.name}*\nТелефон: *${formData.phone}*\n*Данные о колесах:*\n${wheelsData}\n\nОбщая стоимость: *${totalCost} ₽*\nСтоимость в месяц: *${сostPerMonth} ₽*`,
          parse_mode: 'Markdown',
        }
      );
      setModalOpen(true);
      setModalMessage('Заявка успешно отправлена!');
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setModalMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className='w-full'>
      {wheels.map((wheel, index) => (
        <div key={index} className="w-full flex flex-col sm:flex-row items-center mb-4 gap-4">
          <div className='w-full sm:w-1/4 pl:w-[30%] flex flex-col items-center w-full'>
            <label className="block text-[14px] pl:text-[10px] font-extralight tracking-[0.4px] font-exo text-[#575f6e] bg-white p-1 -mb-3 z-10">Тип колеса:</label>
            <select
              value={wheel.type}
              onChange={e => setWheels(prevState => {
                const updatedWheels = [...prevState];
                updatedWheels[index].type = e.target.value;
                return updatedWheels;
              })}
              className="w-full border-gray-300 text-lg font-light rounded-xl px-3 py-4"
            >
              <option value="Шины без дисков">Шины без дисков</option>
              <option value="Шины с дисками">Шины с дисками</option>
            </select>
          </div>
          <div className='w-full sm:w-1/4 flex flex-col items-center w-full'>
            <label className="block text-[14px] pl:text-[10px] font-extralight tracking-[0.4px] font-exo text-[#575f6e] bg-white p-1 -mb-3 z-10">Диаметр колес:</label>
            <select
              value={wheel.diameter}
              onChange={e => setWheels(prevState => {
                const updatedWheels = [...prevState];
                updatedWheels[index].diameter = e.target.value;
                return updatedWheels;
              })}
              className="w-full border-gray-300 text-lg font-light rounded-xl px-3 py-4"
            >
              <option value="R13">R13</option>
              <option value="R14">R14</option>
              <option value="R15">R15</option>
              <option value="R16">R16</option>
              <option value="R17">R17</option>
              <option value="R18">R18</option>
              <option value="R19">R19</option>
              <option value="R20">R20</option>
            </select>
          </div>
          <div className='w-full sm:w-1/2 flex flex-row items-center gap-4'>
            <div className='flex flex-col items-center w-[40%] sm:w-[30%]'>
              <label className="block text-[14px] pl:text-[10px] font-extralight tracking-[0.4px] font-exo text-[#575f6e] bg-white p-1 -mb-1 z-10">Количество шт:</label>
              <div className="flex items-center">
                <button onClick={() => changeQuantity(index, Math.max(0, parseInt(wheel.quantity) - 1))} className="bg-gray-300 text-gray-600 px-3 sm:py-3 py-4 rounded-l-xl">-</button>
                  <div className="border-gray-300 text-lg font-light border-l border-r rounded-none px-3 sm:py-3 py-4">{wheel.quantity}</div>
                <button onClick={() => changeQuantity(index, parseInt(wheel.quantity) + 1)} className="bg-gray-300 text-gray-600 px-3 sm:py-3 py-4 rounded-r-xl">+</button>
              </div>
            </div>
            <div className='flex flex-col items-center w-[50%] sm:w-[40%]'>
              <label className="block text-[14px] pl:text-[10px] font-extralight tracking-[0.4px] font-exo text-[#575f6e] bg-white p-1 -mb-1 z-10">Срок хранения</label>
              <select
                value={wheel.duration}
                onChange={e => setWheels(prevState => {
                  const updatedWheels = [...prevState];
                  updatedWheels[index].duration = e.target.value;
                  return updatedWheels;
                })}
                className="w-full border-gray-300 text-lg font-light rounded-xl px-3 xs:py-3 py-4"
              >
                <option value="1">1 месяц</option>
                <option value="3">3 месяца</option>
                <option value="6">6 месяца</option>
                <option value="9">9 месяца</option>
                <option value="12">12 месяца</option>
              </select>
            </div>
            <button onClick={() => removeWheel(index)} className="flex justify-center xs:w-[10%] pl:w-[8%] sm:w-[20%] mt-4">
              <img src='./assets/svg/trash.svg' className='w-80% pl:w-[100%] sm:w-[30%]' alt='Remove wheel'/>
            </button>
          </div>
        </div>
      ))}
      <button onClick={addWheel} className='w-full sm:w-1/3 rounded-xl py-4 px-4 mt-1 border-[0.5px] border-none flex flex-row items-center justify-center bg-bluegen text-lead font-exo tracking-[0.5] text-base' type="submit">Добавить колесо</button>
      
      <div className='bg-[#f2f5fc] flex flex-col sm:flex-row rounded-xl justify-between xs:items-start items-center p-6 xs:gap-5 gap-10 mt-10'>
        <div className='flex xs:flex-col flex-row xs:gap-2 gap-10 sm:items-center'>
          <p className='text-2xl font-medium text-lead-dark'>Итог: {totalCost} ₽</p>
          <p className='text-lg font-light text-dark-lead'>Стоимость в месяц: {сostPerMonth} ₽</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="w-full sm:w-1/3 rounded-xl py-4 px-4 mt-1 border-[0.5px] border-none flex flex-row items-center justify-center bg-bluegen text-lead font-exo tracking-[0.5] text-base">
          Оформить хранение
        </button>
      </div>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <span onClick={() => setModalOpen(false)} className='cursor-pointer text-lg font-mont absolute top-2 right-4'>X</span>
                    <h3 className="xs:text-2xl text-lg font-medium leading-6 text-gray-900" id="modal-title">
                      Оформление хранения
                    </h3>
                    <p className='xs:w-[80%] text-lead-dark-600 tracking-[1px] sm:text-left font-exo text-base sm:text-lg font-light leading-normal mt-6 xs:mb-2 mb-6 xs:mx-auto'>
                      Мы перезвоним вам в течении 15 минут
                    </p>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <div className='flex flex-col justify-between items-center gap-1 sm:gap-3'>
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
                          {modalMessage && (
                            <p className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">{modalMessage}</p>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelForm;
