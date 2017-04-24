const Robot = require('./core/Robot');
const Surface = require('./core/Surface');
const instructions = require('./core/instructions');
const fileInputService = require('./services/FileInputService');

const inputPath = `${process.cwd()}/resources/input.txt`;

fileInputService(inputPath, (surface, commands) => {
  commands.forEach(({ properties, sequence }) => {
    const robot = new Robot(properties, instructions, surface);

    sequence.forEach(robot.instruct.bind(robot));
    console.log(robot.status());
  });
});
