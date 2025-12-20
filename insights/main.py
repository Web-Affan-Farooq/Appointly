import pandas as pd 
from sqlalchemy import create_engine

engine = create_engine("postgresql://postgres.awaymbjagjycpkoxgqjt:pasword9032JDW@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres")

sql_query = "SELECT * FROM appointments"
df = pd.read_sql_query(sql_query, engine)

df.to_csv("r.csv")