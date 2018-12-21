##### fix1:

>父对象prop传值为子对象,在data中直接赋值prop传入的object失败,并不能直接赋值(好像直接赋值为empty,并不是undefined),虽然正常执行但是在随后的操作中缺失数据

--解决办法:使用watch,对props传入的值进行侦听,随后对data进行赋值

```
watch():{
    prop:function(value){
        this.item = value;
    }
}
```

**后记**首次传入值为空,随后父对象改变为空值,直接data赋值失败,data赋值是在vue的created生命周期中执行.随后的mounted并不执行data直接赋值.即

```
    data():{return {item = prop}}

```

