//중앙 데이터 관리소(store)를 설정하는 부분
import { createStore } from "redux";
import { combineReducers } from "redux";

import nickName from "../modules/nickName";
import content from "../modules/content";
import entireComment from "../modules/entireComment";
const rootReducer = combineReducers({
  nickName,
  content,
  entireComment,
});
const store = createStore(rootReducer);

export default store;
