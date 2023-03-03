import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { getAttendanceHistory } from "../services/getAttendanceHistory";

export const Login = () => {
    const [employeeCode, setEmployeeCode] = useState<string>()
    return (
        // <div style={{display: "inline-block"}}>
            <div className="form-container" style={Styles.formContainer}>
                <div style={Styles.title}>Ponto <b>Ilumeo</b></div>
                <div className="input-group" style={Styles.inputGroup}>
                    <input id="username" style={Styles.input} onChange={(event) => setEmployeeCode(event.target.value)}></input>
                    <span className="input-label" style={Styles.inputLabel}>Código do Usuário</span>
                </div>
                <button className="confirm" style={Styles.button} onClick={() => getAttendanceHistory(employeeCode || "")}>Confirmar</button>
                <ToastContainer />
            </div>
        // </div>
    )
}

const Styles = {
    formContainer: {
        width: "365px",
        display: "inline-block",
        maxWidth: "92vw",
        marginTop: "30vh",
        position: "relative"


    } as React.CSSProperties,
    title: {
        color: "#F5F5F5",
        marginBottom: "46px",
        textAlign: "left"
    } as React.CSSProperties,
    input: {
        backgroundColor: "#1E2733",
        border: "0",
        height: "40px",
        width: "calc(100% - 16px)",
        borderRadius: "4px",
        color: "#F5F5F5",
        fontSize: "21.6px",
        paddingTop: "20px",
        paddingLeft: "14px"
    } as React.CSSProperties,
    button: {
        backgroundColor: "#FE8A00",
        height: "47px",
        width: "100%",
        borderRadius: "4px",
        margin: "19px 0"
    },
    inputLabel: {
        top: "7px",
        left: "17px",
        position: "absolute",
        color: "#F5F5F5"
    } as React.CSSProperties,
    inputGroup: {
        position: "relative"
    } as React.CSSProperties,
}