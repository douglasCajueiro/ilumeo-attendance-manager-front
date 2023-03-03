import { toast } from "react-toastify"
import api from "../http-common"
import { EmployeeHistoryDB } from "../interfaces/interfaces"

export const getAttendanceHistory = async (employeeCode: string) => {
    await api.get<EmployeeHistoryDB>(`employees/${employeeCode}/attendanceHistory`)
        .then((response) => {
            localStorage.setItem("employeeHistory", JSON.stringify(
                response.data.workDays.sort((a, b) => (
                    new Date(b.work_day_start).getTime() - new Date(a.work_day_start).getTime())
                )))
            localStorage.setItem("employeeId", response.data.id)
            localStorage.setItem("employeeCode", employeeCode || "Guest")
            const { workDays, id } = response.data
            console.log(id, workDays)
            window.location.reload()
            return response.data
        })
        .catch((err) => {
            console.log("Usuário não encontrado")
            if (err.response.data.message) {
                toast.warn("Usuário não encontrado", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
        })
}