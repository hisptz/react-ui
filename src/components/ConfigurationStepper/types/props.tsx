
export type StepsList = {
    label:string,
    component:(props?:any)=>any,
    helpSteps?:Array<any>
}

export type ConfigurationStepperProps ={
    stepsManagement:StepsList[],
    onLastAction:(value?:any) => void,
    activeStepperBackGroundColor:string,
    onCancelLastAction: (value?:any)=>void,
    onLastActionButtonName:string


}