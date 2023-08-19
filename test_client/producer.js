const {Kafka} = require("kafkajs")

async function run() {
    const k = new Kafka({
        clientId: "js",
        brokers: ["localhost:9094"]
    })
    // const admin = k.admin()
    // await admin.connect()
    // console.log("Connected as admin!")
    // await admin.createTopics({
    //     topics: [
    //         {topic: "Users2", numPartitions: 2}
    //     ]
    // })
    // console.log("Topic created!")


    const producer = k.producer();
    // console.log(producer)
    await producer.connect()
    setInterval(async ()=> {
        const recordMetadata = await producer.send({
            topic: "Users",
            messages: [
                {key: "MSG", value: new Date().getTime().toString()},
            ]
        });
        recordMetadata.forEach(x => console.log(x))
    }, 100)
    // await producer.disconnect()
}
run()