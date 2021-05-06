import fs from 'fs';
import * as Enumerable from "linq";

async function linqTest() {

    let json = fs.readFileSync("./startEventBpmn.json", "utf-8");

    let nodeArray = JSON.parse(json);

    console.log(nodeArray);

    Enumerable.from(nodeArray)
        .select(function (node) {

            console.log(node);

        })

} // linqTest

linqTest();
