from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from database import Base

# declaration of our data base table using sqlalchemy
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=True)
    is_complete = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.datetime.utcnow)

class UpdatedTaskCount(Base):
    __tablename__ = "updated_task_count"
    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)

class DeletedTaskCount(Base):
    __tablename__ = "deleted_task_count"
    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)