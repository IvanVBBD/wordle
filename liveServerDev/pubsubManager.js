import debugManager from './debugLoggerUtils.js';

export class PubSubManager{
  static debugMode = debugManager.debugLevel.None; 
  constructor(){
    this.publishedEvents = {};
  }

  /**
   * Add subscriber to event memery
   * @param {*} eventName broadcast ID
   * @param {*} method event to trigger
   * @returns undefined
   */
  subscribe(eventName,method){
    if (this.publishedEvents[eventName])
    {
      debugManager.doLog(PubSubManager.debugMode, {successLog: 'Adding method To pre-existing list'});
      this.publishedEvents.push(method);
      return;
    }
    debugManager.doLog(PubSubManager.debugMode, { successLog: 'Adding method To new list'});
    this.publishedEvents[eventName] = [method];
  }

  /**
   * Publish a value to all subscribed events;
   * @param {*} eventName broadcast ID
   * @param {*} value value passed
   */
  publish(eventName,value){
    if (this.publishedEvents[eventName])
    {
      this.publishedEvents[eventName].forEach(subEvent => {
        subEvent(value);
      });
      debugManager.doLog(PubSubManager.debugMode,{successLog:`Broadcasting event to ${this.publishedEvents[eventName].length} listeners`});
      return;
    }
    debugManager.doLog(PubSubManager.debugMode,undefined,`No broadcast group found for the event name of ${eventName}`);
  }

  addEmptyPublish(eventName){
    if (this.publishedEvents[eventName])
    {
      debugManager.doLog(PubSubManager.debugMode,{unsuccessLog: 'Found event and unsubscribed method successfully'});
      return;
    }
    this.publishedEvents.push(eventName);
    debugManager.doLog(PubSubManager.debugMode,{unsuccessLog: 'Found event and unsubscribed method successfully'});
  }

  /**
   * Unsubscribe method from subscriber list
   * @param {*} eventName Broadcast name to search in
   * @param {*} method the method to remove
   */
  unsubscribe(eventName,method){
    if (this.publishedEvents[eventName])
    {
      debugManager.doLog(PubSubManager.debugMode,'Found event and unsubscribed method successfully');
      const index = this.publishedEvents[eventName].indexOf(method);
      if (index >= 0)
      {
        debugManager.doLog(PubSubManager.debugMode,'Found event and unsubscribed method successfully');

        this.publishedEvents[eventName].splice(index,1);
        return;
      }
      debugManager.doLog(PubSubManager.debugMode,undefined,'Found event but could not find the method to unsubscribe');
      return;
    }
    debugManager.doLog(PubSubManager.debugMode,{unsuccessLog: `No event with the ID of ${eventName}`} );
  }
}