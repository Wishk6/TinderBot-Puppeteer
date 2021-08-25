const {swapping} = require('./swapping');

const facebook = async (page, user) => {
  try {
    await page.goto('https://www.facebook.com/');

    /* cookie buttun */
    const cookieButtonSelector = '[data-cookiebanner="accept_button"]';
    await page.waitForSelector(cookieButtonSelector);
    await page.click(cookieButtonSelector);

    /* login inputs */
    const loginInput = 'input[type="text"]';
    const passwordInput = 'input[type="password"]';
    await page.waitForSelector(loginInput);
    await page.waitForSelector(passwordInput);

    await page.evaluate((user, loginInput, passwordInput) => {
      document.querySelector(loginInput).value = user.username;
      document.querySelector(passwordInput).value = user.password;
    }, user, loginInput, passwordInput);

    await page.waitForTimeout(1000);

    /* login button */
    const submitButton = 'button[type="submit"]';
    await page.waitForSelector(submitButton);
    await page.click(submitButton);

    try {
      await page.waitForTimeout(2000);
      const isConnected = 'div._9ay7';
      await page.click(isConnected);
      return false;
    } catch {
      return true;
    }
    
  } catch {
    return false;
  }
};

const google = async (page, user) => {
  try {
    await page.goto('https://www.google.com/accounts/Login?hl=fr');

      //Email
    const selectorEmail = 'input[type="email"]';
    const selectorBtn = 'button.VfPpkd-LgbsSe-OWXEXe-k8QpJ';
    await page.waitForSelector(selectorEmail);

    await page.evaluate((selectorEmail, user) => {
      document.querySelector(selectorEmail).value = user.username;
    }, selectorEmail, user);


    await page.waitForSelector(selectorBtn);
    await page.click(selectorBtn);

      //Password
    const selectorPassword = 'input[type="password"]';
    await page.waitForSelector(selectorPassword);

    await page.evaluate((selectorPassword, user) => {
      document.querySelector(selectorPassword).value = user.password;
    }, selectorPassword, user);

    await page.waitForSelector(selectorBtn);
    await page.click(selectorBtn);

    await page.waitForTimeout(2000);

    await page.evaluate((page) => {
      if(document.querySelectorAll('span')[7].hasAttribute('jsslot')) return false;
      else return true
    }, page)
  } catch {
    return false;
  }
};

const tinder = async (page, browser, user) => {
  try {
    await page.goto('https://tinder.com/');

    /* set geolocalisation */
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://tinder.com/app/recs', ['geolocation']);

    await page.setGeolocation({ latitude: user.location.latitude, longitude: user.location.longitude });
    await page.waitForTimeout(1000);

    /* cookies button */
    await page.evaluate(async () => {
      await document.querySelectorAll('button[type="button"]')[1].click();
      // location.reload(true);
    });

    /* login btn */
    const loginButton = 'a[draggable="false"]';
    await page.waitForSelector(loginButton);
    await page.click(loginButton);

    await page.waitForTimeout(1000);

    /* connect with phone number */
    const phoneButton = 'button[aria-label="Connexion avec Facebook"]';
    await page.waitForSelector(phoneButton);
    await page.click(phoneButton);

    await swapping(page, browser, user);

    return true;
  } catch {
    return false;
  }
};

module.exports = {
  google,
  facebook,
  tinder
};
