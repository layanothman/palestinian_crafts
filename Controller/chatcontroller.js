const ChatModel = require("../Models/chatmodel");

class ChatController {
  static async getChat(req, res) {
    console.log("Get all users whose location matches");
    try {
      const results = await ChatModel.getChat(req.query.location);
      res.send(results);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
    }
  }

  static async getChatByInterest(req, res) {
    console.log("Get all users whose interest matches");
    try {
      const results = await ChatModel.getChatByInterest(req.query.interest);
      res.send(results);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
    }
  }

  static async addChat(req, res) {
    console.log("Add a new chat");
    try {
      await ChatModel.addChat(req.body.uid1, req.body.uid2, req.body.msg, req.body.email);
      res.send("Added successfully");
    } catch (error) {
      console.error("Add chat failed:", error);
      res.status(500).send("Add chat failed");
    }
  }
}

module.exports = ChatController;

