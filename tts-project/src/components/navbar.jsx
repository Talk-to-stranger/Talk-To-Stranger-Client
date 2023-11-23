import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { setMuteLogout, setOnlineLogout } from '../features/statusSlice';
import { useDispatch } from 'react-redux';
const baseUrl = 'https://nyx.yoiego.my.id';
// const localhost = 'http://localhost:3000';

export default function Navbar() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState();
  // const statusFromRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const s = io(baseUrl);

    setSocket(s);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { access_token: `${localStorage.getItem('access_token')}` };
    socket.emit('userOffline', data, () => {
      dispatch(setMuteLogout());
      dispatch(setOnlineLogout());
      socket.disconnect();
      localStorage.removeItem('access_token');
      navigate('/login');
    });
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
