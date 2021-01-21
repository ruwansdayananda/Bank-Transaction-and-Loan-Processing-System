CREATE OR REPLACE VIEW `allsavingsaccounts` AS SELECT savings_account_id,customer_id, branch_name, bank_balance, plan_name, no_of_withdrawals_remaining
FROM (savings_account NATURAL JOIN savings_account_plan)
NATURAL JOIN branch;