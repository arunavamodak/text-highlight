import { ADD_MARKER, REMOVE_MARKER } from "../Actions/action";

const initialState = {
    markers: [],
}

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MARKER:
            const markers = [...state.markers];
            markers.push(action.data);
            return { markers: markers };
        case REMOVE_MARKER:
            const t = [...state.markers].filter(item => item.id !== action.id);
            return { markers: t };

        default:
            return state;
    }
}


export default markerReducer;