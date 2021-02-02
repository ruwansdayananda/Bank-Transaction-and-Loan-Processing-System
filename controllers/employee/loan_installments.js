const Employee = require('../../models/Employee');

const getLoanInstallmentInformation = async (req, res)=>{
    const loan_id = req.session.loan_id;
    try {
        const late_installments = await Employee.getLateInstallments(loan_id);

        if (late_installments.length>0)
        {
                return res.render('employee/loan_installment_page', {
                    is_late: true,
                    loan_id:loan_id,
                    installments: late_installments
                }
            );
        }
        else {
            const current_installments = await Employee.getCurrentInstallments(loan_id);
            return res.render('employee/loan_installment_page', {
                loan_id: loan_id,
                is_late: false,
                installments: current_installments
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).render('500');
    }
}

module.exports.getLoanInstallmentInformation = getLoanInstallmentInformation;
