# Task Monitoring

## Installation

### Database
  Go to `database` folder

    cd database
    
  Import `task_monitoring_db.sql` database (PostgreSQL)
  
### Install API
  Go to `api` folder
  
    cd api
    
  Install
  
    npm i
    
  Open and adjust the `.env` file
  
    PGDATABASE='database_name'
    PGUSER='postgres_username'
    PGPASSWORD='postgres_password'
    PGHOST=localhost

    APIPORT='api_port'

  Start the API
  
    node .

## Documentation

### Register (`POST`)

#### URL:

    http://localhost:2000/user/register

#### Body:

`username` (String), `password` (String), `roleId` (Integer)

Use `"roleId": 1` for `Manager` user role

Use `"roleId": 0` for `Employee` user role

#### Request body example:

    {
      "username": "taskManager",
      "password": "password",
      "roleId": 1
    }

#### Output example:

    {
      "message": "Registered"
    }
    
--

### Login (`POST`)

#### URL:

    http://localhost:2000/user/login
    
#### Body:

`username` (String), `password` (String)


#### Request body example:

    {
      "username": "taskManager",
      "password": "password",
    }

#### Output example:

    {
      "userId": 71,
      "username": "taskManager",
      "roleId": 1,
      "role": "Manager"
    }

--


### Create Task - Employee Only (`POST`)

Please register Employee user first!

#### URL:

    http://localhost:2000/task
    
#### Body:

`userId` (Integer), `detail` (String)

`userId` must be the id of the user with `Employee` role

#### Request body example:

    {
      "username": "taskManager",
      "password": "password",
    }
    
#### Output example:

    {
      "message": "Task added"
    }

--

### Get All Task - Manager Only (`GET`)

Please register Manager user first!

#### URL:

    http://localhost:2000/task/user/all
    
#### Body:

`userId` (Integer)

`userId` must be the id of the user with `Manager` role

#### Request body example:

    {
      "userId": 1
    }
    
#### Output example:

    [
      {
        "taskId": 3,
        "username": "ahmad",
        "detail": "Upload video",
        "createdAt": "2021-08-21T21:25:51.316Z",
        "updatedAt": "2021-08-21T21:25:51.316Z"
      },
      {
        "taskId": 2,
        "username": "ahmad",
        "detail": "Upload image",
        "createdAt": "2021-08-21T19:55:51.316Z",
        "updatedAt": "2021-08-21T19:55:51.316Z"
      },
      {
        "taskId": 1,
        "username": "luthfi",
        "detail": "Fix bug on landing page",
        "createdAt": "2021-08-22T17:55:26.379Z",
        "updatedAt": "2021-08-21T17:55:26.379Z"
      }
    ]

--

### Get Task - Employee Only (`GET`)

Please register Employee user first!

#### URL:

    http://localhost:2000/task/user/:userId
    
`userId` must be the id of the user with Employee role   
   
URL example:

    http://localhost:2000/task/user/3
    
#### Output example:

    [
      {
        "taskId": 3,
        "username": "ahmad",
        "detail": "Upload video",
        "createdAt": "2021-08-21T21:25:51.316Z",
        "updatedAt": "2021-08-21T21:25:51.316Z"
      },
      {
        "taskId": 2,
        "username": "ahmad",
        "detail": "Upload image",
        "createdAt": "2021-08-21T19:55:51.316Z",
        "updatedAt": "2021-08-21T19:55:51.316Z"
      }
    ]

--

### Edit Task - Employee Only (`PATCH`)

Please register Employee user first!

#### URL:

    http://localhost:2000/task/:taskId
    
URL Example:

    http://localhost:2000/task/1
    
#### Body:

`userId` (Integer), `detail` (String)
    
`userId` must be the id of the user with `Employee` role

`userId` must be user yang memiliki task terikait

#### Request body example:

    {
      "userId": 2,
      "detail": "Fix bug on cart page"
    }

#### Output example:

    {
      "message": "Task edited"
    }

--

### Delete Task - Employee Only (`DELETE`)

Please register Employee user first!

#### URL:

    http://localhost:2000/task/:taskId
    
URL Example:

    http://localhost:2000/task/3
    
#### Body:

`userId` (Integer)
    
`userId` must be the id of the user with `Employee` role

`userId` must be user yang memiliki task terkait

#### Request body example:

    {
      "userId": 2
    }

#### Output example:

    {
      "message": "Task deleted"
    }

--
