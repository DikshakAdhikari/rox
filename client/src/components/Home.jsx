import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import { info } from "autoprefixer";
import { BASE_URI } from "../Service";
import { dataArray, items } from "./Data";
import Statistics from "./Statistics";
import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";
import Chart from 'react-apexcharts'


const xLabelBarGraph= ["100","200","300","400","500","600","700","800","900","1000"]

const Home = () => {
  const [title, setTitle] = useState("March");
  const [product, setProduct] = useState([]);
  const [search, setSearch]= useState('')
  const [getIndex, setIndex] = useState(2);
  const [pageNo , setPageNo]= useState(1)
  const [data, setData]= useState([])
  const [barGraphDatas, setBarGraphData]= useState([])
  const [totalItems, setTotalItems]= useState(0)
  const limit=10
  

  useEffect(()=> {
    
    let hundred= 0; 
    let two= 0;
    let three = 0;
    let four= 0;
    let five= 0;
    let six= 0;
    let seven= 0;
    let eight= 0;
    let nine= 0;
    let ten= 0;
    if(data.length>0){
      let arr= []
      //console.log(data);
      data.map((val)=> {
        if(val.price <= 100){
          hundred += 1
        }else if(val.price>100 && val.price<=200){
          two += 1;
        }else if(val.price>200 && val.price<=300){
          three += 1;
        }else if(val.price>300 && val.price<=400){
          four += 1;
        }else if(val.price>400 && val.price<=500){
          five += 1;
        }else if(val.price>500 && val.price<=600){
          six += 1;
        }else if(val.price>600 && val.price<=700){
          seven += 1;
        }else if(val.price>700 && val.price<=800){
          eight += 1;
        }else if(val.price>800 && val.price<=900){
          nine += 1;
        }else{
          ten += 1;
        }
      });
       arr.push(hundred)
       arr.push(two)
       arr.push(three)
       arr.push(four)
       arr.push(five)
       arr.push(six)
       arr.push(seven)
       arr.push(eight)
       arr.push(nine)
       arr.push(ten)
      //  console.log(arr);
      setBarGraphData(arr)
    }
  },[data])

  useEffect(()=> {
    async function fun(){
      try{
        const res= await fetch(`${BASE_URI}/product/filter?page=${pageNo}&limit=5&search=${search}&month=${getIndex}`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        });
        if(!res.ok){
          throw new Error("Network problem!")
        }
        const data= await res.json();
        setProduct(data.products)
        setTotalItems(data.totalItems)
      }catch(err){
        console.log(err);
      }
    }

  fun()
  },[search, getIndex , pageNo])

  const handleClick = (item, index) => {
    setTitle(item);
    setIndex(index);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8  ">
      <div className="bg-white rounded-full w-40 h-40 my-5 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl font-semibold text-gray-700 ">
            Transaction Dashboard
          </div>
        </div>
      </div>
  
      <div className=" flex justify-between gap-10">
        <div className=" flex flex-col justify-between">
          <div className=" flex   w-[100%] justify-between">
            <input
              onChange={(e)=> setSearch(e.target.value)}
              type="text"
              className=" ml-5 text-black  border-t-0 border-l-0  rounded-2xl outline-none  bg-yellow-200 border-none"
              placeholder="Search transactions"
            />

            <div className=" bg-yellow-200 mr-5 p-2 rounded-lg">
              <Dropdown color={info} className=" p-2" label={title}>
                {items.map((item, index) => (
                  <Dropdown.Item>
                    <div onClick={() => handleClick(item, index)}>{item}</div>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </div>
          <TransactionTable product={product} setProduct={setProduct} />
          <Pagination pageNo={pageNo} setPageNo={setPageNo} totalItems={totalItems} limit={limit} />
        </div>

        <div className=" flex flex-col gap-5">
          <Statistics month={getIndex + 1} data={data} setData={setData} />
          <div className=' bg-white  w-[30vw] max-h-screen '>
                <div>
                <Chart 
                type="bar"
                width={600}
                height={400}
                series={[
                  {
                    name:"dikshak",
                    data:barGraphDatas
                  }
                ]}
                options={{
                  title:{
                    text:"Text generated by Dikshak"
                  },
                  colors:['#f90000'],
                  theme:{mode:'light'},
                  xaxis:{
                    tickPlacement:"on",
                    categories:xLabelBarGraph,
                    title:{
                      text:"x-axis",
                      style:{color:"#f90000", fontSize:20},
                    }
                  },
                  yaxis:{
                    labels:{
                      formatter:(val)=> {return `${val}`},
                      style:{
                        fontSize:'15',
                        colors:["#f90000"]
                      }
                    },
                    title:{
                      text:"user in y-axis",
                      style:{color:"#f90000", fontSize:20},
                    }
                  },
                  legend:{
                    show:true,
                    position:"right"
                  }
                }}
                 />
                </div>
   
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;