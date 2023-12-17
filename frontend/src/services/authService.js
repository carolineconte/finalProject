
import { api, requestConfig } from '../utils/config'
console.log(api)

//REGISTRAR USUARIO
//funcao que recebe os dados do usuario

const register = async (data) => {
    //executa a configuracao
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json()) //recebe os dados e tranforma em json
            .catch((err) => err) //recebe erros

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
            //salva os dados em lcal

        }
        return res
    } catch (error) {
        console.log(error)
    }
}

//Logout
const logout = () => {
    localStorage.removeItem('user')
}

//login
const login = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + '/users/login', config)
            .then((res) => res.json())
            .catch((err) => err)

        if (res._id) {
            localStorage.setItem('user', JSON.stringify(res))
        }
        console.log(res)
        return res

    } catch (error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService