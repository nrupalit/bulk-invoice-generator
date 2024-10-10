import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../assets/styles/drag-drop.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fileActions } from "../redux/actions";
import { ROUTES } from "../common/routes";

import PropTypes from 'prop-types';

DragNdrop.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
}

function DragNdrop({ width, height }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState(undefined);

    useEffect(() => {
        setFile(undefined);
    }, [file]);

    function handleFileChange(event) {
        const selectedFiles = event.target.files;
        const selectFile = Array.from(selectedFiles);
        if (selectFile.length > 0) {
            handleSelectedFile(selectFile)
        }
    }

    function handleDropFile(event) {
        event.preventDefault();
        console.log(event);
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            handleSelectedFile(droppedFiles)
        }
    }

    function handleSelectedFile(file) {
        setFile(file)
        dispatch(fileActions.addFile(file[0]));
        navigate(ROUTES.PREVIEW)
    }

    function handleRemoveFile() {
        setFile(undefined)
    }

    return (
        <section className="drag-drop" style={{ width: width, height: height }}>
            <div
                className={`document-uploader ${file?.length > 0 ? "upload-box active" : "upload-box"
                    }`}
                onDrop={handleDropFile}
                onDragOver={(event) => event.preventDefault()}
            >
                <>
                    <div className="upload-info">
                        <div>
                            <p>Drag and drop your files here</p>
                            <p>
                                Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT,
                                .XLSX
                            </p>
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
                </>

                {file?.length > 0 && (
                    <div className="file-list">
                        <div className="file-list__container">
                            {file?.map((file, index) => (
                                <div className="file-item" key={index}>
                                    <div className="file-info">
                                        <p>{file.name}</p>
                                    </div>
                                    <div className="file-actions">
                                        <Button onClick={() => handleRemoveFile(index)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {file?.length > 0 && (
                    <div className="success-file">
                        <p>{file?.length} file(s) selected</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DragNdrop;