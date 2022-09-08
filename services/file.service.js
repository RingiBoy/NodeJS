const fs = require("fs/promises");
const path = require("path");

const pathToFile = path.join(process.cwd(), "dataBAse", "users.json");

module.exports = {
  readDB: async () => {
    try {
      const buffer = await fs.readFile(pathToFile);
      const data = buffer.toString();
      const users = data ? JSON.parse(data) : [];
      return users.sort((a, b) => b.id - a.id);
    } catch (e) {
      console.error(e);
    }
  },

  pushToDB: async (usersFromBody) => {
    try {
      await fs.writeFile(pathToFile, JSON.stringify(usersFromBody));
    } catch (e) {
      console.error(e);
    }
  },
  


  
};
