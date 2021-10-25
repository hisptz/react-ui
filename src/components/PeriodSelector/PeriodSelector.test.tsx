import {mount} from "@cypress/react";
import React from 'react'
import PeriodSelector from "components/PeriodSelector/index";



describe("Period Selector Tests", ()=>{

    it("Renders", () => {
        mount(<PeriodSelector onSelect={() => []} selectedPeriods={[]}/>)
    })

})
