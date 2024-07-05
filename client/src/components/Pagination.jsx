import React from 'react'

const Pagination = ({pageNo , setPageNo, totalItems, limit}) => {
  const totalPages=Math.ceil(totalItems/limit);

  function handleNext(){
    setPageNo((prev)=>{
      if(prev === totalPages){
        return prev
      }
      return prev+1
    })
  }
  function handlePrevious(){
    setPageNo((prev)=> {
      if(prev === 1){
        return prev
      }
      return prev-1
    })
  }
  return (
    <div className=' flex justify-between gap-2 mx-3'>
        <div>Page No. <span>{pageNo}</span></div>
        <div>
            <span onClick={handleNext} className=' cursor-pointer'>Next  </span> <span> - </span><span className=' cursor-pointer' onClick={handlePrevious}>  Previous</span>
        </div>
        <div>
            Per Page - <span> 10</span>
        </div>

    </div>
  )
}

export default Pagination