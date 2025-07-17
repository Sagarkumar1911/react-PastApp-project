import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
      pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    :[]
  },
  reducers: {
    addToPastes: (state,action) => {
      const paste =action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id)
      // adding a check -> paste already exist wala case
       if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast("paste created successfully")
     
    },
    updateToPastes: (state,action)=> {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste._id);

      // for valid index greater the then 0

      if(index>=0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste updated")
      }
      
    },
   resetAllPastes: (state, action) => {
    state.pastes=[];
    localStorage.removeItem("pastes");
     
    },
   removeFromPastes:(state,action)=>{
    const pasteId= action.payload;
    console.log(pasteId);
    const index = state.pastes.findIndex((item)=> item._id === pasteId)

    if(index >=0){
      // delete the paste in the index
      state.pastes.splice(index,1);
      // update in the local storage
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("psate deleted")
    }

    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes,  updateToPastes,resetAllPastes,removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer