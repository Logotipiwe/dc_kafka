const {Kafka} = require("kafkajs")

async function run() {
    try {
        const k = new Kafka({
            clientId: "js",
            brokers: ["localhost:9092"]
        })
        const admin = k.admin()
        await admin.connect()
        console.log("Connected as admin!")
        await admin.createTopics({
            topics: [
                {topic: "Users", numPartitions: 2}
            ]
        })
        console.log("Topic created!")
        await admin.disconnect()
    } catch (e) {
        console.error(e)
    }
}

run()