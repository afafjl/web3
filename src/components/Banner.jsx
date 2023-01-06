import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CustomButton } from './';

const Banner = () => {
    const navigate = useNavigate();
    const { connect, address } = useStateContext();
  return (
    <div>
      <div className='background w-full'>
        <div className='py-20 px-4 md:p-10 '>
          <h1 className=' font-extrabold  text-[29px] md:text-[68px] drop-shadow text-slate-200  text-left'>Do something</h1>
          <h1 className=' font-extrabold text-[29px] p-5 md:text-[68px] text-slate-200 text-left'>incredible today</h1>
      <p className='mb-10 font-semibold text-[19px] mb-10 md:text-[22px] text-slate-200 text-left'>Online fundraising for the people and charities you love.</p>
        <CustomButton 
            btnType="button"
            title={address ? 'Create a campaign' : 'Connect'}
            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick={() => {
              if(address){ 
                // ref.current?.scrollIntoView({behavior: 'smooth'});
                navigate('create-campaign');
              }
              else connect()
            }}
          />
        </div>
      </div>
      </div>
  )
}

export default Banner