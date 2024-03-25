> # 养老保险大数据测算平台大屏<br/>前后端组件及数据API接口文档
>
> <p>作者：杨智凯</p><p>编写时间：2024.2.24</p><p>版本：v1.0</p>



## 1 组件

### 1.1 Block组件

#### 1.1.1 基本介绍

> 组件位置：@/components/hoc/block.vue
>
> 组件描述：该组件用于创建一个标准的大屏组件块

#### 1.1.2 接口说明

类型：
```text
props
```



接口说明：

| 接口名 | 接受数据类型 | 是否必须 | 默认值 | 备注                   |
| ------ | ------------ | -------- | ------ | ---------------------- |
| height | String       | 不必须   | 'auto' | 组件块宽度             |
| width  | String       | 不必须   | 'auto' | 组件块高度             |
| title  | String       | 不必须   | ''     | 组件块标题，若空不显示 |



#### 1.1.3 使用示例

##### 1.1.3.1 单组件渲染

> 单组件渲染描述：
>
> 将需要组件框包围的内容放于组件框内部，组件框会提供周边的样式渲染

使用样例：

```vue
<template>
    <Block height="2.85rem" width="100%" title="计划调配">
        <div>这是计划调配内部内容</div>
    </Block>
</template>

<script>
import Block from "@/components/hoc/block.vue";
export default {
  components: {
    Block, Selector, Preview, Modifier, Plan
  },
}
</script>
```

使用效果：

![image-20240319232912666](D:\vue\intelligent_cal\docs\工程资料\1.基础性文件\2.规范文档\api_v1.assets\image-20240319232912666.png)



##### 1.1.3.2 多组件渲染

> 多组件渲染描述：
>
> 将需要连续渲染的多个组件都放在组件框标签内部，组件框会**连续直接**渲染
>
> **本功能待完善**



### 1.2 图表组件





## 2  数据

### 2.1 普通单一数据查询返回样式

#### 2.1.1 基本信息

> 请求路径：
>
> 请求方式：GET
>
> 接口描述：该接口用于查询指定的数据，具体的dataType应填的字段见字典



#### 2.1.2 请求参数

无



#### 2.1.3 响应数据

参数格式：application/json

参数说明：

| 参数名              | 类型                                                  | 是否必须 | 备注                       |
| ------------------- | ----------------------------------------------------- | -------- | -------------------------- |
| code                | number                                                | 必须     | 响应码，具体值及含义见字典 |
| msg                 | string                                                | 必须     | 提示信息                   |
| data                | Array[JSON]                                           | 必须     | 返回的数据                 |
| \|- dataId          | number                                                | 必须     | 图表id                     |
| \|- dataName        | string                                                | 必须     | 图表名称                   |
| \|- displayMode     | string                                                | 必须     | 图表展现形式               |
| \|- displayableMode | Array[string]                                         | 必须     | 图表可展现的形式           |
| \|- numPrecision    | number                                                | 必须     | 数据值展现的精度           |
| \|- maxValue        | number                                                | 不必须   | 数据值最大值               |
| \|- minValue        | number                                                | 不必须   | 数据值最小值               |
| \|- dataColor       | string                                                | 必须     | 数据系列颜色               |
| \|- isPredict       | boolean                                               | 必须     | 是否为预测数据             |
| \|- chart           | JSON                                                  | 必须     | 图表数据信息               |
| \|- \|- data        | Array[<br/>Array[k-string],<br/>Array[v-string]<br/>] | 必须     | 图表数据                   |
| \|- \|- key_label   | string                                                | 必须     | 图表数据键标签             |
| \|- \|- key_unit    | string                                                | 必须     | 图表数据键单位             |
| \|- \|- value_label | string                                                | 必须     | 图表数据值标签             |
| \|- \|- value_unit  | string                                                | 必须     | 图表数据值单位             |

响应数据样例：

```json
{
  "code": 200,
  "msg": "success",
  "data": [{
      "id": 1,
      "name": "0",
      "type": "bar",
      "series":{
          "name": ['android', 'ios']
      },
      "chart"
  }]
}
```

前端数据展示样例：

![image-20240319154720178](D:\vue\intelligent_cal\docs\工程资料\1.基础性文件\2.规范文档\api_v1.assets\image-20240319154720178.png)



### 2.2 计划调配展示

#### 2.2.1 基本信息

> 请求路径：/getPlans
>
> 请求方式：GET
>
> 接口描述：该接口用于查询可设置的参数信息



#### 2.2.2 请求参数

无



#### 2.2.3 响应数据

参数格式：application/json

参数说明：

| 参数名                        | 类型          | 是否必须 | 备注                           |
| ----------------------------- | ------------- | -------- | ------------------------------ |
| code                          | number        | 必须     | 响应码，1 代表成功，0 代表失败 |
| msg                           | string        | 非必须   | 提示信息                       |
| data                          | Array[JSON]   | 必须     | 返回的数据                     |
| \|- id                        | number        | 必须     | 计划id                         |
| \|- name                      | string        | 必须     | 计划名称                       |
| \|- createTime                | string        | 必须     | 计划创建时间                   |
| \|- updateTime                | string        | 必须     | 计划修改时间                   |
| \|- param                     | Array[JSON]   | 必须     | 设置样式                       |
| \|- \|- name                  | string        |          |                                |
| \|- \|- chart                 | JSON          |          |                                |
| \|- \|- \|- id                | number        |          |                                |
| \|- \|- \|- name              | string        |          |                                |
| \|- \|- \|- type              | string        |          |                                |
| \|- \|- \|- series            | Array[JSON]   |          |                                |
| \|- \|- \|- \|- name          | string        |          |                                |
| \|- \|- \|- key               | JSON          |          |                                |
| \|- \|- \|- \|- \|- name      | string        |          |                                |
| \|- \|- \|- \|- \|- list      | Array[string] |          |                                |
| \|- \|- \|- value             | JSON          |          |                                |
| \|- \|- \|- \|- name          |               |          |                                |
| \|- \|- \|- \|- type          |               |          |                                |
| \|- \|- \|- \|- list          |               |          |                                |
| \|- \|- \|- \|- settings      |               |          |                                |
| \|- \|- \|- \|- \|- precision |               |          |                                |
| \|- \|- \|- \|- \|- maxValue  |               |          |                                |
| \|- \|- \|- \|- \|- minValue  |               |          |                                |

响应数据样例：

```json
{
  "code": 1,
  "msg": "success",
  "data": [{
      "id": 1,
      "name": "参保率",
      "type": "Percentage",
      "settingType":"Line",
      "minValue": 0.00,
      "maxValue": 100.00,
      "defaultValue":{
          "keys":['2018','2019','2020','2021','2022'],
          "values":[0.92,0.92,0.92,0.92,0.92]
      }
    }]
}
```

