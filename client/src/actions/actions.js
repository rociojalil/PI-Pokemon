import axios from 'axios'

export function getPokemons() {
    return async function (dispatch) {
      const respuesta = await axios.get('http://localhost:3001/pokemons')
            return dispatch({
                    type: 'GET_POKEMONS',
                    payload: respuesta.data.cuarentaPoke
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
                    payload: poke.data
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

export function menosFuerza() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemons')
            .then(dog => {
                const menosforce = dog.data.cuarentaPoke.sort((a, b) => {
                        // corregir tipo de dato
                        if (a.fuerza > b.fuerza) return 1
                        if (a.fuerza < b.fuerza) return -1
                        return 0
                })
                dispatch({
                    type: 'MENOS_FUERZA',
                    payload: menosforce
                })
            })
    }
}

export function masFuerza() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemons')
            .then(dog => {
                const orderHeavy = dog.data.cuarentaPoke.sort((b, a) => {
                        if (a.fuerza > b.fuerza) return 1
                        if (a.fuerza < b.fuerza) return -1
                        return 0
                })
                dispatch({
                    type: 'MAS_FUERZA',
                    payload: orderHeavy
                })
            })
    }
}


export function getZA() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemons')
            .then(dog => {
                const orderZA = dog.data.cuarentaPoke.sort((b, a) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
                dispatch({
                    type: 'order_ZA',
                    payload: orderZA
                })
            })
    }
}

export function getAZ() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/pokemons')
            .then(dog => {
                const orderAZ = dog.data.cuarentaPoke.sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
                dispatch({
                    type: 'order_AZ',
                    payload: orderAZ
                })
            })
    }
}

