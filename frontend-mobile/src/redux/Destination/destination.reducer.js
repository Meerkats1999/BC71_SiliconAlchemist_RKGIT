const INITIAL_STATE = {
  dest: '',
};

const DestinationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_DEST':
      return {
        ...state,
        dest: action.payload,
      };

    default:
      return state;
  }
};

export default DestinationReducer;
