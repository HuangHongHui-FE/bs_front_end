const express = require("express")

var router = express.Router()

var ObjectID = require('mongodb').ObjectId;

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js");


// 资源分享
router.get("/study", async (req, res)=>{
	try {
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('resource').find({}).toArray()
        // console.log(data)
		if(data.length !== 0){
			let data1 = await db.collection('study_blogs').find().toArray()
			if(data1.length == 0){
				res.send({
					data:data1,
					meta: {
						status: 404, 
						msg: "有问题"
					}
				})
				client.close()
			}else{
				data = {
					resource: data,
					blogs: data1
				}
				
				res.send({
					data: data,
					meta: {
						status: 200,
						msg: "获取成功"
					}
				})
				client.close()
			}
			
		}
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

module.exports = router