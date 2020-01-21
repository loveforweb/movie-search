const initialState = {
    loading: false,
    details: [],
    errorMessage: null,
    cast: [],
    production: []
};

const detailsReducer = (state, action) => {
    switch (action.type) {
        case 'MOVIE_DETAILS_REQUEST':
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case 'MOVIE_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                details: action.payload
            };
        case 'MOVIE_DETAILS_ERROR':
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };

        case 'MOVIE_CAST_UPDATE':
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
                cast: action.payload
            };

        default:
            return state;
    }
};

export { initialState, detailsReducer };
