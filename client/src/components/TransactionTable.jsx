import React, { useEffect } from 'react'
import { dataArray } from './Data';
import { BASE_URI } from '../Service';

const TransactionTable = ({product, setProduct}) => {
 
  return (
    <div>
        <div className="overflow-x-auto rounded-3xl m-3">
      <table className="table-auto bg-yellow-100 rounded-2xl w-[60vw]">
        <thead>
          <tr >
            {dataArray.map((val, index) => (
              <th  className={`${index === dataArray.length-1 && " border-r-0" }  border-2 border-t-0 border-l-0 p-2  border-black px-4 py-2`} key={index} >
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {product?.map((val, index) => (
            <tr key={index}>
                <td className="  text-black  border-t-0 border-l-0   border-black border-2 px-4 py-2">
                  <div className={` ${product.length-2 === index ? ' border-0' : 'border-t-0 border-l-0'} text-black   `}>{ val?.id}</div>
                </td>
                <td className="   border-black border-2 px-4 py-2">
                  <div className=' text-black  border-t-0 border-l-0 '>{ val?.title}</div>
                </td>
                <td className="   border-black border-2 px-4 py-2">
                  <div className=' text-black  border-t-0 border-l-0 '>{ val?.description}</div>
                </td>
                <td className="   border-black border-2 px-4 py-2">
                  <div className=' text-black  border-t-0 border-l-0 '>{ val?.price}</div>
                </td>
                <td className="   border-black border-2 px-4 py-2">
                  <div className=' text-black  border-t-0 border-l-0 '>{ val?.category}</div>
                </td>
                <td className="   border-black border-2 px-4 py-2">
                  <div className=' text-black  border-t-0 border-l-0 '>{ JSON.stringify(val?.sold)}</div>
                </td>
                <td className="  border-black border-2 border-r-0 px-4 py-2">
                  <img src={val?.image} className=' h-24 w-24' />
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default TransactionTable