// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Mousewheel } from "swiper/modules";
// import { Heart, Bookmark, Share2, X } from "lucide-react";
// import ReactPlayer from "react-player";
// import "swiper/css";

// const videos = [
//   {
//     id: 1,
//     src: "https://www.youtube.com/watch?v=KFi8hQBhtfE",
//     subtitle:
//       '#include <stdio.h> int main() { printf("Hello, World!"); return 0; }',
//     channel: "CodeWithShorts",
//     title: "Hello World in C",
//   },
//   {
//     id: 2,
//     src: "https://www.youtube.com/watch?v=eneyANklkdA",
//     subtitle: 'printf("Hello, World!");',
//     channel: "CSimplified",
//     title: "First Program in C",
//   },
//   {
//     id: 3,
//     src: "https://www.youtube.com/watch?v=ZSPZob_1TOk",
//     subtitle: "int a = 10; float b = 3.14; char c = 'A';",
//     channel: "CodeReels",
//     title: "Variables in C",
//   },
// ];

// const WordSubtitle = ({ text, onWordClick }) => (
//   <p className="text-white text-sm mt-2 leading-relaxed">
//     {text.split(" ").map((word, i) => (
//       <span
//         key={i}
//         className="cursor-pointer hover:text-yellow-400 font-medium transition-colors duration-200"
//         onClick={() => onWordClick(word)}
//       >
//         {word}{" "}
//       </span>
//     ))}
//   </p>
// );

// export default function ReelsPage() {
//   const [selectedWord, setSelectedWord] = useState(null);
//   const [wordInfo, setWordInfo] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);

//   // ✅ Fetch word info from Wikipedia
//   useEffect(() => {
//     if (!selectedWord) return;
//     const fetchWordInfo = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
//             selectedWord
//           )}`
//         );
//         const data = await res.json();
//         if (data.extract) setWordInfo(data.extract);
//         else setWordInfo("No information found for this word.");
//       } catch (err) {
//         setWordInfo("Error fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWordInfo();
//   }, [selectedWord]);

//   return (
//     <div className="h-screen w-full bg-black text-white relative">
//       <Swiper
//         direction="vertical"
//         modules={[Mousewheel]}
//         mousewheel
//         slidesPerView={1}
//         onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//         className="h-full w-full flex justify-center items-center"
//       >
//         {videos.map((video, index) => (
//           <SwiperSlide
//             key={video.id}
//             className="relative flex justify-center items-center"
//           >
//             {/* ✅ Fixed Ratio Container */}
//             <div className="relative w-[360px] h-[640px] bg-black rounded-xl overflow-hidden shadow-lg">
//               {/* ✅ ReactPlayer (Full cover) */}
//               <ReactPlayer
//                 url={video.src}
//                 playing={activeIndex === index}
//                 loop
//                 muted
//                 controls={false}
//                 width="100%"
//                 height="100%"
//                 style={{ position: "absolute", top: 0, left: 0 }}
//                 config={{
//                   youtube: {
//                     playerVars: { modestbranding: 1, rel: 0, showinfo: 0 },
//                   },
//                 }}
//               />

//               {/* ✅ Overlay Info */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
//                 <h2 className="text-lg font-bold">{video.title}</h2>
//                 <p className="text-sm text-gray-300">@{video.channel}</p>
//                 <WordSubtitle
//                   text={video.subtitle}
//                   onWordClick={setSelectedWord}
//                 />
//               </div>
//             </div>

//             {/* ✅ Right-side Buttons */}
//             <div className="absolute right-8 bottom-32 flex flex-col items-center space-y-6">
//               <button
//                 onClick={() => alert("❤️ Liked!")}
//                 className="flex flex-col items-center hover:scale-110 transition"
//               >
//                 <Heart size={28} className="text-white" />
//                 <span className="text-xs mt-1">Like</span>
//               </button>
//               <button
//                 onClick={() => alert("💾 Saved!")}
//                 className="flex flex-col items-center hover:scale-110 transition"
//               >
//                 <Bookmark size={28} className="text-white" />
//                 <span className="text-xs mt-1">Save</span>
//               </button>
//               <button
//                 onClick={() => alert("📤 Share!")}
//                 className="flex flex-col items-center hover:scale-110 transition"
//               >
//                 <Share2 size={28} className="text-white" />
//                 <span className="text-xs mt-1">Share</span>
//               </button>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ✅ Word Info Modal */}
//       {selectedWord && (
//         <div className="absolute inset-0 bg-black/70 flex justify-center items-center p-4">
//           <div className="bg-white text-black p-5 rounded-xl max-w-md w-full shadow-xl relative">
//             <button
//               onClick={() => setSelectedWord(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               <X size={18} />
//             </button>
//             <h2 className="font-bold text-lg mb-2">
//               Word:{" "}
//               <span className="text-blue-600 font-semibold">
//                 {selectedWord}
//               </span>
//             </h2>
//             {loading ? (
//               <p className="text-gray-500">Loading...</p>
//             ) : (
//               <p className="text-sm leading-relaxed">{wordInfo}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

const videos = [
  {
    id: 1,
    type: "youtube",
    src: "https://www.youtube.com/embed/KFi8hQBhtfE",
    subtitle: '#include <stdio.h> int main() { printf("Hello, World!"); return 0; }',
    channel: "CodeWithShorts",
    title: "Hello World in C",
  },
  {
    id: 2,
    type: "youtube",
    src: "https://www.youtube.com/embed/eneyANklkdA",
    subtitle: 'printf("Hello, World!");',
    channel: "CSimplified",
    title: "First Program in C",
  },
  {
    id: 3,
    type: "youtube",
    src: "https://www.youtube.com/embed/ZSPZob_1TOk",
    subtitle: "int a = 10; float b = 3.14; char c = 'A';",
    channel: "CodeReels",
    title: "Variables in C",
  },
  {
    id: 4,
    type: "youtube",
    src: "https://www.youtube.com/embed/2ybLD6_2gKM",
    subtitle: 'if (a > b) { printf("a is bigger"); } else { printf("b is bigger"); }',
    channel: "C Shorts Hub",
    title: "If-Else in C",
  },
];

const WordSubtitle = ({ text, onWordClick }) => (
  <p className="text-white text-sm mt-3 text-left px-3">
    {text.split(" ").map((word, i) => (
      <span
        key={i}
        className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
        onClick={() => onWordClick(word)}
      >
        {word}{" "}
      </span>
    ))}
  </p>
);

export default function ReelsPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordInfo, setWordInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRefs = useRef([]);

  // Word info fetch
  useEffect(() => {
    if (!selectedWord) return;
    const fetchWordInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            selectedWord
          )}`
        );
        const data = await res.json();
        if (data.extract) setWordInfo(data.extract);
        else setWordInfo("No information found for this word.");
      } catch (err) {
        setWordInfo("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchWordInfo();
  }, [selectedWord]);

  // जब slide बदले → बाकी videos pause
  const handleSlideChange = (swiper) => {
    videoRefs.current.forEach((ref, index) => {
      if (ref && index !== swiper.activeIndex) {
        ref.src = ref.src;
      }
    });
  };

  return (
    <div className="h-screen w-full bg-black text-white relative flex justify-center items-center">
      <Swiper
        direction="vertical"
        modules={[Mousewheel]}
        mousewheel
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        className="h-[95%] w-[420px] rounded-xl shadow-lg overflow-hidden"
      >
        {videos.map((video, index) => (
          <SwiperSlide
            key={video.id}
            className="flex flex-row justify-between items-center bg-black relative"
          >
            {/* Left side Video */}
            <div className="w-[100%] h-full bg-black flex justify-center items-center">
              {video.type === "youtube" ? (
                <iframe
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  title="C programming tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              ) : (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                />
              )}
            </div>
            &nbsp;
            &nbsp;

            {/* Right side Info */}
            <div className="w-[80%] h-full bg-gray-900 p-3 flex flex-col items-start overflow-y-auto">
              <h2 className="text-md font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-400">@{video.channel}</p>
              <WordSubtitle text={video.subtitle} onWordClick={setSelectedWord} />

              {selectedWord && (
                <div className="mt-3 bg-white text-black p-3 rounded-lg shadow-inner">
                  <h2 className="font-bold text-sm mb-1">
                    Word:{" "}
                    <span className="text-blue-600 font-semibold">{selectedWord}</span>
                  </h2>
                  {loading ? (
                    <p className="text-gray-500 text-xs">Loading...</p>
                  ) : (
                    <p className="text-xs leading-relaxed">{wordInfo}</p>
                  )}
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      onClick={() => alert("❤️ Liked!")}
                    >
                      Like
                    </button>
                    <button
                      className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      onClick={() => alert("💾 Saved!")}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      onClick={() => setSelectedWord(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

