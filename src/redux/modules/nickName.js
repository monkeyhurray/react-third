//초기 상태값(state)
const CREATE_NICKNAME = "nickName/CREATE_NICKNAME";

//action creator : action value를 return하는 함수

export const createNickName = (payload) => {
  return {
    type: CREATE_NICKNAME,
    payload,
  };
};

const initialState = {
  name: "",
};

//리듀서: "state"에 변화를 일이키는 함수
// (1) state를 action의 type에 따라 변경하는 함수
// (2)
//input: state와 action
//action은 state를 어떻게 수정할 것인지

const nickName = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NICKNAME:
      return { name: action.payload };

    default:
      return state;
  }
};

export default nickName;
