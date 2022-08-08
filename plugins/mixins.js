import Vue from "vue"
import { differenceInHours } from "date-fns"

// 全局过滤器混入
import * as filters from "../filters/filters"
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))


// 全局工具方法

// 获取文件类型
let getType = (file) => {
    var filename=file;
    var index1=filename.lastIndexOf(".");
    var index2=filename.length;
    var type=filename.substring(index1,index2);
    return type;
}
Vue.prototype.$getType = getType


//  转成tree
let handertree = (data, id, parentId, children, rootId) =>{
    id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData =  cloneData.filter(father => {
	  let branchArr = cloneData.filter(child => {
		//返回每一项的子级数组
		return father[id] === child[parentId]
	  });
	  branchArr.length > 0 ? father.children = branchArr : '';
	  //返回第一层
	  return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}
Vue.prototype.$handertree = handertree

//  循环修改评论
let loopComment = (tree) =>{
	let tmp = []
	tree.forEach(item =>{
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			tmp.push(item.children)
			loopCate(item.children)
		}
	
	})
	return tmp
}
Vue.prototype.$loopComment = loopComment

//  循环修改cate
let loopCate = (tree) =>{
	return tree.map(item =>{
		const newNode = {
			key: item.cateId,
			title: item.title,
			value: item.cateId,
		}
		
		  // 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
		// Recursion
			newNode.children = loopCate(item.children)
		}
		 return newNode
	  })
}
Vue.prototype.$loopCate = loopCate

// 获取判断编辑时间
let createTimeOut = (date) => {
   
    date = date.replace(/-/g, '/');
    const startDate = new Date(date);
	const endDate = new Date();

	const inHours = differenceInHours(endDate, startDate)
    if (inHours > 24) {
		console.log(inHours)
        return true
    }
	
    return false;
}
Vue.prototype.$createTimeOut = createTimeOut


// 文件转换数据
let fileParse = (file,type = "base64") => {
   return new Promise(resolve=>{
		let fileRead = new FileReader();
		if (type === "base64") {
			fileRead.readAsDataURL(file)
		}else if(type === "buffer"){
			fileRead.readAsArrayBuffer(file)
		}
		fileRead.onload = (ev)=>{
			resolve(ev.target.result)
		}
   })
}
Vue.prototype.$fileParse = fileParse

// 混入Methods
Vue.mixin({
	methods:{
		$seo(title,content,payload = []){
			return{
				title,
				meta:[{
					hid:"beethorn",
					name:"keywords",
					content
				}].concat(payload)
			}
		}
	}
})

