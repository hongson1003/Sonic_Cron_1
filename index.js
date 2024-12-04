const axios = require("axios");

const pingSpringBoot = async () => {
  try {
    await axios.get("https://sonic.sdklearningboost.io.vn/api/v1/health");
    console.log("Pinged Spring Boot successfully!");
  } catch (error) {
    console.error("Failed to ping Spring Boot:", error.message);
  }
};

const main = async () => {
  await pingSpringBoot();
};

setInterval(main, 60000);
