import {generateUsername } from "unique-username-generator";

function generatorUsername(){
    const username = generateUsername()
    return username
}

export default generatorUsername()