from fastapi import APIRouter, HTTPException
from bson import ObjectId
from typing import List

from models import Task, TaskUpdate, TaskResponse
from database import tasks_collection, task_helper

router = APIRouter()

# CREATE - Add new task
@router.post("/tasks", response_model=TaskResponse)
async def create_task(task: Task):
    task_dict = task.dict()
    result = tasks_collection.insert_one(task_dict)
    
    new_task = tasks_collection.find_one({"_id": result.inserted_id})
    return task_helper(new_task)

# READ - Get all tasks
@router.get("/tasks", response_model=List[TaskResponse])
async def get_tasks():
    tasks = []
    for task in tasks_collection.find():
        tasks.append(task_helper(task))
    return tasks

# READ - Get single task
@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task_helper(task)

# UPDATE - Update task
@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_update: TaskUpdate):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    # Remove None values from update
    update_data = {k: v for k, v in task_update.dict().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)}, 
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    updated_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
    return task_helper(updated_task)

# DELETE - Delete task
@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid task ID")
    
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task deleted successfully"}