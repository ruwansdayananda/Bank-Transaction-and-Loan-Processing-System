-- First, change the default delimiter to $$
-- Second, use (;) in the body of the stored procedure and $$ after the END keyword to end the stored procedure.
-- Third, change the default delimiter back to a semicolon (;)


-- TBD --




-- COMPLETED PROCEDURES THAT RUN FINE --
-- BRANCH MANAGER STUFF
DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_branch_manager` (
  `full_name` VARCHAR(50),
  `date_of_birth` DATE,
  `address`  VARCHAR(100),
  `salary` NUMERIC(9,2),
  `date_of_employment`  DATE,
  `branch_id` INT,
  `email` VARCHAR(50),
  `password` VARCHAR(50))
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `branch_manager` (`full_name`,`date_of_birth`,`address`,`salary` ,
    `date_of_employment`,`branch_id`,`email`,`password`) VALUES 
    (full_name,date_of_birth,address,salary,date_of_employment,branch_id,email,password);
    commit;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_employee` (
  `full_name` VARCHAR(30),
  `address` VARCHAR(100),
  `branch_id` INT,
  `date_of_birth` DATE,
  `salary` NUMERIC(9,2) ,
  `date_of_employment` DATE,
  `email` VARCHAR(50),
  `password` VARCHAR(50))
BEGIN
    set AUTOCOMMIT = 0;
    INSERT INTO `employee` (`full_name`,`address`,`branch_id`,`date_of_birth` ,
    `salary`,`date_of_employment`,`email`,`password`) VALUES 
    (full_name,address,branch_id,date_of_birth,salary,date_of_employment,email,password);
    commit;
END$$


-- EMPLOYEE STUFF 
DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_individual_customer` (
    IN `full_name` VARCHAR(20),
    IN `address` VARCHAR(100),
    IN `national_ID` VARCHAR(10),
    IN `date_of_birth` DATE,
    IN `residential_contact_no` VARCHAR(10),
    IN `personal_contact_no` VARCHAR(10),
    IN `date_joined` DATE,
    IN `email_address` VARCHAR(50),
    IN `password` VARCHAR(30))

BEGIN
    DECLARE id INT DEFAULT 0;
    SELECT AUTO_INCREMENT INTO id FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'bank' AND TABLE_NAME = 'individual_customer';    -- id = 10004
    SELECT id;
    INSERT INTO `customer`(`customer_id`,`account_type`) VALUES (id, "Individual");
    INSERT INTO `individual_customer` (`full_name`,`address`,`national_ID`,`date_of_birth` ,`residential_contact_no`,`personal_contact_no`,`date_joined`,`email_address`,`password`) VALUES (full_name,address,national_ID,date_of_birth,residential_contact_no,personal_contact_no,date_joined,email_address,password);
    commit;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_corporate_customer` (
  IN `company_registration_number` VARCHAR(40) ,
  IN `company_name` VARCHAR(20),
  IN `company_email_address` VARCHAR(50),
  IN `address` VARCHAR(100),
  IN `date_of_establishment` DATE,
  IN `contact_no` VARCHAR(10) ,
  IN `date_joined` DATE,
  IN `correspondent` VARCHAR(20) ,
  IN `correspondent_email_address` VARCHAR(50),
  IN `password` VARCHAR(30))
BEGIN
    DECLARE new_id INT DEFAULT 0;
    SELECT AUTO_INCREMENT INTO new_id FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'bank' AND TABLE_NAME = 'corporate_customer';
    SELECT new_id;
    INSERT INTO `customer`(`customer_id`,`account_type`) VALUES (id, "Corporate");
    INSERT INTO `corporate_customer` (`company_registration_number`,`company_name`,`company_email_address`,`address` ,
    `date_of_establishment`,`contact_no`,`date_joined`,`correspondent`,`correspondent_email_address`,`password`) VALUES 
    (company_registration_number,company_name,company_email_address,address,date_of_establishment,contact_no,date_joined,correspondent,correspondent_email_address,password);
    commit;
END$$

-- ACCOUNT STUFF
DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_savings_account` (
  IN `branch_id` INT,
  IN `customer_id` INT,
  IN `started_date` DATE ,
  IN `bank_balance` NUMERIC(12,2),
  IN `no_of_monthly_withdrawals` INT,
  IN `savings_plan_id` INT ,
  IN `max_withdrawal_limit` NUMERIC (9,2) ,
  IN `source_of_funds` VARCHAR(20) )
BEGIN
    INSERT INTO `savings_account` (`branch_id`,`customer_id`,`started_date`,`bank_balance` ,
    `no_of_monthly_withdrawals`,`savings_plan_id`,`max_withdrawal_limit`,`source_of_funds`) VALUES 
    (branch_id,customer_id,started_date,bank_balance,no_of_monthly_withdrawals,savings_plan_id,max_withdrawal_limit,source_of_funds);
    commit;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_checking_account` (
  IN `customer_id` INT,
  IN `started_date` DATE ,
  IN `bank_balance` NUMERIC(12,2),
  IN `branch_id` INT)
BEGIN
    INSERT INTO `checking_account` (`customer_id`,`started_date`,`bank_balance`,`branch_id`) VALUES (customer_id,started_date,bank_balance,branch_id);
    commit;
END$$


DELIMITER $$
CREATE OR REPLACE PROCEDURE `create_fixed_deposit` (
  IN `fixed_deposit_plan_id` INT,
  IN `branch_id` INT,
  IN `savings_account_id` VARCHAR(30),
  IN `customer_id` INT,
  IN `deposit_amount` NUMERIC(12,2),
  IN `started_date` DATE)
BEGIN
    INSERT INTO `fixed_deposit` (`fixed_deposit_plan_id`,`branch_id`,`savings_account_id`,`customer_id`,`deposit_amount`,`started_date`)
    VALUES (fixed_deposit_plan_id,branch_id,savings_account_id,customer_id,deposit_amount,started_date);
    commit;
END$$



-- LOGIN STUFF

DELIMITER $$
CREATE OR REPLACE  PROCEDURE `login_branch_manager` (
  IN `email` VARCHAR(50),
  IN `password` VARCHAR(50))
BEGIN
    
    set AUTOCOMMIT = 0;
    DECLARE pw VARCHAR(50);
    SELECT password INTO pw FROM `branch_manager` WHERE `email` = email;
    RETURN pw;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `login_employee` (
  IN `email` VARCHAR(20))
BEGIN
    set AUTOCOMMIT = 0;
    SELECT * FROM `employee` WHERE `email` = email;
    commit;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `login_corporate_customer` (
  IN `email` VARCHAR(20))
BEGIN
    set AUTOCOMMIT = 0;
    SELECT * FROM `corporate_customer` WHERE `email` = email;
    commit;
END$$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `login_individual_customer` (
  IN `email` VARCHAR(20))
BEGIN
    set AUTOCOMMIT = 0;
    SELECT * FROM `individual_customer` WHERE `email` = email;
    commit;
END$$