import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '.'

export const clsoeFile = createAsyncThunk<void, void, ThunkConfig>(
  'dataFile/closeFile',
  async (_, thunk) => {
    
  },
)
