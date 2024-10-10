import papaparse from "papaparse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceTable from "./InvoiceTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../common/routes";

export default function Preview() {
    const file = useSelector(state => state.file.file);
    const [values, setValues] = useState([]);
    const header = Object.keys(Object.assign({}, ...values));
    const navigate = useNavigate();
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
    return (
        <>
            <h1>Edited CSV data</h1>
            {!!values && <InvoiceTable headers={header} rows={values} />}
            <Button onClick={navigateToHome}>Retry</Button>
        </>
    )
}