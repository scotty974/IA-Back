import {z} from 'zod'

// un object qui va permettre de verifier les entrées dans le formulaire
const uservalidation = z.object({
    email : z.string(),
    password : z.string().max(12)
})

export default uservalidation