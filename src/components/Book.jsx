import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Book = () => {

    var navigate= useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
    
        navigate('/campaign-details/Hope_in_Crisis_Fund/0');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      };
  return (
<div className="cover p-0 m-0" >
  <div className="book">
  <label htmlFor="page-1"  className="book__page book__page--1">
    <img className='h-fit' src="https://files.globalgiving.org/pfil/56284/pict_large.jpg?m=1655425080000" alt=""/>
  </label>
  
  <label htmlFor="page-2"  className="book__page book__page--4">
    <div className="page__content" >
      <h1 className="page__content-title">I</h1>
      <div className="page__content-blockquote">
        <p className="  page__content-blockquote-text" >Millions of people around the world are living through crises, but their stories are rarely heard in the mainstream news or raised to global awareness.</p>
        <p  className=" md:block hidden page__content-blockquote-text" >Around the world are living through crises, but their stories are rarely heard in the mainstream news or raised to global awareness.</p>
        <p className=" sm:block hidden page__content-blockquote-text" >The Report highlights the severity and magnitude of the challenges before us, with these cascading and intersecting crises creating spin-off impacts on food and nutrition, health, education, the environment, and peace and security, and affecting all the SDGs, the blueprint for more resilient, peaceful and equal societies. </p>
        <p className=" md:block hidden page__content-blockquote-text" >Living through crises, but their stories are rarely heard in the mainstream news or raised to global awareness.</p>
 
   </div>
   <div className="page__content-copyright " onClick={onSubmit}>

        <p onClick={onSubmit}>Click here </p>
    </div>

    </div>
  </label>
    

  <input type="radio" name="page" id="page-1"/>

  <input type="radio" name="page" id="page-2"/>
  <label className="book__page book__page--2">
    <div className="book__page-front">
      <div className="page__content">
        <h1 className="page__content-book-title">HOPE IN CRISIS FUND</h1>
        <h2 className="page__content-author">Best Charity to donate</h2>
        
        <p className="page__content-credits">
        Millions of people 
          <span>Are living through crises</span>
        </p>
        
        {/* <p className="page__content-credits">
          Illustrations by 
          <span>Alex Wells</span>
        </p> */}
        
        <div className="page__content-copyright">

          <p>London - MMXII</p>
        </div>
      </div>
    </div>
    <div className="book__page-back">
      <div className="page__content">
        <h1 className="page__content-title">Contents</h1>
        <table  className="page__content-table">
          <tr>
            <td align="left">I.</td><td align="left">Introduction</td><td align="right">3</td>
          </tr>
          <tr>
            <td align="left">II.</td><td align="left">Story</td><td align="right">43</td>
          </tr>
          <tr>
            <td align="left">III.</td><td align="left">Ending</td><td align="right">87</td>
          </tr>

        </table>
        
        <div className="page__number">2</div>
      </div>
    </div>
  </label>
</div>
</div>
  )
}

export default Book