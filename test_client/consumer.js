const {Kafka} = require("kafkajs")

async function run() {
    const k = new Kafka({
        clientId: "js",
        brokers: ["localhost:9094"]
    })
    const consumer = k.consumer({groupId: "1",heartbeatInterval:1});
    await consumer.connect()
    await consumer.subscribe({topics: ["Users"]});
    consumer.on("consumer.fetch", event => {
        console.log("!!!!!!!!!", event)
    })
    await consumer.run({
        eachMessage: payload => {
            const key = payload.message.key.toLocaleString()
            const val = payload.message.value.toLocaleString();
            console.log(`Собсна: ${key} ${val}`)
        }
    })
}
run()