import type {Story} from "@storybook/react";
import React from "react";
import { CircularDashboardProps } from "./types/props";
import CircularProgressDashboard from ".";


const Template: Story<CircularDashboardProps> =(args) => <CircularProgressDashboard {...args} />;

export const Default = Template.bind({});
Default.args = {
    
        strokeColor:'#1565C0',
        textColor:'#1565C0',
        fontSize:32,
        fontWeight:'bold',
        numerator:7,
        denominator:10,
        size:'30%'
    
}

export default {
    title: "Components/CircularProgressIndicator",
    component: CircularProgressDashboard,
}
