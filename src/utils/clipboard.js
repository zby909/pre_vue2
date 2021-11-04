/* 复制到剪切板工具封装zby */
/* 使用方法：
	引入：import handleClipboard from '@/utils/clipboard';
	使用：handleClipboard( $event,'我是一只小鸭子'); --不传文字内容默认获取该事件对象的innerText值
*/
import Clipboard from 'clipboard';
import { Toast } from 'vant';

function clipboardSuccess() {
  Toast({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500,
  });
}

function clipboardError() {
  Toast({
    message: 'Copy failed',
    type: 'fail',
  });
}

export default function handleClipboard(event, text) {
  const clipboard = new Clipboard(event.target, {
    text: () => text || event.target.innerText,
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
