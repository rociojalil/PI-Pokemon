
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
            case 'GET_POKE_ID':
            return {
                ...state,
                pokemons: action.payload
            }
            case 'FILTER':
                return {
                    ...state,
                    filter: action.payload
                }
    
            case 'DB': 
                return {
                    ...state,
                    filter: state.pokemons.filter(b => b.id.length > 6).sort()
                }
            case 'API': 
                return {
                    ...state,
                    filter: state.pokemons.filter(b => b.id < 500).sort()
                }
            case 'ALL': 
                return {
                    ...state,
                }
                   
            default:
                return {
                    state
                }
        }
    }
    
    export default reducer