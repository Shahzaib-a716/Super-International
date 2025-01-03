import React from 'react';
import { useLocation } from 'react-router-dom';

const EmergencyPage = () => {
  const location = useLocation();
  const { textMessage, selectedFiles, audioUrl, videoUrl, imageUrl } = location.state;

  return (
    <div className="flex justify-center items-center p-6 bg-gray-800 min-h-screen "  
    >
      <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-xl">
        {/* Top Row Headings */}
         <h1 className='text-yellow-500 text-5xl font-bold pb-2'>YOUR MESSAGE WAS SEND </h1>
        

        {/* Text Section */}
        <div className=" gap-4 bg-cover bg-center mb-6"
         style={{
          backgroundImage: 'url("/assets/images/Background textures red.webp")',
        }}>
          <div className=" p-4">
            {textMessage ? (
              <>
                <p className="text-black- text-4xl font bold">{textMessage}</p>
                
              </>
            ) : (
              <p className="text-black text-4xl font bold">No text message available.</p>
            )}
          </div>
          </div>


        {/* Display Other Files if any are selected */}
        {selectedFiles.length > 0 && (
          <div className="bg-cover bg-center p-4 rounded-lg"
          style={{
            backgroundImage: 'url("/assets/images/background metal texture.webp")',
          }}>
           
            <div className="grid grid-cols-3 gap-4 overflow-x-auto">
              {selectedFiles.map((file, index) => (
                
                <div key={index} className="flex flex-col items-center gap-2">
                  {file.type === 'image' && (
                    <img src={file.url} alt="selected" className="w-[350px] h-[150px] object-cover rounded-lg" />
                  )}
                  {file.type === 'video' && (
                    <video src={file.url} className="w-[350px] h-[150px] object-cover rounded-lg" controls />
                  )}
                  {file.type === 'audio' && (
                    <audio controls className="w-32">
                      <source src={file.url} type="audio/wav" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;
