CREATE TABLE tb_group (
  `seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `group_nm` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '그룹명',
  `reg_dt` DATETIME NOT NULL DEFAULT NOW() COMMENT '등록일',
  `upd_dt` DATETIME NOT NULL DEFAULT NOW() COMMENT '수정일',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;