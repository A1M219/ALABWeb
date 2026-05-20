# 服务器设置死亡不掉💀
## 1.打开Config.txt文件，位置：U3DS\Servers\AlabServer\Config.txt。
- ![UCFG](https://pic1.imgdb.cn/item/6a0df45795d4b7068ae88325.png)
## 2.搜索[Lose_items],将Default: 1调整为Default: 0，1为物品全掉，0为不掉落。
- ![UCFG](https://pic1.imgdb.cn/item/6a0df45895d4b7068ae8832a.png)
## 3.搜索[Lose_Clothes],将Default: True调整为Default: False，True为会掉落衣服，False为不掉落。
- ![UCFG](https://pic1.imgdb.cn/item/6a0df45795d4b7068ae88327.png)
## 4.搜索[Lose_Weapons],将Default: True调整为Default: False，True为会掉落手中武器，False为不掉落，不放图了，实际上这几个都是连在一起的。
## 5.经验和技能点掉落倍数，搜索[Lose_Skill]，这几个都是堆在一起的，根据自身调节，不想掉就都调成0，注意要对照难度调整，你是普通难度就调Normal那栏的。
- ![UCFG](https://pic1.imgdb.cn/item/6a0df45795d4b7068ae88326.png)
## 服务器标题彩字设置(个人联机不用搞)
1. 打开Config.txt文件，找到Desc_Hint，Desc_Full，Desc_Server_List，想加颜色比如：
```
改颜色 Desc_Hint <color=#00ffff>Alab Server212121</color>
改字体大小 Desc_Hint <size=20>Alab Server212121</size>
两个都要 Desc_Hint <color=#00ffff><size=20>Alab Server212121</size></color>
Desc_Hint -服务器详细页介绍
Desc_Full -地图下方介绍
Desc_Server_List -服务器列表介绍
```
- ![UCFG](https://pic1.imgdb.cn/item/6a0df45795d4b7068ae88329.png)
1. 需要颜色代码请前往[颜色代码网站](https://zh.spycolor.com/web-safe-colors)
## 服务器头像icon设置
1. 准备一张32x32或者64x64像素的图片，例如我这个，去找一个图床，例如聚合，picui等，在图床上传图片后，复制图片链接，打开Config.txt文件，找到[Icon]，打一个空格把链接复制到后面就好了。
- ![UCFG](https://pic1.imgdb.cn/item/6a04523bff1caee4b5ccdf8c.png)
- ![UCFG](https://pic1.imgdb.cn/item/6a0df4aa95d4b7068ae88331.png)
- ![UCFG](https://pic1.imgdb.cn/item/6a0df4a995d4b7068ae88330.png)
## 施工中🚧