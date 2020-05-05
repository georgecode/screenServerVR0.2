
  if (!navigator.mediaDevices.getUserMedia) {
    document.getElementById("gum_warn").style.display = "none";
  }

  const video = document.createElement("video");
  video.setAttribute("width", 640);
  video.setAttribute("height", 480);

  // const muted = document.createElement("input");
  // muted.type = "checkbox";
  // muted.checked = true;
  // muted.onclick = () => { video.muted = muted.checked; };

  // const mute = document.createElement("label");
  // mute.innerHTML = "Volume mute";
  // mute.insertBefore(muted, mute.firstChild);

  // const snapshots = [];

  // const audio = document.createElement("audio");
  // audio.setAttribute("controls", true);

  const start = document.getElementById("startbuttons");
  const stop = document.getElementById("stopbuttons");

  const message = document.getElementById("message");
  const content = document.getElementById("content");
  const frames = document.getElementById("frames");
  // const snapshot = document.getElementById("snapshot");
  const fps = document.getElementById("fps");

  const fps_range = document.getElementById("fps_range");
  const fps_number = document.getElementById("fps_number");

  fps_range.oninput = () => fps_number.value = fps_range.value;
  fps_number.oninput = () => fps_range.value = fps_number.value;

  let saved_stream = null;
  let capturing = false;
  let running = false;

  let fps_now = 0;
  let fps_total = 0;
  let last_fps_time;
  let first_fps_time;
  let last_fps_frames;
  let first_fps_frames;
  let fps_constraint;

  function startScreen() {
    startMedia("getDisplayMedia", {video: true});
  }

  function startAudioVideo() {
    startMedia("getUserMedia", {video: true, audio: true});
  }

  function startAudio() {
    startMedia("getUserMedia", {audio: true});
  }

  function startVideo() {
    startMedia("getUserMedia", {video: true});
  }

  function stopMedia() {
    if (video.srcObject) {
      for (const track of video.srcObject.getTracks()) {
        track.stop();
      }
      video.srcObject = null;
      content.removeChild(video);
      if (mute.parentNode) {
        controls.removeChild(mute);
      }
      fps.innerHTML = "";
      stopbuttons.removeChild(snapshot);
      snapshot.value = "Snapshot";
      frames.innerHTML = '';
      capturing = false;
    } else if (audio.srcObject) {
      for (const track of audio.srcObject.getTracks()) {
        track.stop();
      }
      audio.srcObject = null;
      content.removeChild(audio);
    }
    saved_stream = null;
    stop.style.display = "none";
    start.style.display = "block";
    running = false;
  }

  function pauseMedia() {
    if (saved_stream) {
      if (saved_stream.getVideoTracks().length) {
        video.srcObject = saved_stream;
        video.play();
      } else {
        audio.srcObject = saved_stream;
        audio.play();
      }
      saved_stream = null;
    } else {
      if (video.srcObject) {
        video.pause();
        saved_stream = video.srcObject;
        video.srcObject = null;
      } else if (audio.srcObject) {
        audio.pause();
        saved_stream = audio.srcObject;
        audio.srcObject = null;
      }
    }
  }

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function startMedia(gum, constraints) {
    if (constraints.video) {
      const frameRate = +fps_number.value || undefined;
      constraints.video = Object.assign(constraints.video, {frameRate});
    }
    stop.style.display = "block";
    start.style.display = "none";
    try {
      const stream = await navigator.mediaDevices[gum](constraints);
      message.innerHTML = "<p>xxxSuccess!</p>";
      if (stream.getVideoTracks().length) {
        content.appendChild(video);
        if (stream.getAudioTracks().length) {
          controls.appendChild(mute);
          video.muted = muted.checked;
        }
        video.srcObject = stream;
        video.play();
        frames.innerHTML = '';
        stopbuttons.appendChild(snapshot);
        first_fps_time = last_fps_time = new Date();
        first_fps_frames = last_fps_frames = video.mozPaintedFrames;
        fps.innerHTML="FPS now:  0.0 , entire capture:  0.0";
        setTimeout(get_fps, 2000);
      } else {
        content.appendChild(audio);
        audio.srcObject = stream;
        audio.play();
      }
      running = true;
    } catch (err) {
      if (location.protocol != "https:") {
        message.innerHTML = `<p class='error'>${err}</p>
          <p>getUserMedia and getDisplayMedia now require the site be loaded from an https URL</p>
          <p>Reloading page in https in 10 seconds</p>`;
        await wait(10000);
        window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
      } else {
        message.innerHTML = `<p class='error'>${err}</p>`;
      }
      stopMedia();
    }
  }

  function get_fps() {
    if (running) {
      const now = new Date();
      const frames = video.mozPaintedFrames;
      fps_now = (frames - last_fps_frames)/((now - last_fps_time)/1000);
      fps_total = (frames - first_fps_frames)/((now - first_fps_time)/1000);
      fps.innerHTML= `FPS now: ${fps_now.toFixed(1)} , entire capture: ${fps_total.toFixed(1)}`;
      last_fps_time = now;
      last_fps_frames = frames;
      setTimeout(get_fps, 1000);
    }
  }

  // function startSnapshot() {
  //   capturing = !capturing;
  //   if (capturing) {
  //     captureImage();
  //     snapshot.value = "Stop Snapshot";
  //   } else {
  //     snapshot.value = "Snapshot";
  //   }
  // }

  // function captureImage() {
  //   if (video.srcObject && capturing) {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');

  //     canvas.width  = video.videoWidth / 4;
  //     canvas.height = video.videoHeight / 4;
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //     if (snapshots.unshift(canvas) > 4) {
  //       snapshots.length = 4;
  //     }
  //     frames.innerHTML = '';
  //     for (const snapshot of snapshots) {
  //       frames.appendChild(snapshot);
  //     }
  //     setTimeout(captureImage, 2000);
  //   }
  // }
