import express from "express";
import { createNewAIModel, GenerateImages, GenerateImagesFromPack } from "types/types";
import { prismaClient } from "db";

const PORT = process.env.PORT || 8080;

const USER_Id = "asdasd"

const app = express();
app.use(express.json());

app.post("/model/training", async (req, res) => {
    const parsedBody = createNewAIModel.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(411).json({
            message: "Incorrect input"
        })
        return;
    }

    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColour: parsedBody.data.eyeColour,
            bald: parsedBody.data.bald,
            userId: USER_Id

        }
    })

    res.json({
        modelId: data.id
    })
})

app.post("ai/generate", async (req, res) => {
    const parsedBody = GenerateImages.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(411).json({

        })
        return;
    }

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data.prompt,
            userId: USER_Id,
            modelId: parsedBody.data.modelId,
            imageUrl: ""
        }
    }) 

    res.json({
        imageId: data.id
    })
})

app.post("/pack/generate", async (req ,res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);

    if(!parsedBody.success) {
        res.status(411).json({
            message: "Incorrect input"
        })
        return;
    }

    const prompts = await prismaClient.packPrompt.findMany({

    })

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt: any) => ({
            prompt: prompt.prompt,
            userId: USER_Id,
            modelId: parsedBody.data.modelId,
            imageUrl: ""
        }))
    })
    
    res.json({
        images: images.map((image: any) => image.id)
    })
})

app.get("/pack/bulk", async (req, res) => {
    const packs = await prismaClient.packs.findMany({

    })

    res.json({
        packs
    })
})

app.get("/image/bulk", async (req, res) => {
    const images = req.query.images as string [];
    const limit = req.query.limit as string;
    const offset = req.query.offset as string;

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: {in: images},
            userId: USER_Id
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })

    res.json({
        images: imagesData
    })
})