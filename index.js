require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

// API để ping Spring Boot
const pingSpringBoot = async () => {
  try {
    await axios.get(process.env.SPRING_BOOT_HEALTH_URL);
    console.log(
      `[${new Date().toISOString()}] Pinged Spring Boot successfully!`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed to ping Spring Boot:`,
      error.message
    );
  }
};

// API để ping Cron B
const pingCronB = async () => {
  try {
    await axios.get(process.env.CRON_B_URL);
    console.log(`[${new Date().toISOString()}] Pinged Cron B successfully!`);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed to ping Cron B:`,
      error.message
    );
  }
};

// API để ping Next.js
const pingNextJs = async () => {
  try {
    await axios.get(process.env.NEXTJS_API_HEALTH_URL);
    console.log(
      `[${new Date().toISOString()}] Pinged Next.js API successfully!`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed to ping Next.js API:`,
      error.message
    );
  }
};

// Cài đặt cron job để ping Spring Boot mỗi 2 phút
cron.schedule("*/2 * * * *", async () => {
  console.log(
    `[${new Date().toISOString()}] Running cron job to ping Spring Boot...`
  );
  await pingSpringBoot();
});

// Cài đặt cron job để gọi Next.js mỗi 5 phút
cron.schedule("*/2 * * * *", async () => {
  console.log(
    `[${new Date().toISOString()}] Running cron job to ping Next.js API...`
  );
  await pingNextJs();
});

// Cron job 3: Ping Cron B mỗi 2 phút (bắt đầu sau 20 giây)
setTimeout(() => {
  cron.schedule("*/2 * * * *", async () => {
    console.log(
      `[${new Date().toISOString()}] Running cron job to ping Cron B...`
    );
    await pingCronB();
  });
}, 20 * 1000); // 20 giây

// Route để nhận yêu cầu từ Cron B
app.get("/ping-from-cronb", async (req, res) => {
  console.log(
    `[${new Date().toISOString()}] Received ping from Cron B, calling Spring Boot...`
  );
  try {
    await pingSpringBoot();
    res.status(200).send("Pinged Spring Boot successfully from Cron B!");
  } catch (error) {
    res.status(500).send("Failed to ping Spring Boot from Cron B.");
  }
});

// Bắt đầu server Express
app.listen(PORT, () => {
  console.log(`Cron A is running on http://localhost:${PORT}`);
});
