//Password Regex
const PASSWORD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

//Phone number Regex
const PHONE_REGEX=/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

//Account types object
const ACCOUNT_TYPE={
    ADMIN:"Admin",
    USER:"User"
}

//generate payload to generate jwt token
const JWT_PAYLOAD=(user)=> ({
    userId:user._id,
    role:user.accountType
})

module.exports={
    PASSWORD_REGEX,
    ACCOUNT_TYPE,
    PHONE_REGEX,
    JWT_PAYLOAD
};
