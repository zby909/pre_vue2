/* 复制到剪切板工具封装zby */
/* 使用方法：
	引入：import handleClipboard from '@/utils/clipboard';
	使用：handleClipboard('我是一只小鸭子', e);
*/
import Clipboard from 'clipboard';
import { Toast } from 'vant';

function clipboardSuccess() {
  Message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500,
  });
}

function clipboardError() {
  Message({
    message: 'Copy failed',
    type: 'fail',
  });
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on('error', e => {
    console.log('copyfaild', e);
    clipboardError();
    clipboard.destroy();
  });
  clipboard.onClick(event);
}
