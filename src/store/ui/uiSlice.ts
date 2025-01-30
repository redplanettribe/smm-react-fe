import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

export type PostListTab = 'draft' | 'queue' | 'ideas' | 'scheduled' | 'published' | 'failed';

export enum PostListTabEnum {
  DRAFT = 'draft',
  QUEUE = 'queue',
  IDEAS = 'ideas',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  FAILED = 'failed',
}
interface UIState {
  postList: {
    activeTab: PostListTab;
  };
  // We can add other UI states here in the future
}

const initialState: UIState = {
  postList: {
    activeTab: 'draft',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPostListTab(state, action: PayloadAction<PostListTab>) {
      state.postList.activeTab = action.payload;
    },
  },
});

export const { setPostListTab } = uiSlice.actions;

//**SELECTORS */
export const selectPostListTab = (state: RootState) => state.ui.postList.activeTab;

export default uiSlice.reducer;
