# ToDo

## bug 0001  

首次打开时只保存了ToDo,未保存ToDoContent,猜测为feature 001,造成的问题

fixed 2019/01/13

## feature 001

aidb execude执行后,重置dbset.更改为每执行一次变更清除相应的记录.

原有方法导致异步执行每当有execude一个执行完毕,再次执行execude的会被重置.

fixed 2019/01/13