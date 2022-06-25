CREATE TABLE tb_server (
  `seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `server_nm` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '서버명',
  `server_id` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '서버 ID',
  `cpu_cnt` TINYINT NOT NULL DEFAULT 0 COMMENT 'CPU 수',
  `ram` TINYINT NOT NULL DEFAULT 0 COMMENT 'RAM 용량',
  `disk` INT NOT NULL DEFAULT 50 COMMENT 'DISK 용량',
  `os` VARCHAR(32) NOT NULL DEFAULT '' COMMENT 'OS',
  `is_active` TINYINT NOT NULL COMMENT '활성 여부',
  `reg_dt` DATETIME NOT NULL DEFAULT '2022-01-01 00:00:00' COMMENT '등록일',
  `upd_dt` DATETIME NOT NULL DEFAULT '2022-01-01 00:00:00' COMMENT '수정일',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;