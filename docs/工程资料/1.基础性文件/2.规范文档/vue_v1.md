> # 养老保险大数据测算平台大屏前端规范
> <p>作者：杨智凯</p><p>编写时间：2024.2.17</p><p>版本：v1.0</p>

## 开始之前

由于本次任务重点在于大屏展示，且前端任务量和难度较大，为便于多工作人员接手代码，本文档便由此诞生。



## 1 参数命名规范

与普通的后端代码不同，前端有诸多需要命名之处，命名可以**由你自行确定**，但是一定要让你的命名**符合详细的业务场景**，下面将对前端中各个参数的命名进行约束。

### 1.1 css样式约束

为组件设定样式（style）时，统一**使用class选择器**，**不得将css代码写在html标签内**。

class选择器的命名规范遵从“单词-单词-...”的形式；

允许有重名class，但不同的class的css样式应当都需要指出。

下面是错误示例：

```html
<div style="width: 60%">	<!--不得将style代码置于此处！-->
	<div class="firstDiv">		<!--class命名不规范！-->
        
    </div>
</div>
<div class="secondDiv">
    <div class="InnerDiv">		<!--class命名不规范！-->
        
    </div>
</div>
```

下面是正确示例：


```html
<template>
    <div class="first-div">
        <div class="inner-div">		<!--多个小写单词用减号相隔-->

        </div>
    </div>
    <div class="second-div">
        <div class="inner-div">		<!--允许出现重名div-->

        </div>
    </div>
</template>

<style>
    .first-div{
        background-color: #fff
    }
    .first-div .inner-div{			/*尽可能层级分明*/
        width: 60%
    }
    .second-div .inner-div{			/*尽管重名，尽管样式一致，还是建议多写一份*/
        width: 60%
    }
</style>

```

### 1.2 js变量约束

首先，JavaScript是一种弱类型语言，一个变量可以代表一个普通的值，也可以代表一个函数。

在编写js代码时，全部都采用驼峰命名法，定义业务函数和变量时尽可能带上类型注解（如果不确定是什么类型的话就算了吧），如：

```javascript
let message: string = "这是一个字符串！"
let number: int = 111

function onSubmitMsg(message: string){
    ...
}
```

### 1.3 未完待续