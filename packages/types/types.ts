import { z } from "zod";

export const createNewAIModel = z.object
({
    name: z.string(),
    type: z.enum
    ([
        "Man",
        "Woman",
        "Couple",
        "Others"
    ]),
    age: z.number(),
    ethnicity: z.enum
    ([
        "White",
        "Black",
        "Asian_American",
        "East_Asian",
        "South_East_Asian",
        "South_Asian",
        "Middle_Eastern",
        "Pacific",
        "Hispanic"
    ]),
    eyeColour: z.enum
    ([
        "Brown",
        "Blue",
        "Hazel",
        "Gray",
        "Green"
    ]),
    bald: z.boolean(),
    imagesUrl: z.array(z.string())
})

export const GenerateImages = z.object
({
    prompt: z.string(),
    modelId: z.string(),
    numberOfImages: z.number()
})

export const GenerateImagesFromPack = z.object
({
    modelId: z.string(),
    packId: z.string()
})