import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(), // mantém o arquivo em buffer
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
