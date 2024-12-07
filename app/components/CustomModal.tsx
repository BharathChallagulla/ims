import { Modal, Paper, Typography } from "@mui/material";

type ModProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
};

const CustomModal = ({ open, title, children, handleClose }: ModProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="overflow-auto"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: "auto" }}>
        {/* <h2 id="modal-title">{title}</h2> */}
        {children}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
