import {LoggerGroup} from "dola-logger";

export const mainGroup = new LoggerGroup("main", {color: "magenta"});
export const mainLogger = mainGroup.createLogger("main", {color: "magentaBright"});

export const axiosGroup = new LoggerGroup("axios", {color: "yellow"});
export const axiosLogger = axiosGroup.createLogger("main", {color: "blueBright"});

export const mailGroup = new LoggerGroup("mail", {color: "blue"});
export const outlookLogger = mailGroup.createLogger("outlook", {color: "blueBright"});

export const discordGroup = new LoggerGroup("discord", {color: "blue"});
export const discordLogger = discordGroup.createLogger("bot", {color: "blueBright"});
