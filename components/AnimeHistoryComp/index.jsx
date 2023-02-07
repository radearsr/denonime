import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AnimeSearchComp = ({
  poster,
  title,
  lengthData,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className={`col-12 col-md-6 col-lg-4 mb-3 anime-card p-0 rounded-2 d-flex ${lengthData > 1 ? "mx-auto" : ""}`}>
        <Link className="d-flex w-100 text-decoration-none" href="/search?query=">
          <div className="wrapper-card-thumb">
            <Image
              src={poster}
              alt={title}
              width="200"
              height="200"
              quality="100"
              className="img-fluid rounded-start-2"
            />
            <span>
              <i className="bi bi-play-fill icon-play">{" "}</i>
            </span>
          </div>
          <div className="card-about align-self-center">
            <h1 className="card-about-title text">{title}</h1>
            <p className="card-about-text text m-0">01 / 12 episode</p>
            <p className="card-about-text text m-0">10:00 / 24:00</p>
          </div>
        </Link>
        <Button className="delete-history" onClick={handleShow}>
          <i className="bi bi-trash">{" "}</i>
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="bg-space rounded py-4">
          <h4 className="text-center modal-title">Yakin ?</h4>
          <p className="modal-text-detail my-3 text-center">{`Apakah anda yakin ingin menghapus history "${title}"?`}</p>
          <div className="d-flex justify-content-center">
            <button className="btn accept w-50 rounded-pill mx-2 p-2">Ya</button>
            <button className="btn cancel w-50 rounded-pill mx-2 p-2" onClick={handleClose}>Tidak</button>
          </div>
          <div className="box-icon px-2 py-0">
            <i className="bi bi-exclamation-triangle-fill">{" "}</i>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AnimeSearchComp;
