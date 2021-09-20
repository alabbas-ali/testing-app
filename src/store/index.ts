

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import repositoriesSlice from './repositoriesSlice'

export const store = configureStore({
    reducer: {
        repos : repositoriesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
