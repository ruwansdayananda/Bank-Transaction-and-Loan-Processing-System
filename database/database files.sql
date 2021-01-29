
create database bank;

use bank;
CREATE TABLE `branch` (
  `branch_id` INT NOT NULL AUTO_INCREMENT,
  `branch_name` VARCHAR(50) NOT NULL,
  `branch_address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`branch_id`)
);
INSERT INTO `branch`(`branch_id`, `branch_name`, `branch_address`) VALUES (1,"Malabe","Malabe")

CREATE TABLE `branch_manager` (
  `manager_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(50) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `salary` NUMERIC(9, 2) NOT NULL,
  `date_of_employment` DATE NOT NULL,
  `branch_id` INT NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`manager_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE branch_manager ADD INDEX  (`email`);
INSERT INTO `branch_manager`(`full_name`, `date_of_birth`, `address`, `salary`, `date_of_employment`, `branch_id`, `email`, `password`) 
VALUES ("kjsdnknjasd","2000-02-10","lksmdflkm",200000,"2020-02-18",1,"e@gmail.com","$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO");

CREATE TABLE `employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(30) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `branch_id` INT NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `salary` NUMERIC(9, 2) NOT NULL,
  `date_of_employment` DATE NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE employee ADD INDEX  (`email`);
INSERT INTO `employee`(`full_name`, `address`, `branch_id`, `date_of_birth`, `salary`, `date_of_employment`, `email`, `password`) 
VALUES ("skdjfk","sdnfjdsnfsdfsdf",1,"1999-10-12",123123,"2021-02-19","s@gmail.com","$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO")
CREATE TABLE `customer`(
  customer_id INT NOT NULL,
  account_type ENUM("Individual", "Corporate"),
  PRIMARY KEY (`customer_id`),
  CHECK (
    account_type IN ('Individual', 'Corporate')
  )
);

ALTER TABLE customer ADD INDEX  (`account_type`);
ALTER TABLE customer MODIFY COLUMN account_type ENUM("Individual","Corporate");

CREATE TABLE `individual_customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(20) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `national_ID` VARCHAR(10) NOT NULL,
  `date_of_birth` TEXT NOT NULL,
  `residential_contact_no` VARCHAR(10) NOT NULL,
  `personal_contact_no` VARCHAR(10) NOT NULL,
  `date_joined` TEXT NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`customer_id`),
  FOREIGN KEY(`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE individual_customer AUTO_INCREMENT = 100001;
ALTER TABLE individual_customer ADD INDEX  (`email`);


CREATE TABLE `corporate_customer` (
    `customer_id` INT NOT NULL AUTO_INCREMENT,
    `company_registration_number` VARCHAR(40) NOT NULL,
    `company_name` VARCHAR(20) NOT NULL,
    `company_email` VARCHAR(50) NOT NULL UNIQUE,
    `address` VARCHAR(100) NOT NULL,
    `date_of_establishment` TEXT NOT NULL,
    `contact_no` VARCHAR(10) NOT NULL,
    `date_joined` TEXT NOT NULL,
    `correspondent` VARCHAR(20) NOT NULL,
    `correspondent_email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`customer_id`),
    FOREIGN KEY(`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
  );
ALTER TABLE corporate_customer AUTO_INCREMENT = 200001;
ALTER TABLE corporate_customer ADD INDEX  (`company_email`);
ALTER TABLE corporate_customer ADD INDEX (`correspondent_email`);


CREATE TABLE `savings_account_plan`(
    `savings_plan_id` INT NOT NULL,
    `plan_name` VARCHAR(10) NOT NULL,
    `interest_rate` NUMERIC(4, 2) NOT NULL,
    `minimum_required_balance` NUMERIC(6, 2) NOT NULL,
    PRIMARY KEY (`savings_plan_id`)
  );
CREATE TABLE `savings_account` (
    `savings_account_id` INT NOT NULL AUTO_INCREMENT,
    `branch_id` INT NOT NULL,
    `customer_id` INT NOT NULL,
    `started_date` DATE NOT NULL,
    `bank_balance` NUMERIC(12, 2) NOT NULL,
    `no_of_monthly_withdrawals` INT NOT NULL,
    `savings_plan_id` INT NOT NULL,
    `max_withdrawal_limit` NUMERIC (9, 2) NOT NULL,
    `status ` ENUM("Open", "Closed") DEFAULT "Open",
    `source_of_funds` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`savings_account_id`),
    FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`savings_plan_id`) REFERENCES savings_account_plan(`savings_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
  );
ALTER TABLE savings_account AUTO_INCREMENT = 600001;
ALTER TABLE savings_account ADD INDEX  (`branch_id`);
ALTER TABLE savings_account ADD INDEX  (`customer_id`);
ALTER TABLE `savings_account` CHANGE `started_date` `started_date` TEXT NOT NULL;

ALTER TABLE `savings_account` CHANGE `no_of_monthly_withdrawals` `no_of_withdrawals_remaining` INT(11) NOT NULL;

CREATE TABLE `checking_account` (
    `checking_account_id` INT NOT NULL AUTO_INCREMENT,
    `branch_id` INT NOT NULL,
    `customer_id` INT NOT NULL,
    `started_date` DATE NOT NULL,
    `bank_balance` NUMERIC(12, 2) NOT NULL,
    `status ` ENUM("Open", "Closed") DEFAULT "Open",
    PRIMARY KEY (`checking_account_id`),
    FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
  );
ALTER TABLE checking_account AUTO_INCREMENT = 700001;
ALTER TABLE checking_account ADD INDEX  (`branch_id`);
ALTER TABLE checking_account ADD INDEX  (`customer_id`);
ALTER TABLE `checking_account` CHANGE `started_date` `started_date` TEXT NOT NULL;

CREATE TABLE `fixed_deposit_plan`(
  `fixed_deposit_plan_id` INT NOT NULL AUTO_INCREMENT ,
  `plan_name` VARCHAR(10) NOT NULL,
  `interest_rate` NUMERIC(4,2) NOT NULL,
  `account_period_in_months` INT NOT NULL,
  PRIMARY KEY (`fixed_deposit_plan_id`)
);

CREATE TABLE `fixed_deposit` (
  `fixed_deposit_id` INT NOT NULL AUTO_INCREMENT,
  `fixed_deposit_plan_id` INT NOT NULL,
  `branch_id` INT NOT NULL,
  `savings_account_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `deposit_amount` NUMERIC(12,2) NOT NULL,
  `started_date` DATE NOT NULL,
  `status` ENUM("Open", "Closed") DEFAULT "Open",
  PRIMARY KEY (`fixed_deposit_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`),
  FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`fixed_deposit_plan_id`) REFERENCES fixed_deposit_plan(`fixed_deposit_plan_id`)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`savings_account_id`) REFERENCES savings_account(`savings_account_id`)  ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE fixed_deposit AUTO_INCREMENT= 800001;
ALTER TABLE fixed_deposit ADD INDEX  (`customer_id`);
ALTER TABLE fixed_deposit ADD INDEX  (`branch_id`);
ALTER TABLE `fixed_deposit` CHANGE `started_date` `started_date` TEXT NOT NULL;

-- DEPOSITS TABLE --
CREATE TABLE `deposit` (
  `deposit_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `account_id` INT NOT NULL,
  `amount` decimal(6, 2) NOT NULL,
  PRIMARY KEY (`deposit_id`)
);
ALTER TABLE deposit AUTO_INCREMENT= 70000001;
ALTER TABLE deposit ADD INDEX  (`account_id`);
ALTER TABLE deposit ADD INDEX  (`date`);

-- WITHDRAWALS TABLE --
CREATE TABLE `withdrawal` (
  `withdrawal_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `account_id` INT NOT NULL,
  `amount` decimal(9, 2) NOT NULL,
  PRIMARY KEY (`withdrawal_id`)
);
ALTER TABLE withdrawal AUTO_INCREMENT= 80000001;
ALTER TABLE withdrawal ADD INDEX  (`account_id`);
ALTER TABLE withdrawal ADD INDEX  (`date`);

-- TRANSACTIONS TABLE --
CREATE TABLE `transaction` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `date` TEXT NOT NULL,
  `initiating_account_id` INT NOT NULL,
  `receiving_account_id` INT NOT NULL,
  `transaction_amount` NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  FOREIGN KEY (`initiating_account_id`) REFERENCES transactional_table(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`receiving_account_id`) REFERENCES transactional_table(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE transaction AUTO_INCREMENT= 90000001;
ALTER TABLE transaction ADD INDEX  (`date`);



CREATE TABLE `loan_plan`(
    `loan_plan_id` INT NOT NULL AUTO_INCREMENT,
    `plan_name` VARCHAR(10) NOT NULL,
    `interest_rate` NUMERIC(4, 2) NOT NULL,
    `loan_period_in_years` INT NOT NULL,
    PRIMARY KEY (`loan_plan_id`)
  );

CREATE TABLE `loan`(
    `loan_id` INT NOT NULL,
    `loan_type` ENUM("Normal", "Online"),
    `status ` ENUM("Open", "Closed") DEFAULT "Open",
    PRIMARY KEY (`loan_id`),
    CHECK (loan_type IN ('Normal', 'Online'))
  );
ALTER TABLE loan MODIFY COLUMN loan_type ENUM("Normal","Online");
  
CREATE TABLE `normal_loan` (
    `loan_id` INT NOT NULL AUTO_INCREMENT,
    `loan_plan_id` INT NOT NULL,
    `account_id` VARCHAR(30) NOT NULL,
    `customer_id` INT NOT NULL,
    `branch_id` INT NOT NULL,
    `loan_installment` NUMERIC(12, 2) NOT NULL,
    `created_date` DATE NOT NULL,
    `loan_amount` NUMERIC(12, 2) NOT NULL,
    PRIMARY KEY (`loan_id`),
    FOREIGN KEY (`loan_id`) REFERENCES loan(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`loan_plan_id`) REFERENCES loan_plan(`loan_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE -- account id links to ??
  );
ALTER TABLE normal_loan AUTO_INCREMENT = 400001;
ALTER TABLE normal_loan ADD INDEX  (`account_id`);
ALTER TABLE normal_loan ADD INDEX  (`customer_id`);
ALTER TABLE normal_loan ADD INDEX  (`branch_id`);
ALTER TABLE `normal_loan` CHANGE `is_approved` `status` ENUM('Pending','Rejected','Approved') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending';

CREATE TABLE `online_loan` (
    `loan_id` INT NOT NULL AUTO_INCREMENT,
    `loan_plan_id` INT NOT NULL,
    `fixed_deposit_id` INT NOT NULL,
    `customer_id` INT NOT NULL,
    `branch_id` INT NOT NULL,
    `loan_installment` NUMERIC(12, 2) NOT NULL,
    `loan_amount` NUMERIC(8, 2) NOT NULL,
    `created_date` DATE NOT NULL,
    PRIMARY KEY (`loan_id`),
    FOREIGN KEY (`loan_id`) REFERENCES loan(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`fixed_deposit_id`) REFERENCES fixed_deposit(`fixed_deposit_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`loan_plan_id`) REFERENCES loan_plan(`loan_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK ((`loan_amount` < 500000.00))
  );
ALTER TABLE online_loan AUTO_INCREMENT = 500001;
ALTER TABLE online_loan ADD INDEX  (`fixed_deposit_id`);
ALTER TABLE online_loan ADD INDEX  (`customer_id`);
ALTER TABLE online_loan ADD INDEX  (`branch_id`);

CREATE TABLE `loan_installment` (
    `installment_id` INT NOT NULL AUTO_INCREMENT,
    `loan_id` INT NOT NULL,
    `due_date` DATE NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`installment_id`),
    FOREIGN KEY (`loan_id`) REFERENCES loan(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE
  );
ALTER TABLE loan_installment AUTO_INCREMENT = 30000001;
ALTER TABLE loan_installment ADD INDEX  (`status`);
ALTER TABLE loan_installment MODIFY COLUMN status ENUM("Due","Paid","Late");
