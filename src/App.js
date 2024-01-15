import "./App.css";
import { useEffect, useRef, useState } from "react";
import image1 from "./image1.jpg";
import image2 from "./image2.webp";

function App() {
  const viewElement = useRef(null);
  const [images, setImages] = useState([
    { path: image1, ref: viewElement },
    { path: image2, ref: null },
    { path: image1, ref: null },
    { path: image2, ref: null },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const doClick = () => {
    viewElement.current.scrollIntoView({ behavior: "smooth" });
    // console.log("inside doClick", images,currentIndex);
  };

  useEffect(() => {
    // console.log("inside useEffect", images, currentIndex);
    doClick();
  }, [currentIndex]);

  const changeImagesRef = (x) => {
    // console.log("inside changeImages", currentIndex + x);
    const imgs = images;
    for (let i = 0; i < imgs.length; i++) {
      if (i !== currentIndex + x) {
        imgs[i].ref = null;
      } else imgs[i].ref = viewElement;
    }
    setImages(imgs);
    setCurrentIndex(currentIndex + x);
  };

  return (
    <div className="App">
      {/* {console.log("inside App")} */}
      <div className="app-carousel">
        {images.map((item, index) => (
          <img
            src={item.path}
            width="100%"
            height="auto"
            alt="photo"
            ref={item.ref}
            key={item.path + index}
          />
        ))}
        {currentIndex > 0 ? (
          <button
            className="left-btn"
            onClick={() => {
              // console.log("inside left btn")
              changeImagesRef(-1);
            }}
          >
            {"<"}
          </button>
          
        ) : null}
        {currentIndex < images.length - 1 ? (
          <button
            className="right-btn"
            onClick={() => {
              // console.log("inside right btn")
              changeImagesRef(+1);
            }}
          >
            {">"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
