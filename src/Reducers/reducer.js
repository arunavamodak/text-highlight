import { ADD_MARKER } from "../Actions/action";

const initialState = {
    markers: [],
}

const markerReducer = (state = initialState, action) => {
    console.log("hitting reducer");
    switch (action.type) {
        case ADD_MARKER:
            const markers = [...state.markers];
            markers.push(action.data);
            return { markers: markers };

        default:
            return state;
    }
}


export default markerReducer;