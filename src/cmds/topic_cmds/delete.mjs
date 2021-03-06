import kafka from '../../kafka/kafka.mjs';

export default {
    command: 'delete <name> [names..]',
    desc: 'Delete topics',
    builder: {},
    handler: async function (argv) {
        let topics = []
            .concat(argv.name)
            .concat(argv.names)
            .filter((t) => t);

        let ignored;
        if (topics.length > 1 && topics.find((t) => t.startsWith('_'))) {
            ignored = topics.filter((t) => t.startsWith('_'));
            topics = topics.filter((t) => !t.startsWith('_'));
        }

        for await (let topic of topics) {
            await kafka.deleteTopic(topic);
            console.log(`topic deleted: ${topic}`);
        }

        if (ignored) {
            ignored.forEach((t) => console.log(`ignored:\t${t}`));
            console.warn('\nWarning: system topics are ignored when deleting more than one topic');
        }
    },
};
