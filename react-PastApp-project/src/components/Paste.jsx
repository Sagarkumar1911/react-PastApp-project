import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { FormatDate } from "../utlis/formatDate"

const Paste = () => {

const pastes =useSelector((state) => state.paste.pastes);
const [searchTerm,setSearchTerm]=useState('');
const dispatch =useDispatch();

// to filter the content
 const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))

  }

 
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">

      <div  className="flex flex-col gap-y-3">

        {/* Search */}
      <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
        <input 
      className='p-2 rounded-2xl bg-[#E0F2FE] w-full mt-5 text-[#1E293B] '
      type="Search" placeholder='search-here ' value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* All Pastes */}
     <div className="flex flex-col bg-white/10 border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem] ">
      <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4 text-slate-900">
        All Pastes
      </h2>
      <div  className="w-full px-4 pt-4 flex flex-col gap-y-5">
        {
          filteredPastes.length > 0 ? (
            filteredPastes.map(
            (paste) =>(
              <div key={paste?._id}
              className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
              >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p  className="text-4xl font-bold text-slate-100 ">{paste?.title}</p>
                    <p className="text-xl font-bold  line-clamp-3 text-slate-800 text-center items-center"
>  {paste?.content}</p>
                  </div>

                    {/* icons */}
                    <div className="flex flex-col gap-y-4 sm:items-end">
                      <div lassName="flex gap-2 flex-wrap sm:flex-nowrap">
                        <button  className="p-2 rounded-[0.2rem] bg-slate-800 border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"> <a href={`/?pasteId=${paste?._id}`}><PencilLine 
                        className= " text-sky-400 group-hover:text-blue-500"
                            size={20}
                            /></a>
                            </button>
                            <button className="p-2 rounded-[0.2rem] bg-slate-800 border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                            onClick={() => handleDelete(paste?._id)}>
                              <Trash2
                              className="text-sky-400  group-hover:text-pink-500"
                          size={20}
                          />
                             </button>

                             <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                              <a  href={`/pastes/${paste?._id}`} target="_blank">
                              <Eye
                              className="text-sky-400  group-hover:text-orange-500"
                            size={20}
                            />
                              </a>
                             </button>

                             <button
                             className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                              onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                        >
                           <Copy
                          className=" text-sky-400 group-hover:text-green-500"
                          size={20}
                        />
                        </button>
                      </div>


                      <div className="gap-x-2 flex text-slate-500">
                        <Calendar className="text-slate-500" size={20} />
                         {FormatDate(paste?.createdAt)}

                      </div>


                    </div>

              </div>
            )
              
          )
          ) :(
            <div className="text-2xl text-center w-full text-chileanFire-500">
              No data found
            </div>
          )
          
        }

      </div>
     </div>
        

    </div>
    </div>
  );
};

export default Paste