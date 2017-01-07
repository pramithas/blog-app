use userbase;

insert into users(username,email,password,enabled)values('Pramithas','dhakalpramithas@gmail.com','pass1',true);
INSERT INTO users(username,email,password,enabled)VALUES ('naveen','def@def.com','pass2', true);
INSERT INTO user_roles (userid, role)VALUES (1, 'ROLE_USER');
INSERT INTO user_roles (userid, role)VALUES (2, 'ROLE_ADMIN');
INSERT INTO user_roles (userid, role)VALUES (2, 'ROLE_USER');