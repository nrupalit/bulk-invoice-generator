import papaparse from "papaparse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../assets/styles/preview.scss';
import InvoiceTable from "./InvoiceTable";

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
            {!!values && <InvoiceTable headers={header} rows={values} />}
        </>
    )
}