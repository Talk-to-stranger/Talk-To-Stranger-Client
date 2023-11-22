import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setMicrophone, setMute, setOnline, setUsername } from '../features/statusSlice';

export default function Home() {
  const statusFromRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const [users, setUsers] = useState([]);
  // const [userStatus, setUserStatus] = useState({
  //   microphone: false,
  //   mute: false,
  //   username: 'user#',
  //   online: false,
  // });

  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    const s = io('http://localhost:3000');
    s.emit('init', { access_token });
    setSocket(s);
  }, [access_token]);

  if (socket) {
    socket.emit('userInformation', statusFromRedux);
  }

  function toggleConnection(e) {
    e.preventDefault();
    if (statusFromRedux.status.online === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }

    // setUserStatus({ ...userStatus, online: !userStatus.online });
    dispatch(setOnline());

    emitUserInformation();
  }

  function toggleMute(e) {
    e.preventDefault();
    if (statusFromRedux.status.mute === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }

    // setUserStatus({ ...userStatus, mute: !userStatus.mute });
    dispatch(setMute());

    emitUserInformation();
  }

  function toggleMicrophone(e) {
    e.preventDefault();
    if (statusFromRedux.status.microphone === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }

    // setUserStatus({ ...userStatus, microphone: !userStatus.microphone });
    dispatch(setMicrophone());

    emitUserInformation();
  }

  useEffect(() => {
    function mainFunction(time) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        let mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();

        let audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', function (event) {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', function () {
          let audioBlob = new Blob(audioChunks);

          audioChunks = [];

          let fileReader = new FileReader();
          fileReader.readAsDataURL(audioBlob);

          fileReader.onloadend = function () {
            if (!statusFromRedux.status.microphone || !statusFromRedux.status.online) return;

            let base64String = fileReader.result;
            socket.emit('voice', base64String);
          };

          mediaRecorder.start();

          setTimeout(function () {
            mediaRecorder.stop();
          }, time);
        });

        setTimeout(function () {
          mediaRecorder.stop();
        }, time);
      });
      if (statusFromRedux.status.online === true) {
        socket.on('send', function (data) {
          let audio = new Audio(data);
          audio.play();
        });
      } else {
        socket.off('send');
      }
      socket.on('usersUpdate', function (data) {
        if (data.myProfile) {
          setUsers(data.users);
          dispatch(setUsername(data.myProfile));
        } else {
          setUsers(data);
        }
      });
    }
    if (socket) {
      mainFunction(1000);
    }
  }, [socket, statusFromRedux]);

  function emitUserInformation() {
    socket.emit('userInformation', statusFromRedux);
  }

  if (!users) {
    return <div>Loading........</div>;
  }

  return (
    <>
      <div className="container-fluid bg-light vh-100 vw-100 py-3">
        <h3 className="text-center h-0">
          <span className="fw-bold ">Your Accout Name: {statusFromRedux.status.username}</span>
        </h3>
        <div className="d-flex flex-row justify-content-evenly align-items-center h-75">
          <div className="card" style={{ width: '24rem' }}>
            <div className="card-body">
              <h5 className="card-title text-center">
                <span className="fw-bold">Welcome to Talk To Stranger</span>
              </h5>
              <p className="card-text">
                Talk to strangers is a platform that can make you connect with people you dont know. How can we connect? the method is very simple All you have to do is click the online button below, you will automatically be connected to
                people who are online here too
              </p>
            </div>
          </div>
          <div className="bg-light" style={{ width: '24rem' }}>
            <div className="card-body text-center">
              <button className="btn btn-primary mx-2" onClick={toggleMicrophone}>
                Open Mic
              </button>
              <button className="btn btn-primary mx-2" onClick={toggleMute}>
                Mute
              </button>
              <button className="btn btn-primary mx-2" onClick={toggleConnection}>
                Online
              </button>
            </div>
          </div>
          <div className="card bg-transparant" style={{ width: '24rem' }}>
            <div className="card-body">
              <h5 className="card-title text-center">
                <span className="fw-bold ">List Users</span>
              </h5>
              <div className="container text-center">
                {users.map((user, index) => {
                  return (
                    <div key={index} className="d-flex">
                      <h6 className="px-3">{user.name}</h6>
                      <h6>({user.status})</h6>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="row  h-100">
          <div className="col-8">
            <div className="d-flex justify-content-center h-100 py-3">
              <div className="d-flex flex-column ">
                <h4 className="text-center ">
                  <span className="fw-bold">Your Accout Name: {statusFromRedux.status.username}</span>
                </h4>
                <div>
                  <button className="btn btn-primary mx-2" onClick={toggleMicrophone}>
                    Open Mic
                  </button>
                  <button className="btn btn-primary mx-2" onClick={toggleMute}>
                    Mute
                  </button>
                  <button className="btn btn-primary mx-2" onClick={toggleConnection}>
                    Online
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col bg-dark-subtle">
            <div className="d-flex justify-content-center py-3">
              <div className="d-flex flex-column ">
                <h3 className="fw-bold text-center">Online list User</h3>
                <div className="container text-center">
                  {users.map((user, index) => {
                    return (
                      <div key={index} className="d-flex">
                        <h4 className="px-3">{user.name}</h4>
                        <h5>({user.status})</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div> */
}
