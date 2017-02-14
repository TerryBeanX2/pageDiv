		这是一个很好用的分页插件，有默认的样式，也可以自定义，支持刷新页面（使用了sessionStorage，注意兼容性）； 
		这个插件由我和我所在的H5开发项目组成员开发，欢迎使用与提出bug。
		基于原生JS，直接引入即可使用，刷新页面也不需要另行传参，样式会自动改变。
		所有参数中，只有第一个参数页码是必须的。
		回调函数在页码变化时执行(建议以实例化后赋予属性的方式传入回调，如：dd.callback = function(){})。
		
```javascript
    var dd = new pageDiv(initPage,confObject,callback(nowPage){
        // do sth
    })
    confObject:{
                perNum: 5,----------------------------每页显示个数
                totalNum: 20,-------------------------总共页数
                parent: "body",-----------------------分页器容器
                activePage: nowNum,-------------------初始页码（初始化时不必在confObject里传）
                nowFirstNum: 0,-----------------------当前页签组第一个
                reload: true,-------------------------是否会刷新页面，使用ajax时将其设为false，提高效率
                classNames: {-------------------------样式类名,用于自定义样式
                    ul: "a-",-------------------------分页器的ul
                    firstPage: "b-",------------------首页按钮样式
                    prePage: "c-",--------------------前一组按钮样式
                    ellipsisPre: "d-",----------------前省略号样式
                    ellipsis: "e-",-------------------后省略号样式
                    nextPage: "f-",-------------------下一页样式
                    lastPage: "g-",-------------------最后一页样式
                    pageNumber: "h-"------------------每页样式
        }
    }
```
![img](https://github.com/TerryBeanX2/pageDiv/raw/master/egImg/aaa.png)
