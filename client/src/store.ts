import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './states/user/UserSlice'

export default configureStore({
  reducer: {
    user: UserReducer
  },
})