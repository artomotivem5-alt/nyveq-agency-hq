import fs from 'fs';
import path from 'path';

const desktop = path.join(process.env.USERPROFILE, 'Desktop');

// 1. Internet Shortcut (.url)
const urlShortcutPath = path.join(desktop, 'NYVEQ Agency HQ.url');
const urlContent = `[InternetShortcut]
URL=http://localhost:3001/
IconIndex=0
`;
fs.writeFileSync(urlShortcutPath, urlContent, 'utf-8');

// 2. Click-to-launch Batch file (.bat)
const batShortcutPath = path.join(desktop, 'تشغيل NYVEQ HQ.bat');
const batContent = `@echo off
title NYVEQ Agency HQ
cd /d "C:\\Users\\11\\Desktop\\nyveq-sop"
start http://localhost:3001/
npm run dev
`;
fs.writeFileSync(batShortcutPath, batContent, 'utf-8');

console.log('Successfully created both desktop launchers:');
console.log(' - ' + urlShortcutPath);
console.log(' - ' + batShortcutPath);
