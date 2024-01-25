import { IStep, Status } from "../../models/ISteps"

let steps: IStep[] = [
    {
        header: "Шаг 1",
        id: 1,
        status: Status.done
    },
    {
        header: "Шаг 2",
        id: 2,
        status: Status.active
    },
    {
        header: "Шаг 3",
        id: 3,
        status: Status.inactive
    }
]

export { steps }