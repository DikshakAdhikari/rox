import React, { useEffect, useState } from 'react'
import { BASE_URI } from '../Service'
import { items } from './Data'
import BarChartz from './charts/BarChart'

const Statistics = ({month , data , setData}) => {
   const [totalSale, setTotalSale]= useState(0)
   const [totalSoldItems, setTotalSoldItems]= useState(0)


    useEffect(()=> {
        const fun= async()=> {
        try{
            const res= await fetch(`${BASE_URI}/product/${month}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if(!res.ok){
                throw new Error("Network problem!")
            }
            const data= await res.json();
            //console.log(data);
            let price = 0;
            let soldItemsCount= 0;
            data.map((item)=> {
                if(item.sold === true){
                    price += item.price
                    soldItemsCount += 1
                }
            });
            setTotalSale(price);
            setTotalSoldItems(soldItemsCount)
            setData(data)
            
        }catch(err){
            console.log(err);
        }
    }
    fun()
    },[month])
  return (
    <div className=' m-1'>
        <div className=' text-3xl font-semibold my-3'>Statistics - <span>{items[month-1]}</span> </div>
    <div className=' flex gap-8 py-5 rounded-2xl bg-orange-200 px-5'>
        <div className=' flex flex-col gap-3'>
            <div className=' text-lg'>Total sale</div>
            <div className=' text-lg'>Total sold item</div>
            <div className=' text-lg'>Total not sold item</div>
        </div>
        <div className=' flex flex-col gap-3'>
    <div className=' text-lg'>{totalSale}</div>
    <div className=' text-lg'>{totalSoldItems}</div>
    <div className=' text-lg'>{ data.length - totalSoldItems}</div>
    </div>
    </div>
    </div>
  )
}

export default Statistics