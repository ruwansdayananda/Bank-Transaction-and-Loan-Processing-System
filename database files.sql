
create database bank;

use bank;

CREATE TABLE `branch` (
  `branch_id` INT NOT NULL AUTO_INCREMENT,
  `branch_name` VARCHAR(50) NOT NULL,
  `branch_address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`branch_id`)
);

CREATE TABLE `branch_manager` (
  `manager_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(50) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `address`  VARCHAR(100) NOT NULL,
  `salary` NUMERIC(9,2) NOT NULL,
  `date_of_employment`  DATE NOT NULL,
  `branch_id` INT NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`manager_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `employee` (
  `employee_id`INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(30) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `branch_id` INT NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `salary` NUMERIC(9,2) NOT NULL,
  `date_of_employment` DATE NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `customer`(
  customer_id INT NOT NULL,
  account_type VARCHAR(25) NOT NULL,
  PRIMARY KEY (`customer_id`),
  CHECK (account_type IN ('individual_customer','corporate_customer'))
);

CREATE TABLE `individual_customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT ,
  `full_name` VARCHAR(20) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `national_ID` VARCHAR(10) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `residential_contact_no` VARCHAR(10) NOT NULL,
  `personal_contact_no` VARCHAR(10) NOT NULL,
  `date_joined` DATE NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`customer_id` ),
  FOREIGN KEY(`customer_id`) REFERENCES customer(`customer_id`)
  ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE individual_customer AUTO_INCREMENT= 100001;


CREATE TABLE `corporate_customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `company_registration_number` VARCHAR(40) NOT NULL,
  `company_name` VARCHAR(20) NOT NULL,
  `company_email` VARCHAR(50) NOT NULL UNIQUE,
  `address` VARCHAR(100) NOT NULL,
  `date_of_establishment` DATE NOT NULL,
  `contact_no` VARCHAR(10) NOT NULL,
  `date_joined` DATE NOT NULL,
  `correspondent` VARCHAR(20) NOT NULL,
  `correspondent_email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`customer_id` ),
  FOREIGN KEY(`customer_id`) REFERENCES customer(`customer_id`)
  ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE corporate_customer AUTO_INCREMENT= 200001;

CREATE TABLE `savings_account_plan`(
  `savings_plan_id` INT NOT NULL,
  `plan_name` VARCHAR(10) NOT NULL,
  `interest_rate` NUMERIC(4,2) NOT NULL,
  `minimum_required_balance` NUMERIC(6,2) NOT NULL,
  PRIMARY KEY (`savings_plan_id`)
);

CREATE TABLE `savings_account` (
  `savings_account_id` INT NOT NULL AUTO_INCREMENT,
  `branch_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `started_date` DATE NOT NULL,
  `bank_balance` NUMERIC(12,2) NOT NULL,
  `no_of_monthly_withdrawals` INT NOT NULL,
  `savings_plan_id` INT NOT NULL,
  `max_withdrawal_limit` NUMERIC (9,2) NOT NULL,
  `source_of_funds` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`savings_account_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`savings_plan_id`) REFERENCES savings_account_plan(`savings_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE savings_account AUTO_INCREMENT= 600001;


CREATE TABLE `checking_account` (
  `checking_account_id` INT NOT NULL AUTO_INCREMENT,
  `branch_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `started_date` DATE NOT NULL,
  `bank_balance` NUMERIC(12,2) NOT NULL,
  PRIMARY KEY (`checking_account_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE checking_account AUTO_INCREMENT= 700001;

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
  `savings_account_id` VARCHAR(30) NOT NULL,
  `customer_id` INT NOT NULL,
  `deposit_amount` NUMERIC(12,2) NOT NULL,
  `started_date` DATE NOT NULL,
  PRIMARY KEY (`fixed_deposit_id`),
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`),
  FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`fixed_deposit_plan_id`) REFERENCES fixed_deposit_plan(`fixed_deposit_plan_id`)  ON DELETE CASCADE ON UPDATE CASCADE
  FOREIGN KEY (`savings_account_id`) REFERENCES savings_account(`savings_account_id`)  ON DELETE CASCADE ON UPDATE CASCADE

);
ALTER TABLE fixed_deposit AUTO_INCREMENT= 800001;

CREATE TABLE `transaction` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `initiating_account_id` VARCHAR(30) NOT NULL,
  `receiving _account_id` VARCHAR(30) NOT NULL,
  `transaction_amount` NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (`transaction_id`)
  --FOREIGN key how? checking n savings both

);
ALTER TABLE transaction AUTO_INCREMENT= 90000001;

CREATE TABLE `loan_plan`(
  `loan_plan_id` INT NOT NULL AUTO_INCREMENT,
  `plan_name` VARCHAR(10) NOT NULL,
  `interest_rate` NUMERIC(4,2) NOT NULL,
  `loan_period_in_years` INT NOT NULL,
  PRIMARY KEY (`loan_plan_id`)
);

CREATE TABLE `loan`(
  `loan_id` INT NOT NULL,
  `loan_type` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`loan_id`),
  CHECK (loan_type IN ('normal_loan','online_loan'))
);

CREATE TABLE `normal_loan` (
  `loan_id` INT NOT NULL AUTO_INCREMENT,
  `loan_plan_id` INT NOT NULL,
  `account_id` VARCHAR(30) NOT NULL,
  `customer_id` INT NOT NULL,
  `branch_id` INT NOT NULL,
  `loan_installment` NUMERIC(12,2) NOT NULL,
  `created_date` DATE NOT NULL,
  `loan_amount` NUMERIC(12,2) NOT NULL,
  PRIMARY KEY (`loan_id`),
  FOREIGN KEY (`loan_id`) REFERENCES loan(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES customer(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`loan_plan_id`) REFERENCES loan_plan(`loan_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
  -- account id links to ??
);
ALTER TABLE normal_loan AUTO_INCREMENT= 400001;

CREATE TABLE `online_loan` (
  `loan_id` INT NOT NULL AUTO_INCREMENT,
  `loan_plan_id` INT NOT NULL,
  `fixed_deposit_id`  INT NOT NULL,
  `customer_id` INT NOT NULL,
  `branch_id` INT NOT NULL,
  `loan_installment` NUMERIC(12,2) NOT NULL,
  `loan_amount` NUMERIC(8,2) NOT NULL,
  `created_date` DATE NOT NULL,
  PRIMARY KEY (`loan_id`),
  FOREIGN KEY (`loan_id`) REFERENCES loan(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`fixed_deposit_id`) REFERENCES fixed_deposit(`fixed_deposit_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`loan_plan_id`) REFERENCES loan_plan(`loan_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK ((`loan_amount` < 500000.00))
);
ALTER TABLE online_loan AUTO_INCREMENT= 500001;

CREATE TABLE `loan_installment` (
  `installment_id` INT NOT NULL AUTO_INCREMENT,
  `loan_id` INT NOT NULL,
  `due_date` DATE NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`installment_id`),
  FOREIGN KEY (`loan_id`) REFERENCES loan(`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
ALTER TABLE loan_installment AUTO_INCREMENT= 30000001;
