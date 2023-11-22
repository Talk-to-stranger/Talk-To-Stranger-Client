import { Outlet, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('access_token');
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid px-3">
          <a className="navbar-brand" href="#">
            Talk To Stranger
          </a>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <button className="btn btn-outline-danger" type="submit">
              LOGOUT
            </button>
          </form>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
