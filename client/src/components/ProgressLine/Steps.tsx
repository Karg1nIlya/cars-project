import React, { useContext, useEffect } from "react";
import "./steps.css"
import { IStep, Status } from "../../models/ISteps";
import { StepItem } from "./StepItem";
// import { steps } from "./stepsData"

interface IProgressLine {
    stepsArr: IStep[],
    // updateStepsArr: () => void
}

// interface ISteps {
//     stepsArr: IStep[]
// }

export default function ProgressLine({stepsArr}: IProgressLine) {

    // useEffect(()=>{ 
    //     console.log(stepsArr)
    // },[])

    function getClassActive(status: Status) {
        let res: string = ''
        switch (status) {
            case Status.active: {
                res = 'active'
                break;
            }
            case Status.inactive: {
                res = 'inactive'
                break;
            }
            case Status.done: {
                res = 'done'
                break;
            }
            default:
                break;
        }
        return res
    }

    return (
        <div className="progress-line">
            {stepsArr.map((step: IStep) => {
                return (
                    <StepItem step={step} key={step.id}></StepItem>
                )
            })}
        </div>
    )
}