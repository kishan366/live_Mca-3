import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
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
    subtitle:
      'if (a > b) { printf("a is bigger"); } else { printf("b is bigger"); }',
    channel: "C Shorts Hub",
    title: "If-Else in C",
  },
];

const WordSubtitle = ({ text, onWordClick }) => (
  <p className="text-white text-sm mt-3 text-left px-3 flex flex-wrap gap-1">
    {text.split(" ").map((word, i) => (
      <span
        key={i}
        className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
        onClick={() => onWordClick(word.replace(/[^\w]/g, ""))}
      >
        {word}
      </span>
    ))}
  </p>
);

export default function ReelsPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordInfo, setWordInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRefs = useRef([]);

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

  const handleSlideChange = (swiper) => {
    videoRefs.current.forEach((ref, index) => {
      if (ref && index !== swiper.activeIndex) {
        ref.src = ref.src;
      }
    });
    setSelectedWord(null);
  };

  return (
    <div className="h-screen w-full bg-black text-white flex justify-center items-center relative">
      <Swiper
        direction="vertical"
        modules={[Mousewheel]}
        mousewheel
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        className="h-[95%] w-[420px] rounded-xl shadow-lg"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video.id} className="relative bg-black">
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* Video Section */}
              {video.type === "youtube" ? (
                <iframe
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[70%] object-cover"
                ></iframe>
              ) : (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="w-full h-[70%] object-cover"
                  autoPlay
                  loop
                  muted
                />
              )}

              {/* Subtitle + Info */}
              <div className="w-full bg-gray-900 py-3 px-2 border-t border-gray-700">
                <h2 className="text-md font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-400">@{video.channel}</p>
                <WordSubtitle text={video.subtitle} onWordClick={setSelectedWord} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Fixed Popup: Always visible on top of Swiper --- */}
      <AnimatePresence>
        {selectedWord && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSelectedWord(null)}
            ></motion.div>

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/2 
                         bg-white/90 backdrop-blur-md text-black p-4 rounded-xl 
                         shadow-2xl w-[90%] max-w-md max-h-[60%] overflow-y-auto"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-sm mb-1"
              >
                Word:{" "}
                <span className="text-blue-600 font-semibold">{selectedWord}</span>
              </motion.h2>

              {loading ? (
                <p className="text-gray-500 text-xs">Loading...</p>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs leading-relaxed"
                >
                  {wordInfo}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end mt-2 space-x-2"
              >
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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
