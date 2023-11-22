import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Navbar from './navbar';
export default function Home() {
  const [socket, setSocket] = useState();
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState({
    microphone: false,
    mute: false,
    username: 'user#',
    online: false,
  });

  useEffect(() => {
    const s = io('https://nyx.yoiego.my.id');
    s.emit('init', { access_token: `${localStorage.getItem("access_token")}` });
    setSocket(s);
  }, []);

  if (socket) {
    socket.emit('userInformation', userStatus);
  }

  function toggleConnection(e) {
    e.preventDefault();
    if (userStatus.online === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }

    setUserStatus({ ...userStatus, online: !userStatus.online });

    emitUserInformation();
  }

  function toggleMute(e) {
    e.preventDefault();
    if (userStatus.mute === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }

    setUserStatus({ ...userStatus, mute: !userStatus.mute });

    emitUserInformation();
  }

  function toggleMicrophone(e) {
    e.preventDefault();
    if (userStatus.microphone === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }

    setUserStatus({ ...userStatus, microphone: !userStatus.microphone });

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
          // console.log(userStatus.microphone, userStatus.online);

          fileReader.onloadend = function () {
            if (!userStatus.microphone || !userStatus.online) return;

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
      if (userStatus.online === true) {
        socket.on('send', function (data) {
          let audio = new Audio(data);
          audio.play();
        });
      }
      socket.on('usersUpdate', function (data) {
        const newUsers = [];
        // console.log(data);
        for (const newUser in data) {
          newUsers.push(newUser);
        }
        setUsers(newUsers);
      });
    }
    if (socket) {
      mainFunction(1000);
    }
  }, [socket, userStatus]);

  function emitUserInformation() {
    socket.emit('userInformation', userStatus);
  }

  return (
    <>
    <Navbar />
      <div className="container-fluid bg-light vh-100">
        <div className="row  h-100">
          <div className="col-8">
            <div className="d-flex justify-content-center h-100 py-3">
              <div className="d-flex flex-column ">
                <h4 className="text-center ">
                  <span className="fw-bold">Your id:</span> 
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
                  {users.map((user) => {
                    return <h5>{user}</h5>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
