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

export function getId(id) {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/pokemons/?q=' + id)
            .then(poke => {
                dispatch({
                    type: 'GET_POKE_ID',
                    payload: poke.data.cuarentaPoke
                })

            })
    }
};

// export function getById(id) {
//     return function (dispatch) {
//         return axios.get(`http://localhost:3001/pokeId` + id)
//             .then(poke => {
//                 dispatch({
//                     type: 'GET_ID',
//                     payload: poke.data
//                 })
//             })
//     }

// };

export function getById(id) {
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokeId/${id}`);
            return dispatch({
                type: 'GET_ID',
                payload: res.data
            });
        } catch (err) {
            console.log(err)
        };
    };
};


export function filter(array) {
    return {
        type: 'FILTER',
        payload: array
    }
}

export function getSource(value) {
    if (value === 'DB') {
        return {
            type: 'DB'
        }
    } else if (value === 'API') {
        return {
            type: 'API'
        }
    }
    else if (value === 'ALL'){
        return {
            type: 'ALL'
        }
    }
 
}

// export function getBreedsRace(race) {
//     return function (dispatch) {
//         return axios.get('http://localhost:3001/dogs?q=' + race)
//             .then(dog => {
//                 dispatch({
//                     type: 'GET_BREEDS_RACE',
//                     payload: dog.data
//                 })

//             })
//     }
// };