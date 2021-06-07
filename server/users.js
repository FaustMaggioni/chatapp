const users = []

const addUser = ({id, nombre, cuarto}) => {
    nombre = nombre.trim().toLowerCase()
    cuarto = cuarto.trim().toLowerCase()

    const existingUser = users.find(user => user.cuarto === cuarto && user.nombre === nombre)

    if(existingUser){
        return {error: 'Username is taken'}
    }

    const user = {id, nombre, cuarto}
    users.push(user)
    return user
}

const removeUser = () => {

}

const getUser= () => {

}

const getUsersInRoom = () =>{

}