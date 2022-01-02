import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const date = moment.utc("2022-01-02").format();
const data = { date };

jsonfile.writeFile(path, data, { spaces: 2 }, async (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("JSON written successfully");

  try {
    const git = simpleGit();
    await git.add(["-A"]);
    await git.commit(date, { "--date": date });
    await git.push();
    console.log("Committed to Jan 2nd 2022!");
  } catch (error) {
    console.error(error);
  }
});