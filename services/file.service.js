const fs = require("fs/promises");
const path = require("path");

const pathToFile = path.join(process.cwd(), "dataBAse", "users.json");

const reader = async () => {
  try {
    const buffer = await fs.readFile(pathToFile);
    const data = buffer.toString();
    const users = data ? JSON.parse(data) : [];
    return users.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.log(error);
  }
};

const writer = async (users) => {
  try {
    await fs.writeFile(pathToFile, JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser: async (userObject) => {
    const users = await reader();

    userObject.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(userObject);
    await writer(users);
    return userObject;
  },

  getUser: () => {
    return reader();
  },
  getUserById: async(userId)=>{
    const users = await reader();
    return users.find((user=>user.id ==userId))
  },
  delUserById:async(userId)=>{
    const users = await reader();
    const index=  users.findIndex((user=>user.id ==userId));
    if (index<0) 
        return; 
    const user = users[index];
    users.splice(index, 1)
    await writer(users);
    return user
  },
  updateByUserId: async(userId,data )=>{
    const users = await reader();
    const index=  users.findIndex((user=>user.id ==userId));
    if (index<0) 
        return; 
    users[index] = {...users[index], ...data};
    
    await writer(users);
    return users[index] 
  }
};


