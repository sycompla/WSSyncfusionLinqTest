import fs from 'fs';

async function linqTest() {

    var json = fs.readFileSync("./startEventBpmn.json", "utf-8");

    var object = JSON.parse(json);

    console.log(object);

} // linqTest

linqTest();
