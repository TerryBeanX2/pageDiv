        这是一个很好用的分页插件，有默认的样式，也可以自定义，支持刷新页面；
        
        这个插件由我和我所在的H5开发项目组成员开发，欢迎使用与提出bug。
        
        基于原生JS，直接引入即可使用
        
        所有参数中，只有第一个参数是必须的

```javascript
    var dd = new pageDiv('页码','配置对象','回调函数')
    配置对象:{
                perNum: 5,----------------------------每页显示个数
                totalNum: 20,-------------------------总共页数
                parent: "body",-----------------------分页器容器
                activePage: nowNum,-------------------当前页码（不必在对象里传，请传第一个参数即可）===============必须！
                nowFirstNum: 0,-----------------------当前页签组第一个
                reload: false,------------------------是否会刷新页面
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
