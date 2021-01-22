CREATE
OR REPLACE VIEW `allsavingsaccounts` AS
SELECT
  savings_account_id,
  customer_id,
  branch_name,
  bank_balance,
  plan_name,
  no_of_withdrawals_remaining
FROM
  (
    savings_account NATURAL
    JOIN savings_account_plan
  ) NATURAL
  JOIN branch;

CREATE
OR REPLACE VIEW `allcheckingaccounts` AS
SELECT
  checking_account_id,
  customer_id,
  branch_name,
  bank_balance
FROM
  (checking_account NATURAL JOIN branch);

CREATE
OR REPLACE VIEW `allfixeddeposits` AS
SELECT
  fixed_deposit_id,
  plan_name,
  customer_id,
  branch_name,
  deposit_amount,
  account_period_in_months,
  interest_rate,
  savings_account_id
FROM
  (
    fixed_deposit NATURAL
    JOIN fixed_deposit_plan
  ) NATURAL
  JOIN branch;