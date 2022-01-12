import { NextPage } from "next";
import * as React from "react";
import Application from "../components/Application";
import ConnectionDialog from "../components/ConnectionDialog";
import { Modal } from "@mui/material";

const Home: NextPage = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ConnectionDialog callback={console.log} />
      </Modal>
      {!open && <Application />}
    </div>
  );
};

export default Home;
