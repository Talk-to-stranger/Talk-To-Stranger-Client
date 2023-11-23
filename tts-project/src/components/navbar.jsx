import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function Navbar() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io('http://localhost:3000');

    setSocket(s);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('access_token');
    socket.disconnect();
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <img style={{ width: '3em' }} className="bg-dark" src="assasin-removebg-preview.png" alt="Talk-To-Stranger Icon" />

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
