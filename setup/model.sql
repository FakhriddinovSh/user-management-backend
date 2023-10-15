CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    last_login TIMESTAMPTZ NOT NULL,
    email VARCHAR(50) NOT NULL,
    active_status BOOLEAN NOT NULL,
    password VARCHAR(160) NOT NULL
);


-- API DOCS --
-- /register => [USER] username, email, password   
--              [AUTO_ADDED] user_id, last_login[new_Date], active_status[true]
--/login => [USER] username, password       
--/users => [Get] All users 
--/user/:userID => [GET] Single User
--/user/ => Method[POST][DELETE] Multiple User
--/user => Method[POST][PUT] Multiple user
-- 
-- 
-- 
-- 

