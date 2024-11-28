import { Modal } from "@mui/material";

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
      aria-labelledby="modal-title"
    >
      <>
        <h2 id="modal-title">{title}</h2>
        {children}
      </>
    </Modal>
  );
};

export default CustomModal;
