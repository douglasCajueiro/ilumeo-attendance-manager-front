import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import api from "../http-common"
import { EmployeeHistory } from "../interfaces/interfaces"
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [employeeCode, setEmployeeCode] = useState<string>()

    const getHistory = async () => {
        await api.get<EmployeeHistory>(`employees/${employeeCode}/attendanceHistory`)
            .then((response) => {
                localStorage.setItem("employeeHistory", JSON.stringify(response.data))
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
    return (
        <div className="form-container">
            <div>Ponto <b>Ilumeo</b></div>
            <div className="input-group">
                <input id="username" style={Styles.input} onChange={(event) => setEmployeeCode(event.target.value)}></input>
                <label className="input-label" htmlFor="username" style={Styles.inputLabel}>Código do Usuário</label>
            </div>
            <button className="confirm" style={Styles.button} onClick={getHistory}>Confirmar</button>
            <ToastContainer/>
        </div>
    )
}

const Styles = {
    input: {
        backgroundColor: "#1E2733",
        border: "0",
        height: "60px",
        width: "365px",
        borderRadius: "4px"
    },
    button: {
        backgroundColor: "#FE8A00",
        height: "47px",
        width: "365px",
        borderRadius: "4px",
        marginTop: "24px",
        border: 0
    },
    inputLabel: {
        top: "25px",
        left: "25px"
    }
}