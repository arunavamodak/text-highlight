export const ADD_MARKER = 'ADD_MARKER';
export const REMOVE_MARKER = 'REMOVE_MARKER';


export const addMarker = (data) => {
    return {
        type: ADD_MARKER,
        data: data
    }
}


export const removeMarker = (id) => {
    return {
        type: REMOVE_MARKER,
        id: id
    }
}