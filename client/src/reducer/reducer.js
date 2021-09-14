
const initialState = {
    pokemons: [],
    filter: [],
    detail: {},
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
            case 'GET_ID':
                return {
                    ...state,
                    detail: action.payload
                }
            case 'FILTER':
                return {
                    ...state,
                    filter: action.payload
                }
            case 'MENOS_FUERZA':
                    return {
                        ...state,
                        pokemons: action.payload
                    }
             case 'MAS_FUERZA':
                        return {
                            ...state,
                            pokemons: action.payload
                        }
            case 'order_ZA':
                            return {
                                ...state,
                                pokemons: action.payload
                            }
            case 'order_AZ':
                            return {
                                ...state,
                                pokemons: action.payload
                            }
            case 'DB': 
                return {
                    ...state,
                    filter: state.pokemons.filter(b => b.id.length > 6).sort()
                }
            case 'API': 
                return {
                    ...state,
                    filter: state.pokemons.filter(b => b.id.length <= 40).sort()
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