import { Button } from "@mui/material";
import papaparse from "papaparse";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { METHOD, URL } from "../common/apiConst";
import { ROUTES } from "../common/routes";
import InvoiceTable from "./InvoiceTable";
import apiCall from "../common/apiCall";

export default function Preview() {
    const file = useSelector(state => state.file.file);
    const [values, setValues] = useState([]);
    const header = Object.keys(Object.assign({}, ...values));
    const navigate = useNavigate();
    const id = useRef("document-" + (Math.floor(1000 + Math.random() * 9000)))
    useEffect(() => {
        papaparse.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setValues(results.data);
            },
        });
    }, []);
    const navigateToHome = () => {
        navigate(ROUTES.HOME)
    }

    function handleSubmit() {
        const data = {
            id: id.current,
            data: values
        }
        apiCall(URL.GENERATE_PDF, METHOD.POST, data).then(() => {
            alert("File is successfully created in ", data.id)
        })
            .catch((err) => {
                console.error(err);
                alert("Some error please try again")
            });
    }
    return (
        <>
            <h1>Edited CSV data</h1>
            {!!values && <InvoiceTable headers={header} rows={values} />}
            <Button onClick={navigateToHome}>Retry</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    )
}