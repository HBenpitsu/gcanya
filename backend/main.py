from fastapi import Request, Response
from AssignmentRegister import AssignmentHandler
from AuthHandler import GoogleAPITokenHandler
from server import Server

serv = Server()
GoogleAPITokenHandler(serv.APP)
AssignmentHandler(serv.APP)

app = serv.APP

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port="8000")