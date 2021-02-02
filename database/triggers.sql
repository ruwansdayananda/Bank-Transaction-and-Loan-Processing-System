DELIMITER $$
CREATE OR REPLACE TRIGGER `after_branch_manager_approval` AFTER UPDATE ON `normal_loan`
 FOR EACH ROW BEGIN
	DECLARE months INT DEFAULT 0;
	IF (NEW.status!=OLD.status AND NEW.status="Approved") THEN
    SELECT loan_period_in_months INTO months FROM loan_plan WHERE loan_plan.loan_plan_id = NEW.loan_plan_id;
	INSERT INTO `loan_installment`(`loan_id`, `due_date`, `remaining_no_of_installments`) VALUES (NEW.loan_id,CURRENT_DATE + INTERVAL 30 DAY,months);
	END IF;
END $$

-- cant set autocommit from inside a stored funvtion or trigger