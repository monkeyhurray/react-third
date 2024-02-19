//초기 상태값(state)
const CREATE_CONTENT = "content/CREATE_CONTENT";

//action creator : action value를 return하는 함수

export const createContent = (payload) => {
  return {
    type: CREATE_CONTENT,
    payload,
  };
};

const initialState = {
  comment: "",
};

//리듀서: "state"에 변화를 일이키는 함수
// (1) state를 action의 type에 따라 변경하는 함수
// (2)
//input: state와 action
//action은 state를 어떻게 수정할 것인지

const content = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CONTENT:
      return { comment: action.payload };

    default:
      return state;
  }
};

export default content;
