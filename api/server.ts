import express from "express";
import cors from "cors";

const services = [
      {id: "1", name: 'gpt-2 simple', enabled: false, status:"offline"},
      {id: "2", name: 'gpt-2 streaming', enabled: false,status:"offline"},
    ]

const app = express();
app.use(express.json()); // a key thing to parse json, else req.body is seen as undefined
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    status: "ok", // leave only this one
    services: { // remove from health, and remove at all
      gateway: true,
      gpt2: true,
      training: false,
      inference: true,
    },
    servicesList: services // remove from health and move to dedicated servicesHealth endpoint
  });
});

app.get("/services", (req, res) => { // here is ready endpoint for services but frontend still used the data from /health
  res.json(services);
});

app.post("/services/:id/state", (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  // console.log(service,req.params.id, req.body)
  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  const { enabled } = req.body;
  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "enabled must be boolean" });
  }

  service.enabled = enabled;

  res.json({ success: true, service });
});



app.listen(3001, () => {
  console.log("API Gateway running on http://localhost:3001");
});
