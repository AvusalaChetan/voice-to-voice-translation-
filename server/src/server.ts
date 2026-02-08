import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {createServer} from "http";
import type {Socket} from "socket.io";
import {Server} from "socket.io";
import {
  CONNECT,
  DISCONNECT,
  ERROR_MESSAGE,
  TEXT,
  TRANSCRIPT,
} from "./const/event.js";
import {translate} from "./translate.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).json({message: "every thing working fine "});
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://69889600341b7ca58d071b46--text-to-voice-translation.netlify.app",
      "https://text-to-voice-translation.netlify.app/"
    ],
    methods: ['GET', 'POST'],
    credentials: true
  },
});

// EVENTS are comming from src\const\event.ts

io.on(CONNECT, (socket: Socket) => {
  console.log("connected", socket.id);

  socket.on(TEXT, async (payload) => {
    const {text, sourceLanguage, targetLanguage} = payload;

    console.log(payload);
    try {
      if (!text || !sourceLanguage || !targetLanguage)
        socket.emit(ERROR_MESSAGE, {
          message: "text or sourceLanguage or targetLanguage is missing ",
        });

      if (text && text.trim()) {
        const translatedText = await translate(
          text,
          sourceLanguage,
          targetLanguage,
        );
        socket.emit(TRANSCRIPT, {transcript: translatedText});
      } else {
        console.log("error no text ");
        socket.emit(ERROR_MESSAGE, {message: "No text to translate"});
      }
    } catch (error) {
      console.error("Error:", error);
      socket.emit(ERROR_MESSAGE, {
        message: "Processing failed: " + (error as Error).message,
      });
    }
  });

  socket.on(DISCONNECT, () => console.log("disconnect", socket.id));
});

server.listen(PORT, () => console.log("Server running on port 8080"));
