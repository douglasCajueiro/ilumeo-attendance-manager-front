import api from "../http-common"
import { workDay } from "../interfaces/interfaces"

export class registerWorkDay {
    start = async(employeeId: string) => {
        await api.post<workDay>(`workday/${employeeId}/start`).then((response) => {
            const {id: currentDayId} = response.data
            localStorage.setItem("currentWorkDayId", currentDayId)
            return currentDayId
        })
    }
    end = async(currentDayId: string) => {
        api.patch(`workday/${currentDayId}/end`).then((response) => {
            
        })
    }
}