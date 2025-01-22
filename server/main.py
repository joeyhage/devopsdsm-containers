import os
import fastapi
import psycopg_pool
import redis
from fastapi.middleware.cors import CORSMiddleware
from psycopg.rows import dict_row

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=False,
    allow_methods=["GET"],
)

redis_client = redis.Redis(
    host=os.getenv("CACHE_HOST", ""),
    port=int(os.getenv("CACHE_PORT", "6379")),
    decode_responses=True,
)
db_pool = psycopg_pool.ConnectionPool(
    os.getenv("DB_DSN", ""), max_size=10, kwargs={"row_factory": dict_row}
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/counter")
async def get_counter():
    count = redis_client.incr("visitor_count")
    return {"count": count}


@app.get("/health")
async def health():
    try:
        with db_pool.connection() as conn, conn.cursor() as cur:
            cur.execute("SELECT 1")
        redis_client.ping()
        return {"status": "healthy", "services": ["db", "redis"]}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", reload=True)
