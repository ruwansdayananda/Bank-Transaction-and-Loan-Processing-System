
-- ADD INTEREST AMOUNT TO FIXED DEPOSIT --
CREATE EVENT `update_fixed_deposit_balance` ON SCHEDULE EVERY 1 DAY STARTS '2021-01-23 23:47:23' ON COMPLETION NOT PRESERVE ENABLE DO
update
  allfixeddeposits
set
  deposit_amount = deposit_amount +(deposit_amount *(interest_rate / 12));