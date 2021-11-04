#!/bin/bash
echo "开始打包部署一体机票券 正式环境"
npm run build:prod && scp -r dist/* root@nginx.hk:/data/www/dstatic.gzhaoku.com/mall-pages/admin/
exit 0
