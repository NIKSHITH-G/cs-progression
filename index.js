import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  const date = moment()
    .subtract(1, "y")
    .add(n, "d")
    .format();

  const data = { date };

  return new Promise((resolve, reject) => {
    jsonfile.writeFile(path, data, { spaces: 2 }, async (err) => {
      if (err) return reject(err);

      try {
        const git = simpleGit();
        await git.add(["-A"]);   // ← changed from "./*"
        await git.commit(date, { "--date": date });
        console.log(`Commit ${n} done: ${date}`);
        resolve(await makeCommit(n - 1));
      } catch (error) {
        reject(error);
      }
    });
  });
};

makeCommit(365);