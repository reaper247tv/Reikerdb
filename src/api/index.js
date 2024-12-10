import { Router } from "express";

const router = Router();

// In-memory storage for simplicity
let dataStore = {
  crunchyroll: null,
  expressvpn: null,
  capcut: null,
};

// Define routes
router.get("/Crunchyroll", (req, res) => {
  res.json({ data: dataStore.crunchyroll });
});

router.get("/ExpressVPN", (req, res) => {
  res.json({ data: dataStore.expressvpn });
});

router.get("/CapCut", (req, res) => {
  res.json({ data: dataStore.capcut });
});

router.post("/Crunchyroll", (req, res) => {
  dataStore.crunchyroll = req.body.data;
  res.json({ success: true, message: "Crunchyroll data updated." });
});

router.post("/ExpressVPN", (req, res) => {
  dataStore.expressvpn = req.body.data;
  res.json({ success: true, message: "ExpressVPN data updated." });
});

router.post("/CapCut", (req, res) => {
  dataStore.capcut = req.body.data;
  res.json({ success: true, message: "CapCut data updated." });
});

export default router;
