<script>
/**
 * The Chart Switcher in VNode is still in Beta
 * Take the normal one in use first
 * */
import {Bar, Gauge, Linear, Ring, Rose, Error} from "./charts"
import {testData} from "@/components/TestDetail";
import {toOptions} from "@/utils/chart"

export default {
  functional: true,
  name: "chart-component",
  props: {
    /**
     * The data of the chart, need an array with JSON element.
     * In dev mode, detail is not required.
     */
    detail: {
      type: Array,
      required: false,
      default: () => testData[3]
    },
    /**
     * the type of the chart,
     * chosen from ['bar', 'gauge', 'line', 'ring', 'rose']
     */
    type: {
      type: String,
      required: false,
      default: "error"
    },
    /**
     * the name of the chart,
     * will be the class name and vue name of the chart,
     * default is uuid
     */
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  render(createElement, context) {
    // step0: get the props from the context
    const {type, detail} = context.props;
    // step1: formatter the type of the chart
    const chosenType = type.toLowerCase();
    // step2: transform the data to the option of the chart
    const chartOption = toOptions(detail);

    let vnodes = [];
    try {
      if (chosenType === 'bar') {
        vnodes.push(createElement(Bar, {
          props: {
            options: chartOption
          }
        }))
      } else if (chosenType === 'gauge') {
        vnodes.push(createElement(Gauge, {
          props: {
            options: chartOption
          }
        }))
      } else if (chosenType === 'line') {
        vnodes.push(createElement(Linear, {
          props: {
            options: chartOption
          }
        }))
      } else if (chosenType === 'ring') {
        vnodes.push(createElement(Ring, {
          props: {
            options: chartOption
          }
        }))
      } else if (chosenType === 'rose') {
        vnodes.push(createElement(Rose, {
          props: {
            options: chartOption
          }
        }))
      } else {
        vnodes.push(createElement(Error))
      }
    }catch (e){
      console.error("[ChartMapper] Error: ", e);
      vnodes[0] = (createElement(Error))
    }

    return createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: '0.2rem'
      }
    }, vnodes)
  },
}
</script>
