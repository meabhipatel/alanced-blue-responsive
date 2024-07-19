import API from "../../config/API"
import DataService from "../../config/Dataservice"
import { handleError} from "./Comman"


export const LoginHandler = async (data) => {
    return DataService.post(API.Auth.Login, data ).then((res) => {
        return res.data
    }).catch((err) => {
        return handleError(err)
    })
}





