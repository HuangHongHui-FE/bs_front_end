const express = require("express")

var router = express.Router()

var ObjectID = require('mongodb').ObjectId;

const client = require("../../util/dbconfig.js")
const dataGeShi = require("../../util/dataGeShi.js")
const dataGeShiUpdate = require("../../util/dataGeShiUpdate.js");


router.get("/study/resource", async (req, res)=>{
	try {
        console.log("hahha")
		await client.connect();
		let db = client.db("funguy")
		let data = await db.collection('resource').find({}).toArray()
        console.log(data)
		// data = await dataGeShi(data)
		// res.send(data)
		// client.close()
	} catch(err) {
		res.send("错误" + err)
		client.close()
	}
})

module.exports = router