import deleteConsumerGroup from "./consumerGroup/deleteConsumerGroup.mjs";

export default {
    command: ['consumer-group <command>', 'cm'],
    desc: 'Manage consumer groups',
    builder: function (yargs) {
        return yargs.command([deleteConsumerGroup]).demandCommand(1);
    },
    handler: function () {},
};
