export const ADD_MARKER = 'ADD_MARKER';


export const addMarker = (data) => {
    console.log("hitting action");
    return {
        type: ADD_MARKER,
        data : data
    }
}