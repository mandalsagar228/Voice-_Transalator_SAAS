import PropTypes from "prop-types";

import Modal from "react-modal";
import { RxCross1 } from "react-icons/rx";

const PopUpModal = ({ className, setModalIsOpen, modalIsOpen, children }) => {
  // const onModalChange = () => {
  //   setModalIsOpen(true);
  // };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        className={className}
        overlayClassName="modal-overlay" //just to remove modal bg effect
        onRequestClose={() => setModalIsOpen(false)}
      >
        <RxCross1
          onClick={() => setModalIsOpen(false)}
          className="absolute top-2 right-2 cursor-pointer hover:bg-slate-300  hover:rounded-md"
        />
        {children}
      </Modal>
    </>
  );
};

PopUpModal.propTypes = {
  className: PropTypes.node.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,

  children: PropTypes.node.isRequired,
};

export default PopUpModal;
