import axios from 'axios'

export function getPokemons() {
    return async function (dispatch) {
      const respuesta = await axios.get('http://localhost:3001/pokemons')
            return dispatch({
                    type: 'GET_POKEMONS',
                    payload: respuesta.data.cuarentaPoke,
            });
    }
    }
            
    


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