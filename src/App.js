import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { bucketAction } from "./store/reducer/BucketReducer";
import Modal from "./UI/Modal";

function App() {
  const data = useSelector((state) => state.bucket.data);
  const showBucketModal = useSelector((state) => state.bucket.showBucketModal);
  const showCardModal = useSelector((state) => state.bucket.showCardModal);
  const showVideoModal = useSelector((state) => state.bucket.showVideoModal);
  const dispatch = useDispatch();

  const addCardHandler = (e) => {
    // dispatch(bucketAction.toggleCardEditing())
    dispatch(bucketAction.toggleCardModal());
    dispatch(bucketAction.changeId(e.target.value));
  };

  const editButtonClickHandler = (e) => {
    dispatch(bucketAction.toggleBucketModal());
    dispatch(bucketAction.toggleBucketEditing());
    dispatch(bucketAction.changeId(e.target.value));
  };

  const cardEditButtonHandler = (e, id) => {
    dispatch(bucketAction.toggleCardModal());
    dispatch(
      bucketAction.changeId({ bucketIndex: e.target.value, cardId: id })
    );
    dispatch(bucketAction.toggleCardEditing());
  };

  const cardDeleteHandler = (e, id) => {
    dispatch(
      bucketAction.changeId({ bucketIndex: e.target.value, cardId: id })
    );
    dispatch(bucketAction.deleteCardData());
    dispatch(bucketAction.resetModalValues());
  };

  const onCardClickHandler = (e, params) => {
    dispatch(bucketAction.toggleVideoModal());
    dispatch(bucketAction.changeId({ item: params.item, ind: params.ind }));
  };

  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    
    
  };

  

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  return (
    <>
      {(showBucketModal || showCardModal || showVideoModal) && <Modal></Modal>}
      <div className="App">
        <h1>Buckets</h1>
        <div className="main-cont">
          {data.map((item, index) => {
            return (
              <div key={index} className="bucket-cont">
                <div className="bucket-head">
                  <h2>{item.name}</h2>
                  <button onClick={editButtonClickHandler} value={index}>
                    Edit
                  </button>
                </div>
                {item.cardData.map((item, ind) => {
                  const { link } = item;
                  const shortLink = link.slice(0, 25).concat("...");
                  return (
                    <div className="card-cont" key={ind}>
                      <div
                        onClick={(e) => onCardClickHandler(e, { item, ind })}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(e, { index, ind, id: item.id })
                        }
                        onDragEnter={
                          dragging
                            ? (e) =>
                                handleDragEnter(e, { index, ind, id: item.id })
                            : null
                        }
                      >
                        <h3 style={{ margin: 0 }}>{item.name}</h3>
                        <p>{shortLink}</p>
                      </div>
                      <div>
                        <button
                          onClick={(e, id) => cardEditButtonHandler(e, item.id)}
                          value={index}
                        >
                          EDIT
                        </button>
                        <button
                          onClick={(e, id) => cardDeleteHandler(e, item.id)}
                          value={index}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  className="addCard"
                  onClick={addCardHandler}
                  value={index}
                >
                  +Add Card
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
