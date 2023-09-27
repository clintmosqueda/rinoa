"use client";
import { createContext, useEffect, useState } from "react";
export const ValueContext = createContext();

export const ValueProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]) 

  useEffect(() => {
    const getEmployees = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/employee`);
      const data = await res.json();
      const staffs = data.map((employee) => {
        return {
          id: employee.id,
          name: employee.name
        }
      })
      setEmployees(staffs)
    }
    getEmployees()
  },[])

  return ( <ValueContext.Provider value={{employees, setEmployees}}>{children}</ValueContext.Provider>
  );
};