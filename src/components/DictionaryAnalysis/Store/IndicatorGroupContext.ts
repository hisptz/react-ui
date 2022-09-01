import React from 'react'
import { IndicatorGroupValue } from '../Utils/Models';

export const IndicatorGroupContext = React.createContext<IndicatorGroupValue>({setValues:()=>{},values:{} as any});

export const IndicatorGroupProvider = IndicatorGroupContext.Provider;
// export IndicatorGroupContext;

