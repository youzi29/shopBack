import axios from 'axios'
import qs from 'qs'
let url = "http://223.247.202.40:8088/shop/shopAdmin/php/"
//let url = "../php/"


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
export const getProduct = data => {
	return axios.request({
		url: "http://223.247.202.40:8088/shop/kaipule/getProduct.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add = data => {
	return axios.request({
		url: url + "login.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add1 = data => {
	return axios.request({
		url: url + "product.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add2 = data => {
	return axios.request({
		url: url + "class.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add3 = data => {
	return axios.request({
		url: url + "middleSearch.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add4 = data => {
	return axios.request({
		url: url + "join.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add5 = data => {
	return axios.request({
		url: url + "order.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const add6 = data => {
	return axios.request({
		url: url + "address.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}

export const check = data => {
	return axios.request({
		url: url + "check.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}
export const message = data => {
	return axios.request({
		url: url + "message.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data : data
	})
}
export const shop = data => {
	return axios.request({
		url: url + "shop.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}
export const manage = data => {
	return axios.request({
		url: url + "manage.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}
export const role = data => {
	return axios.request({
		url: url + "role.php",
		method: 'post',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		//data: qs.stringify(data)
		data : data
	})
}