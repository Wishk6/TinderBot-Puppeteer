const { updateUser } = require("../database");

module.exports = {
  swapping: async (page, browser, user) => {
    await page.waitForTimeout(5000);
    let nbrLikes = 0;
    let nbrDislikes = 0;
    let i = 0;
    let id;

    const removeTimer = () => {
      clearInterval(id);
      console.log('nbr likes: ' + nbrLikes + '\nnbr dislikes: ' + nbrDislikes);
      updateUser(user.username, nbrLikes, nbrDislikes);
      browser.close()
    }


    /*
        0: back right
        1: dislike
        2: super like
        3: like
        4: boost
    */


    id = setInterval(async () => {
      const res = await page.evaluate(() => {
        let random = Math.random() * 3; // pour int 
        const buttons = document.querySelectorAll('button[draggable="false"]')

        if (random > 1 && buttons[3] != undefined) {
          buttons[3].click();
          return 'likes';
        }
        if (random <= 1 && buttons[3] != undefined) {
          buttons[1].click();
          return 'dislikes';
        }
      })
      if (res === 'likes') {
        i++;
        nbrLikes++;
      }else if(res === 'dislikes'){
        i++;
        nbrDislikes++;
      }

      if (i >= 5 /* 100 */) {
        removeTimer();
        return;
      }
    }, 1000);
  }
}