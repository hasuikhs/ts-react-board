import LoginManagerInterface from '../inf/loginManager.interface';
import pool from '../../utils/mysqlConnection';
import mysql from 'mysql';
import { checkPassword } from '../../utils/passwordUtil';

class LoginManager implements LoginManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async login(id: string, password: string): Promise<string> {

    const sql = `
      SELECT user_id, user_pw
      FROM tb_user
      WHERE user_id = ?
    `;
    const params: string[] = [ id ];

    return new Promise<string>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`login method error. cuase: ${ err }`));

          if (!rows.length || !checkPassword(password, rows[0]?.user_pw)) {
            resolve('FAIL');
          } else {
            // 로그인 성공시 로그인 시간(login_dt) 업데이트
            this._conn.getConnection((connErr, conn) => {
              const updSql = `
                UPDATE tb_user
                SET login_dt = NOW()
                WHERE user_id= ?
              `;
              const params: number[] = [ rows[0].user_id ];

              conn.query(updSql, params, (err, rows) => {
                if (err) reject(new Error(`login method update error. cause: ${ err }`));

                resolve('SUCCESS');
              });
            });
          }
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async checkDupId(id: string): Promise<string> {

    const sql: string = `
      SELECT *
      FROM tb_user
      WHERE user_id = ?
    `;
    const params: string[] = [ id ];

    return new Promise<string>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`checkDupId method error. cause: ${ err }`));

          if (rows.length) {
            resolve('DISALLOW');
          } else {
            resolve('ALLOW');
          }
        });

        // return connection pool
        conn.release();
      });
    });
  }

}

export default LoginManager;