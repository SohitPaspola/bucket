import { createSlice } from "@reduxjs/toolkit";

const initialData = [
  {
    id: 0,
    name: "bucket1",
    cardData: [
      {
        id: 101,
        name: "anime",
        link: "https://www.youtube.com/embed/Fp8msa5uYsc?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0",
      },
    ],
  },

  {
    id: 1,
    name: "bucket2",
    cardData: [
      {
        id: 102,
        name: "cartoon",
        link: "https://www.youtube.com/embed/eFsGA0GXB-8?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0",
      },
    ],
  },
];
const initialBucketState = {
  data: initialData,
  showBucketModal: false,
  showCardModal: false,
  showVideoModal: false,
  isBucketEditing: false,
  isCardEditing: false,
  id: null,
};

const bucketSlice = createSlice({
  name: "bucket",
  initialState: initialBucketState,
  reducers: {
    toggleBucketModal(state, action) {
      state.showBucketModal = !state.showBucketModal;
      state.showCardModal = false;
    },
    toggleCardModal(state, action) {
      state.showCardModal = !state.showCardModal;
      state.showBucketModal = false;
    },
    toggleVideoModal(state, action) {
      state.showVideoModal = !state.showVideoModal;
    },
    addCardData(state, action) {
      const { name, link, id } = action.payload;
      let existingData = [...state.data];
      existingData[state.id].cardData.push({ name: name, link: link, id: id });
      state.data = [...existingData];
      state.showCardModal = false;
      state.id = null;
    },
    editBucketData(state, action) {
      let value = action.payload;
      let existingData = [...state.data];
      existingData[state.id].name = value;
      state.data = [...existingData];
    },
    toggleBucketEditing(state, action) {
      state.isBucketEditing = !state.isBucketEditing;
    },
    toggleCardEditing(state, action) {
      state.isCardEditing = !state.isCardEditing;
    },
    editCardData(state, action) {
      const { bucketIndex, cardId } = state.id;
      const values = action.payload;
      let existingData = [...state.data];
      const existingIndex = existingData[bucketIndex].cardData.findIndex(
        (item) => +item.id === +cardId
      );
      existingData[bucketIndex].cardData[existingIndex] = { ...values };
      state.data = [...existingData];
    },

    deleteCardData(state, action) {
      const { bucketIndex, cardId } = state.id;
      let existingData = [...state.data];
      const existingIndex = existingData[bucketIndex].cardData.findIndex(
        (item) => +item.id === +cardId
      );
      existingData[bucketIndex].cardData.splice(existingIndex, 1);

      state.data = [...existingData];
    },
    changeId(state, action) {
      state.id = action.payload;
    },

    resetModalValues(state, action) {
      state.showBucketModal = false;
      state.showCardModal = false;
      state.isBucketEditing = false;
      state.isCardEditing = false;
      state.showVideoModal = false;
      state.id = null;
    },

    dragAndDrop(state, action) {
      const data = action.payload;
      state.data = [...data];
    },
  },
});

const bucketAction = bucketSlice.actions;

export default bucketSlice.reducer;
export { bucketAction };
