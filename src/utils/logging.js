/*
 * @Description:
 * @Author: zby
 * @Date: 2021-12-07 17:26:04
 * @LastEditors: zby
 * @Reference:
 */
const loadingDom = `<div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
        <div class="load_title">
          正在登录 , 请耐心等待
          <br />
          <span>Janus系统</span>
        </div>
      </div>`;

export default function logging(bol) {
  if (bol) {
    document.getElementById('app').insertAdjacentHTML('beforeEnd', loadingDom);
  } else {
    document.getElementById('loader-wrapper').remove();
  }
}
