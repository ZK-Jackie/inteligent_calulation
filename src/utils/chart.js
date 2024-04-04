export function toOptions(details) {
  // 0. check if the data is basically valid
  isValid(details);
  let ret = [];
  // try {
  //   details[0].startTime;
  //   details[0].endTime;
  //   details[0].predictStartTime;
  //   details[0].predictEndTime;
  // } catch (e) {
  //   console.warn('[ChartMapper] ChartDetailWarning: Data limit is undefined');
  //   ret.push(details[0].chartOption);
  //   return ret;
  // }
  // 1. truncate the keys
  truncateKeys(details);
  // 2. merge keys and max/min value res
  mergeData(details);
  // 3. extract predict data
  extractPredict(details);
  // 4. modify extremum
  modifyExtremum(details);
  // 5. formatter the data that echarts can directly use
  if(details[0].isInfo) return details[0].chartOption;
    details[0].chartOption.data = toEchartsData(details[0].chartOption.data, details[0].chartOption.xAxisTags, details[0].chartOption.numPrecision, details[0].chartOption.valueUnit);
  if (details[0].chartOption.isPredict && typeof details[0].chartOption.predictData !== null && typeof details[0].chartOption.predictData !== undefined)
    details[0].chartOption.predictData = toEchartsData(details[0].chartOption.predictData, details[0].chartOption.xAxisTags, details[0].chartOption.numPrecision, details[0].chartOption.valueUnit);
  ret.push(details[0].chartOption);
  if (details.length === 2) {
    details[1].chartOption.data = toEchartsData(details[1].chartOption.data, details[0].chartOption.xAxisTags, details[1].chartOption.numPrecision, details[1].chartOption.valueUnit);
    if (details[0].chartOption.isPredict && typeof details[1].chartOption.predictData !== null && typeof details[1].chartOption.predictData !== undefined)
      details[1].chartOption.predictData = toEchartsData(details[1].chartOption.predictData, details[0].chartOption.xAxisTags, details[1].chartOption.numPrecision, details[1].chartOption.valueUnit);
    ret.push(details[1].chartOption);
  }
  return ret;
}

export function toEchartsData(data, keyIndexMap, valuePrecision, valueUnit, isMapping = true) {
  if (data === undefined) return;

  let echartsData = [];
  let keys = data[0];
  let values = data[1];
  for (let i = 0; i < keys.length; i++) {
    let tempDataItem = [];
    // For safety, use index instead of the name of the key, especially when the key itself is a number
    // 1. assemble keys and values
    if (isMapping) {
      tempDataItem.push(keyIndexMap.indexOf(keys[i]));
    } else {
      tempDataItem.push(keys[i]);
    }
    tempDataItem.push(values[i]);
    // 2. assemble the precision of the value
    tempDataItem.push(valuePrecision);
    // 3. assemble the unit of the value
    tempDataItem.push(valueUnit);
    // 4. ready to return
    echartsData.push(tempDataItem);
  }
  return echartsData;
}

function isValid(detail) {
  detail.forEach((item) => {
    // 0. if detail is exist
    if (typeof item === undefined || typeof item === null)
      throw new Error('[ChartMapper] ChartDetailInvalid: Chart detail is null or undefined');
    // 1. if number of keys equals to the number of values
    if (item.chartOption.data[0].length !== item.chartOption.data[1].length)
      throw new Error('[ChartMapper] ChartDetailInvalid: Number of keys is not equal to the number of values');
    // 2. if the number of values is greater than 0
    if (item.chartOption.data[1].length <= 0)
      throw new Error('[ChartMapper] ChartDetailInvalid: Number of values should no less than 0');
    // TODO 3. series name is unique; 4.
  })
}

function truncateKeys(details) {
  details.forEach((detail) => {
    if(detail.isInfo) return ;
    let startTime = detail.startTime;
    let endTime = detail.endTime;
    getBetweenKV(detail.chartOption.data, startTime, endTime);
  })
}

function mergeData(details) {
  if(details.length === 1){
    details[0].chartOption.xAxisTags = details[0].chartOption.data[0];
    return ;
  }
  // merge keys
  let keys1 = details[0].chartOption.data[0];
  let keys2 = details[1].chartOption.data[0];
  if (keys1.length >= keys2.length) {
    details[0].chartOption.xAxisTags = mergeKeys(details[0].chartOption.data[0], details[1].chartOption.data[0]);
  } else {
    details[0].chartOption.xAxisTags = mergeKeys(details[1].chartOption.data[0], details[0].chartOption.data[0]);
  }

  function mergeKeys(base, target) {
    // 合并两个数组
    let combined = base.concat(target);
    // 使用Set对象去除重复的元素
    let unique = new Set(combined);
    // 将Set对象转为数组并返回
    return Array.from(unique);
  }
}

function extractPredict(details) {
  details.forEach((detail) => {
    if(detail.isInfo) return ;
    let start = detail.predictStartTime;
    let end = detail.predictEndTime;
    detail.chartOption.predictData = getBetweenKV(detail.chartOption.data, start, end, false, true);
  })
}

function getBetweenKV(data, start, end, isDirect = true, isExtract = false) {
  let keys = data[0];
  let values = data[1];
  let isContain = false;
  let ret = [];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == start) {
      isContain = true;
      ret[0] = [];
      ret[1] = [];
    }
    if (isContain) {
      ret[0].push(keys[i]);
      ret[1].push(values[i]);
      if (keys[i] == end) {
        isContain = false;
      }
      if (isExtract) {
        keys.splice(i, 1);
        values.splice(i, 1);
        i--;
      }
      if (!isContain) {
        break;
      }
    }
  }
  if (isContain) {
    throw new Error('Data out of range');
  }
  if (isExtract) {
    data[0] = keys;
    data[1] = values;
  }
  if (isDirect) {
    data[0] = ret[0];
    data[1] = ret[1];
  } else {
    return ret;
  }
}

function modifyExtremum(details) {
  if(details.length === 1)
    return ;
  details[0].chartOption.maxValue = Math.max(details[0].chartOption.maxValue, details[1].chartOption.maxValue);
  details[0].chartOption.minValue = Math.min(details[0].chartOption.minValue, details[1].chartOption.minValue);
}