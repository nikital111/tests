const initialState = {
  arr: [
    {
      title: "are u ok?",
      matters: {
        q1: { title: "yes", isCorrect: false },
        q2: { title: "no", isCorrect: true },
        q3: { title: "xz", isCorrect: false },
      },
    },
  ],
  isShow: false,
  id: null,
  rating: null,
  max: null,
};

const reduceMain = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_Q": {
      return {
        ...state,
        arr: [...state.arr, action.payload],
        isShow: false,
        id: null,
      };
    }

    case "SHOW_FORM": {
      return {
        ...state,
        isShow: true,
      };
    }

    case "CLOSE_FORM": {
      return {
        ...state,
        isShow: false,
        id: null,
      };
    }

    case "DELETE_Q": {
      state.arr.splice(action.id, 1);
      return {
        ...state,
        arr: [...state.arr],
      };
    }
    case "EDIT_Q": {
      return {
        ...state,
        isShow: true,
        id: action.id,
      };
    }
    case "EDIT_FORM_Q": {
      state.arr.splice(action.id, 1, action.obj);
      return {
        ...state,
        arr: [...state.arr],
        isShow: false,
        id: null,
      };
    }

    case "RESULT": {
      return {
        ...state,
        rating: action.rating,
        max: action.max,
      };
    }

    case "RESET": {
      return {
        arr: [
          {
            title: "are u ok?",
            matters: {
              q1: { title: "yes", isCorrect: false },
              q2: { title: "no", isCorrect: true },
              q3: { title: "xz", isCorrect: false },
            },
          },
        ],
        isShow: false,
        id: null,
        rating: null,
        max: null,
      };
    }

    default:
      return state;
  }
};

export default reduceMain;