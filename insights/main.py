import pandas as pd 
from sqlalchemy import create_engine

engine = create_engine("postgresql://affan:secret@localhost:5432/mydb")

sql_query = "SELECT * FROM appointments"
df = pd.read_sql(sql_query, engine)
print(df.count_values())