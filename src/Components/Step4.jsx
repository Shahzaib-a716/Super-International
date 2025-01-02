import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Step3 = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [textMessage, setTextMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false); // State for text input visibility
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [audioStatus, setAudioStatus] = useState(""); // To track audio recording status
  const [progress, setProgress] = useState(0); // To track the voice recording progress
  const audioChunks = useRef([]);
  const mediaRecorderRef = useRef(null);
  const videoRecorderRef = useRef(null);
  const videoStreamRef = useRef(null);
  const videoPreviewRef = useRef(null);

  const navigate = useNavigate();

  const handleTextMessageChange = (e) => {
    setTextMessage(e.target.value);
  };

  const handleSendMessage = () => {
    navigate('/EmergencyPage', {
      state: {
        textMessage,
        selectedFiles,
        audioUrl,
        videoUrl,
        imageUrl,
      },
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (file.type.startsWith('image/')) {
        setImageUrl(fileUrl);
        setSelectedFiles((prev) => [...prev, { type: 'image', url: fileUrl }]);
      } else if (file.type.startsWith('video/')) {
        setVideoUrl(fileUrl);
        setSelectedFiles((prev) => [...prev, { type: 'video', url: fileUrl }]);
      }
    }
  };

  const startAudioRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioFileUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioFileUrl);
      setSelectedFiles((prev) => [...prev, { type: 'audio', url: audioFileUrl }]);
      audioChunks.current = [];
    };

    setRecordingTime(0);
    setIsRecording(true);
    setAudioStatus("Recording...");
    setProgress(0); // Reset progress
    mediaRecorderRef.current.start();

    // Animate progress bar while recording
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Stop when progress reaches 100%
          return 100;
        }
        return prev + 1; // Increase progress by 1% per second
      });
    }, 100);
  };

  const stopAudioRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setAudioStatus("Audio stopped");
    setProgress(0); // Reset progress bar when recording stops
  };

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const toggleVideoCapture = async () => {
    if (isVideoRecording) {
      // Stop video recording
      videoRecorderRef.current.stop();
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      setIsVideoRecording(false);
      setVideoUrl(videoUrl); // To show the recorded video in preview
    } else {
      // Start video recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoStreamRef.current = stream;

        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
        }

        setIsVideoRecording(true);

        const videoRecorder = new MediaRecorder(stream);
        videoRecorder.ondataavailable = (event) => {
          const videoBlob = new Blob([event.data], { type: 'video/mp4' });
          const videoFileUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(videoFileUrl);
          setSelectedFiles((prev) => [...prev, { type: 'video', url: videoFileUrl }]);
        };
        videoRecorder.start();
        videoRecorderRef.current = videoRecorder;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const handleTextIconClick = () => {
    setIsTextInputVisible(true);
  };

  const handleFileDelete = (fileUrl) => {
    setSelectedFiles(selectedFiles.filter((file) => file.url !== fileUrl));
  };

  return (
    <div className="flex justify-center items-center p-2 md:p-4 w-full bg-gray-800" style={{ minHeight: '100vh' }}>
      <div className="flex flex-col w-full max-w-3xl p-4 relative">
        {/* Header */}
        <div className="flex gap-4 items-end border-b-2">
          <a href="#step2" className="flex flex-col gap-2 justify-center items-center">
            <img className="w-10" src="/assets/images/arrow.webp" alt="" />
            <h1 className="border-2 text-center border-b-0 rounded-t-xl w-16 h-10 bg-gradient-to-b from-[#FFCC00] to-[#FF6600] md:text-3xl font-extrabold text-white">
              3
            </h1>
          </a>
          <div className="flex justify-center items-center">
            <h1 className="md:text-3xl font-extrabold text-yellow-600">
              Select One or more types of messages & then press OK to send it
            </h1>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-rows-2 gap-3 w-full py-3">
          <div className="grid grid-cols-3 gap-3">
            {/* File Input */}
            <div className="cursor-pointer" onClick={() => document.getElementById('fileInput').click()}>
              <img className="cursor-pointer" src="/assets/images/photo.webp" alt="" />
              <input
                id="fileInput"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Video Recording Icon */}
            <div className="cursor-pointer" onClick={toggleVideoCapture}>
              <img className="cursor-pointer" src="/assets/images/video.webp" alt="" />
              <span className="text-yellow-500 text-bold text-2xl">{isVideoRecording ? "Stop Video" : "Start Video"}</span>
            </div>

            {/* Audio Recording Icon */}
            <div className="cursor-pointer relative" onClick={isRecording ? stopAudioRecording : startAudioRecording}>
              <img className="cursor-pointer" src="/assets/images/voice.webp" alt="" />
              {audioStatus && <span className="text-yellow-500 text-bold text-2xl">{audioStatus}</span>}
              {isRecording && (
                <div className="w-[100px] h-11 bg-blue-700 animate-pulse rounded-full absolute right-14 top-14"></div>
              )}
            </div>
          </div>

          {/* Text Icon */}
          <div
            className={`cursor-pointer ${isTextInputVisible ? "hidden" : ""}`}
            onClick={handleTextIconClick}
          >
            <img className="cursor-pointer" src="/assets/images/text.webp" alt="Text Icon" />
          </div>
        </div>

        {/* Voice Progress Bar */}
        {isRecording && (
          <div className="relative mt-1">
            <div className=" h-10 ml-[150px] rounded-3xl  w-[400px] bg-gray-300">
              <div
                className="h-[40px] rounded-full animate-heartbeat bg-green-800"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Replace Icon D with Text Input Field */}
        {isTextInputVisible && (
          <div
            className="absolute top-0 left-0 w-full mt-8 px-4"
            style={{ position: 'absolute', top: '340px', left: '50%', transform: 'translateX(-50%)' }}
          >
            <textarea
              autoFocus
              className="resize rounded-5xl w-full border-4 border-blue-500 text-5xl hover:text-6xl text-yellow-600"
              placeholder="Type Here!"
              aria-label="Message Input"
              value={textMessage}
              onChange={handleTextMessageChange}
            ></textarea>
          </div>
        )}

        {/* Video Preview */}
        {isVideoRecording && (
          <div className="mt-4">
            <video
              ref={videoPreviewRef}
              autoPlay
              muted
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Selected Files */}
        <div className="mt-4">
          <div className="flex space-x-4 overflow-x-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                {file.type === 'image' && <img src={file.url} alt="selected" className="w-[120px] h-[115px] object-cover" />}
                {file.type === 'video' && <video src={file.url} className="w-[140px] h-[135px]" controls />}
                {file.type === 'audio' && (
                  <div className="flex flex-col items-center">
                    <audio src={file.url} controls />
                    <p className="text-white">{`${recordingTime}s`}</p>
                  </div>
                )}
                <button
                  onClick={() => handleFileDelete(file.url)}
                  className="bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <div className="relative group">
            <img
              src="/assets/images/button cancel no.webp"
              alt="Cancel Icon"
              className="w-[70px] h-[75px] cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-300  text-yellow-600 text-2xl whitespace-nowrap px-3 py-2 rounded-lg">
              Cancel
            </div>
          </div>

          <div className="relative group">
            <img
              src="/assets/images/button ok check.webp"
              alt="Send Icon"
              onClick={handleSendMessage}
              className="w-[70px] h-[75px] cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-300  text-yellow-600 text-2xl whitespace-nowrap px-3 py-2 rounded-lg">
              Send Messages
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
