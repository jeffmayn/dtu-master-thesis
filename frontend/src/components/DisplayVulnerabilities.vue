<template>
   <div id="vuln_form">
      <div id="node-title">{{ title }}</div>
      <div id="response-frame">
         <table class="table is-striped is-bordered mt-2 is-fullwidth">
            <thead>
               <tr id="response-title">

                  <th class="">Vulnerabilities:</th>
                  <th class="has-text-centered"></th>
               </tr>
            </thead>
            <tbody>
              
               <tr v-for="(vulnerability, index) in nodes" id="expandable">

                  <td>
                     Description:<br>{{ vulnerability.description[0].value }}
                     <br><br>
                     Severity: {{ vulnerability.metrics.cvssMetricV2[0].baseSeverity }}
                     <br>
                     Exploitability Score: {{ vulnerability.metrics.cvssMetricV2[0].exploitabilityScore }}
                     <br>

                     
                     Attack Vector: <!-- {{ vulnerability.metrics.cvssMetricV30[0].cvssData.attackVector }}-->
                     <br>
                     Authentication: {{ vulnerability.metrics.cvssMetricV2[0].cvssData.authentication }}
                     <br>
                     Confidentiality Impact: <!--{{ vulnerability.metrics.cvssMetricV30[0].cvssData.confidentialityImpact }} -->
                     <br>
                     Integrity Impact:  <!--{{ vulnerability.metrics.cvssMetricV30[0].cvssData.integrityImpact }} -->
                     <br>
                     Availability Impact: <!-- {{ vulnerability.metrics.cvssMetricV30[0].cvssData.availabilityImpact }} -->
                   
               
                  </td>
         
               
                  <td style="width: 20px;">
                     <a class="button is-danger is-small" @click="load()">More</a>
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
   props: ['title', 'nodes'],
   mounted() {
   },
   data() {
      return {
         items: [],
         vulnerabilities: [
         {
        "description": [
            {
                "lang": "en",
                "value": "The microcode on AMD 16h 00h through 0Fh processors does not properly handle the interaction between locked instructions and write-combined memory types, which allows local users to cause a denial of service (system hang) via a crafted application, aka the errata 793 issue."
            },
            {
                "lang": "es",
                "value": "El microcode en AMD 16h 00h hasta procesadores 0Fh no maneja adecuadamente la interación entre instrucciones bloqueadas y tipos de memoria de escritura combinada, lo que permite a usuarios locales provocar una denegación de servicio (caída del sistema) a través de una aplicación manipulada, también conocido como problema 793."
            }
        ],
        "metrics": {
            "cvssMetricV2": [
                {
                    "source": "nvd@nist.gov",
                    "type": "Primary",
                    "cvssData": {
                        "version": "2.0",
                        "vectorString": "AV:L/AC:M/Au:N/C:N/I:N/A:C",
                        "accessVector": "LOCAL",
                        "accessComplexity": "MEDIUM",
                        "authentication": "NONE",
                        "confidentialityImpact": "NONE",
                        "integrityImpact": "NONE",
                        "availabilityImpact": "COMPLETE",
                        "baseScore": 4.7
                    },
                    "baseSeverity": "MEDIUM",
                    "exploitabilityScore": 3.4,
                    "impactScore": 6.9,
                    "acInsufInfo": false,
                    "obtainAllPrivilege": false,
                    "obtainUserPrivilege": false,
                    "obtainOtherPrivilege": false,
                    "userInteractionRequired": false
                }
            ]
        },
        "weaknesses": [
            {
                "source": "nvd@nist.gov",
                "type": "Primary",
                "description": [
                    {
                        "lang": "en",
                        "value": "CWE-399"
                    }
                ]
            }
        ],
        "configurations": [
            {
                "operator": "AND",
                "nodes": [
                    {
                        "operator": "OR",
                        "negate": false,
                        "cpeMatch": [
                            {
                                "vulnerable": true,
                                "criteria": "cpe:2.3:o:amd:16h_model_processor_firmware:-:*:*:*:*:*:*:*",
                                "matchCriteriaId": "4839D758-003A-449E-AFED-6D7D3F362E42"
                            }
                        ]
                    },
                    {
                        "operator": "OR",
                        "negate": false,
                        "cpeMatch": [
                            {
                                "vulnerable": true,
                                "criteria": "cpe:2.3:h:amd:16h_model_00h_processor:-:*:*:*:*:*:*:*",
                                "matchCriteriaId": "1CB23DE5-C2A1-464C-A41A-D4D4AE786697"
                            },
                            {
                                "vulnerable": true,
                                "criteria": "cpe:2.3:h:amd:16h_model_0fh_processor:-:*:*:*:*:*:*:*",
                                "matchCriteriaId": "1EDA8730-DE5C-4C94-B2BE-6A30D28E19FD"
                            }
                        ]
                    }
                ]
            }
        ],
        "references": [
            {
                "url": "http://lists.dragonflybsd.org/pipermail/kernel/2011-December/046594.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.fedoraproject.org/pipermail/package-announce/2013-December/123553.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.fedoraproject.org/pipermail/package-announce/2013-December/124195.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.fedoraproject.org/pipermail/package-announce/2013-December/124199.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.opensuse.org/opensuse-security-announce/2014-03/msg00010.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.opensuse.org/opensuse-security-announce/2014-03/msg00011.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.opensuse.org/opensuse-security-announce/2014-03/msg00015.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.opensuse.org/opensuse-security-announce/2014-03/msg00021.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.opensuse.org/opensuse-security-announce/2014-03/msg00026.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://lists.opensuse.org/opensuse-security-announce/2014-04/msg00000.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://openwall.com/lists/oss-security/2013/11/28/1",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://rhn.redhat.com/errata/RHSA-2014-0285.html",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://security.gentoo.org/glsa/glsa-201407-03.xml",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://support.amd.com/TechDocs/51810_16h_00h-0Fh_Rev_Guide.pdf",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://www.debian.org/security/2015/dsa-3128",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://www.openwall.com/lists/oss-security/2013/12/02/1",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://www.securityfocus.com/bid/63983",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://www.securitytracker.com/id/1029415",
                "source": "secalert@redhat.com"
            },
            {
                "url": "http://www.zdnet.com/blog/hardware/amd-owns-up-to-cpu-bug/18924",
                "source": "secalert@redhat.com"
            },
            {
                "url": "https://bugzilla.redhat.com/show_bug.cgi?id=1035823",
                "source": "secalert@redhat.com"
            },
            {
                "url": "https://exchange.xforce.ibmcloud.com/vulnerabilities/89335",
                "source": "secalert@redhat.com"
            }
        ]
    }
         ],
      };
   },
   created() {
   },
   methods: {

      load() {
         /*
         this.$emit("model", this.models);
         this.closeWindow();
         */
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
   overflow: auto;
   resize: vertical;
   background-color: white;
   width: 100%;
   height: 275px;
}

#vuln_form {
   width: 1000px;
   max-width: 10000px;
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

#menu_vuln {
   position: absolute;
   left: 50px;
   top: 80px;
   z-index: 12;
}

#node-title {
   text-align: center;
   font-size: 30px;
}
</style>