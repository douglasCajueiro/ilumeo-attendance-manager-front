import { EmployeeHistoryStorage } from "../interfaces/interfaces"


export const AttendanceHistory = () => {

    // const [employeeCode, setEmployeeCode] = useState<string>()



    const history: EmployeeHistoryStorage = JSON.parse(localStorage.getItem("employeeHistory") || "")

    return (
        <div>

            <div style={Styles.workDaysContainer}>
                <div style={Styles.titles}>
                    <div >
                        <span>Relógio de ponto</span>
                    </div>
                    <div style={Styles.userContainer}>
                        <span style={Styles.employeeCode}>#4SXXFMF</span>
                        <span>Usuário</span>
                    </div>
                </div>
                <p style={Styles.timeCounter}>6h 13m</p>
                <p style={Styles.titles}>Horas de hoje</p>
                <button style={Styles.button}>Hora de Entrada</button>
                <p style={Styles.titles}>Dias anteriores</p>
                {history
                    .sort((a, b) => (
                        new Date(b.work_day_start).getTime() - new Date(a.work_day_start).getTime())
                    )
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
        </div>
    )
}

const Styles = {
    workDaysContainer: {
        width: "365px",
        display: "inline-block",
        maxWidth: "92vw",
        marginTop: "85px"

    },
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
        // fontSize: "12px",
        // opacity: "100%"
    },
    date: {
        color: "#F5F5F5"
    },
    titles: {
        color: "#F5F5F5",
        margin: "0 0 0 0",
        fontSize: "11.6px",
        display: "flex",
        justifyContent: "space-between",
        // alignItems: "center"
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
        // alignSelf: "end"
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
    if (inMinutes < 60) return `${inMinutes}m`
    const totalHours = Math.floor(inMinutes / 60)
    const totalMinutes = inMinutes - (totalHours * 60)
    const getTotalMinutes = totalMinutes < 10 ? 0 + totalMinutes.toString() : totalMinutes
    return `${totalHours}h ${getTotalMinutes}m`
}