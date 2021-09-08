
const initialState = {
    pokemons: [],
    filter: [],
    breedsDetail: {},
    temps: [],
  


}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }
            case 'POST':
            return {
                ...state
            }
            case 'GET_TYPES':
                return {
                    ...state,
                    temps: action.payload
                }
            default:
                return {
                    state
                }
        }
    }
    
    export default reducer