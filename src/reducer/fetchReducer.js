const initialState = {
    response: null,
    error: null
};

const fetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                response: action.payload
            };

        case 'FETCH_FAIL':
            return {
                ...state,
                response: action.payload
            };

        default:
            return state;
    }
};

export { initialState, fetchReducer };
