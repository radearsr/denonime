import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import NotFoundImg from "../assets/404.png";

const NotFoundError = () => (
  <>
    <Head>
      <title>404 - Page Not Found | DenoNime</title>
    </Head>
    <Container>
      <Row className="align-items-center justify-content-center wrapper-error">
        <Col xs={12} md={5}>
          <Image src={NotFoundImg} width="500" quality={50} className="img-fluid img-error" />
        </Col>
        <Col xs={12} md={7} className="text-center">
          <h1 className="fw-bold error-code">404</h1>
          <h2 className="fw-bold error-title my-1">Page Not Found</h2>
          <p className="error-description">Maaf, halaman yang Anda cari tidak dapat ditemukan</p>
          <p className="error-description mb-3">Mohon kembali ke halaman beranda</p>
          <Link href="/" className="btn btn-error rounded-pill px-4 py-2 fw-bold">Beranda</Link>
        </Col>
      </Row>
    </Container>
  </>
);

export default NotFoundError;
