import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState(io('http://localhost:3000'));
  const [microphone, setMicrophone] = useState(false);
  const [online, setOnline] = useState(false);
  const [userStatus, setUserStatus] = useState({
    microphone: false,
    mute: false,
    username: 'user#' + Math.floor(Math.random() * 999999),
    online: false,
  });

  useEffect(() => {
    // const s = ;
    socket.emit('init', { access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwNTczNTc3fQ.ld36gIV4CF7XjfMnOn8TijJe8ZyTRVoO7xZcPesslVc' });
    // setSocket(s);
  }, [socket]);

  // window.onload = () => {
  // mainFunction(1000);
  // };

  if (socket) {
    socket.emit('userInformation', userStatus);
  }

  //   const userStatus = {
  //     microphone: false,
  //     mute: false,
  //     username: 'user#' + Math.floor(Math.random() * 999999),
  //     online: false,
  //   };

  function toggleConnection(e) {
    console.log(userStatus.online);
    if (userStatus.online === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      console.log('tes');
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }
    // userStatus.online = !userStatus.online;
    // console.log(!online);
    setOnline(!online);
    setUserStatus({ ...userStatus, online: !userStatus.online });

    // editButtonClass(e, userStatus.online);
    emitUserInformation();
  }

  function toggleMute(e) {
    if (userStatus.mute === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }
    // console.log(userStatus);
    setMicrophone(!microphone);

    setUserStatus({ ...userStatus, mute: !userStatus.mute });

    // userStatus.mute = !userStatus.mute;

    // editButtonClass(e, userStatus.mute);
    emitUserInformation();
  }

  function toggleMicrophone(e) {
    // console.log(userStatus);
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

  //   function editButtonClass(target, bool) {
  //     const classList = target.classList;
  //     classList.remove('enable-btn');
  //     classList.remove('disable-btn');

  //     if (bool) return classList.add('enable-btn');

  //     classList.add('disable-btn');
  //   }

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
            // console.log(userStatus.microphone);
            if (!userStatus.microphone || !userStatus.online) return;
            // console.log('masuk');

            let base64String = fileReader.result;
            // console.log('masuk sini gan', socket);
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

      socket.on('send', function (data) {
        let audio = new Audio(data);
        audio.play();
      });
    }
    mainFunction(1000);
  }, [microphone, socket, userStatus.microphone, userStatus.online]);

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
