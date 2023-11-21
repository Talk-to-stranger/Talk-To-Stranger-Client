import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [userStatus, setUserStatus] = useState({
    microphone: false,
    mute: false,
    username: 'user#' + Math.floor(Math.random() * 999999),
    online: false,
  });

  useEffect(() => {
    const s = io('http://localhost:3000');
    s.emit('init', { userId: 1 });
    setSocket(s);
  }, []);

  function mainFunction(time) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let madiaRecorder = new MediaRecorder(stream);
      madiaRecorder.start();

      let audioChunks = [];

      madiaRecorder.addEventListener('dataavailable', function (event) {
        audioChunks.push(event.data);
      });

      madiaRecorder.addEventListener('stop', function () {
        let audioBlob = new Blob(audioChunks);

        audioChunks = [];

        let fileReader = new FileReader();
        fileReader.readAsDataURL(audioBlob);
        fileReader.onloadend = function () {
          if (!userStatus.microphone || !userStatus.online) return;

          let base64String = fileReader.result;
          socket.emit('voice', base64String);
        };

        madiaRecorder.start();

        setTimeout(function () {
          madiaRecorder.stop();
        }, time);
      });

      setTimeout(function () {
        madiaRecorder.stop();
      }, time);
    });

    socket.on('send', function (data) {
      let audio = new Audio(data);
      audio.play();
    });
  }

  window.onload = () => {
    mainFunction(1000);
  };

  //   const userStatus = {
  //     microphone: false,
  //     mute: false,
  //     username: 'user#' + Math.floor(Math.random() * 999999),
  //     online: false,
  //   };

  function toggleConnection(e) {
    // userStatus.online = !userStatus.online;
    console.log(userStatus);
    setUserStatus({ ...userStatus, online: !userStatus.online });

    // editButtonClass(e, userStatus.online);
    emitUserInformation();
  }

  function toggleMute(e) {
    console.log(userStatus);

    setUserStatus({ ...userStatus, mute: !userStatus.mute });

    // userStatus.mute = !userStatus.mute;

    // editButtonClass(e, userStatus.mute);
    emitUserInformation();
  }

  function toggleMicrophone(e) {
    console.log(userStatus);

    setUserStatus({ ...userStatus, microphone: !userStatus.microphone });

    // userStatus.microphone = !userStatus.microphone;
    // editButtonClass(e, userStatus.microphone);
    emitUserInformation();
  }

  //   function editButtonClass(target, bool) {
  //     const classList = target.classList;
  //     classList.remove('enable-btn');
  //     classList.remove('disable-btn');

  //     if (bool) return classList.add('enable-btn');

  //     classList.add('disable-btn');
  //   }

  function emitUserInformation() {
    socket.emit('userInformation', userStatus);
  }
  //   socket.emit('userInformation', userStatus);

  return (
    <>
      <div className="container-fluid bg-light vh-100">
        <div className="row  h-100">
          <div className="col-8">
            <div className="d-flex justify-content-center h-100 py-3">
              <div className="d-flex flex-column ">
                <h4 className="text-center ">
                  <span className="fw-bold">Your id:</span> 331233
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
                <h3 className="fw-bold">Online list User</h3>
                <div className="container text-center">
                  <h5 className="py-2">User1</h5>
                  <h5 className="py-2">User1</h5>
                  <h5 className="py-2">User1</h5>
                  <h5 className="py-2">User1</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
