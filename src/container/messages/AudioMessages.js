import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import file_example_MP3_5MG from '../../components/images/file_example_MP3_5MG.mp3';

const AudioMessages = () => {
  const waveSurferRef = useRef(null);

  useEffect(() => {
    // Create WaveSurfer instance after the component mounts
    const wavesurfer = WaveSurfer.create({
      container: '#waveform', // Make sure you have a <div id="waveform"></div> in your component's JSX
      waveColor: '#C9C9C9',
      progressColor: '#031136',
      cursorWidth:0,
      cursorColor: 'transparent',
      barWidth:2,
      hideCursor: true,
      height: 90,
      backend: 'WebAudio', // Choose an appropriate backend (WebAudio or MediaElement)
      mediaType: 'audio', // Specify the media type as 'audio'
      responsive: true, // Make the waveform responsive to container size changes
    });

    // Set the ref to the created instance
    waveSurferRef.current = wavesurfer;

    // Load the audio file
    wavesurfer.load(file_example_MP3_5MG);

    // Clean up when the component unmounts
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, []); // Empty dependency array to run this effect only once, when the component mounts

  // Function to handle audio play/pause
  const [play, setplay] = useState(true)
  const togglePlay = () => {
    
    if (waveSurferRef.current) {
      if (waveSurferRef.current.isPlaying()) {
        setplay(true)
        waveSurferRef.current.pause();
      } else {
        setplay(false)
        waveSurferRef.current.play();
      }
    }
  };

  return (
    <div className='w-fit rounded-full h-14 pl-6 pr-6 flex bg-[#F6FAFD]'>
      
      <div id="waveform" className='w-72 -mt-[18px] mr-12'></div>
      <button onClick={togglePlay}><div className='h-7 w-7 rounded-full text-white flex justify-center items-center bg-gradient-to-r from-[#0909E9] to-[#00D4FF]'>{play ? <i class="bi bi-play-fill text-xl ml-[2px] mb-[1px]"></i> : <i class="bi bi-pause-fill text-xl ml-[2px] mb-[1px]"></i>}</div></button>
      {/* You can add any other content or controls here */}
    </div>
  );
};

export default AudioMessages;
