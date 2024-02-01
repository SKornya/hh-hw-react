interface Error {
  message: string | null;
  code: number | null;
}

export interface ErrorAction {
  type: string;
  payload: string | number | null;
}

const SET_ERROR_MESSAGE = 'SETERRORMESSAGE';
const SET_ERROR_CODE = 'SETERRORCODE';

const initialError: Error = {
  message: null,
  code: null,
};

const setErrorMessage = (message: string | null): ErrorAction => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});

const setErrorCode = (code: number | null): ErrorAction => ({
  type: SET_ERROR_CODE,
  payload: code,
});

const errorReducer = (state: Error = initialError, action: ErrorAction) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_ERROR_CODE:
      return {
        ...state,
        code: action.payload,
      };
    default:
      return state;
  }
};

export { setErrorMessage, setErrorCode, errorReducer };
