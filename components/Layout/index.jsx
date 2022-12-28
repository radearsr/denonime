import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";

const Layout = ({ children, addonClass = "" }) => {
  const router = useRouter();
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark ${addonClass}`}>
        <div className="container">
          <Link className="navbar-brand" href="/">DenoNime</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`${router.pathname === "/" ? "active" : ""} nav-link`} aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`${router.pathname === "/history" ? "active" : ""} nav-link`} aria-current="page" href="/history">History</Link>
              </li>
              <li className="nav-item">
                <Link className={`${router.pathname === "/about" ? "active" : ""} nav-link`} aria-current="page" href="/about">About</Link>
              </li>
            </ul>
            <form className="col-md-5">
              <div className="row g-0">
                <div className="col-9 col-md-10">
                  <input
                    type="search"
                    autoComplete="off"
                    placeholder="Cari Anime..."
                    name="query"
                    className={styles.input_search}
                  />
                </div>
                <div className="col-3 col-md-2">
                  <button type="submit" className={styles.btn_action}>
                    <i className="bi bi-search">{" "}</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
      {children}
      <div className={styles.visible_mob_nav}>{" "}</div>
      <div className="container-md py-2 fixed-bottom mobile-nav">
        <div className="row justify-content-center">
          <Link
            className={`col-3 d-flex flex-column align-items-center nav-mob-item ${router.pathname === "/" ? "active" : ""}`}
            href="/"
          >
            <i className="bi bi-house-door">{" "}</i>
            <p className="icon-label">Home</p>
          </Link>
          <Link
            className={`col-3 d-flex flex-column align-items-center nav-mob-item ${router.pathname === "/search" ? "active" : ""}`}
            href="/search"
          >
            <i className="bi bi-search">{" "}</i>
            <p className="icon-label">Search</p>
          </Link>
          <Link
            className={`col-3 d-flex flex-column align-items-center nav-mob-item ${router.pathname === "/history" ? "active" : ""}`}
            href="/history"
          >
            <i className="bi bi-clock-history">{" "}</i>
            <p className="icon-label">History</p>
          </Link>
          <Link
            className={`col-3 d-flex flex-column align-items-center nav-mob-item ${router.pathname === "/about" ? "active" : ""}`}
            href="/about"
          >
            <i className="bi bi-info-square">{" "}</i>
            <p className="icon-label">About</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Layout;
