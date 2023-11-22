import {useNavigate} from 'react-router-dom'
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid px-3">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <form className="d-flex" role="search">
            <button onClick={handleLogout} className="btn btn-outline-danger" type="submit">
              LOGOUT
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
