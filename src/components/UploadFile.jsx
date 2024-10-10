import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import '../assets/styles/upload-file.scss';
import DragNdrop from "./DragNdrop";

export default function UploadFile() {
    const [csvFileName, setCsvFileName] = useState('CSVSampleFile')

    function handleFileNameChange(event) {
        setCsvFileName(event.target.value)
    }
    return (
        <>
            <div>
                <section className="sample-data-container">
                    <FormControl>
                        <InputLabel>Enter sample csv file name</InputLabel>
                        <Input value={csvFileName} onChange={handleFileNameChange} />
                    </FormControl>
                    <Button><a href="src/assets/CSVfile.csv" download={csvFileName}>Download sample file here</a></Button>
                </section>
                <section className="upload-file-container">
                    <DragNdrop width="90vw" height="70vh" />
                </section>
            </div>
        </>
    )
}