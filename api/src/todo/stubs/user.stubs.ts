import { User } from "src/typeorm"

export const userStub = (): User => {
    return  {
        id: 0,
        auth0_id: "777777777777",
        nickname: "Jim",
        has_translated: false,
        is_admin: true
    }
}