const axios = require("axios");

const pingSpringBoot = async () => {
  try {
    await axios.get("https://sonic.sdklearningboost.io.vn/api/v1/health");
    console.log("Pinged Spring Boot successfully!");
  } catch (error) {
    console.error("Failed to ping Spring Boot:", error.message);
  }
};

const pingCronB = async () => {
  try {
    await axios.get("http://cronjob-b-url/ping");
    console.log("Pinged Cron Job B successfully!");
  } catch (error) {
    console.error("Failed to ping Cron Job B:", error.message);
  }
};

const main = async () => {
  await pingSpringBoot(); // Đợi ping Spring Boot xong
  await pingCronB(); // Sau khi ping Spring Boot xong, mới ping Cron Job B
};

setInterval(main, 60000); // Gọi mỗi 30 giây
