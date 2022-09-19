import React from 'react'
import { DictionaryValue } from '../Utils/Models';
const DictionaryContext = React.createContext<DictionaryValue>({setValues:()=>{},values:{} as any});

export const DictionaryProvider = DictionaryContext.Provider;
export default DictionaryContext;

