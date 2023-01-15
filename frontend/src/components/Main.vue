<template :showLoadingWindow="focused_node_title">
    <div id="space"></div>
    <table class="table is-bordered mt-2 is-fullwidth">
        <thead>
            <tr>
                <th id="stencil" ref="stencil_ref"></th>
                <th id="model" ref="model_ref"></th>
            </tr>
            <button v-if="!waiting_for_response" @click="requestVulnerabilitiesFromServer" id="btn"
                class="button is-success mt-5">
                ►
            </button>
            <button v-if="waiting_for_response" id="btn" class="button is-success mt-5" disabled>processing...</button>
        </thead>
    </table>
    System threat list:
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
        <thead>
            <tr id="response-title">
                <th class="has-text-centered" style="width: 200px;">Component</th>
                <th class="has-text-centered"></th>
                <th class="has-text-centered" style="width: 15px;">Vulnerabilities</th>
                <th style="width: 15px;" class="has-text-centered">Severity</th>
            </tr>
        </thead>
        <template v-for="row in response">
            <tr @click="toggle(row.id)" :class="{ opened: opened.includes(row.id) }">
                <td>{{ row.name }}</td>
                <td></td>
                <td>{{ total_vulnerabilities }}</td>
                <td id="severity-bg-color" style="width: 143px;">{{ severity }}</td>
            </tr>
            <!-- nested loop -->
            <tr v-if="opened.includes(row.id)">
                <td colspan="4">
                    <table class="table is-striped is-bordered mt-2 is-fullwidth">
                        <template v-for="(rowz, index) in components" :key="rowz.id">
                            <tr @click="toggle2(rowz.id)" :class="{ opened2: opened2.includes(rowz.id) }">
                                <td style="width: 150px;">{{ rowz.component }} </td>
                                <td></td>
                                <td style="width: 130px;">{{ rowz.vulnerabilities }}</td>
                                <td id="severity-bg-color" style="width: 130px;">{{ rowz.severity }}</td>
                            </tr>
                            <!-- nested loop -->
                            <tr>
                                <td colspan="4">
                                    <table class="table is-striped is-bordered mt-2 is-fullwidth">

                                        <template v-for="rowzz in components[index].products">
                                            <tr @click="toggle3(rowzz.id)"
                                                :class="{ opened3: opened3.includes(rowzz.id) }">
                                                <td style="width: 900px;">{{ rowzz.title }}</td>
                                                <td style="width: 140px;">{{ rowzz.vulnerabilities.length }}</td>
                                                <td id="severity-bg-color" style="width: 120px;">{{ rowzz.severity }}
                                                </td>
                                            </tr>
                                        </template>
                                    </table>
                                </td>
                            </tr>
                        </template>
                    </table>
                </td>
            </tr>
        </template>
    </table>
    <!-- display menu when right clicking nodes -->
    <div v-if="displaySearchWindow" id="menu_search">
        <SearchCVE :node_title="focused_node_title" @close="toggleSearchWindow" @data="add_child_nodes_to_graph" />
    </div>
    <div v-if="displayMenu" id="menu_rcm" ref="menu_ref" style="left:99999px">
        <RightClickMenu :rightClickMenuTitle="focused_node_title" @openSearchWindow="toggleSearchWindow"
            @openNodeWindow="toggleNodeWindow" @openLoadModelsWindow="toggleLoadModelWindow"/>
    </div>
    <div v-if="displayNodeWindow" id="menu_node">
        <DisplayNode :title="focused_node_title" :nodes="focused_node_children" @close="toggleNodeWindow" />
    </div>
    <div v-if="displayLoadModelsWindow" id="menu_load">
        <DisplayLoadModels :title="focused_node_title" :nodes="focused_node_children" @close="toggleLoadWindow"
            @model="loadModel"/>
    </div>
    
</template>

<script>
import { assertExpressionStatement, throwStatement } from '@babel/types';
import { Addon, Graph, Node, Shape, Edge, Cell } from '@antv/x6';
import CVE from '@/components/SearchCVE.vue'
import { useMouse } from '@vueuse/core'

import Stencil from './Stencil.vue';
import GraphComponent from './Graph.vue';
import axios from "axios";
import url from "../config/settings.js";
import RightClickMenu from './RightClickMenu.vue';
import SearchCVE from '@/components/SearchCVE.vue';
import DisplayNode from '@/components/DisplayNode.vue';
import DisplayLoadModels from '@/components/LoadModels.vue';

let myList = ['bob'];

export default {
    components: {
        Stencil,
        GraphComponent,
        CVE,
        RightClickMenu,
        SearchCVE,
        DisplayNode,
        DisplayLoadModels
    },
    props: {
        rightClickMenuTitle: String
    },
    data() {
        return {
            items: [], // for storing stencil components
            graphJson: [],
            // nodes: [],
            //  edges: [],
            graf: myList,
            disabled: "disabled",

            // booleans that determines if a window is open or closed
            displayMenu: true,
            displaySearchWindow: false,
            displayNodeWindow: false,
            displayLoadModelsWindow: false,

            focused_node_object: [],
            focused_node_title: "",
            focused_node_id: "",
            focused_node_children: [],
            childComponentName: "",
            childComponentDescr: "",
            x: 0,
            y: 0,
            mousePosX: 0,
            mousePosY: 0,
            graph: [],
            waiting_for_response: false,
            // response from server:
            total_vulnerabilities: 0,
            components: [],
            products: [],
            severity: "",
            response_input_products: [],
            opened: [],
            opened2: [],
            opened3: [],
            response: [{
                "id": 1,
                "name": "inputs",
                "components": []
            }]
        };
    },
    async created() {
        await this.setup();
        this.response_to_display();




    },
    methods: {
        loadModel(value) {
            let json = value[0].model;
            this.graph.fromJSON(json);
        },

        determine_system_severity(system_severities) {
            if (system_severities.includes("HIGH")) {
                this.severity = "HIGH"
            } else if (!system_severities.includes("HIGH") && system_severities.includes("MEDIUM")) {
                this.severity = "MEDIUM";
            } else {
                this.severity = "LOW";
            }
        },

        response_to_display() {
            let system_severities = [];
            for (const component of this.response[0].components) {

                this.components.push(component);
                for (const product of component.products) {
                    const name = product.name;
                    const title = product.title;
                    const vulnerabilities = product.vulnerabilities;
                    this.products.push(product);
                    this.total_vulnerabilities += vulnerabilities.length;

                    for (const vulnerability of vulnerabilities) {
                        const configurations = vulnerability.configurations;
                        const description = vulnerability.description;
                        const metrics = vulnerability.metrics;
                        const references = vulnerability.references;
                        const weaknesses = vulnerability.weaknesses;
                        const base_severity = metrics.cvssMetricV2[0].baseSeverity;
                        system_severities.push(base_severity);
                    }
                }
            }
            console.log("components");
            console.log(this.components);
            console.log("products");
            console.log(this.products);
            this.determine_system_severity(system_severities)

        },

        toggle3(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened3.splice(index, 1)
            } else {
                this.opened3.push(id)
            }
        },

        toggle2(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened2.splice(index, 1)
            } else {
                this.opened2.push(id)
            }
        },

        toggle(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1)
            } else {
                this.opened.push(id)
            }
        },

        get_child_nodes() {
            this.graph.model.collection.cells.forEach((node) => {
                if (node.id == this.focused_node_id) {
                    this.focused_node_children = node.getAttrByPath('children');
                }
            });
        },

        add_child_nodes_to_graph(value) {
            this.displaySearchWindow = false;
            this.graph.model.collection.cells.forEach((node) => {
                if (node.id == this.focused_node_id) {
                    let finalList = [];
                    let children = node.getAttrByPath('children');
                    children.forEach((child) => {
                        finalList.push(child);
                    });

                    value.forEach((child) => {
                        finalList.push(child);
                    });
                    node.setAttrByPath('children', finalList);
                }
            });
        },
        /*
        graphToJson() {
  
           let nodes = [];
           let edges = [];
           this.graphJson.cells.forEach((cell) => {
              if (cell.shape == 'edge') {
                 let edge = {
                    id: cell.id,
                    source: cell.source.cell,
                    target: cell.target.cell
                 };
                 edges.push(edge);
              } else {
                 let node = {
                    id: cell.id,
                    text: cell.attrs.text.text
                 };
                 nodes.push(node);
              }
           });
           this.nodes = nodes;
            this.edges = edges;
         
         },
           */

        setCoordinates(x, y) {
            this.x = x;
            this.y = y;
        },

        toggleMenu() {
            this.showMenu = !this.displayMenu;
        },
        toggleLoadWindow() {
            this.displayLoadModelsWindow = !this.displayLoadModelsWindow;
        },

        toggleLoadModelWindow() {
            this.displayLoadModelsWindow = !this.displayLoadModelsWindow;
        },

        toggleNodeWindow() {
            if (this.displayNodeWindow == false) {
                this.get_child_nodes();
                this.displayNodeWindow = true;
            } else {
                this.displayNodeWindow = false;
            }
        },
        toggleSearchWindow() {
            this.displaySearchWindow = !this.displaySearchWindow;
        },

        async requestVulnerabilitiesFromServer() {

            console.log(this.graph.toJSON());

            //   this.graph.loadModel();


            this.waiting_for_response = true;
            try { // http://localhost:5003
                const response = await axios.post(url + "model", {
                    graph: this.graph,
                });

                //    console.log(this.graph);

                // clear all variables before new data is received
                this.opened = [];
                this.opened2 = [];
                this.components = [];
                this.response = [];
                this.total_vulnerabilities = 0;
                this.response = [response.data];
            } catch (err) {
                console.log(err);
            }
            this.response_to_display()
            setTimeout(() => {
                this.waiting_for_response = false;
            }, 2000);
        },

        async setup() {
            try {
                const response = await axios.get(url + "components");
                this.items = response.data;
                myList = response.data;

                let graph = new Graph({
                    container: this.$refs.model_ref,
                    grid: true,
                    height: 600,
                    resizing: false,
                    connecting: {
                        allowBlank: false,
                        snap: {
                            radius: 500,
                        },
                        validateConnection: function (args) {
                            if (args.sourcePort == "input") {
                                return args.targetCell.id == "inpt";
                            }
                            if (args.sourcePort == "output") {
                                return args.targetCell.id == "outpt";
                            }
                        }
                    }
                });



                const stencil = new Addon.Stencil({
                    title: 'Components',
                    target: graph,
                    stencilGraphHeight: 180,
                    stencilGraphWidth: 280,
                    search(cell, keyword) {
                        return cell.shape.indexOf(keyword) !== -1
                    },
                    placeholder: 'Search all',
                    notFoundText: 'Not Found',
                    collapsable: true,
                    groups: [
                        {
                            name: 'group1',
                            title: 'INPUT',
                        },
                        {
                            name: 'group2',
                            title: 'OUTPUT',
                        },
                        {
                            name: 'group3',
                            title: 'STATE',
                            collapsed: true
                        },
                        {
                            name: 'group4',
                            title: 'CONTROL',
                            collapsed: true
                        },
                    ],
                });

                const inputComponents = [];
                const outputComponents = [];

                this.items.forEach((item) => {
                    if (item.component_category == "input") {
                        inputComponents.push(item);
                    } else if (item.component_category == "output") {
                        outputComponents.push(item);
                    }
                });

                const inputs = inputComponents.map(item => new Shape.Rect({
                    shape: 'rect',
                    label: item.component_name,
                    id: item.component_name,
                    type: "sub_node",
                    x: 5,
                    y: 50,
                    width: 100,
                    height: 25,
                    ports: {
                        groups: {
                            in: {
                                position: { name: "right" },
                                attrs: {

                                    circle: {
                                        r: 6,
                                        magnet: true
                                    }
                                }
                            },
                        },
                        items: [
                            {
                                id: 'input',
                                group: 'in'
                            }
                        ]
                    },
                    attrs: {
                        children: [
                            {}
                        ],
                        body: {
                            strokeWidth: 1,
                            fill: '#83E397',
                        }
                    }
                }));

                const outputs = outputComponents.map(item => new Shape.Rect({
                    shape: 'rect',
                    label: item.component_name,
                    id: item.component_name,
                    type: "sub_node",
                    x: 5,
                    y: 50,
                    width: 100,
                    height: 25,
                    children: [
                    ],
                    ports: {
                        groups: {
                            in: {
                                position: { name: "left" },
                                attrs: {

                                    circle: {
                                        r: 6,
                                        magnet: true
                                    }
                                }
                            },
                        },
                        items: [
                            {
                                id: 'output',
                                group: 'in'
                            }
                        ]
                    },
                    attrs: {
                        children: [
                            {}
                        ],
                        body: {
                            strokeWidth: 1,
                            fill: '#93CEFE',
                        }
                    }
                }));

                stencil.load(inputs, 'group1');
                stencil.load(outputs, 'group2');
                document.getElementById("stencil").appendChild(stencil.container);

                const input = graph.addNode({
                    shape: 'rect',
                    label: 'INPUT',
                    id: 'inpt',
                    type: "main_node",
                    nodeMovable: false,
                    /*
                    ports: {
                       groups: {
                          group1: {
                             markup: {
                                tagName: 'circle',
                                selector: 'circle',
                                attrs: {
                                   r: 6,
                                   fill: '#FFF',
                                   stroke: '#000'
                                }
                             },
                             attrs: {},
                             zIndex: 1,
                             position: {
                                name: 'left',
                                args: {},
                             },
                          },
                       },
                       items: [
                          { id: 'port1', group: 'group1' },
                          { id: 'port2', group: 'group1' },
                          { id: 'port3', group: 'group1'}
                       ],
                    },
                    */

                    x: 145,
                    y: 140,
                    width: 70,
                    height: 200,
                    attrs: {
                        /*
                        tools: [
                           {
                              name: 'contextmenu',
                              args: {
                                 menu,
                              }
                           }
                        ],
                        */
                        body: {
                            fill: '#83E397',
                        }
                    }
                });

                const output = graph.addNode({
                    shape: 'rect',
                    label: 'OUTPUT',
                    id: 'outpt',
                    type: "main_node",
                    x: 415,
                    y: 140,
                    width: 70,
                    height: 200,
                    attrs: {
                        label: {
                            direction: 'up'
                        },
                        body: {
                            fill: '#93CEFE',
                        }
                    }
                });

                const control = graph.addNode({
                    shape: 'rect',
                    label: 'CONTROL',
                    id: 'ctrl',
                    type: "main_node",
                    x: 215,
                    y: 85,
                    width: 200,
                    height: 55,
                    attrs: {
                        body: {
                            fill: '#FF9494',
                        }
                    }
                });

                const state = graph.addNode({
                    shape: 'rect',
                    label: 'STATE',
                    id: 'state',
                    type: "main_node",
                    x: 215,
                    y: 340,
                    width: 200,
                    height: 55,
                    attrs: {
                        body: {
                            fill: '#ECD333',
                        }
                    }
                });

                const system = graph.addNode({
                    shape: 'rect',
                    label: 'SYSTEM',
                    id: 'system',
                    type: "main_node",
                    x: 215,
                    y: 140,
                    width: 200,
                    height: 200,
                    meta: {
                        id: "bobby"
                    },
                    attrs: {
                        body: {
                            fill: '#D7D7D7',
                        },
                        children: [
                        ]
                    }
                });

                this.graphJson = graph.toJSON();

                graph.on("node:mousedown", ({ node }) => {
                    let menuref = this.$refs.menu_ref;
                    menuref.style["left"] = "99999px";
                    menuref.style["top"] = "999999px";
                });

                graph.on("node:contextmenu", ({ node }) => {
                    let menuref = this.$refs.menu_ref;
                    this.focused_node_title = node.store.data.attrs.text.text;
                    this.focused_node_id = node.id;

                    menuref.style["left"] = this.mousePosX + "px";
                    menuref.style["top"] = this.mousePosY + "px";
                });

                graph.on("node:mouseenter", ({ node }) => {
                    if (
                        node.id == "ctrl" ||
                        node.id == "system" ||
                        node.id == "inpt" ||
                        node.id == "outpt" ||
                        node.id == "state") {
                        // we dont want user to be able to delete these nodes
                    } else {
                        node.addTools({
                            name: 'button-remove',
                            args: {
                                offset: { x: 10, y: 10 }
                            }
                        })
                    }
                });

                graph.on("node:mouseleave", ({ node }) => {
                    node.removeTools();
                });

                graph.on("edge:mouseenter", ({ edge }) => {
                    edge.addTools({
                        name: "button-remove"
                    })
                });

                graph.on("edge:mouseleave", ({ edge }) => {
                    edge.removeTools();
                });

                // listen for changes on the graph and create json object of it
                graph.on("cell:changed", ({ cell }) => {
                    //   this.graphJson = graph.parseJSON(graph.toJSON());
                    this.graphJson = graph.toJSON();
                });

                graph.on("edge:removed", ({ edge }) => {
                    //  this.graphJson = graph.parseJSON(graph.toJSON());
                });

                graph.on("node:removed", ({ node }) => {
                    //  this.graphJson = graph.parseJSON(graph.toJSON());
                });
                graph.center;
                this.graph = graph;
            } catch (err) {
                console.log(err);
            }
        },
    },

    mounted() {
        // used for positioning the right-click menu 
        document.addEventListener("mousemove", (event) => {
            this.mousePosX = event.clientX;
            this.mousePosY = event.clientY;
        });
    },
};

</script>
<style>
#expandable-table {
    width: 100%;
    border: 1px solid #FF9494;
}

.opened {
    background-color: #DDF6FF;
}

#space {
    height: 3.3vh;
}

#response-title {
    background-color: #83E397;
}

#bib {
    height: 3.3vh;
}

#severity-bg-color {
    background-color: #FF9494;
}

#threat-list-title {
    text-align: left;
    padding-left: 5px;
    font-size: 20px;
    font-weight: bold;
}

#canvas-title {
    font-size: 20px;
    z-index: 99;
}

#btn {
    position: absolute;

    right: 15px;
    top: 40px;
    z-index: 10;
}

#model {
    background-color: white;
    width: 500px;
    height: 50vh;
    margin: 2px 0;
    position: relative;
    z-index: 1;
}

#stencil {
    width: 350px;
    height: 50vh;
    margin: 2px 0;
    position: relative;
    z-index: 1;

}

#response {
    background-color: white;
    width: 40vh;
    height: 50vh;
    margin: 2px 0;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    position: relative;
    z-index: 1;
}

#inumeration {
    background-color: white;
    width: 120vh;
    height: 15vh;
    margin: 2px 0;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    position: relative;
    z-index: 1;
}
</style>