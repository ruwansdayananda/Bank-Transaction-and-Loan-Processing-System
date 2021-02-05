const Employee = require('../../models/Employee');
const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');
const _ = require('lodash');
const Joi = require('joi');



// Validating checking account form 
function validateCheckingAccountForm(account) {

    const schema = Joi.object({

        "branch_id": Joi.number().integer().required(),
        "customer_id": Joi.number().required(),
        "started_date": Joi.date().required(),
        "bank_balance": Joi.number().positive().precision(2),

    });
    return schema.validate(account);

}

const getCheckingAccountForm =async (request, response) => {

    try{

    const id = await Employee.getCheckingAccountID();
    const date = Lookup.getTodayDate();
        return response.status(200).render('employee/checking_account', {
        customer_id:request.session.customer_id,
        id:id[0].AUTO_INCREMENT,
        branch_id: request.user.branch_id,
        date:date
    });
    }catch (error) {
        return response.status(500).send(error.message);
    }
    
}


const createCheckingAccount = async (request,response)=>{
    const {error} = validateCheckingAccountForm(request.body);
    if(error){
        return response.status(400).send(error.message);
    }

    try {
        await Employee.enterCheckingAccount(_.pick(request.body, ["customer_id", "started_date", "bank_balance", "branch_id"]));
    }
    catch (error) {
        return response.status(400).send(error.message);
    }

    return response.render('employee/customer_profile_and_functions', {
        customerExists: true,
        profile: request.session.profile,
        privilege_level: request.session.privilege_level,
        savings_accounts: request.session.savings_accounts,
        fixed_deposits: request.session.fixed_deposits,
        checking_accounts: await Customer.getAllCheckingAccounts(request.session.customer_id)
    });


}

module.exports.createCheckingAccount = createCheckingAccount;
module.exports.getCheckingAccountForm = getCheckingAccountForm;
