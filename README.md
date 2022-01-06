# bitburner-script

## 脚本使用指南
- 1、下载sky-installer.js到home目录下，并执行 run sky-installer.js
- 2、待所有脚本安装完成后，便可进行使用

## 目前支持的命令
- [ run /tools/scan-deploy-normal-hack.js ] 自动扫描当前所有服务器，并对当前可攻击的服务器，依次部署normal-hack.js脚本，然后展开攻击，该命令适用于转生早期，不适用于高手。    
- [ run /tools/buy-server.js --name [自定义服务器名] --size [购买大小] --unit [购买单位，默认不传则是GB，可选TB] (--help 可选) ] 通过该脚本购买自定义服务器，仅需要指定服务器名字和大小即可。
- [ run /tools/run-analyze-hack.js <部署服务器> <Hack目标服务器> ] 复制analyze-hack脚本到部署服务器上，然后在部署服务器上执行动态分析Hack脚本，攻击目标服务器，该命令适用于高内存的服务器。

### 业余时间，持续开发中，欢迎加入，共同维护