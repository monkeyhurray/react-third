import jsonData from "assets/jsons/data.json";
//초기 상태값(state)
const PLUS_COMMENT = "entireComment/PLUS_COMMENT";
const REMOVE_COMMENT = "entireComment/REMOVE_COMMENT";
const EDIT_COMMENT = "entireComment/EDIT_COMMENT";
//action creator : action value를 return하는 함수

export const plusComment = (payload) => {
  return {
    type: PLUS_COMMENT,
    payload,
  };
};

export const removeComment = (payload) => {
  return {
    type: REMOVE_COMMENT,
    payload,
  };
};

export const editComment = (payload) => {
  return {
    type: EDIT_COMMENT,
    payload,
  };
};

const initialState = {
  data: jsonData,
};

//리듀서: "state"에 변화를 일이키는 함수
// (1) state를 action의 type에 따라 변경하는 함수
// (2)
//input: state와 action
//action은 state를 어떻게 수정할 것인지

const entireComment = (state = initialState, action) => {
  switch (action.type) {
    case PLUS_COMMENT:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        data: state.data.filter((comment) => comment.id !== action.payload.id),
      };
    case EDIT_COMMENT:
      return {
        ...state,
        data: [...action.payload],
      };
    default:
      return state;
  }
};

export default entireComment;
