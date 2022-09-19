import React from 'react'
import { CountValue } from '../Utils/Models';
const CountContext = React.createContext<CountValue>({setValues:()=>{},values:{} as any});

export const CountProvider = CountContext.Provider;
export default CountContext;