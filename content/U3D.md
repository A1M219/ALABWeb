# 从0开始制作MOD-配置环境⚒️
## 准备工作，Unity Hub,UNITY3D,一个建模软件，一个图片处理软件(例如ps)，文本编辑器，以及耐心。
### 1. 软件下载直链：[Notepad++下载地址](https://notepad-plus-plus.org/downloads/v8.9.4/) | [Visual Studio Code下载地址](https://code.visualstudio.com/download) | [Unity Hub下载](https://unity.cn/tuanjie/releases?u_release_type=full) | PS请自行下载，blender可以去steam搜索下载。
![U3D](../assets/img/U3D/U3D-1.png)
### 2. 前往unity官网下载unity hub,并安装2021版本的unity3d。
### 把版本选择到Unity 2021.x，选好版本后点击[从Unity Hub下载]，其他版本也可以，不要超过2022版本。
![U3D](../assets/img/U3D/U3D-2.png)
### 在弹出的窗口选择Windows下载，等待下载后安装unity hub，安装好unityhub后再点一次[从Unity Hub下载]，浏览器会唤起unityhub进行下载。
![U3D](../assets/img/U3D/U3D-3.png)
### 安装好后，在unityhub内登录，并获取个人许可证。
![U3D](../assets/img/U3D/U3D-4.png)
![U3D](../assets/img/U3D/U3D-5.png)
![U3D](../assets/img/U3D/U3D-6.png)
![U3D](../assets/img/U3D/U3D-7.png)
### 添加好许可证后，新建3d项目，创建好后进入该项目。
![U3D](../assets/img/U3D/U3D-8.png)
## 拉入官方的mod预设。
### 1.打开unturned的游戏根目录，按照文件夹顺序找到两个文件，[ExampleAssets.unitypackage]和[Project.unitypackage]
![U3D](../assets/img/U3D/U3D-9.png)
![U3D](../assets/img/U3D/U3D-10.png)
### 2.先将[Project.unitypackage]文件拉入到unity工作区中，再拖入[ExampleAssets.unitypackage]
![U3D](../assets/img/U3D/U3D-11.png)
- 选Import
![U3D](../assets/img/U3D/U3D-12.png)
- 先点All,再点import导入
![U3D](../assets/img/U3D/U3D-13.png)
- 拖入第二个文件，文件比较大，可能等待时间较长。
![U3D](../assets/img/U3D/U3D-14.png)
- 俩文件导入成功后，在左侧部分能看见一些官方的素材，我们后面先拿[可放置物品]来当做素材。
![U3D](../assets/img/U3D/U3D-15.png)
## 接下来要准备一下模型导入的配置信息，方便以后导入模型调整Inspector
### 随便找一个素材，例如我找的是尸潮机，双击Item，找到右侧的[Inspector],往下看有个Model_0(Mesh Filter),点击一下。
![U3D](../assets/img/U3D/U3D-16.png)
### 点击过后会自己跳转到模型文件夹，点击一下Barricade_1后，然后选择右上方的设置按钮，保存好当前模型导入设置，放哪都行，想规范点就在Assets新建文件夹放进去。
![U3D](../assets/img/U3D/U3D-17.png)
- 选择Save current to...
![U3D](../assets/img/U3D/U3D-18.png)
- 名字可改
![U3D](../assets/img/U3D/U3D-19.png)
## 准备工作完成了，有疑问请加562958446