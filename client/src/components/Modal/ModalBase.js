import React, { useState, createContext, useContext } from "react";
import Modal from "react-bootstrap/Modal";


const ModalClosureContext = createContext();
export const useModalClosure = () => useContext(ModalClosureContext);


function ModalBase({ children, modalTitle = "", customButton = null, modalButton = "New"}) {
  const [showModal, setShowModal] = useState(false);
  const contextvalue = [showModal, setShowModal];
  
  function HandleOpen() {
    setShowModal(true);
  }
  function HandleClose() {
    setShowModal(false);
  }
  
  return (
    <>
      {customButton == null ? (
        <button className="btn btn-primary" onClick={HandleOpen}>
          {modalButton}
        </button>
      ) : null}

      <Modal show={showModal} onHide={HandleClose} size="lg">
        {modalTitle.length > 0 &&
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
        }
        <Modal.Body>        
          <ModalClosureContext.Provider value={contextvalue}>
            {children}
          </ModalClosureContext.Provider>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalBase;
