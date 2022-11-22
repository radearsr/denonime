const GeneralLayout = ({ children }) => (
  <>
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm bg-orange">
      <div className="container">
        <a className="navbar-brand" href="/">DenoNime</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">{" "}</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/history">History</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">About</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    {children}
    <div className="visible_mob_nav">{" "}</div>
    <div className="container-md py-2 fixed-bottom mobile-nav">
      <div className="row justify-content-center">
        <div className="col-3 d-flex flex-column align-items-center">
          <i className="bi bi-house-door">{" "}</i>
          <p className="icon-label">Home</p>
        </div>
        <div className="col-3 d-flex flex-column align-items-center">
          <i className="bi bi-search">{" "}</i>
          <p className="icon-label">Search</p>
        </div>
        <div className="col-3 d-flex flex-column align-items-center">
          <i className="bi bi-clock-history">{" "}</i>
          <p className="icon-label">History</p>
        </div>
        <div className="col-3 d-flex flex-column align-items-center">
          <i className="bi bi-info-square">{" "}</i>
          <p className="icon-label">About</p>
        </div>
      </div>
    </div>
  </>
);

export default GeneralLayout;
