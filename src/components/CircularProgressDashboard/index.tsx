import React, { useMemo } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { CircularDashboardProps } from "./types/props";


export default function CircularProgressDashboard(props:CircularDashboardProps):React.ReactElement{
    const filledSectionFieldsPercentage = useMemo(() => {
        return Math.floor(
            (props.numerator /
            props.denominator) *
                100
        );
    }, [props.numerator, props.denominator]);
    return (
        <div style={{
            "backgroundColor":"transparent",
            "width":props.size,    
        }}>
            <CircularProgressbarWithChildren
                                styles={{
                                    path: {
                                        stroke:props.strokeColor ,
                                    }
                                }}
                                strokeWidth={7}
                                value={filledSectionFieldsPercentage}
                            >
                                <div style={{ fontSize: props.fontSize,fontWeight:props.fontWeight, marginTop: -11 }}>
                                    <strong style={{"color":props.textColor}}>{filledSectionFieldsPercentage}%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
        </div>
    );

}