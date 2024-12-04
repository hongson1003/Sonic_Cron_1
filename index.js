const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// API để ping Spring Boot
const pingSpringBoot = async () => {
  try {
    await axios.get("https://sonic.sdklearningboost.io.vn/api/v1/health");
    console.log("Pinged Spring Boot successfully!");
  } catch (error) {
    console.error("Failed to ping Spring Boot:", error.message);
  }
};

// Định nghĩa một endpoint để ping Spring Boot theo yêu cầu
app.get("/ping-springboot", async (req, res) => {
  try {
    await pingSpringBoot();
    res.status(200).send("Pinged Spring Boot successfully!");
  } catch (error) {
    res.status(500).send("Failed to ping Spring Boot");
  }
});

// Cài đặt cron job để chạy mỗi 2 phút
setInterval(async () => {
  await pingSpringBoot();
}, 120000); // 120000ms = 2 phút

// Bắt đầu server Express
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
