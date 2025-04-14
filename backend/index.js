const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { pushRepo } = require("./controllers/push");
const { revertRepo } = require("./controllers/revert");

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "starts the server", {}, startServer)
  .command("init", "Initialise a new repo", {}, initRepo)
  .command("add <file>", "Add a file to the staging area", (yargs)=>{yargs.positional("file",{
    describe: "File that'll be added to staging area",
    type:"string"
  })}, (argv)=>{
    addRepo(argv.file);
  })
  .command("commit <message>", "Committing the changes", (yargs)=>{yargs.positional("message",{
    describe: "Committing the changes from the staging area",
    type:"string"
  })},(argv)=>{
    commitRepo(argv.message);
  })
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command("revert <commitID>", "Revert to a commit by id", (yargs)=>{yargs.positional("commitID",{
    describe: "Revert changes to a specific commit",
    type:"string"
  })},(argv)=>{
    revertRepo(argv.commitID);
  } )
  .demandCommand(1, "you need atleast one command")
  .help().argv;

  function startServer(){
    console.log("server is started");
  }