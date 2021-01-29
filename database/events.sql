
-- ADD INTEREST AMOUNT TO FIXED DEPOSIT --
CREATE EVENT `update_fixed_deposit_balance` ON SCHEDULE EVERY 1 DAY STARTS '2021-01-23 23:47:23' ON COMPLETION NOT PRESERVE ENABLE DO
update
  allfixeddeposits
set
  deposit_amount = deposit_amount +(deposit_amount *(interest_rate / 12));


-- ADD INTEREST AMOUNT TO FIXED DEPOSIT --
CREATE EVENT `update_fixed_deposit_balance` ON SCHEDULE EVERY 1 DAY STARTS '2021-01-23 23:47:23' ON COMPLETION NOT PRESERVE ENABLE DO
update
  allfixeddeposits
set
  deposit_amount = deposit_amount +(deposit_amount *(interest_rate / 12));



-- SAVINGS ACCOUNT --
-- amount_to_be_added --
-- interest rate stored daily amount = 0.14/(12*30)

-- happens daily
CREATE EVENT `update_monthly_addition_for_savings_accounts` ON SCHEDULE EVERY 1 DAY STARTS '2021-01-25 22:00:00' ON COMPLETION NOT PRESERVE ENABLE DO
UPDATE all_savings_accounts SET monthly_addition = monthly_addition + ( bank_balance * (interest_rate/(12*30)));


-- happens monthly on a date we pick (like the 27th)
-- happens after amount added to each account
-- EVENT
CREATE EVENT `update_savings_account_balance_monthly` ON SCHEDULE EVERY 30 DAY STARTS '2021-01-25 22:00:00' ON COMPLETION NOT PRESERVE ENABLE DO
CALL update_savings_account_balance();

-- PROCEDURE
DELIMITER $$
CREATE OR REPLACE PROCEDURE `update_savings_account_balance`()
BEGIN 
  START TRANSACTION;
  UPDATE all_savings_accounts SET bank_balance = bank_balance + monthly_addition;
  UPDATE all_savings_accounts SET monthly_addition = 0;
  commit;
END
$$


-- FIXED DEPOSITS --
-- addition of the monthly interest
-- happens daily, happens first
CREATE EVENT `add_fd_interest_to_savings_account_balance_monthly` ON SCHEDULE EVERY 30 DAY STARTS '2021-01-25 22:00:00' ON COMPLETION NOT PRESERVE ENABLE DO 
UPDATE
  all_fixed_deposits
SET
  bank_balance = bank_balance + monthly_addition
  WHERE
  CEIL(DATEDIFF(NOW(), started_date) / 30) = DATEDIFF(NOW(), started_date) / 30;
  


-- TODO:  ADD an event to reset the withdrawal limit of savings accounts
-- TODO: loan creations and updates and installments