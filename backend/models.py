from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    title: str
    description: str
    completed: bool = False

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TaskResponse(BaseModel):
    id: str
    title: str
    description: str
    completed: bool