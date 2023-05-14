export default class debugManager{
  static debugLevel = {
    None:0,
    All:1,
    UnsuccessfulOnly:2,
    SuccessfulOnly:3
  };
  static doLog(debugLevel,{successLog, unsuccessLog}){
    switch (debugLevel){

    case debugLevel.None: break;

    case debugLevel.All: {
      if (successLog)
        console.log(successLog);
      if (unsuccessLog)
        console.log(unsuccessLog);
    }
      break;

    case debugLevel.SuccessfulOnly && successLog: {
      console.log(successLog);
    }
      break;

    case debugLevel.UnsuccessfulOnly && unsuccessLog: {
      console.log(unsuccessLog);
    }
      break;
    }
  }
}