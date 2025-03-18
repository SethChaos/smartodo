from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import DeletedTaskCount, Task, UpdatedTaskCount
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS to assure that the front end can access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request validation
class TaskBase(BaseModel):
    title: str
    description: str = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    is_complete: bool = None

class TaskResponse(TaskBase):
    id: int

    class Config:
        orm_mode = True

class BulkDeleteRequest(BaseModel):
    task_ids: List[int]

# Initialize task counts if they don't exist
def initialize_task_counts(db: Session):
    if db.query(UpdatedTaskCount).count() == 0:
        db.add(UpdatedTaskCount(count=0))
    if db.query(DeletedTaskCount).count() == 0:
        db.add(DeletedTaskCount(count=0))
    db.commit()

# Endpoint: GET unfinished tasks
@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.is_complete == False).all()
    return tasks

# Endpoint: POST create a new task
@app.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(title=task.title, description=task.description)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# Endpoint: PUT update a task
@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    existing_task = db.query(Task).filter(Task.id == task_id).first()
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.title is not None:
        existing_task.title = task.title
    if task.description is not None:
        existing_task.description = task.description
    if task.is_complete is not None:
        existing_task.is_complete = task.is_complete
    db.commit()
    db.refresh(existing_task)

    # Increment updated task count
    updated_task_count = db.query(UpdatedTaskCount).first()
    updated_task_count.count += 1
    db.commit()
    return existing_task

# Endpoint: DELETE a single task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()

    # Increment deleted task count
    deleted_task_count = db.query(DeletedTaskCount).first()
    deleted_task_count.count += 1
    db.commit()
    return {"detail": "Task deleted successfully"}

# Endpoint: DELETE multiple tasks (bulk delete)
@app.delete("/tasks/bulk-delete")
def bulk_delete_tasks(request: BulkDeleteRequest, db: Session = Depends(get_db)):
    print("Received bulk delete request with task IDs:", request.task_ids)
    tasks = db.query(Task).filter(Task.id.in_(request.task_ids)).all()
    if not tasks:
        raise HTTPException(status_code=404, detail="No tasks found for the provided IDs")
    for task in tasks:
        db.delete(task)
    db.commit()

    # Increment deleted task count
    deleted_task_count = db.query(DeletedTaskCount).first()
    deleted_task_count.count += len(tasks)
    db.commit()
    return {"detail": f"{len(tasks)} tasks deleted successfully"}

# Endpoint: GET Dashboard Data
@app.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    total_tasks = db.query(Task).count()
    modified_tasks = db.query(UpdatedTaskCount).first().count
    deleted_tasks = db.query(DeletedTaskCount).first().count
    return {
        "total_tasks": total_tasks,
        "modified_tasks": modified_tasks,
        "deleted_tasks": deleted_tasks,
    }

# Add this line at the end of the file to initialize task counts
@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    initialize_task_counts(db)
    db.close()
