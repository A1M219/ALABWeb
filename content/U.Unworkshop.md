# 在服务器内添加创意工坊内容🛠
## 1.添加MOD，及地图
1. 找到你想添加的mod，打开主页，找到创意工坊mod代码并复制，例如，此mod的代码为[3115466445]
- ![UW-1](https://pic1.imgdb.cn/item/6a0df32d95d4b7068ae88305.png)
1. 找到并打开[WorkshopDownloadConfig.json]文件，并将这串数字复制到["File_IDs": [],]中，如果要添加多个mod，用英文逗号间隔开即可。
- ![UW-2](https://pic1.imgdb.cn/item/6a0df32c95d4b7068ae88303.png)
- ![UW-3](https://pic1.imgdb.cn/item/6a0df32d95d4b7068ae88306.png)
## 2.测试
1. 开启服务器，查看有无报错红字，有报错请检查格式和逗号，没报错就进服务器看看能不能刷出mod物品。
- ![UW-4](https://pic1.imgdb.cn/item/6a0df32d95d4b7068ae88307.png)
- 使用/give ID来测试，没有权限的去后台输入[admin 玩家ID]
- ![UW-5](https://pic1.imgdb.cn/item/6a0df32c95d4b7068ae88301.png)
## 3.创意工坊地图设置
1. 拿加利福尼亚2举例子，找到地图和必须资源包的数字代码，加利福尼亚2[3707778928]地图资源包[3711646503]添加到["File_IDs": [],]中，例如：
- ![UW-6](https://pic1.imgdb.cn/item/6a0df32c95d4b7068ae88304.png)
- ![UW-7](https://pic1.imgdb.cn/item/6a0df36395d4b7068ae88313.png)
1. 修改[Commands.dat]中的Map设置，例如：
```
Map California2
```
- ![UW-8](https://pic1.imgdb.cn/item/6a0df36395d4b7068ae88315.png)
1. 运行服务器测试，由于新地图很大，有条件请开启加速器下载，中途不要直接关闭服务器，显示Loading level: 100%后进入服务器测试。
- ![UW-9](https://pic1.imgdb.cn/item/6a0df36395d4b7068ae88314.png)
## 交流群562958446