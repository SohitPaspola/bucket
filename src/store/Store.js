import  bucketReducer  from './reducer/BucketReducer';


const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {bucket: bucketReducer},
});

export default store;