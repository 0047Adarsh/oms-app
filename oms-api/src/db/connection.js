// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();


// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('❌ Failed to connect to Supabase:', err.message);
//   } else {
//     console.log('✅ Connected to PostgreSQL at', res.rows[0].now);
//   }
// });

// export default pool;
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

supabase
  .from("orders")
  .select("id")
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error("❌ Failed to connect to Supabase:", error.message);
    } else {
      console.log("✅ Connected to Supabase successfully");
    }
  });

export default supabase;