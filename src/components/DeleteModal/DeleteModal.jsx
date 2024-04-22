import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Modal } from "@mui/material";
import Button from "../Button/Button";
import './DeleteModal.scss';

export default function DeleteModal({ className, dataId, dataName, dataType, reRender }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}${dataType}/${dataId}`);
        handleClose();
        reRender();
    };

    return (
        <div>
            <div className={className} onClick={handleOpen}></div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="modal">
                    <div className="modal__content-wrapper">
                        <div className="modal__icon-wrapper">
                            <div className="modal__close-icon" onClick={handleClose} />
                        </div>
                        <div>
                            <h1>
                                Delete {dataName} {dataType === "warehouses" && "warehouse"}{dataType === "inventories" && "inventory item"}?
                            </h1>
                            <p>
                                Please confirm that you’d like to delete {dataName} from the list of {dataType}. You won’t be
                                able to undo this action.
                            </p>
                        </div>
                    </div>

                    <div className="modal__button-wrapper">
                        <Button variant="secondary" text="Cancel" onClick={handleClose}>Cancel</Button>
                        <Button variant="delete" text="Delete" onClick={handleDelete}>Delete</Button>
                    </div>
                </Box>

            </Modal>
        </div>
    );
}

// Ensure that the delete functionality for warehouses is created, and that the confirmation modal is created and functional.

// Ensure that this component works at and between all breakpoints and is fully responsive without any elements overlapping.

// Assign the equivalent back-end ticket as well, as it will be easier if a given team member does both the front-end and back-end tasks for this workflow.