var address = 'https://www.itdage.top/weixin-server';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const checkMobile = mobile => {
  if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile)) || mobile.length < 11) {
    return false;
  }
  return true;
} 
module.exports = {
  formatTime: formatTime,
  checkMobile: checkMobile
}
