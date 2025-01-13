const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgresql://postgres.tmruxlltbamxjhwxijrr:addVxZU6ZcKsuhXP@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres', // URI yang valid
    max: 10, // Maksimal 10 koneksi dalam pool
    idleTimeoutMillis: 30000, // Timeout untuk koneksi idle (30 detik)
    connectionTimeoutMillis: 5000, // Timeout saat menunggu koneksi (5 detik)
  });
  const getPropinsi = async () => {
    try {
      const res = await pool.query('SELECT propinsi from sekolah');
      return res.rows.length > 0 ? res.rows : false;
    } catch (err) {
      console.error('Query error:', err);
    }
  }; 
  const getSekolah = async (keyword) => {
    try {
      const res = await pool.query(`SELECT * from sekolah where sekolah like '%${keyword.toUpperCase()}%'`);
      return res.rows.length > 0 ? res.rows : false;
    } catch (err) {
      console.error('Query error:', err);
    }
  }; 

  module.exports = { getPropinsi, getSekolah, }