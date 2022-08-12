import { Suspense } from "react";
import { useSelector } from "react-redux";


const Video = () => {
  const id = useSelector((state) => state.bucket.id)

  const {item, ind} = id

    return (
      
        <div>
            <iframe
            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"width="800" height="443" type="text/html"
            src= {item.link}
            allowFullScreen
            title= {item.name}
          />
        </div>
    );
};

export default Video;