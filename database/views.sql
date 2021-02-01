CREATE
OR REPLACE VIEW `all_savings_accounts` AS
SELECT
  savings_account_id,
  customer_id,
  branch_name,
  bank_balance,
  plan_name,
  started_date,
  interest_rate,
  monthly_addition,
  no_of_withdrawals_remaining
FROM
  (
    savings_account NATURAL
    JOIN savings_account_plan
  ) NATURAL
  JOIN branch;

CREATE
OR REPLACE VIEW `all_checking_accounts` AS
SELECT
  checking_account_id,
  customer_id,
  started_date,
  branch_name,
  bank_balance
FROM
  (checking_account NATURAL JOIN branch);

CREATE
OR REPLACE VIEW `all_fixed_deposits` AS
SELECT
  fixed_deposit_id,
  plan_name,
  fixed_deposit.customer_id,
  branch_name,
  branch.branch_id,
  fixed_deposit.started_date,
  deposit_amount,
  account_period_in_months,
  interest_rate,
  fixed_deposit.monthly_addition,
  fixed_deposit.savings_account_id,
  bank_balance
FROM
  ((
    fixed_deposit NATURAL
    JOIN fixed_deposit_plan
  ) NATURAL
  JOIN branch) JOIN savings_account ON (savings_account.savings_account_id = fixed_deposit.savings_account_id);



  CREATE OR REPLACE VIEW `normal_loan_information` AS 
  SELECT normal_loan.loan_id, normal_loan.customer_id,branch.branch_name, normal_loan.loan_installment, normal_loan.loan_amount, normal_loan.status,loan_plan.interest_rate,loan_plan.loan_period_in_months 
  FROM normal_loan JOIN loan_plan ON normal_loan.loan_plan_id=loan_plan.loan_plan_id JOIN branch ON normal_loan.branch_id=branch.branch_id;