import {uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

function generatorUsername(){
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], length : 2 });
    return randomName
}

export default generatorUsername()