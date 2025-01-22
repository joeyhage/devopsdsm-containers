import fastapi

app = fastapi.FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
 
    uvicorn.run("main:app", host="0.0.0.0", reload=True)