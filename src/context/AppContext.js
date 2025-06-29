"use client"
import { doctors } from "@/assets/assets_frontend/assets";
import { createContext } from "react";

export const AppContext= createContext()
const currencySy ='₹'
 const AppContextProvider=(props)=>{
  const value={
    doctors,currencySy 
  }

  return(
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider;