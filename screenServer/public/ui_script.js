  
console.log("testing 123")

  // if (!navigator.mediaDevices.getUserMedia) {
  // 	alert("something is fucked up prob need to enable in your browser, something to do with getUserMedia or webRTC ")
  //   //document.getElementById("gum_warn").style.display = "none";
  // }
  const video = document.createElement("video");
  video.setAttribute("width", 640);
  video.setAttribute("height", 480);

    function startScreen() {
    	console.log("you clicked screen server button")
    	video.src = 'Beach_Aerial.mp4';
		video.autoplay = true;
    // startMedia("getDisplayMedia", {video: true});
  }

   // if (video.srcObject) {
   //    for (const track of video.srcObject.getTracks()) {
   //      track.stop();
   //    }
   //    video.srcObject = null;
   //    content.removeChild(video);
   //  }