const ROLES = {
    Branch_Manager: {
        login_procedure: login_branch_manager,
        privilege_level: 1,
        
    },
    Employee: 2,
    Corporate: 3,
    Individual: 4
}

exports.ROLES = ROLES;