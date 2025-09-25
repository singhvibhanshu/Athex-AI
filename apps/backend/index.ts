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
        return
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
})

app.post

app.post

app.get

app.get