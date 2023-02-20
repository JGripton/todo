import { Task } from "src/typeorm";


export const taskStub = (): Task => {
    return  {
        id: 0,
        auth0_id: "0000000000",
        description: "Walk the dog",
        is_completed: false
    }
}