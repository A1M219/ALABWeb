# Unturned简易开服指南（steam code）🎮
## 1.准备工作
- 准备以下工具软件
1. Steam客户端
2. Unturned Dedicated Server
3. 任意文本编辑器（Notepad++）(Visual Studio Code)选一个就行，教程拿Visual Studio Code举例子。
[Notepad++下载地址](https://notepad-plus-plus.org/downloads/v8.9.4/)
[Visual Studio Code下载地址](https://code.visualstudio.com/download)
- ![US-1](https://pic1.imgdb.cn/item/6a00d96b72dba71658f14235.png)
## 2.架设服务器
- 在steam内安装Unturned Dedicated Server
1. 在Steam客户端内搜索[Unturned Dedicated Server],并下载安装。
- ![US-2](https://pic1.imgdb.cn/item/6a00d9ef72dba71658f145ca.png)
1. 下载好后打开Unturned Dedicated Server目录,找到[Unturned.exe]
- ![US-3](https://pic1.imgdb.cn/item/6a00d9ef72dba71658f145cc.png)
- ![US-4](https://pic1.imgdb.cn/item/6a00d9ef72dba71658f145cf.png)
1. 运行文件夹中的[Unturned.exe],中途不要直接叉掉cmd窗口，等一会后出现Loading level: 100%，先输入Save，再输入shutdown关闭服务器
- ![US-5](https://pic1.imgdb.cn/item/6a00d9ef72dba71658f145ce.png)
1. 右键[Unturned.exe]，创建快捷方式，打开新建快捷方式的属性，在[目标]那一串地址后面加入以下参数，-nographics -batchmode +secureserver/AlabServer，应用后确定关掉窗口，注意，先打一个空格再填入参数，AlabServer部分可以改为自己想要的名字，例如：myserver等，不要输入中文。
```
-nographics -batchmode +secureserver/AlabServer
```
- ![US-6](https://pic1.imgdb.cn/item/6a00d9ef72dba71658f145d3.png)
- ![US-7](https://pic1.imgdb.cn/item/6a00d9ef72dba71658f145cd.png)
1. 运行[Unturned.exe - 快捷方式]，等待出现Loading level: 100%后输入shutdown关闭服务器，根据路径找到[Commands.dat]文件，使用文本编辑器打开[Commands.dat]后填入以下代码。
- ![US-8](https://pic1.imgdb.cn/item/6a00db0672dba71658f147e8.png)
```
Name AlabServer
Password
Map PEI
Maxplayers 6
Mode Normal
PVE
Cheats on
Perspective both
Loadout 255/8
Welcome HI
```
- ![US-9](https://pic1.imgdb.cn/item/6a00db0672dba71658f147e6.png)
## 3.测试服务器
1. 上述步骤完成后，打开[Unturned.exe - 快捷方式]，等待出现Loading level: 100%后，找到Server Code: XXXXXXXXXXXXXXXXX,把这串数字复制发给要联机的好友，打开游戏->开始游戏->链接->输入数字代码->点击链接，正常情况下会直接进入地图。
- ![US-10](https://pic1.imgdb.cn/item/6a00db0672dba71658f147e9.png)
- ![US-11](https://pic1.imgdb.cn/item/6a00db0672dba71658f147e7.png)
1. 到此，基础服务器已搭建完成，需要添加mod，或者创意工坊地图，死亡不掉落等设置，请前往下篇文章。
2. 官图名字合集
```
PEI        //爱德华王子岛
Russia     //俄罗斯
Yukon      //育空
Washington //华盛顿
Germany    //德国
```
## 交流群562958446