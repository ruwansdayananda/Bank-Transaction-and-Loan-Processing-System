
const Joi = require('joi');
const _ = require('lodash');

const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');


function validateOnlineLoan(onlineLoan) {

    const schema = Joi.object({
        "loan_plan_id": Joi.number().integer().required(),
        "customer_id": Joi.number().integer().required(),
        "loan_amount": Joi.number().positive().precision(2).required(),
    });
    return schema.validate(onlineLoan);

}




const createOnlineLoan = async (request,response) => {
    const {error} = validateOnlineLoan(_.pick(request.body, ["loan_plan_id", "customer_id","loan_amount"]));

    if(error) return response.status(404).send(error.details[0].message);

    const interest_rates = request.body.interest_rate;
    const interest_rate = parseFloat(interest_rates[parseInt(request.body.loan_plan_id)-1]);
    
    request.body.fixed_deposit=JSON.parse(request.body.fixed_deposit);
    request.body.fixed_deposit_id = request.body.fixed_deposit.fixed_deposit_id;
    request.body.branch_id = request.body.fixed_deposit.branch_id;
    request.body.loan_installment = parseFloat(request.body.loan_amount)*interest_rate/1200;

    let max_loan_amount = Math.min(500000.0,parseFloat(request.body.fixed_deposit.deposit_amount)*0.6);

    if(parseFloat(request.body.loan_amount) > max_loan_amount){
        return response.send("ERROR GO BACK");
    }

    else{
        try {
            await Customer.createOnlineLoan(_.pick(request.body, ["loan_plan_id", "fixed_deposit_id", "customer_id", "branch_id","loan_installment","loan_amount"]));
        } catch (error) {
            console.log(error.message);
        }
        return response.status(200).send(request.body);

    }


    
};

const loadOnlineLoanForm = async (request,response)=>{

    try {
        const fids = await Customer.getAllFixedDepositsIDs(request.user.customer_id);
        const loanPlans = await Customer.getAllLoanPlans();
        const nextId = await Customer.getOnlineLoanID();
        const today = await Lookup.getTodayDate();
        return response.render('customer/online_loan.ejs',{
            plans:loanPlans,
            fids :fids,
            nextId:nextId[0].AUTO_INCREMENT,
            today:today,
            userID: request.user.customer_id
        });

    } catch (error) {
        return console.log(error);
    }
    

}


module.exports.createOnlineLoan = createOnlineLoan;
module.exports.loadOnlineLoanForm = loadOnlineLoanForm;