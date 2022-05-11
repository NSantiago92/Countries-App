//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Country, Activity } = require("./src/db.js");
const loadMockActivities = require("./src/utils/createActivityData");
const getAllCountries = require("./src/utils/getAllCountries.js");

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(async () => {
    // check if we have any API data
    const dbCountries = await Country.findOne();
    if (!dbCountries) {
      console.log("No API data, loding again..");
      const countries = await getAllCountries();
      await Country.bulkCreate(countries);
      console.log("Finished loading countries");
      console.log("Loading mock activity data..");
      await loadMockActivities();
      console.log("Finished loading mock activity data..");
    } else {
      console.log("API data already in DB");
    }
  })
  .then(() => {
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .catch((err) => {
    console.error(err);
  });
