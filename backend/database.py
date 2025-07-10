from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URL"))
database = client[os.getenv("DATABASE_NAME")]
tasks_collection = database["tasks"]

# Helper function to format MongoDB documents
def task_helper(task) -> dict:
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "description": task["description"],
        "completed": task["completed"]
    }