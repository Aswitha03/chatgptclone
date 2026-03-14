import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.GROQ_API_KEY;
app.post("/chat", async (req, res) => {

    const message = req.body.message;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data); // shows errors in terminal

        if (data.error) {
            return res.json({ reply: data.error.message });
        }

        res.json({
            reply: data.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.json({
            reply: "Server error contacting AI"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});