<template>
	<div id="space"></div>
	<table class="table is-bordered mt-2 is-fullwidth">
		<thead>
			<tr>
				<th id="stencil" ref="stencil_ref"></th>
				<th id="model" ref="model_ref"></th>
			</tr>
			<button v-if="!waiting_for_response" @click="requestVulnerabilitiesFromServer" id="btn"
				class="button is-success mt-5"> ► </button>
			<button v-if="waiting_for_response" id="btn" class="button is-success mt-5" disabled>processing...</button>
			<button id="btn-demo" class="button is-info mt-5" @click="toggleLoadModelWindow">Load Demo</button>
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

			<!-- outer nested loop -->
			<tr v-if="opened.includes(row.id)">
				<td colspan="4">
					<table class="table is-striped is-bordered mt-2 is-fullwidth">
						<template v-for="(row_outer_nested, index) in components" :key="row_outer_nested.id">
							<tr @click="toggle2(row_outer_nested.id)"
								:class="{ opened2: opened2.includes(row_outer_nested.id) }">
								<td style="width: 150px;">{{ row_outer_nested.component }} </td>
								<td></td>
								<td style="width: 130px;">{{ row_outer_nested.vulnerabilities }}</td>
								<td id="severity-bg-color" style="width: 130px;">{{ row_outer_nested.severity }}</td>
							</tr>

							<!-- inner nested loop -->
							<tr>
								<td colspan="4">
									<table class="table is-striped is-bordered mt-2 is-fullwidth">
										<template v-for="row_inner_nested in components[index].products">
											<tr @click="openVulnerabilities(row_inner_nested.title, row_inner_nested.vulnerabilities)"
												:class="{ opened3: opened3.includes(row_inner_nested.id) }">
												<td style="width: 900px;">{{ row_inner_nested.title }}</td>
												<td style="width: 140px;">{{ row_inner_nested.vulnerabilities.length }}
												</td>
												<td id="severity-bg-color" style="width: 120px;">{{
													row_inner_nested.severity
												}}
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

	<!-- 
        SearchCVE: displays a search window.
        node_title: argument passed to SearchCVE
        @close: return signal, calls function: toggleSearchWindow
        @data: return signal that also has a return value, calls function: add_child_nodes_to_graph
    -->
	<div v-if="displaySearchWindow" id="menu_search">
		<SearchCVE :node_title="focused_node_title" @close="toggleSearchWindow" @data="add_child_nodes_to_graph" />
	</div>

	<!-- display menu when right clicking nodes -->
	<div v-if="displayMenu" id="menu_rcm" ref="menu_ref" style="left:99999px">
		<RightClickMenu :rightClickMenuTitle="focused_node_title" @openSearchWindow="toggleSearchWindow"
			@openNodeWindow="toggleNodeWindow" @openLoadModelsWindow="toggleLoadModelWindow" />
	</div>

	<!-- displays a window showing the children of a component -->
	<div v-if="displayNodeWindow" id="menu_node">
		<DisplayNode :title="focused_node_title" :nodes="focused_node_children" @close="toggleNodeWindow" />
	</div>

	<!-- displays a window showing demo models that can be loaded into the graph -->
	<div v-if="displayLoadModelsWindow" id="menu_load">
		<DisplayLoadModels :title="focused_node_title" @close="toggleLoadWindow" @model="loadModel" />

		<!-- displays a window showing the vulnerabilities of a component -->
	</div>
	<div v-if="displayVulnerabilitiesWindow" id="menu_vuln">
		<DisplayVulnerabilitiesWindow :title="focused_product" :nodes="focused_vulnerabilities"
			@close="toggleVulnerabilityWindow" @model="loadModel" />
	</div>

</template>

<script>
import { assertExpressionStatement, throwStatement } from '@babel/types';
import { Addon, Graph, Node, Shape, Edge, Cell } from '@antv/x6';
import CVE from '@/components/SearchCVE.vue'
import axios from "axios";
import url from "../config/settings.js";
import RightClickMenu from './RightClickMenu.vue';
import SearchCVE from '@/components/SearchCVE.vue';
import DisplayNode from '@/components/DisplayNode.vue';
import DisplayLoadModels from '@/components/LoadModels.vue';
import DisplayVulnerabilitiesWindow from '@/components/DisplayVulnerabilities.vue';

export default {
	components: {
		CVE,
		RightClickMenu,
		SearchCVE,
		DisplayNode,
		DisplayLoadModels,
		DisplayVulnerabilitiesWindow
	},

	props: {
		rightClickMenuTitle: String
	},

	data() {
		return {
			graph: [], // for storing the graph
			items: [], // for storing stencil components loaded from database

			// booleans that determines if a window is open or closed
			displayMenu: true,
			displaySearchWindow: false,
			displayNodeWindow: false,
			displayLoadModelsWindow: false,
			displayVulnerabilitiesWindow: false,

			// clicked product from vulnerabilities table
			focused_product: "",
			focused_vulnerabilities: [],

			focused_node_object: [],
			focused_node_title: "",
			focused_node_id: "",
			focused_node_children: [],
			childComponentName: "",
			childComponentDescr: "",

			// stores mouse position for placing right click menu
			mousePosX: 0,
			mousePosY: 0,

			// response from server:
			total_vulnerabilities: 0,
			waiting_for_response: false, // switches 'run' / 'processing' on button
			components: [],
			products: [],
			severity: "",
			response_input_products: [],
			opened: [],  // 
			opened2: [], //
			opened3: [], //
			response: [{
				"id": 1,
				"name": "inputs",
				"components": []
			}]
		};
	},

	mounted() {
		// used for positioning the right-click menu 
		document.addEventListener("mousemove", (event) => {
			this.mousePosX = event.clientX;
			this.mousePosY = event.clientY;
		});
	},

	async created() {
		// the components that is later loaded into the stencil
		await this.get_components_from_database();
		this.create_graph();
		this.create_stencil();

		// input, output, control, state & system
		this.create_base_model();
		this.setup_graph_listeners();

		// displays response data (the vulnerabilities of the system)
		this.response_to_display();
	},

	methods: {
		openVulnerabilities(title, vulnerabilities) {
			this.focused_product = title;
			this.focused_vulnerabilities = vulnerabilities;
			this.displayVulnerabilitiesWindow = true;
		},

		// loads a model into the graph
		loadModel(value) {
			let json = value[0].model;
			this.graph.fromJSON(json);
		},

		/*
				helper-function that takes in a list of severities and
				returns the most severe from the list:
				order: 'HIGH' > 'MEDIUM' > 'LOW'
		*/
		determine_system_severity(system_severities) {
			if (system_severities.includes("HIGH")) {
				this.severity = "HIGH"
			} else if (!system_severities.includes("HIGH") && system_severities.includes("MEDIUM")) {
				this.severity = "MEDIUM";
			} else {
				this.severity = "LOW";
			}
		},

		// displays response data (the vulnerabilities of the system)
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
			this.determine_system_severity(system_severities)
		},

		toggleMenu() {
			this.showMenu = !this.displayMenu;
		},
		toggleLoadWindow() {
			this.displayLoadModelsWindow = !this.displayLoadModelsWindow;
		},
		toggleVulnerabilityWindow() {
			this.displayVulnerabilitiesWindow = !this.displayVulnerabilitiesWindow;
		},

		toggleLoadModelWindow() {
			this.displayLoadModelsWindow = !this.displayLoadModelsWindow;
		},

		toggleSearchWindow() {
			this.displaySearchWindow = !this.displaySearchWindow;
		},

		toggleNodeWindow() {
			if (this.displayNodeWindow == false) {
				this.get_child_nodes();
				this.displayNodeWindow = true;
			} else {
				this.displayNodeWindow = false;
			}
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

		// when model is builed and run-button is pressed, 
		// this functions requests the vulnerability model from the server
		async requestVulnerabilitiesFromServer() {
			this.waiting_for_response = true;
			try {
				const response = await axios.post(url + "model", {
					graph: this.graph,
				});

				// clear all variables before new data is received
				this.opened = [];
				this.opened2 = [];
				this.components = [];
				this.response = [];
				this.total_vulnerabilities = 0;
				this.response = [response.data]; console.log(response.data);
			} catch (err) {
				console.log(err);
			}
			// display the results in the table at the bottom of the webpage
			this.response_to_display()
			setTimeout(() => {
				this.waiting_for_response = false;
			}, 2000);
		},

		async get_components_from_database() {
			try {
				const response = await axios.get(url + "components");
				this.items = response.data;
			} catch (err) {
				console.log(err);
			}
		},

		// creates the graph object
		create_graph() {
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
			this.graph = graph;
		},

		// creates the stencil object
		create_stencil() {
			const stencil = new Addon.Stencil({
				title: 'Components',
				target: this.graph,
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
		},

		create_base_model() {
			const input = this.graph.addNode({
				shape: 'rect',
				label: 'INPUT',
				id: 'inpt',
				type: "main_node",
				nodeMovable: false,
				x: 145,
				y: 140,
				width: 70,
				height: 200,
				attrs: {
					body: {
						fill: '#83E397',
					}
				}
			});

			const output = this.graph.addNode({
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

			const control = this.graph.addNode({
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

			const state = this.graph.addNode({
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

			const system = this.graph.addNode({
				shape: 'rect',
				label: 'SYSTEM',
				id: 'system',
				type: "main_node",
				x: 215,
				y: 140,
				width: 200,
				height: 200,
				zIndex: -1,
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
		},

		setup_graph_listeners() {

			// places the right-click menu outside of users view
			// hacky solution because disabling it yielded some errors
			this.graph.on("node:mousedown", ({ node }) => {
				let menuref = this.$refs.menu_ref;
				menuref.style["left"] = "99999px";
				menuref.style["top"] = "999999px";
			});

			// right-clicking components in the graph opens the right-click menu at mouse position
			this.graph.on("node:contextmenu", ({ node }) => {
				let menuref = this.$refs.menu_ref;
				this.focused_node_title = node.store.data.attrs.text.text;
				this.focused_node_id = node.id;

				// disables rightclick on the five main components
				if (
					node.id == "state" ||
					node.id == "inpt" ||
					node.id == "ctrl" ||
					node.id == "output" ||
					node.id == "system") {
				} else {
					menuref.style["left"] = this.mousePosX + "px";
					menuref.style["top"] = this.mousePosY + "px";
				}
			});

			// when mouse hovers a component a delete icon appears
			this.graph.on("node:mouseenter", ({ node }) => {
				if (
					node.id == "ctrl" ||
					node.id == "system" ||
					node.id == "inpt" ||
					node.id == "outpt" ||
					node.id == "state") {
					// we dont want user to be able to delete the main components
				} else {
					node.addTools({
						name: 'button-remove',
						args: {
							offset: { x: 10, y: 10 }
						}
					})
				}
			});

			// when mouse hovers an edge between components, a delete icon appears
			this.graph.on("edge:mouseenter", ({ edge }) => {
				edge.addTools({
					name: "button-remove"
				})
			});

			// removes delete icon when mouse is no longer hovering the component
			this.graph.on("node:mouseleave", ({ node }) => {
				node.removeTools();
			});

			this.graph.on("edge:mouseleave", ({ edge }) => {
				edge.removeTools();
			});
		},
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

	right: 140px;
	top: 40px;
	z-index: 10;
}

#btn-demo {
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