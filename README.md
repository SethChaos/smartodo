# To-Do List

This project is a To-Do list web application that has two screens

Task Management: shows existing tasks and gives the ability to add, edit, delete or delete multiple tasks.
Task Dashboard: shows the number of existing, updated, and deleted tasks and adds a Circular chart for those numbers.

## Installation

First let`s start by setting up the backend
run these commands to install the required dependencies in a virtual enviorment

```bash
cd backend
python -m venv venv
venv/Scripts/activate
pip install -r requirements.txt
```
now the data base migration 

```bash
alembic --autogenerate
alembic upgrade head
```
NOTE: in this project i used alembic for data base migration due to incompatibility of SQLAlchemy and Aerich i had to choose either using SQLAlchemy with Alembic or Tortoise ORM with Aerich

NOTE: in this project i used this parameteres to access my MySQL found /backend/alembic.ini "sqlalchemy.url = mysql+pymysql://admin:admin@localhost:3306/todo" with admin admin are the user and password for the data base and todo is the name of the data base either you create a todo data base or you reefer to another existing data base.

now we are ready to run the backend by :

```bash
uvicorn main:app --reload
```
For the frontend, in a different terminal follow these commands:

```bash
cd spike
npm install
npm run dev
```
Open your browser to access the application via : http://localhost:3000/

## Application overview

This application was developed using FastAPI and SQLAlchemy for the backend and Alembic for data-base migrations. The frontend was developed using NEXT.js along with Redux and also implemented a WrapPixel template https://www.wrappixel.com/templates/spike-next-js-free-admin-template/

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[The Unlicense](https://choosealicense.com/licenses/unlicense/)