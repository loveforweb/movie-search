const initialState = {
    details: [],
    errorMessage: null,
    loading: true,
    oeuvreErrorMessage: null,
    oeuvreLoading: true,
    oeuvre: []
};

const memberReducer = (state, action) => {
    switch (action.type) {
        case 'MEMBER_DETAIL_REQUEST':
            return {
                ...state,
                details: [],
                errorMessage: null,
                loading: true
            };
        case 'MEMBER_DETAIL_SUCCESS':
            return {
                ...state,
                details: action.payload,
                errorMessage: null,
                loading: false
            };

        case 'MEMBER_DETAIL_ERROR':
            return {
                ...state,
                details: [],
                errorMessage: action.error,
                loading: false
            };

        case 'OEUVRE_REQUEST':
            return {
                ...state,
                oeuvreErrorMessage: null,
                oeuvreLoading: true,
                oeuvre: []
            };
        case 'OEUVRE_SUCCESS':
            return {
                ...state,
                oeuvreErrorMessage: null,
                oeuvreLoading: false,
                oeuvre: action.payload
            };

        case 'OEUVRE_ERROR':
            return {
                ...state,
                oeuvreErrorMessage: action.error,
                oeuvreLoading: false
            };

        default:
            return state;
    }
};

export { initialState, memberReducer };
