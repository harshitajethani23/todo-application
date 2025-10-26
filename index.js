import express from "express";
const app = express();
app.use(express.json());
const TODO_ITEMS = [
    {
        id: 1,
        todoItem: "go to temple",
        priority: "High",
        emoji: "🛕",
        isDone: false,
        createdAt: new Date().toISOString()
    },
     {
        id: 2,
        todoItem: "help in kitchen",
        priority: "low",
        emoji: "🔪",
        isDone: false,
        createdAt: new Date().toISOString(),
    },
     {
         id: 3,
         todoItem: "Complete assignments",
         priority: "High",
         emoji: "📚",
         isDone: false,
         createdAt: new Date().toISOString()
     },
     {
         id: 4,
         todoItem: " cardio exercise",
         priority: "high",
         emoji: "🏋️‍♀️",
         isDone: false,
         createdAt: new Date().toISOString()
      },
     {
         id: 5,
         todoItem: "Fill exam form",
         priority: "High",
         emoji: "🧾",
         isDone: false,
         createdAt: new Date().toISOString()
       }
];

app.get("/todos",(req,res)=>{
    res.json({
        success:true,
        data:TODO_ITEMS,
        message:"todo items fetched succesfully"
    });
});

app.post("/todos",(req,res)=>{
   const { todoItem,priority,emoji } = req.body;

   

   const todoObj = {
    id: TODO_ITEMS[TODO_ITEMS.length - 1].id + 1,
    todoItem: todoItem,
    priority:priority,
    emoji:emoji,
    isDone:false,
    createdAt: new Date(). toISOString(),
   }
   TODO_ITEMS.push(todoObj);

    res.json({
        success:true,
          data:TODO_ITEMS,
        message:"todo items added successfully"
    });
});

app.get("/todos/search",(req,res)=>{

    const {item,priority} = req.query;

    const filteredItems = TODO_ITEMS.filter((itemObj)=> {
        if(itemObj.todoItem.toLowerCase().includes(item.toLowerCase()) && 
        itemObj.priority.toLowerCase() == priority.toLowerCase()) {
            return true;
        }
        return false;
    });
      res.json({
        success:true,
        data:filteredItems,
        message:"filtered todo items fetched successfully"

      })
})

app.get("/todos/:id",(req,res)=>{
    const {id} = req.params;
    const todoItem = TODO_ITEMS.find((item) => {
        if (item.id == id) return item;
    });
    if(todoItem) {
        res.json({
            success:true,
            data:todoItem,
            message:"Todo items fetched succesfully"
        });
    }
    else {
        res.json({
              success:false,
              message:"Todo item not found"
          
        });
         
    }
});



app.delete("/todos/:id", (req,res) => {
    const {id} = req.params;

    const index = TODO_ITEMS.findIndex((item)=> item.id == id);

    if (index=== -1) {
        res.json({
            success:false,
            message:"Todo item not found"
        });
    } else {
        TODO_ITEMS.splice(index,1);
        res.json({
            success:true,
            message:"Todo item deleted successfully"
        });
    }
});

app.patch("/todos/:id/status", (req,res)=> {
    const {id} = req.params;

    const index = TODO_ITEMS.findIndex((item)=> item.id == id);

    const {isDone} = req.body;

    if(index == -1) {
        res.json({
            success:false,
            message:"todo item not found"
        })
    }
    else {
        TODO_ITEMS[index].isDone = isDone;
        res.json ({
            success:true,
            data:TODO_ITEMS[index],
            message:"todo item marked as done"
        });
    }
});

app.put("/todos/:id", (req,res)=> {
    const {id} = req.params;
   
    const index = TODO_ITEMS.findIndex((item)=> item.id == id);

      if(index == -1) {
        return res.json({
            success:false,
            message:"todo item not found"
        })
    }

    const { todoItem,priority,isDone,emoji } = req.body;

    const newObj = {
        todoItem,
        priority,
        isDone,
        emoji,
        id:TODO_ITEMS[index].id,
        createdAt:TODO_ITEMS[index].createdAt,
    };

    TODO_ITEMS[index] = newObj;

    res.json({
        success:true,
        data:newObj,
        message:"Todo item updated successfully"
    });
})

app.listen(8080,()=>{
    console.log("server is running on port 8080");
});