import { toast } from "react-toastify"
import api from "../http-common"
import { EmployeeHistoryDB } from "../interfaces/interfaces"

// export const getAttendanceHistory = async (employeeCode: string) => {
//     return await (await api.get<EmployeeHistoryDB>(`employees/${employeeCode}/attendanceHistory`)).data
// }

export const getAttendanceHistory = async (employeeCode: string) => {
    await api.get<EmployeeHistoryDB>(`employees/${employeeCode}/attendanceHistory`)
        .then((response) => {
            localStorage.setItem("employeeHistory", JSON.stringify(response.data.workDays))
            localStorage.setItem("employeeId", JSON.stringify(response.data.id))
            localStorage.setItem("employeeCode", employeeCode || "Guest")
            const {workDays, id} = response.data
            console.log(id, workDays)
            window.location.reload()
        })
        .catch((err) => {
            console.log("Usuário não encontrado")
            if (err.response.data.message){
                toast.warn("Usuário não encontrado", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
        })
}