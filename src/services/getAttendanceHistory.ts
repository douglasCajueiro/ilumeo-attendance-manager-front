import { toast } from "react-toastify"
import api from "../http-common"
import { EmployeeHistoryDB } from "../interfaces/interfaces"

const now = new Date();
const year = now.getFullYear()
const month = now.getMonth()
const day = now.getDate()
const todayMidnight = new Date(year, month, day)

export const getAttendanceHistory = async (employeeCode: string) => {
    await api.get<EmployeeHistoryDB>(`employees/${employeeCode}/attendanceHistory`)
        .then((response) => {
            localStorage.setItem("employeeHistory", JSON.stringify(
                response.data.workDays.sort((a, b) => (
                    new Date(b.work_day_start).getTime() - new Date(a.work_day_start).getTime())
                )))
            const { workDays, id } = response.data
            const lastDayEnd = workDays[0].work_day_end
            const lastDayEndDate = new Date(lastDayEnd)

            if (workDays.length > 0 && lastDayEndDate >= todayMidnight) {
                localStorage.setItem("currentDayEnd", lastDayEnd)
            }

            localStorage.setItem("employeeId", response.data.id)
            localStorage.setItem("employeeCode", employeeCode || "Guest")
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