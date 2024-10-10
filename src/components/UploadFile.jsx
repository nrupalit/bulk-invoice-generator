import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../assets/styles/upload-file.scss';
import { fileActions } from "../redux/actions";

export default function UploadFile() {
    const [csvFileName, setCsvFileName] = useState('CSVSampleFile')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState(undefined);
    function handleFileChange(event) {
        const selectedFiles = event.target.files;
        const selectFile = Array.from(selectedFiles);
        setFile(selectFile)
        dispatch(fileActions.addFile(selectFile[0]));
        navigate("/preview")
    }

    function handleDropFile(event) {
        event.preventDefault();
        console.log(event);
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            console.log(droppedFiles);
            dispatch(fileActions.addFile(droppedFiles[0]));
            setFile(droppedFiles)
            navigate("/preview")
        }
    }
    useEffect(() => {
        setFile(undefined)
    }, [file]);
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
                    <div onDrop={handleDropFile}
                        onDragOver={(event) => event.preventDefault()}>
                        <div className="upload-info">
                            <div>
                                <p>Drag and drop your files here</p>
                                <p>
                                    Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT,
                                    .XLSX
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            onChange={handleFileChange} accept={".csv"}
                            value={file}
                            hidden
                        />
                    </Button>
                </section>
            </div>
        </>
    )
}