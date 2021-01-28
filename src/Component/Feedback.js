import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Feedback({ feedbackOpen, setFeedbackOpen }) {
    const handleClose = () => {
        setFeedbackOpen(false);
    };

    return (
        <Dialog
            open={feedbackOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">피드백 제공하기</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    이글루 서비스를 이용해주셔서 감사합니다. 서비스를
                    이용하시면서 좋았던 점이나 불편했던 점을 적어주시면 반영하여
                    더 나은 시버스를 제공할 수 있도록 노력하겠습니다.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="내용"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    취소
                </Button>
                <Button onClick={handleClose} color="primary">
                    피드백 남기기
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Feedback;
