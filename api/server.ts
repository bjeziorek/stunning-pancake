import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    services: {
      gateway: true,
      gpt2: true,
      training: false,
      inference: true,
    },
    servicesList: [
      {id: 1, name: 'gpt-2 simple', status: 'offline'},
      {id: 2, name: 'gpt-2 streaming', status: 'offline'},
    ]
  });
});

app.listen(3001, () => {
  console.log("API Gateway running on http://localhost:3001");
});
