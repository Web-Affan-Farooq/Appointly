import pandas as pd 
from sqlalchemy import create_engine

engine = create_engine("postgresql://affan:secret@localhost:5432/mydb")

sql_query = "SELECT * FROM appointments"
df = pd.read_sql_query(sql_query, engine)

for col in df.columns:
    print(f"value count for col {col} \n")
    print(df[col].value_counts())