const puppeteer = require("puppeteer");

const username = "test";
const password = "password";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendMessage = async (page, message) => {
  await page.locator("textarea").fill(message);
  await page.locator("form svg:last-child").click();
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://clubs.biseo.sparcs.org");

    await page.locator("form input[type=text]").fill(username);
    await page.locator("form input[type=password]").fill(password);

    await page.locator("form button").click();

    await page.waitForNavigation();

    for (let i = 0; i < 10; i++) {
      const offset = Math.random() * 3000;

      await sleep(offset);
      await sendMessage(page, `test ${i}`);
      await sleep(3000 - offset);
    }

    console.log("success");

    await browser.close();
  } catch (error) {
    console.log(error);
  }

})();
