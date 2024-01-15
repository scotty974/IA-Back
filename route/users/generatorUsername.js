import {uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";
// cette fonction va retounrner un nom génere aléatoirement a partir d'un dictionnaire 
function generatorUsername(){
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], length : 2 });
    return randomName
}

export default generatorUsername()