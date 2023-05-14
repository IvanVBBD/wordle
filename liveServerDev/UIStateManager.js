import * as pubsubManagerUtls from "./pubsubManager.js"

export class UIStateManager{
  static debugMode = false;
  constructor(){
    this.UIHashState = {}
    this.UIState = {}
    this.pubSub = pubsubManagerUtls.PubSubManager();
  }

  addUIState(UIID,value){
    if (this.UIState[UIID])
    {
      if (UIStateManager.debugMode)
        console.log("UIID already in use");
      return false;
    }
    this.UIState[UIID] = value;
    this.UIHashState[UIID] = 0;
  }
}