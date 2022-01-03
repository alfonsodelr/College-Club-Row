function terminateServer(process) {
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');
        server.close(() => {
            console.log('Http server closed.');
            // boolean means [force], see in mongoose doc
            mongoose.connection.close(false, () => {
                console.log('MongoDb connection closed.');
                process.exit(0);
            });
        });
    });
}

module.exports = terminateServer