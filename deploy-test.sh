#!/bin/bash
echo "开始打包部署一体机票券 测试环境"
npm run build:test && scp -r dist-test/* root@nginx-test.hk:/data/mall-pages/machineapp/machineapp_web/
exit 0
