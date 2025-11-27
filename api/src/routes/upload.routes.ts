import { Router } from "express";
import { upload } from "../middlewares/multer";
import { uploadToS3 } from "../services/s3Service";
import { sendMessageToQueue } from "../services/sqsService";

const router = Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }

  try {
    const key = await uploadToS3(req.file);
    const messageId = await sendMessageToQueue(key);

    return res.status(202).json({
      message: "Upload received and queued for processing",
      fileKey: key,
      messageId,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
