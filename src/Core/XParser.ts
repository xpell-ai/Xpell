import XCommand from "./XCommand"

/**
 * Xpell Parser - Parse XML, HTML, Raw Text & Json to Xpell Command
 */

export class XParser {


    private static html2XMap = {
            elements:{
                div: "view",
                a: "link",
                b:"xhtml",
                h1: "xhtml",h2: "xhtml",h3: "xhtml",h4: "xhtml",h5: "xhtml",p: "xhtml",small:"xhtml",aside:"xhtml",span:"xhtml",
                table:"xhtml",th:"xhtml",td:"xhtml",tr:"xhtml",thead:"xhtml",tbody:"xhtml",
                ul:"xhtml",li:"xhtml",ol:"xhtml",
                canvas:"xhtml",
                img: "image",
            },
            attributes:{
                id:"_id"
            }
    }


    /**
     * Adds HTML-Xpell Mapping item
     * @param htmlElement HTML element to change from
     * @param xpellElement Xpell element to change to 
     */
    static addHtml2XpellMapItem(htmlElement:string,xpellElement:string) {
        XParser.html2XMap.elements[<"div">htmlElement] = xpellElement
    }


    /**
     * convert text command to Xpell json command
     * @param {string} txt 
     */
    static parse(txt:string,module?:string):XCommand {        
    
        const carr:string[] = txt.split(" ")
        let rv = new XCommand()
        if(module){

            rv["_module"]= module
            rv["_op"] =  carr[0]
        } else {
            rv["_module"]= carr[0]
            rv["_op"] =  carr[1]
        }
        rv["_params"] = {}
        
        if(carr.length>1){
            for (let i=2;i<carr.length;++i){
                const v = carr[i]
                const dl = v.indexOf(":")
                if(dl>-1){
                    const mc = v.split(":")
                    rv._params[mc[0]] = mc[1]
                }
                else
                {
                    rv._params[i-1] = carr[i]
                }
                
            }
        }
        
        return rv
    }


    static replaceSpacesInQuotes(inputString:string,replaceWith:string = '_%20_') {
        return inputString.replace(/(['"])(.*?)\1/g, (match, quote, content) => {
            // Replace spaces only within the content inside quotes
            return content.replace(/\s/g, replaceWith);
        });
    }


   

    static parseXpellCommand(command:string,module?:string) {
        // Split the command into its parts (assuming space-separated)
        command = XParser.replaceSpacesInQuotes(command);
        const parts = command.trim().split(' ');
    
        // Extract the module name (first part)

        const moduleName = (module) ? module : parts.shift();
    
        // Extract the operation (next part)
        const op = parts.shift();
    
        // Extract the parameters
        const params:any = {};
        let currentParam:any = null;
        let valueInProgress:any = null;
        parts.forEach(part => {
            if (valueInProgress) {
                // If a value is in progress, continue appending parts until the closing quote
                valueInProgress += ` ${part}`;
                if (part.endsWith(valueInProgress[0])) {
                    // If the part ends with the same quote character as the starting one, we've reached the end of the value
                    const value = valueInProgress.slice(1, -1); // Remove quotes
                    params[currentParam] = value.replace(/_%20_/g, ' ');
                    valueInProgress = null;
                }
            } else if (part.startsWith('"') || part.startsWith("'")) {
                // If the part starts with a quote, it's the beginning of a parameter value
                const quoteChar = part[0];
                valueInProgress = part;
                if (part.endsWith(quoteChar)) {
                    // If the part ends with the same quote character, it's a single-word value
                    const value = part.slice(1, -1); // Remove quotes
                    params[currentParam] = value.replace(/_%20_/g, ' ');
                    valueInProgress = null;
                }
            } else if (part.includes(':')) {
                // If the part contains ':', it's a param:value pair
                // const [param, ...valueParts]: any = part.split(':'); //->gives TS ERROR
                const parts: string[] = part.split(':');

                // Extract the first part as 'param' and the rest as 'valueParts'
                const param: string = parts[0];
                const valueParts: string[] = parts.slice(1);
                const value = valueParts.join(':'); // Reconstruct value with ':' if it exists
                params[param] = value.replace(/_%20_/g, ' ');
                if (value.includes(' ')) {
                    throw new Error(`Parameter value '${value}' with spaces must be enclosed in double or single quotes.`);
                }
            } else {
                // If it doesn't contain ':', it's part of the previous parameter value with space
                if (currentParam) {
                    params[currentParam] += ` ${part}`;
                }
            }
    
            if (!valueInProgress && !currentParam && !part.includes(':')) {
                // If we're not currently processing a value, and there's no current parameter, and the part doesn't contain ':',
                // then the part must be a new parameter name
                currentParam = part.replace(/_%20_/g, ' ');;
            }
        });
    
        return {
            _module: moduleName,
            _op: op,
            _params: params
        };
    }


    /**
     * Convert raw Xpell command (JSON) to XCommand
     * @param rawXpell JSON of Xpell command
     * @returns {XCommand}
     * @deprecated
     */
    // static parseXpell(rawXpell:string):XCommand {
    //     let code = rawXpell.trim();

    //     let args:Array<string> = XParser.parseArguments(code);

    //     let cmd = new XCommand();
    //     cmd._module = args[0];
    //     cmd._op = args[1];
    //     cmd._params = {};


    //     // start params from index 2
    //     for (let i = 2; i < args.length; i++) {
    //         let paramStr:string = args[i];
    //         let delimiterIdx = paramStr.indexOf(':');
    //         let quotesIdx = paramStr.indexOf('"');
    //         let finalDelimiter = (quotesIdx < delimiterIdx) ? -1 : delimiterIdx;

    //         let paramName = (finalDelimiter === -1) ? i.toString() : paramStr.substring(0, delimiterIdx);
    //         let paramValue = XParser.fixArgumentValue(paramStr.substring(finalDelimiter + 1));

    //         cmd._params[paramName] = paramValue
    //     }


    //     return cmd;
    // }


    /**
     * Parse CLI arguments
     * @param code arguments
     * @returns Array<string> 
     * @deprecated
     */
    // static parseArguments(code:string):Array<string>  {
    //     let args:Array<string> = [];

    //     while (code.length) {
    //         let argIndex = XParser.getNextArgumentIndex(code);
    //         if (argIndex == -1) {
    //             // error
    //             console.error('error: ' + code);
    //             break;
    //         }
    //         else {
    //             args.push(code.substring(0, argIndex));

    //             let oldCode = code; // this variable is used to check if loop in endless
    //             code = code.substring(argIndex).trim();

    //             if (code.length == oldCode.length) {
    //                 // error - while loop is in endless
    //                 console.error('error: while loop is in endless - leftovers: ' + code);
    //                 break;
    //             }

    //         }
    //     }
    //     return args;
    // }

    /**
     * Covent Xpell2 (XP2) Json to Xpell JSON
     * @param XP2Json Xpell 2 JSON
     * @returns 
     * @deprecated
     */
    static xpellify(XP2Json:{[k:string]:any}):any  {
        const tkeys = Object.keys(XP2Json)
        let outputXpell:any = {_type:tkeys[0]}
        outputXpell["_children"] = [] // child's xpells
        const firstObject = XP2Json[tkeys[0]]
        const foKeys = Object.keys(firstObject)
        
        foKeys.forEach(iKey => {
            if(iKey === "_attr") { Object.assign(outputXpell,firstObject[iKey]) }
            else {
                const lob:{[k:string]:any} ={}
                lob[iKey]=firstObject[iKey]
                
                outputXpell["_children"].push(XParser.xpellify(lob))
            }
        })
        return outputXpell
    }


    /**
     * Converts XML/HTML string to XCommand
     * @param xmlString XML string
     * @returns 
     */
    static xmlString2Xpell(xmlString:string):{}   {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString,"text/xml");
        if(xmlDoc.childNodes.length>0) {
            return XParser.xml2Xpell(xmlDoc.childNodes[0])
        } else return {}
  
    }

    /**
     * Converts XML/HTML Document to Xpell JSON
     * @param xmlNode XML Document Node
     * @param forceXhtml force Xpell XHTML for every unknown object
     * @returns {} Xpell JSON
     */
    static xml2Xpell  (xmlNode:any,forceXhtml?:boolean):{}  {
        //Conversation map for elements and attributes
        const cMap = XParser.html2XMap
        let scanChildren = true
        let outputXpell:{[k:string]:any} = {}
        outputXpell["_children"] = []
        const root_name = xmlNode.nodeName
        const _html_tag_attr = xmlNode.nodeName
        let forceXhtmlOnChildren = forceXhtml
        if(forceXhtml) { 
            outputXpell["_type"] = "xhtml"
            outputXpell["_html_ns"] = 'http://www.w3.org/2000/svg'
        }else {
            outputXpell["_type"] = (cMap.elements[<"div">root_name]) ?cMap.elements[<"div">root_name] : root_name  //html element to xpell object name
        }
        if(xmlNode.attributes) {
            for(let i=0;i<xmlNode.attributes.length;++i)  {
                const n = xmlNode.attributes[i]
                const attr_name = (cMap.attributes[<"id">n.name]) ?cMap.attributes[<"id">n.name] : n.name //replace html attribute to xpell attributes (id -> _id)
                outputXpell[attr_name] = n.value
            }
        }
        if (xmlNode?.firstChild?.nodeValue) {
            outputXpell["text"] = xmlNode?.firstChild.nodeValue.trim();
        }
        if(outputXpell["_type"] == "xhtml") {
            outputXpell["_html_tag"] = _html_tag_attr
        }
        else if(outputXpell["_type"] == "svg" ) {
            forceXhtmlOnChildren = true
            outputXpell["_html_ns"] = 'http://www.w3.org/2000/svg'
        }
        if(scanChildren &&  xmlNode?.childNodes.length>0) {
            for(let i=0;i<xmlNode.childNodes.length;++i)  {
                const node = (xmlNode.childNodes[i])
                if(!node.nodeName.startsWith("#")) {
                    outputXpell["_children"].push(XParser.xml2Xpell(node,forceXhtmlOnChildren))
                }
            }   
        }
        return outputXpell

    }

    
    // static fixArgumentValue(arg:any) {
    //     let finalArg = "";
    //     let prevChar = "";
    //     for (var i = 0; i < arg.length; i++) {
    //         let char = arg.charAt(i);
    //         let addToFinal = true;

    //         if (char === '"' && prevChar !== "\\")
    //             addToFinal = false;

    //         if (addToFinal)
    //             finalArg += char;
    //         prevChar = char;
    //     }


    //     finalArg = finalArg.replace(/\\\"/g, '"');

    //     return finalArg;
    // }


    /**
     * Get next argument from string
     * @param {String} str
     * @return {number} indexOf the end of the argument
     */
    // static getNextArgumentIndex(str:string) {
    //     let idx = -1;
    //     let count = str.length;
    //     let zeroCount = count - 1;
    //     let inQuotes = false;
    //     let prevChar = "";
    //     for (let i = 0; i < count; i++) {
    //         let char = str.charAt(i);


    //         if (char === '"') {
    //             if (inQuotes) {
    //                 if (prevChar === '\\') {
    //                     // ignore
    //                 }
    //                 else {
    //                     // end of arguments
    //                     inQuotes = false;
    //                 }

    //             }
    //             else {
    //                 inQuotes = true;
    //             }
    //         }
    //         else if (char === ' ') {
    //             if (!inQuotes) {
    //                 // end of arguments
    //                 idx = i;
    //                 break;
    //             }
    //         }

    //         if (i === zeroCount) {
    //             idx = count;
    //             break;
    //         }


    //         prevChar = char;
    //         // argument is still processing
    //     }

    //     return idx;
    // }
}

export default XParser
