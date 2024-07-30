import {z} from 'zod'

const ValidSocialMedia = ['Facebook', 'Instagram', 'Linkedin', 'Youtube', 'All the above']
export const FormDataSchema = z.object({
    name: z.string().trim().min(1, {
        message: 'Name is required.'
    }),
    phoneNumber: z.string().refine((value) => /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(value), {
        message: 'Enter a valid phone number.'
    }),
    socialMedias: z.array(z.string()).nonempty({
        message: "Atleast one social media must be selected."
    }).refine(socialMedias => socialMedias.every(socialMedia => ValidSocialMedia.includes(socialMedia)), {
        message: 'Invalid Social Media Selected.'
    })
}) 

export {ValidSocialMedia}