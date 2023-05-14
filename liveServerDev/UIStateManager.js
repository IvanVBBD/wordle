import * as pubsubManagerUtls from './pubsubManager.js';
import debugManager from './debugLoggerUtils.js';

export default class UIStateManager{
  static debugMode = debugManager.debugLevel.None;
  constructor(){
    this.UIHashState = {};
    this.UIState = {};
    this.pubSub = new pubsubManagerUtls.PubSubManager();
  }

  addUIState(UIID,value){
    if (this.UIState[UIID])
    {
      debugManager.doLog(UIStateManager.debugMode, {unsuccessLog: `The ID ${UIID} is already in use`});
      return false;
    }
    debugManager.doLog(UIStateManager.debugMode, {successLog: `Added successfully as ${UIID}`});
    this.UIState[UIID] = value;
    this.UIHashState[UIID] = 0;
  }

  addListenerToUIUpdate(UIID,Event){
    if (!this.UIState[UIID])
    {
      debugManager.doLog(UIStateManager.debugMode,{unsuccessLog:`Failed to find UI element with ID: ${UIID}`});
      return;
    }
    debugManager.doLog(UIStateManager.debugMode,{successLog: `Failed to find UI element with ID: ${UIID}`});
    this.pubSub.subscribe(UIID,Event);
  }

  updateUIState(UIID,newState){
    if (!this.UIState[UIID]){
      debugManager.doLog(UIStateManager.debugMode,{unsuccessLog:`Failed to find UI element with ID: ${UIID}. Can't update`});
      return;
    }
    this.UIState[UIID] = newState;
    this.UIHashState[UIID]++;
    this.pubSub.publish(UIID,this.UIState[UIID]);
    debugManager.doLog(UIStateManager.debugMode,{successLog:'Updated state and called called broadcasted updated'});
  }
}