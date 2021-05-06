import fs from 'fs';
import Enumerable from "linq";
import BpmnModdel from 'bpmn-moddle';

const moddle = new BpmnModdel();

async function moddleBasic(flowElements, planeElement, filename) {

    let definitions = moddle.create("bpmn:Definitions");

    let process = moddle.create("bpmn:Process", {
        id: "process",
        isExecutable: false,
        flowElements: flowElements
    });

    let plane = moddle.create("bpmndi:BPMNPlane", {
        id: "plane",
        bpmnElement: process,
        planeElement: planeElement
    });

    let diagram = moddle.create("bpmndi:BPMNDiagram", {
        id: "diagram",
        plane: plane
    });

    definitions.get('rootElements').push(process);

    definitions.get('diagrams').push(diagram);

    const {
        xml: xmlString
    } = await moddle.toXML(definitions);

    fs.writeFileSync("./" + filename, xmlString);

    //console.log(xmlString);

} // moddleBasic

async function linqTest() {

    let json = fs.readFileSync("./startEventBpmn.json", "utf-8");

    let nodeArray = JSON.parse(json);

    console.log(nodeArray);

    let planeElement = await Enumerable.from(nodeArray)
        .select((node) => {

            if(node.shape.shape == "Event" && node.shape.event.event == "Start") {

                return moddle.create("bpmndi:BPMNShape", {
                    id: 'startShape',
                    bpmnElement: moddle.create("bpmn:StartEvent", {
                        id: 'startEvent'
                    }),
                    bounds: moddle.create("dc:Bounds", {
                        x: node.offsetX,
                        y: node.offsetY,
                        width: node.width,
                        height: node.height
                    })
                })

            }

        }).toArray();

    let flowElements = await Enumerable.from(nodeArray)
        .select((node) => {

            if(node.shape.shape == "Event" && node.shape.event.event == "Start") {

                return moddle.create("bpmn:StartEvent", {
                    id: "startEvent"
                });

            }

        }).toArray();

    moddleBasic(flowElements, planeElement, "startEvent.xml");

} // linqTest

linqTest();
