
let tools = [
    {
        name: "tools1",
        id: 1
    },
    {
        name: "tools2",
        id: 2
    },
    {
        name: "tools3",
        id: 3
    },
]

module.exports.getAllTools = (req, res, next) => {
    // const { ip, query, params, body, headers } = req;
    // console.log(ip, query, params, body, headers);


    //response method
    // res.download(__dirname + '/tools.controller.js');
    // res.json({ "name": "abc" })
    // res.redirect("/login")


    // res.send(tools)
    const { limit, page } = req.query;
    console.log(limit, page);
    res.json(tools.slice(0, limit))
}



//post request e body er modde data patate hy
module.exports.saveTool = (req, res) => {

    // const tools = req.body;
    console.log(req.query);
    tools.push(req.body)
    res.send(tools)
}

module.exports.getToolDetails = (req, res) => {
    const { id, test } = req.params
    // console.log(id, test);

    // const filter={_id:id};
    const foundTool = tools.find(tool => tool.id === Number(id))
    res.status(200).send({
        success:true,
        message:"successfully find the tool",
        data:foundTool
    })
    // res.status(500).send({
    //     success:false,
    //     error:"internal server error"
    // })
}

module.exports.updateTool = (req, res) => {

    //update korar jonno 2ta information lagbe
    //1.kon id ta ke update korbo ta req.params theke nibo
    //2.ki dara update korbo ta req.body theke nite hbe 
    const { id } = req.params;
    // const newData = req.body;
    const filter = { _id: id };
    const newData = tools.find(tool => tool.id === Number(id));
    newData.id = id;
    newData.name = req.body.name;
    res.send(newData)



}

module.exports.deleteTool = (req, res) => {
    //kake delete korbo ta req.params teke id ta ke nite hbe
    const { id } = req.params;
    const filter = { _id: id };
    tools = tools.filter(tool => tool.id !== Number(id))
    res.send(tools)
}