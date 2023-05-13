/**
 * Adds an event to a DOMObject if it can be found in the Event Tree
 * @param {*} UITree Object containing all located DOM 
 * @param {*} ObjectID ObjectID which is the target in the UI Tree
 * @param {*} event Event to be subscribed to
 * @param {*} method The method to be added as the subscriber to the event
 * @returns Nothing
 */
export function connectEventHandler(UITree, DO){
  if (!UITree[`${DO.getID()}`])
  {
    console.log(`Failed to located ${DO.getID()} in UI Tree can't connect ${DO.getMethod().name} on ${DO.getEvent()}`);
    return;
  }
  UITree[`${DO.getID()}`].addEventListener(DO.getEvent(),DO.getMethod);
}

/**
 * Searches and adds given IDAliases to the UITree
 * @param {*} UITree Object which holds the DOMObjects
 * @param {DOD} UIIDAliasList DOM Object Data
 */
export function locateUI(UITree, DODList){
  DODList.forEach(Dod => {
    UITree[Dod.getID()] =document.getElementById(`${Dod.getID()}`);
    if (!UITree[Dod.getID()]){
      console.log(`${Dod.getAlias()} was not found by the ID: ${Dod.getID()}`)
    }
  });
}

/**
 * Locates and mounts a list of DOM Objects onto the UI Tree with their events added
 * @param {*} UITree Object to contain all the UI elements
 * @param {*} DODList List of DOM Object Datas
 */
export function locateAndMount(UITree, DODList){
  DODList.forEach(Dod => {
    UITree[Dod.getID()] =document.getElementById(`${Dod.getID()}`);
    if (!UITree[Dod.getID()]){
      console.log(`${Dod.getAlias()} was not found by the ID: ${Dod.getID()} and thus could not mount event`)
      return;
    }
    if (Dod.isMountAble())
      UITree[Dod.getID()].addEventListener(Dod.getEvent(),Dod.getMethod());
  });
}

/**
 * Predefined grouping of information about a DOM Object Data
 */
export class DOD{
  constructor(ID,Alias,Event,Method){
    this.ID = ID;
    this.Event = Event;
    this.Alias = Alias;
    this.Method = Method;
  }

  getID(){
    return this.ID;
  }
  
  getAlias(){
    return (this.Alias)? this.Alias: this.ID;
  }

  getMethod(){
    return this.Method;
  }

  getEvent(){
    return this.Event;
  }

  isMountAble(){
    if (!this.Event)
    {
      console.log("Cannot mount object without event")
      return false;
    }
    if (!this.Method)
    {
      console.log("Cannot mount object without Method")
      return false;
    }
    return true;
  }
}