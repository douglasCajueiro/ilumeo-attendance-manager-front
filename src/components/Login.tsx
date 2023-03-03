import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { getAttendanceHistory } from "../services/getAttendanceHistory";

export const Login = () => {
    const [employeeCode, setEmployeeCode] = useState<string>()
    return (
        <div className="form-container">
            <div>Ponto <b>Ilumeo</b></div>
            <div className="input-group">
                <input id="username" style={Styles.input} onChange={(event) => setEmployeeCode(event.target.value)}></input>
                <label className="input-label" htmlFor="username" style={Styles.inputLabel}>Código do Usuário</label>
            </div>
            <button className="confirm" style={Styles.button} onClick={() => getAttendanceHistory(employeeCode || "")}>Confirmar</button>
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
        marginTop: "24px"
    },
    inputLabel: {
        top: "25px",
        left: "25px"
    }
}