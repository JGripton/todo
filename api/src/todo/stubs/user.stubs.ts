import { User } from "src/typeorm"

export const userStub = (): User => {
    return  {
        id: 0,
        auth0_id: "0000000000",
        nickname: "Jim",
        has_translated: false,
        is_admin: false
    }
}