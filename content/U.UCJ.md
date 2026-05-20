# 在服务器内安装插件和调整权限组🚀
## 1.安装Rocket插件前置
1. 找到Rocket插件安装.bat文件，U3DS\Extras\Install Rocket.bat,运行Install Rocket.bat文件，出现[复制了7个文件]后关闭窗口。
- ![USJ-1](https://pic1.imgdb.cn/item/6a0df39c95d4b7068ae88318.png)
- ![USJ-2](https://pic1.imgdb.cn/item/6a0df39c95d4b7068ae8831a.png)
1. 运行服务器测试，出现下列指令时说明安装成功。
- ![USJ-3](https://pic1.imgdb.cn/item/6a0df39c95d4b7068ae8831d.png) 
## 2.安装新插件
1. 比如我想安装一个home回家插件，从[UNBBS论坛](https://www.unbbs.net/4273.html)下载好所需插件后，解压后，里面有[Libraries]和[Plugins]两个文件夹，把这两个文件夹复制到U3DS\Servers\AlabServer\Rocket中。（看不清图片请新建标签栏打开图片查看）
- ![USJ-4](https://pic1.imgdb.cn/item/6a0df39c95d4b7068ae8831c.png) 
1. 复制完成后运行服务器测试
- ![USJ-5](https://pic1.imgdb.cn/item/6a0df39c95d4b7068ae8831b.png) 
## 3.权限组
1. 调整权限组让所有人都能用home命令，找到并打开U3DS\Servers\AlabServer\Rocket\Permissions.config.xml文件，可以看到当前权限组设置。
- ![USJ-6](https://pic1.imgdb.cn/item/6a0df3d195d4b7068ae8831f.png) 
1. 将homo插件的玩家权限加入到默认权限组，加到[<Permission Cooldown="0">rocket</Permission>]的后面，如果需要添加其他插件的指令，请去查阅U3DS\Servers\AlabServer\Rocket\Commands.config.xml文件。
```
<Permission Cooldown="0">home</Permission>
<Permission Cooldown="0">homes</Permission>
<Permission Cooldown="0">destroyhome</Permission>
<Permission Cooldown="0">renamehome</Permission>
```
- ![USJ-7](https://pic1.imgdb.cn/item/6a0df39c95d4b7068ae88319.png) 
1. 进入服务器测试
## 交流群562958446