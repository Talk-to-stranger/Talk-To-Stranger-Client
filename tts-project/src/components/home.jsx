import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const [socket, setSocket] = useState();
  // const [microphone, setMicrophone] = useState(false);
  // const [online, setOnline] = useState(false);
  const [userStatus, setUserStatus] = useState({
    microphone: false,
    mute: false,
    username: 'user#',
    online: false,
  });

  useEffect(() => {
    const s = io('http://localhost:3000');
    s.emit('init', { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwNjI3MDIzfQ.t9pHFTDRqLDiHko3yUViKoE0Ah1o_B6NfZW0QLReODg' });
    setSocket(s);
  }, []);

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
    e.preventDefault();
    // console.log(userStatus.online);
    if (userStatus.online === false) {
      e.target.classList.remove('btn-primary');
      e.target.classList.add('btn-danger');
    } else {
      e.target.classList.remove('btn-danger');
      e.target.classList.add('btn-primary');
    }
    // userStatus.online = !userStatus.online;
    // console.log(!online);
    // setOnline(!online);
    setUserStatus({ ...userStatus, online: !userStatus.online });

    // editButtonClass(e, userStatus.online);
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

    // userStatus.mute = !userStatus.mute;

    // editButtonClass(e, userStatus.mute);
    emitUserInformation();
  }

  function toggleMicrophone(e) {
    e.preventDefault();
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
    console.log('123');
    function mainFunction(time) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        console.log('tes');
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
          console.log(userStatus.microphone, userStatus.online);

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
