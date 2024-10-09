import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { fileActions } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function UploadFile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleFileChange(event) {
        const selectedFiles = event.target.files;
        const selectFile = Array.from(selectedFiles);
        dispatch(fileActions.addFile(selectFile[0]));
        // const fileReader = new FileReader();
        // fileReader.onloadend = function (event) {
        //     dispatch(fileActions.addFilePreview(event.target.result))
        // };
        // fileReader.readAsText(selectFile[0]);

        navigate("/preview")
    }
    // const handleOnSubmit = (e) => {
    //     e.preventDefault();

    //     if (file) {
    //         fileReader.onload = function (event) {
    //             const csvOutput = event.target.result;
    //         };

    //         fileReader.readAsText(file);
    //     }
    // };
    return (
        <>
            <div>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        onChange={handleFileChange} accept={".csv"}
                        hidden
                    />
                </Button>
                <input
                    type="file"
                    onChange={handleFileChange} accept={".csv"}
                />
                <Button >Download sample File</Button>
            </div>
        </>
    )
}