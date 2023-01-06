import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import {useRef} from 'react';
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { connect,createCampaign } = useStateContext();
  const ref = useRef(null);

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: '',
    category: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        try{
          await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)});
          navigate('/'); }
          catch{
            connect();
          }

        setIsLoading(false);

      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div ref={ref} className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-3 mx-5 md:mx-24 xl:mx-48 mt-5">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center  px-[16px] sm:min-w-[380px]  rounded-[10px]">
        <h1 className="font-epilogue font-bold p-5 sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[35px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#7c4dfd] h-[110px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px] pt-1">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

        <label className="flex-1 w-full flex flex-col">

          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Type of Charity *</span>
          <select onChange={(e) => handleFormFieldChange('category', e)} defaultValue={"Education Charity"} id="default" className="text-[14px] outline-none bg-[#1c1c24] border-[1px] border-[#3a3a43] text-sm rounded-lg focus:ring-[#13131a] block w-full py-[15px] sm:px-[25px] px-[15px]  rounded-[10px] text-white  ">
            <option value="Education Charity" >Education Charity</option>
            <option value="Animal Charity">Animal Charity</option>
            <option value="Environmental Charity">Environmental Charity</option>
            <option value="Human Services">Human Services</option>
            <option value="Health Charity">Health Charity</option>
            <option value="Other">Other</option>
          </select>

        </label>

          <div className="flex justify-center items-center my-7">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign