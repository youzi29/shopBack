import axios from 'axios'
import qs from 'qs'
//获取emoji头像(本地json只能放在static文件夹里) 
export function getEmojiData() {
  return axios({
      method: 'get',
      url: '/static/emojiDB.json',
    })
    .then(function(res) {
      return Promise.resolve(res.data);
    });
}

