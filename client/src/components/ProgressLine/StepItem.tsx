import React from "react";
import { IStep, Status } from "../../models/ISteps";

interface IStepItem {
    step: IStep
}

export function StepItem({step}: IStepItem) {

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
        <div className="step">
            <div className="step__header">{step.header}</div>
            <div className={`${getClassActive(step.status)} step__point`}>
                <div className="pre-line"></div>
                <div className="point"></div>
                <div className="post-line"></div>
            </div>
        </div>
    )
}