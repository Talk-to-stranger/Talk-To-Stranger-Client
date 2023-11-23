
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
      <nav className="navbar navbar-expand-lg bg-dark bg-gradient">
        <div className="container-fluid">
          {/* <a className="navbar-brand" style={{ color: "#EACDC2" }}>
            Talk To Stranger
          </a> */}
          <img style={{width: "5em"}} className='bg-dark bg-gradient' src="assasin-removebg-preview.jpg" alt="Talk-To-Stranger Icon" />

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
