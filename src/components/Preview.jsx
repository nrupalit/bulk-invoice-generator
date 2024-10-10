import papaparse from "papaparse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceTable from "./InvoiceTable";
import { Button } from "@mui/material";

export default function Preview() {
    const file = useSelector(state => state.file.file);
    const [values, setValues] = useState([]);
    const header = Object.keys(Object.assign({}, ...values))
    useEffect(() => {
        papaparse.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setValues(results.data);
            },
        });
    }, []);
    return (
        <>
            <h1>Edited CSV data</h1>
            {!!values && <InvoiceTable headers={header} rows={values} />}
            <Button>Retry</Button>
        </>
    )
}