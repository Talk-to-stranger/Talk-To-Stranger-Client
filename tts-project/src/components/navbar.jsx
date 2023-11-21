export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid px-3">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-danger" type="submit">
              LOGOUT
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
