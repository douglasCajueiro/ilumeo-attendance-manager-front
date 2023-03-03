import { EmployeeHistoryStorage } from "../interfaces/interfaces"
import { getAttendanceHistory } from "../services/getAttendanceHistory"
import { registerWorkDay } from "../services/registerWorkDay"


export const AttendanceHistory = () => {

    const history: EmployeeHistoryStorage = JSON.parse(localStorage.getItem("employeeHistory") || "")
    const employeeCode: string = localStorage.getItem("employeeCode") || "Funcionário"
    const employeeId: string = localStorage.getItem("employeeId") || "id"
    const currentDayStart: string = localStorage.getItem("currentDayStart") || ""
    const dayStarted = currentDayStart != "" ? new Date(currentDayStart) : null

    const lastDate = history[0]
    if (lastDate.work_day_end == null) {
        localStorage.setItem("currentDayStart", lastDate.work_day_start)
        history.shift()
        localStorage.setItem("employeeHistory", JSON.stringify(history))
    }

    const workday = new registerWorkDay()
    const startWorkDay = async () => {
        await workday.start(employeeId)
        getAttendanceHistory(employeeCode)

    }
    const endWorkDay = () => {
        workday.end(history[0].id)

    }

    const exit = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div style={Styles.workDaysContainer}>
            <button style={Styles.exitButton} onClick={exit}>Sair</button>
            <div style={Styles.titles}>
                <div >
                    <span>Relógio de ponto</span>
                </div>
                <div style={Styles.userContainer}>
                    <span style={Styles.employeeCode}>{`#${employeeCode}`}</span>
                    <span>Usuário</span>
                </div>
            </div>
            <p style={Styles.timeCounter}>{
                dayStarted ? calculateWorkDayTime(dayStarted, new Date()) : "0h 00m"
            }</p>
            <p style={Styles.titles}>Horas de hoje</p>
            {
                dayStarted ?
                    (
                        <button style={Styles.button} onClick={endWorkDay}>Hora de Saída</button>
                    ) :
                    (
                        <button style={Styles.button} onClick={startWorkDay}>Hora de Entrada</button>
                    )
            }

            <p style={Styles.titles}>Dias anteriores</p>
            {history
                .map(({ work_day_start, work_day_end, id }) => (
                    <div key={id} style={Styles.workDay}>
                        <span style={Styles.date}>
                            {extractDate(new Date(work_day_start))}
                        </span>
                        <span style={Styles.time}>
                            <b>
                                {calculateWorkDayTime(new Date(work_day_start), new Date(work_day_end))}
                            </b>
                        </span>
                    </div>
                ))}
        </div>
    )
}

const Styles = {
    workDaysContainer: {
        width: "365px",
        display: "inline-block",
        maxWidth: "92vw",
        marginTop: "85px",
        position: "relative"
    } as React.CSSProperties,
    exitButton: {
        position: "absolute",
        right: "0px",
        top: "30px",
        backgroundColor: "#FE8A00",
        borderRadius: "4px"
    } as React.CSSProperties,
    workDay: {
        backgroundColor: "rgba(217, 217, 217, 0.05)",
        marginTop: "7px",
        height: "41px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 13px",
        borderRadius: "4px"
    },
    time: {
        color: "#F5F5F5"
    },
    date: {
        color: "#F5F5F5"
    },
    titles: {
        color: "#F5F5F5",
        margin: "0 0 0 0",
        fontSize: "11.6px",
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: "#FE8A00",
        height: "47px",
        width: "100%",
        borderRadius: "4px",
        margin: "19px 0"
    },
    timeCounter: {
        display: "flex",
        color: "#F5F5F5",
        margin: "25px 0 1px 0",
        fontSize: "23.2px"
    },
    employeeCode: {
    },
    userContainer: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "end"
    }
}

const extractDate = (fullWorkDay: Date) => {
    const day = fullWorkDay.getDate()
    const month = fullWorkDay.getMonth() + 1
    const year = fullWorkDay.getFullYear().toString().slice(-2)
    return `${day >= 10 ? day : "0" + day}/${month >= 10 ? month : "0" + month}/${year}`
}

const calculateWorkDayTime = (startTime: Date, endTime: Date) => {
    const elapsedMiliseconds = endTime.getTime() - startTime.getTime()
    const inMinutes = (elapsedMiliseconds / 1000) / 60
    if (inMinutes < 10) return `0h 0${Math.floor(inMinutes)}m`
    if (inMinutes < 60) return `0h ${Math.floor(inMinutes)}m`
    const totalHours = Math.floor(inMinutes / 60)
    const totalMinutes = inMinutes - (totalHours * 60)
    const getTotalMinutes = totalMinutes < 10 ? "0" + totalMinutes : Math.floor(totalMinutes)
    return `${totalHours}h ${getTotalMinutes}m`
}