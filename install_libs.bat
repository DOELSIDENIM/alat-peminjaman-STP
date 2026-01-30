@echo off
echo Menginstall antd, icons, dan framer-motion...
call npm install antd @ant-design/icons framer-motion --save
echo Instalasi Package selesai.
echo Building assets...
call npm run build
echo Build selesai.
