
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
                    filter: state.pokemons.filter(elem => typeof elem.id === 'number')
                }
            case 'ALL': 
                return {
                    ...state,
                    filter: state.pokemons.concat('DB', 'API')
                }
                   
            default:
                return {
                    state
                }
        }
    }
    
    export default reducer

    // const changeOrderLoc = (e) => {
    //     let array = [...pokemones]
    //     if (e.target.value === "ALL") {
    //         let arrayfilter = array
    //         setPokemons(arrayfilter)
    //     } else if (e.target.value === "API") {
    //         let arrayfilter = array.filter(elem => typeof elem.id === 'number')
    //         setPokemons(arrayfilter)
    //     } else {
    //         let arrayfilter = array.filter(elem => typeof elem.id !== 'number')
    //         setPokemons(arrayfilter)