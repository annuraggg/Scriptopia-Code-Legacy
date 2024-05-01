import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './states/user/UserSlice'
import ThemeReducer from './states/user/ThemeSlice'

export default configureStore({
  reducer: {
    user: UserReducer,
    theme: ThemeReducer,
  },
})