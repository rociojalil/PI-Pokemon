import axios from 'axios'

export function getPokemons() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemons')
            .then(dog => {
                const order = dog.data.sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
                dispatch({
                    type: 'GET_POKEMONS',
                    payload: order
                })
            })
    }
};

// ese (payload) es lo que me llega del front
export function postPokemon(payload) {
    return async function(dispatch) {
        const res = await axios.post('http://localhost:3001/createPoke', payload)
        return {
            type: 'POST',
            res
        }
    };
};

export function getTypes() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemontypes')
            .then(temp => {
                dispatch({
                    type: 'GET_TYPES',
                    payload: temp.data
                })
            })
    }
}