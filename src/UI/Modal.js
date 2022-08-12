import { Fragment, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bucketAction } from "../store/reducer/BucketReducer";
// import Video from "../video/Video";
import "./Modal.css";
const Video = lazy(() => import('../video/Video'));

const Modal = () => {
  const dispatch = useDispatch();
  const isBucketEditing = useSelector((state) => state.bucket.isBucketEditing);
  const isCardEditing = useSelector((state) => state.bucket.isCardEditing);
  const showVideoModal = useSelector((state) => state.bucket.showVideoModal);
  const showCardModal = useSelector((state) => state.bucket.showCardModal);

  

  let initialData = {
    name: "",
    link: "",
  };
  const [userInputData, setUserInputData] = useState(initialData);
  const [error, setError] = useState(null);

  const closeModal = () => {
    dispatch(bucketAction.resetModalValues());
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInputData({ ...userInputData, [name]: value });
  };

  const cardSubmitHandler = () => {
    if (isCardEditing) {
      dispatch(
        bucketAction.editCardData({
          ...userInputData,
          id: Math.random().toString(),
        })
      );
    } else {
      const res = userInputData.link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
      if(res !== null){
      dispatch(
        bucketAction.addCardData({
          ...userInputData,
          id: Math.random().toString(),
        })
      );
      }else{
        return setError('Invalid URL, Please add valid url')
      }
    }
    dispatch(bucketAction.resetModalValues());
  };

  const bucketSubmitHandler = () => {
    dispatch(bucketAction.editBucketData(userInputData.name));
    dispatch(bucketAction.resetModalValues());
  };
  //   console.log(userInputData);

  return (
    <Fragment>
      <div className="back" onClick={closeModal}></div>
      <div className="modal">
        {(isCardEditing || showCardModal) ? (
          <div className="content">
            <input
              type="text"
              name="name"
              value={userInputData.name}
              onChange={inputChangeHandler}
              placeholder="Enter the Name of Card"
            ></input>
            <input
              name="link"
              type="text"
              onChange={inputChangeHandler}
              value={userInputData.link}
              placeholder="Enter the link"
            ></input>
            {error && <span style={{color:'red', padding: '.5rem 0'}}>{error}</span>}
            <button onClick={cardSubmitHandler}>SUBMIT</button>
          </div>
        ): null}

        {isBucketEditing && (
          <div className="content">
            <input
              type="text"
              name="name"
              value={userInputData.name}
              onChange={inputChangeHandler}
              placeholder="Enter the Name of bucket"
            ></input>
            <button onClick={bucketSubmitHandler}>SUBMIT</button>
          </div>
        )}

        {showVideoModal && (
          <Suspense fallback= {<h2 style={{backgroundColor: 'red', zIndex:'100'}}>LOADING....</h2>}>

            <Video></Video>
          </Suspense>
        )}
      </div>
    </Fragment>
  );
};

export default Modal;


