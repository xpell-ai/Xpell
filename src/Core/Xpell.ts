/**
 * Xpell - Real-Time User Interface Platform
 * Typescript Edition   
 *      
 * @file Xpell.ts
 * @overview Xpell Engine main file
 * @description Xpell Engine is a real-time user interface platform 
 * for Javascript supporting devices & browsers.
 * @since  22/07/2022
 * @author Fridman Tamir
 * @license GNU GPL v3
 *
 */





/** interface */
import XCommand from "./XCommand"
import {XUtils,FPSCalc} from "./XUtils"
import {XLogger as _xlog} from "./XLogger"
import XData from "./XData"
import XParser from "./XParser"
import XModule from "./XModule"
import {XEventManager as XEM} from  "./XEventManager"

/**
 * @class  Xpell main engine
 */
export class XpellEngine {
    _version : string
    _engine_id: string
    _frame_number: number
    _log_rules = {
    }
    #fps_calc: FPSCalc

    #_modules:{[name:string]:any} = {}
    parser: typeof XParser
   
    constructor() {
        this._version = "0.0.1"
        this._engine_id = XUtils.guid()
        this._frame_number = 0
        this.#fps_calc = new FPSCalc()
        this.parser = XParser
        this.#_modules = {}
        XEM.fire("xpell-init")
        _xlog.enabled = false
        //this.load()
    }


    /**
     * Enable Xpell logs to console
     */
    set verbose(val : boolean){
        _xlog.enabled=true
    }


    /**
     * Logs message to console using Xpell logger
     * make sure to enable verbose mode to see the logs
     * this method is a wrapper for XLogger.log
     * @param msg 
     * @param optionalParams
     */
    log(message?: any, ...optionalParams: any[])  {
        _xlog.log(message,...optionalParams)
    }

    /**
     * Delay the execution of the next command
     * @param ms - delay in milliseconds
     * @returns 
     */
    async delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
   

    /**
     * Loads Xpell module into the engine
     * @param {XModule} xModule 
     */
    loadModule(xModule:XModule):void {
        if (this.#_modules.hasOwnProperty(xModule._name)) {
            _xlog.log("Module " + xModule._name + " already loaded")
        } else {
            this.#_modules[<any>xModule._name] = xModule;
            xModule.load()
        }
    }

    /**
     * Loads multiple module at ones
     * @param {Array<XModule>} xModulesArray 
     */
    loadModules(...xModulesArray:Array<XModule>  ):void {
        xModulesArray.forEach(mod => this.loadModule(mod))
    }

    

    /**
     * Display information about the Xpell engine to the console
     */
    info(){
        _xlog.log("Xpell information:\n- Engine Id: "  + this._engine_id + "\n- Version " + this._version)   
    }


     /**
     * Run textual xCommand -
     * @param {cmd} - text command
     */

    run(stringXCommand:string) {
        if(stringXCommand?.length>2) {
            let scmd = XParser.parse(stringXCommand)
            return this.execute(scmd)
        } else {
            throw "Unable to parse Xpell command"
        }
    }

    /**
     * Execute Xpell Command 
     * @param {XCommand} 
     */
    execute(xcmd:XCommand):any {
        if(xcmd && xcmd._module && this.#_modules[xcmd._module]) {
            return this.#_modules[xcmd._module].execute(xcmd)
        } else {
            throw "Xpell module " + xcmd._module + " not loaded"
        }
    }



    /**
     * Main onFrame method
     * calls all the sub-modules onFrame methods (if implemented)
     */
     onFrame():void {     
        this._frame_number++
        Object.keys(this.#_modules).forEach(mod => {
            
            if(this.#_modules[mod].onFrame && typeof this.#_modules[mod].onFrame === 'function') {
                this.#_modules[mod].onFrame(this._frame_number)
            }
        })
        XData._o["frame-number"] = this._frame_number
        XData._o["fps"] = this.#fps_calc.calc()
        
        requestAnimationFrame(() => {Xpell.onFrame()})         
    }


    /**
     * Gets Xpell module by name
     * @param {string} moduleName - name of the loaded module
     * @returns {XModule}
     */
    getModule(moduleName:string):XModule{
        return this.#_modules[moduleName]
    }

    /**
     * Start Xpell engine for web browsers using requestAnimationFrame
     */
    start() {
        _xlog.log("Starting Xpell")
        this.onFrame()
    }

    getParam(name:string,defaultValue?:string,):any {
        return XData._o[name]
    }

}

/**
 * Xpell Engine instance
 * @public Xpell Engine instance
 */
export const Xpell = new XpellEngine()

export default Xpell


export {Xpell as _x} from "./Xpell"
export {XUtils,XUtils as _xu} from "./XUtils"
export {XData,XData as _xd,type XDataObject,type XDataVariable,_XData} from "./XData"
export {XParser} from "./XParser"
export {XCommand,type XCommandData} from "./XCommand"
export {XLogger,XLogger as _xlog,_XLogger} from "./XLogger"
export {
    XModule,
    type XModuleData,
    // GenericModule
} from "./XModule"
export {
    XObject,
    XObjectPack,
    type IXData,
    type IXObjectData,
    type XDataXporterHandler,
    type XObjectData,
    type XObjectOnEventIndex,
    type XObjectOnEventHandler
} from "./XObject"
export {XObjectManager} from "./XObjectManager"
export {XEventManager, XEventManager as _xem,type XEventListener,type XEvent,type XEventListenerOptions,_XEventManager,type HTMLEventListenersIndex} from "./XEventManager"
export {type XNanoCommandPack,type XNanoCommand} from "./XNanoCommands"