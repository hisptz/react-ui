import {mount} from "@cypress/react";
import {Provider} from "@dhis2/app-runtime";
import type { CircularDashboardProps } from "./types/props";
import CircularProgressDashboard from ".";
import React from "react";


describe("CircularProgressDashboard", () => {
    it("should render",()=>{
        mount(<CircularProgressDashboard  
            denominator={10}
            fontSize={16}
            fontWeight="bold"
            numerator={10}
            strokeColor="#1565C0"
            textColor="#1565C0"
            size="30%"
        />);
    }
    );
}
);

