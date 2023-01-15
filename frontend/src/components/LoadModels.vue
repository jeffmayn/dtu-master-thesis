<template>
   <div id="menu_form">
      <div id="node-title">Demo Models</div>
      <div id="response-frame">
         <table class="table is-striped is-bordered mt-2 is-fullwidth">
            <thead>
               <tr id="response-title">

                  <th class="">Models:</th>
                  <th class="has-text-centered"></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(model, index) in models">

                  <td>
                     {{ model.model_name }}
                  </td>
                  <td style="width: 20px;">
                     <a class="button is-danger is-small" @click="load()">Load</a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <br>
      <button @click="closeWindow" class="button is-danger is-normal">Close</button>
   </div>
</template>
<script>
import { toInteger } from "@antv/x6/lib/util/number/number";
import axios from "axios";
import url from "../config/settings.js";

export default {
   mounted() {
   },
   data() {
      return {
         items: [],
         models:
            [
               {
                  "model_name": "Simple model 1",
                  "model" : {
    "cells": [
        {
            "position": {
                "x": 145,
                "y": 140
            },
            "size": {
                "width": 70,
                "height": 200
            },
            "attrs": {
                "text": {
                    "text": "INPUT"
                },
                "body": {
                    "fill": "#83E397"
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "inpt",
            "type": "main_node",
            "nodeMovable": false,
            "zIndex": 1
        },
        {
            "position": {
                "x": 415,
                "y": 140
            },
            "size": {
                "width": 70,
                "height": 200
            },
            "attrs": {
                "text": {
                    "text": "OUTPUT"
                },
                "body": {
                    "fill": "#93CEFE"
                },
                "label": {
                    "direction": "up"
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "outpt",
            "type": "main_node",
            "zIndex": 2
        },
        {
            "position": {
                "x": 215,
                "y": 85
            },
            "size": {
                "width": 200,
                "height": 55
            },
            "attrs": {
                "text": {
                    "text": "CONTROL"
                },
                "body": {
                    "fill": "#FF9494"
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "ctrl",
            "type": "main_node",
            "zIndex": 3
        },
        {
            "position": {
                "x": 215,
                "y": 340
            },
            "size": {
                "width": 200,
                "height": 55
            },
            "attrs": {
                "text": {
                    "text": "STATE"
                },
                "body": {
                    "fill": "#ECD333"
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "state",
            "type": "main_node",
            "zIndex": 4
        },
        {
            "position": {
                "x": 215,
                "y": 140
            },
            "size": {
                "width": 200,
                "height": 200
            },
            "attrs": {
                "text": {
                    "text": "SYSTEM"
                },
                "body": {
                    "fill": "#D7D7D7"
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "system",
            "type": "main_node",
            "meta": {
                "id": "bobby"
            },
            "zIndex": 5
        },
        {
            "position": {
                "x": 10,
                "y": 40
            },
            "size": {
                "width": 100,
                "height": 25
            },
            "attrs": {
                "text": {
                    "text": "Keyboard"
                },
                "body": {
                    "strokeWidth": 1,
                    "fill": "#83E397"
                },
                "children": {
                    "1": {
                        "title": "Microsoft Windows 10 - Gold X86",
                        "name": "cpe:2.3:o:microsoft:windows_10:-:gold:*:*:*:*:x86:*"
                    }
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "85140e18-cab0-45da-8704-5dfac87af692",
            "type": "sub_node",
            "ports": {
                "groups": {
                    "in": {
                        "position": {
                            "name": "right"
                        },
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true
                            }
                        }
                    }
                },
                "items": [
                    {
                        "id": "input",
                        "group": "in"
                    }
                ]
            },
            "zIndex": 6
        },
        {
            "shape": "edge",
            "id": "08248b53-fc3d-4689-8f33-3bb0ac02680c",
            "source": {
                "cell": "85140e18-cab0-45da-8704-5dfac87af692",
                "port": "input"
            },
            "target": {
                "cell": "inpt"
            },
            "zIndex": 7
        },
        {
            "position": {
                "x": 30,
                "y": 480
            },
            "size": {
                "width": 100,
                "height": 25
            },
            "attrs": {
                "text": {
                    "text": "Network Cards"
                },
                "body": {
                    "strokeWidth": 1,
                    "fill": "#83E397"
                },
                "children": {
                    "1": {
                        "title": "AMD Ryzen Pro Firmware",
                        "name": "cpe:2.3:o:amd:ryzen_pro_firmware:-:*:*:*:*:*:*:*"
                    },
                    "2": {
                        "title": "AMD Ryzen Mobile Firmware",
                        "name": "cpe:2.3:o:amd:ryzen_mobile_firmware:-:*:*:*:*:*:*:*"
                    },
                    "3": {
                        "title": "AMD 16h Model Processor Firmware",
                        "name": "cpe:2.3:o:amd:16h_model_processor_firmware:-:*:*:*:*:*:*:*"
                    }
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "674509bd-b661-488e-968c-f0a7686b0557",
            "type": "sub_node",
            "ports": {
                "groups": {
                    "in": {
                        "position": {
                            "name": "right"
                        },
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true
                            }
                        }
                    }
                },
                "items": [
                    {
                        "id": "input",
                        "group": "in"
                    }
                ]
            },
            "zIndex": 8
        },
        {
            "shape": "edge",
            "id": "dc7638af-331a-44a1-8768-5189cdc0dda7",
            "source": {
                "cell": "674509bd-b661-488e-968c-f0a7686b0557",
                "port": "input"
            },
            "target": {
                "cell": "inpt"
            },
            "zIndex": 9
        },
        {
            "position": {
                "x": 0,
                "y": 240
            },
            "size": {
                "width": 100,
                "height": 25
            },
            "attrs": {
                "text": {
                    "text": "Router"
                },
                "body": {
                    "strokeWidth": 1,
                    "fill": "#83E397"
                },
                "children": {
                    "1": {
                        "title": "Intel SINIT Authenticated Code Module (ACM) i5_i7_DUAL_SINIT_18.BIN",
                        "name": "cpe:2.3:o:intel:sinit_authenticated_code_module:i5_i7_dual_sinit_18.bin:*:*:*:*:*:*:*"
                    },
                    "2": {
                        "title": "Intel SINIT Authenticated Code Module (ACM) GM45_GS45_PM45_SINIT_21.BIN",
                        "name": "cpe:2.3:o:intel:sinit_authenticated_code_module:gm45_gs45_pm45_sinit_21.bin:*:*:*:*:*:*:*"
                    }
                }
            },
            "visible": true,
            "shape": "rect",
            "id": "5c9f9d5b-7fc2-4486-81d6-687f3658131a",
            "type": "sub_node",
            "ports": {
                "groups": {
                    "in": {
                        "position": {
                            "name": "right"
                        },
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true
                            }
                        }
                    }
                },
                "items": [
                    {
                        "id": "input",
                        "group": "in"
                    }
                ]
            },
            "zIndex": 10
        },
        {
            "shape": "edge",
            "id": "8342fef0-6217-48a3-8ee6-5f3de8643aa7",
            "source": {
                "cell": "5c9f9d5b-7fc2-4486-81d6-687f3658131a",
                "port": "input"
            },
            "target": {
                "cell": "inpt"
            },
            "zIndex": 11
        }
    ]
}
                  
               }
  
            ]
      };
   },
   created() {
   },
   methods: {

      load() {
         this.$emit("model", this.models);
         this.closeWindow();
      },


      closeWindow() {
         this.$emit('close');
      },

   }
};
</script>
<style>
#pagination {
   margin-top: 5px;
   text-align: right;
   line-height: 32px;
}

#response-frame {
   background-color: white;
   width: 100%;
   height: 275px;
}

#menu_form {
   width: 600px;
   max-width: 600px;
   margin-left: 10px;
   margin-right: 10px;
   background-color: #E7E7E7;
   text-align: left;
   padding: 10px;
   border-radius: 10px;
   border-color: black;
   border-style: solid;
   border-width: 1px;
}

#menu_load {
   position: absolute;
   left: 340px;
   top: 80px;
   z-index: 12;
}

#node-title {
   text-align: center;
   font-size: 30px;
}
</style>